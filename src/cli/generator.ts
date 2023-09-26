import path from "path";
import fs from "fs";
// import { Model, Stmt, isClick, isDo, isOn, isSendText } from '../language/generated/ast';
import {
  Model,
  Stmt,
  isClick,
  isDo,
  isOn,
  isSendText,
  Action,
  Expr,
  isGroup,
  isLit,
  isLogicExpr,
} from "../language/generated/ast";
import { extractDestinationAndName } from "./cli-util";
import { generateCommandsVar } from "./var-generator";
import { parseLogicExpression } from "./pythonLogic/logic-comm";
import { TruthTable } from "./pythonLogic/truth-table";

var temp: string[] = [];
var truthTable: Record<string, number>[][] = [];
let openBrowser = [""];
let SettingsHeader = [
  "***Settings***\n" +
    "Library    SeleniumLibrary\n" +
    "Library    XML\n" +
    "Library    String\n" +
    "Library    Telnet\n",
];
let VarHeader = ["***Variables***"];
let varStatements: any[];

export function generateCommands(
  sourceModel: Model,
  resourceModel: Model,
  sourceFilePath: string,
  resourcesFilePath: string,
  destination: string | undefined
): string {
  const sourceData = extractDestinationAndName(sourceFilePath, destination);
  const generatedFilePath = `${path.join(
    sourceData.destination,
    sourceData.name
  )}.robot`;

  if (!fs.existsSync(sourceData.destination)) {
    fs.mkdirSync(sourceData.destination, { recursive: true });
  }

  varStatements = VarHeader.concat(
    generateCommandsVar(resourceModel, resourcesFilePath)
  ).concat("\n");

  const statements = SettingsHeader.concat(
    varStatements.concat(generateStatements(sourceModel.stmts))
  );

  // Convert the array of objects to a custom formatted string
  const formattedContent = formatStatements(statements);

  fs.writeFileSync(generatedFilePath, formattedContent);
  return generatedFilePath;
}

function formatStatements(statements: Object[]): string {
  let formattedContent = "";

  // Iterate through the array of objects and format them as needed
  for (const statement of statements) {
    // Customize this part based on the structure of your statement objects
    const formattedStatement = `${statement}\n`;
    formattedContent += formattedStatement;
  }

  return formattedContent;
}

function generateStatements(stmts: Stmt[]): string[] {
  return stmts
    .flatMap((s) => evalStmt(s))
    .filter((e) => e !== undefined) as string[];
}

function generateActions(actions: Action[], testName: string): string[] {
  var fullTest: string[] = [];
  var testIndex = 0;
  temp.length = 0;
  truthTable.length = 0;
  for (const action of actions) {
    evalAction(action, temp, truthTable);
  }
  var isComplexExpr = 0;
  for (const array of truthTable) {
    for (const dict of array) {
      for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
          if (key.includes("And")) {
            isComplexExpr = 1;
            break;
          }
        }
      }
    }
  }
  if (isComplexExpr == 1) {
    for (const array of truthTable) {
      for (const dict of array) {
        var testTemplate = [...temp];
        testIndex++;
        for (const key in dict) {
          if (dict.hasOwnProperty(key)) {
            if (dict[key] == 1) {
              if (key.match(/And\(/gm) != null) {
                testTemplate = AndExprSubtitution(
                  key,
                  testTemplate,
                  testName + "-" + testIndex
                );
              } else {
                changeTemp(key, testTemplate, true);
              }
            } else {
              var lines = key.match(/[^And(), ]+/gm);
              if (lines != null) {
                for (const line of lines) {
                  changeTemp(line, testTemplate, false);
                }
              }
            }
          }
        }
        fullTest = fullTest.concat(testTemplate);
      }
    }
  } else {
    fullTest = [testName + openBrowser].concat([...temp]);
  }
  return fullTest;
}

function findVar(key: string): string {
  var foundLine = "";
  for (const line of varStatements) {
    if (line.includes(key)) {
      foundLine = line;
    }
  }
  return foundLine;
}

function changeTemp(key: string, actualTest: string[], isTrue: boolean) {
  if (isTrue) {
    for (var i in actualTest) {
      if (actualTest[i].match(key) != null) {
        const regex = RegExp("\\${" + `${key}` + "}", "g");
        actualTest[i] = actualTest[i].replace(regex, "${" + `${key}` + "}[0]");
      }
    }
  } else {
    for (var i in actualTest) {
      if (actualTest[i].match(key) != null) {
        const regex = RegExp("\\${" + `${key}` + "}", "g");
        actualTest[i] = actualTest[i].replace(regex, "${EMPTY}");
      }
    }
  }
}

