import path from "path";
import fs from "fs";
import {
  Model,
  isClick,
  isDo,
  isSendText,
  Action,
  Expr,
  isLogicExpr,
  isLit,
  isGroup,
} from "../language/generated/ast";
// import { Model, isDo, Action} from '../language/generated/ast';
import { extractDestinationAndName } from "./cli-util";
import { parseLogicExpression } from "./logic-comm";

// import { exec } from 'child_process';

// Replace with the path to the JavaScript file you want to run
let locators = ["LOCATOR:"];
let values = ["VALUE:"];

export function generateCommandsRes(
  model: Model,
  filePath: string,
  destination: string | undefined
): string {
  const data = extractDestinationAndName(filePath, destination);
  const generatedFilePath = `${path.join(data.destination, "resources")}.hello`;

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }

  generateResourcesStatement(model.stmts);

  // Convert the array of objects to a custom formatted string
  const formattedContent = formatResources(locators.concat(values));

  fs.writeFileSync(generatedFilePath, formattedContent);
  return generatedFilePath;
}

function formatResources(statements: Object[]): string {
  let formattedContent = "";

  // Iterate through the array of objects and format them as needed
  for (const statement of statements) {
    // Customize this part based on the structure of your statement objects
    const formattedStatement = `${statement}\n`;
    formattedContent += formattedStatement;
  }

  return formattedContent;
}

function generateResourcesStatement(statements: Object[]): void {
  // Iterate through the array of objects and format them as needed
  for (const statement of statements) {
    // Customize this part based on the structure of your statement objects
    if (isDo(statement)) {
      generateResourcesAction(statement.body);
    }
  }
}

function generateResourcesAction(actions: Action[]): void {
  // Iterate through the array of objects and format them as needed
  for (const action of actions) {
    // Customize this part based on the structure of your statement objects
    if (isClick(action)) {
      let temploc = "   " + action.locator + ":";
      if (!locators.includes(temploc)) {
        locators.push(temploc);
      }
    } else if (isSendText(action)) {
      let temp = generateResourcesExpr(action.expr, false);
      let expr = parseLogicExpression(temp);
      let lines = parseExpression(expr);
      for (const line in lines) {
        if (!values.includes(line)) {
          values.push(lines[line]);
        }
      }
    }
  }
}

function generateResourcesExpr(e: Expr, isGe: boolean): string {
  let temp = "";
  if (isLit(e)) {
    let temploc = "   " + e.locator + ":";
    if (!locators.includes(temploc)) {
      locators.push(temploc);
    }
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

function parseExpression(inputString: string): string[] {
  let inputStrings = inputString.split("Or(");
  if (inputStrings[1] !== undefined) {
    var expr = inputStrings[1];
    var singleStrings = expr.match(/(And\(\w+(\, \w+)\))|\w+/gm);
    if(singleStrings !== null) {
      for (var i in singleStrings) {
        singleStrings[i] = '   ' + singleStrings[i] + ':'
      }
    }
    if(singleStrings !== null) {
      return singleStrings;
    } else {
      return [''];
    }
  } else {
    return ["   " + inputStrings[0].trim() + ":"];
  }
}
