import path from 'path';
import fs from 'fs'
import { Model, isClick, isDo, isSendText, Action, Expr, isLogicExpr, isLit, isGroup} from '../language/generated/ast';
// import { Model, isDo, Action} from '../language/generated/ast';
import { extractDestinationAndName } from './cli-util';

// import { exec } from 'child_process';

 // Replace with the path to the JavaScript file you want to run
let locators = ['LOCATOR:'];
let values = ['VALUE:'];

const LogicMap: { [key: string]: string } = {
    'A': '',
    'B': '',
    'C': '',
    'D': '',
    'E': '',
    'F': '',
    'G': '',
    'H': '',
    'I': '',
    'J': '',
    'K': '',
    'L': '',
    'M': '',
    'N': '',
    'O': '',
    'P': '',
    'Q': '',
    'R': '',
    'S': '',
    'T': '',
    'U': '',
    'V': '',
    'W': '',
    'X': '',
    'Y': '',
    'Z': '',
    '*': '&',
    '+': '|',
  };


function findKeyByValue(dictionary: { [key: string]: string }, searchValue: string): string | undefined {
for (const key in dictionary) {
    if (dictionary.hasOwnProperty(key) && dictionary[key] === searchValue) {
    return key;
    }
}
return undefined; // If the value is not found
}

export function generateCommandsRes(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, 'resources')}.hello`;

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }

    genResources(model.stmts);

    // Convert the array of objects to a custom formatted string
    const formattedContent = formatResources(locators.concat(values));

    fs.writeFileSync(generatedFilePath, formattedContent);
    return generatedFilePath;
}

function formatResources(statements: Object[]): string {
    let formattedContent = '';

    // Iterate through the array of objects and format them as needed
    for (const statement of statements) {
        // Customize this part based on the structure of your statement objects
        const formattedStatement = `${statement}\n`;
        formattedContent += formattedStatement;
    }

    return formattedContent;
}

function genResources(statements: Object[]): void {
    // Iterate through the array of objects and format them as needed
    for (const statement of statements) {
        // Customize this part based on the structure of your statement objects
        if(isDo(statement)) {
            generateResourcesAction(statement.body);
        }
    }
}

function generateResourcesAction(actions: Action[]): void {
    // Iterate through the array of objects and format them as needed
    for (const action of actions) {
        // Customize this part based on the structure of your statement objects
        if(isClick(action)) {
            let temploc = '   ' + action.locator + ':';
            if(!locators.includes(temploc)) {
                locators.push(temploc);
            }
        } else if(isSendText(action)) {
            console.log(generateResourcesExpr(action.expr, false));
        }
    }
}

function generateResourcesExpr(e: Expr, isGe: boolean): string {
    let temp = "";
    if(isLit(e)) {
        let temploc = '   ' + e.locator + ':';
        if(!locators.includes(temploc)) {
            locators.push(temploc);
        }
        return e.value;
    } else if(isLogicExpr(e)) {
        let v1 = generateResourcesExpr(e.e1, false);
        let v2 = generateResourcesExpr(e.e2, false)        

        if(isGe) {
            temp += '( ' + v1 + ' ' + e.op + ' ' + v2 + ' )';
        } else {
            temp += v1 + ' ' + e.op + ' ' + v2;
        }
        return temp;
    } else if(isGroup(e)) {
        return generateResourcesExpr(e.ge, true);
    } else {
        throw new Error('Unrecognized Expr encountered: ' + (e as any)?.$type ?? 'Unknown Type');
    }
}