function AndExprSubtitution(
  key: string,
  testTemplate: string[],
  testName: string
) {
  const tempTemplate = [...testTemplate];
  var tempTemplate1 = [...tempTemplate];
  testTemplate.length = 0;
  var tempKey = key.replace(/And\(|\)/gm, "");
  var lines = tempKey.match(/\w+/gm);
  var valueArray: string[][] = [];
  if (lines != null) {
    for (const line of lines) {
      const initial = "@{" + line + "-" + key + "}";
      const foundVars = findVar(initial).replace(initial, "").match(/\w+/g);
      if (foundVars != null) {
        valueArray.push(foundVars);
      }
    }
    var index = 0;
    while (index < valueArray[0].length) {
      for (const line of lines) {
        for (const testLine in tempTemplate1) {
          if (tempTemplate1[testLine].includes(line)) {
            tempTemplate1[testLine] = tempTemplate1[testLine].replace(
              "${" + line + "}",
              "${" + line + "-" + key + "}[" + index + "]"
            );
          }
        }
      }
      testTemplate = testTemplate.concat(
        [testName + "-" + (index + 1) + openBrowser].concat(tempTemplate1)
      );
      tempTemplate1 = [...tempTemplate];
      index++;
    }
  }
  return testTemplate;
}

function evalStmt(stmt: Stmt): (Object | undefined)[] {
  if (isOn(stmt)) {
    openBrowser = [
      "\n   Open Browser   " +
        stmt.value +
        "   Edge\n" +
        "   Maximize Browser Window",
    ];
    return ["***Test Cases***"];
  } else if (isDo(stmt)) {
    const actions = stmt.body;
    var testName = stmt.name;
    return generateActions(actions, testName); // console.log(generateActions(actions));
    // return generateActions(actions);
  } else {
    throw new Error(
      "Unrecognized Statement encountered: " + (stmt as any)?.$type ??
        "Unknown Type"
    );
  }
}

function evalAction(
  action: Action,
  temp: string[],
  truthTable: Record<string, number>[][]
) {
  if (isClick(action)) {
    temp.push("   Click Element   " + "${" + action.locator + "}");
  } else if (isSendText(action)) {
    const expr = action.expr;
    evalExpr(expr, temp);
    var valueOnly = generateResourcesExpr(expr, false);
    valueOnly = parseLogicExpression(valueOnly);
    var lines = ExprToComponent(valueOnly);

    var refTable: Record<string, string> = {};
    for (var line of lines) {
      if (line.match(/(And\(\w+(\, \w+)*\))/gm) !== null) {
        refTable[line.replace(/\(|\,|\ |\)/gm, "")] = line;
        valueOnly = valueOnly.replace(line, line.replace(/\(|\,|\ |\)/gm, ""));
      }
    }
    var dicts = TruthTable(valueOnly, refTable);
    if (typeof dicts == "object") {
      truthTable.push(dicts);
    } else {
      throw new Error("Unrecognized Expr Truth Table");
    }
  } else {
    throw new Error(
      "Unrecognized Action encountered: " + (action as any)?.$type ??
        "Unknown Type"
    );
  }
}

function evalExpr(e: Expr, temp: string[]): string {
  if (isLit(e)) {
    var line = "   Input Text   ${" + e.locator + "}   ${" + e.value + "}";
    if (!temp.includes(line)) {
      temp.push(line);
    }
    return "";
  } else if (isLogicExpr(e)) {
    let v1 = evalExpr(e.e1, temp);
    let v2 = evalExpr(e.e2, temp);
    return v1 + v2;
  } else if (isGroup(e)) {
    return evalExpr(e.ge, temp);
  } else {
    throw new Error(
      "Unrecognized Expr encountered: " + (e as any)?.$type ?? "Unknown Type"
    );
  }
}

function generateResourcesExpr(e: Expr, isGe: boolean): string {
  let temp = "";
  if (isLit(e)) {
    return e.value;
  } else if (isLogicExpr(e)) {
    let v1 = generateResourcesExpr(e.e1, false);
    let v2 = generateResourcesExpr(e.e2, false);

    if (isGe) {
      temp += "( " + v1 + " " + e.op + " " + v2 + " )";
    } else {
      temp += v1 + " " + e.op + " " + v2;
    }
    return temp;
  } else if (isGroup(e)) {
    return generateResourcesExpr(e.ge, true);
  } else {
    throw new Error(
      "Unrecognized Expr encountered: " + (e as any)?.$type ?? "Unknown Type"
    );
  }
}

function ExprToComponent(inputString: string): string[] {
  let inputStrings = inputString.split("Or(");
  if (inputStrings[1] !== undefined) {
    var expr = inputStrings[1];
    var singleStrings = expr.match(/(And\(\w+(\, \w+)\))|\w+/gm);
    if (singleStrings !== null) {
      return singleStrings;
    } else {
      return [""];
    }
  } else {
    return [inputStrings[0].trim()];
  }
}
