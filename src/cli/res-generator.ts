import path from "path";
import fs from "fs";
import {
  Model,
  isClick,
  isSendText,
  Action,
  Expr,
  isLogicExpr,
  isLit,
  isGroup,
  isValid,
  isInvalid,
  Do,
} from "../language/generated/ast";
// import { Model, isDo, Action} from '../language/generated/ast';
import { extractDestinationAndName } from "./cli-util";
import { TruthTable } from "./pythonLogic/truth-table";

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
    if (isValid(statement)) {
      generateResourcesDo(statement.body);
    } else if (isInvalid(statement)) {
      generateResourcesDo(statement.body);
    }
  }
}

function generateResourcesDo(body: Do[]): void {
  for (const test of body) {
    generateResourcesAction(test.body);
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
      let refTable = TruthTable(temp);
      if (typeof refTable === "string") {
        console.error(refTable);
      } else {
        generateResourcesValue(refTable);
      }
    }
  }
}

function generateResourcesValue(refTable: Record<string, number>[]) {
  for (const dict of refTable) {
    var temp = "";
    for (const key in dict) {
      if (dict.hasOwnProperty(key)) {
        if (dict[key] == 1) {
          temp += key + ", ";
        }
      }
    }
    temp = temp.slice(0, temp.length - 2);
    if (temp.match(" ") == null) {
      temp = "   " + temp + ":";
      if (!values.includes(temp)) {
        values.push(temp);
      }
    } else {
      temp = "   " + "[" + temp + "]:";
      if (!values.includes(temp)) {
        values.push(temp);
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
