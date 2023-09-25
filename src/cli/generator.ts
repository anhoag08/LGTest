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

function generateActions(actions: Action[]): string[] {
  var fullTest: string[] = [];
  temp.length = 0;
  truthTable.length = 0;
  for (const action of actions) {
    evalAction(action, temp, truthTable);
  }
  for (const array of truthTable) {
    for (const dict of array) {
      var tempCombo = [...temp];
      for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
          if (dict[key] == 1) {
            console.log(key);
            var lines = key.match(/[^And(), ]+/gm);
            if (lines != null) {
              for (const line of lines) {
                changTemp(line, tempCombo, true);
              }
            }
          } else {
            console.log(key);
            var lines = key.match(/[^And(), ]+/gm);
            if (lines != null) {
              for (const line of lines) {
                changTemp(line, tempCombo, false);
              }
            }
          }
        }
      }
      fullTest = fullTest.concat(tempCombo);
      console.log(tempCombo);
      console.log(fullTest);
    }
  }
  return fullTest;
}

// function findVar(key: string): string {
//   var foundLine = "";
//   for (const line of varStatements) {
//     if (line.match("@{" + key + "}") !== null) {
//       foundLine = line;
//     }
//   }
//   return foundLine;
// }

function changTemp(key: string, actualTest: string[], isTrue: boolean) {
  if(isTrue) {
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
    return [`${stmt.name}` + openBrowser]
      .concat(generateActions(actions))
      .concat("\n");
    // console.log(generateActions(actions));
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
    if (lines.length > 1) {
      var refTable: Record<string, string> = {};
      for (var line of lines) {
        if (line.match(/(And\(\w+(\, \w+)*\))/gm) !== null) {
          refTable[line.replace(/\(|\,|\ |\)/gm, "")] = line;
          valueOnly = valueOnly.replace(
            line,
            line.replace(/\(|\,|\ |\)/gm, "")
          );
        }
      }
      var dicts = TruthTable(valueOnly, refTable);
      if (typeof dicts == "object") {
        truthTable.push(dicts);
      } else {
        throw new Error("Unrecognized Expr Truth Table");
      }
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
