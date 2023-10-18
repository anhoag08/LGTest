import path from "path";
import fs from "fs";
// import { Model, Stmt, isClick, isDo, isOn, isSendText } from '../language/generated/ast';
import {
  Action,
  Do,
  Expr,
  Model,
  Stmt,
  isClick,
  isGroup,
  isInvalid,
  isLit,
  isLogicExpr,
  isOn,
  isSendText,
  isValid,
} from "../language/generated/ast";
import { extractDestinationAndName } from "./cli-util";
import { generateCommandsVar } from "./var-generator";
import { TruthTable } from "./pythonLogic/truth-table";
import e from "express";

let SettingsHeader = [
  "***Settings***\n" +
    "Library    SeleniumLibrary\n" +
    "Library    XML\n" +
    "Library    String\n" +
    "Library    Telnet\n",
];
let VarHeader = ["***Variables***"];
let TestHeader = ["***Test Cases***"];
let openBrowser: string;

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

  VarHeader = VarHeader.concat(
    generateCommandsVar(resourceModel, resourcesFilePath)
  ).concat("\n");

  const statements = SettingsHeader.concat(
    VarHeader.concat(generateStatements(sourceModel.stmts))
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
  var tempStmt: string[] = [];
  tempStmt = tempStmt.concat(TestHeader);
  for (const stmt of stmts) {
    if (isOn(stmt)) {
      openBrowser = "   Open Browser   " + stmt.value + "   Edge\n" + "   Maximize Browser Window";
    } else if (isValid(stmt)) {
      tempStmt = tempStmt.concat(generateTestCase(stmt.body, true));
    } else if (isInvalid(stmt)) {
      tempStmt = tempStmt.concat(generateTestCase(stmt.body, false));
    }
  }
  return tempStmt;
}

function generateTestCase(body: Do[], isValidTest: boolean): string[] {
  var TestCase: string[] = [];
  if (isValidTest) {
    for (const test of body) {
      var testName = "Valid-" + test.name;
      var template = generateTestTemplate(test.body, testName);
      TestCase = TestCase.concat(
        generateComboFromTemplate(test.body, template)
      );
    }
    return TestCase;
  } else {
    for (const test of body) {
      var testName = "Invalid-" + test.name;
      TestCase = TestCase.concat(generateTestTemplate(test.body, testName));
    }
    return TestCase;
  }
}

function generateComboFromTemplate(
  actions: Action[],
  template: string[]
): string[] {
  var testCombo: string[] = [];
  var actionTemp = [...template];
  for (const action of actions) {
    if (isSendText(action)) {
      var newTemp:string[] = [];
      var expr = exprToString(action.expr, false);
      var refTable = TruthTable(expr);
      if (typeof refTable === "string") {
        console.error(refTable);
      } else {
        var generalHeader = "";
        for (const key in refTable[0]) {
          if (refTable[0].hasOwnProperty(key)) {
            generalHeader += key + ", ";
          }
        }
        generalHeader =
          "[" + generalHeader.slice(0, generalHeader.length - 2) + "]";
        if(generalHeader.match(/, /g) != null) {
          for(const dict of refTable) {
            var dictTemp = [...actionTemp];
            var header = ""
            var size = 0;
            for(const key in dict) {
              if(dict[key] == 1) {
                header += key + ', '
              }
            }
            header = '[' +  header.slice(0, header.length - 2) + ']';
            if(header.match(/, /g) != null) {
              for(const line of VarHeader) {
                if(line.includes(header)) {
                  var ws = line.match(/   /g)?.length;
                  if(ws != undefined) {
                    size = ws;
                    break;
                  }
                }
              }
              for(var i in dictTemp) {
                if(dictTemp[i].includes(generalHeader)) {
                  dictTemp[i] = dictTemp[i].replace(generalHeader, header)
                }
              }
              for(var n=0; n<size; n++) {
                var valTemp = [...dictTemp]
                for(const key in dict) {
                  if(dict[key] == 1) {
                    for(var i in valTemp) {
                      if(valTemp[i].includes(key + '-' + header)) {
                        valTemp[i] += '[' + n + ']'
                      }
                    }
                  } else {
                    for(var i in valTemp) {
                      console.log(key + '-' + header)
                      if(valTemp[i].includes(key + '-' + header)) {
                        valTemp[i] = valTemp[i].replace(key + '-' + header, 'EMPTY')
                      }
                    }
                  }
                }
                newTemp = newTemp.concat(valTemp);
              }
            } else {
              header = header.slice(1, header.length-1)
              for(var line of VarHeader) {
                if(line.includes('@{' + header + '}')) {
                  var ws = line.match(/   /g)?.length;
                  if(ws != undefined) {
                    size = ws;
                    break;
                  }
                }
              }
              for(var n=0; n<size; n++) {
                var valTemp = [...dictTemp]
                for(var i in valTemp) {
                  for(const key in dict) {
                    if(dict[key] == 1) {
                      if(valTemp[i].includes(key + '-' + generalHeader)) {
                        valTemp[i] = valTemp[i].replace(key + '-' + generalHeader, key) + '[' + n + ']';
                      }
                    } else {
                      if(valTemp[i].includes(key + '-' + generalHeader)) {
                        valTemp[i] = valTemp[i].replace(key + '-' + generalHeader, 'EMPTY');
                      }
                    }
                  }
                }
                newTemp = newTemp.concat(valTemp);
              }
            }
          }
        } else {
          var size = 0;
          var dictTemp = [...actionTemp];
          generalHeader = generalHeader.slice(1, generalHeader.length-1);
          for(const line of VarHeader) {
            if(line.includes('@{' + generalHeader + '}')) {
              var ws = line.match(/   /g)?.length;
              if(ws != undefined) {
                size = ws;
                break;
              }
            }
          }
          for(var n=0; n<size; n++) {
            var valTemp = [...dictTemp];
            for(var i in valTemp) {
              if(valTemp[i].includes('${' + generalHeader + '}') && !valTemp[i].includes('[' || ']')) {
                valTemp[i] += '[' + n + ']';
              }
            }
            newTemp = newTemp.concat(valTemp);
          }
        }
      }
      actionTemp = [...newTemp];
    }
  }
  testCombo=[...actionTemp];
  var testNum = 1;
  for(var n = 0; n<testCombo.length; n++) {
    if(!testCombo[n].includes('   ')) {
      testCombo[n] += '-' + testNum;
      testNum++;
    }
  }
  return testCombo;
}

function generateTestTemplate(actions: Action[], testName: string): string[] {
  var template = [testName, openBrowser];
  for (const action of actions) {
    if (isClick(action)) {
      template.push("   Click Element   ${" + action.locator + "}");
    } else if (isSendText(action)) {
      template = template.concat(generateSendTextExpr(action.expr));
    }
  }
  template.push("   Close Browser");
  return template;
}

function generateSendTextExpr(expr: Expr): string[] {
  var header: string = "";
  var tempExpr: string[] = [];
  var dictValLoc: Record<string, string> = {};
  var temp = exprToStringAndDict(expr, false, dictValLoc);
  let refTable = TruthTable(temp);
  if (typeof refTable === "string") {
    console.error(refTable);
  } else {
    for (const key in refTable[0]) {
      if (refTable[0].hasOwnProperty(key)) {
        header += key + ", ";
      }
    }
    header = "[" + header.slice(0, header.length - 2) + "]";
    if (header.match(", ") == null) {
      header = "";
    }
    for (const val in refTable[0]) {
      if (refTable[0].hasOwnProperty(val)) {
        if (header === "") {
          tempExpr.push(
            "   Input Text   ${" + dictValLoc[val] + "}   ${" + val + "}"
          );
        } else {
          tempExpr.push(
            "   Input Text   ${" +
              dictValLoc[val] +
              "}   ${" +
              val +
              "-" +
              header +
              "}"
          );
        }
      }
    }
  }
  return tempExpr;
}

function exprToStringAndDict(
  e: Expr,
  isGe: boolean,
  dictValLoc: Record<string, string>
): string {
  let temp = "";
  if (isLit(e)) {
    for (const val in dictValLoc) {
      if (val === e.value && dictValLoc[val] === e.locator) {
        return e.value;
      }
    }
    dictValLoc[e.value] = e.locator;
    return e.value;
  } else if (isLogicExpr(e)) {
    let v1 = exprToStringAndDict(e.e1, false, dictValLoc);
    let v2 = exprToStringAndDict(e.e2, false, dictValLoc);

    if (isGe) {
      temp += "( " + v1 + " " + e.op + " " + v2 + " )";
    } else {
      temp += v1 + " " + e.op + " " + v2;
    }
    return temp;
  } else if (isGroup(e)) {
    return exprToStringAndDict(e.ge, true, dictValLoc);
  } else {
    throw new Error(
      "Unrecognized Expr encountered: " + (e as any)?.$type ?? "Unknown Type"
    );
  }
}

function exprToString(e: Expr, isGe: boolean): string {
  let temp = "";
  if (isLit(e)) {
    return e.value;
  } else if (isLogicExpr(e)) {
    let v1 = exprToString(e.e1, false);
    let v2 = exprToString(e.e2, false);

    if (isGe) {
      temp += "( " + v1 + " " + e.op + " " + v2 + " )";
    } else {
      temp += v1 + " " + e.op + " " + v2;
    }
    return temp;
  } else if (isGroup(e)) {
    return exprToString(e.ge, true);
  } else {
    throw new Error(
      "Unrecognized Expr encountered: " + (e as any)?.$type ?? "Unknown Type"
    );
  }
}
