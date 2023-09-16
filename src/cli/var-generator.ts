// import path from 'path';
// import fs from 'fs'
// import { Model, Stmt, isClick, isDo, isOn, isSendText } from '../language/generated/ast';
import { Model, isValues, isLocators, Loc, Val} from '../language/generated/ast';
// import { extractDestinationAndName } from './cli-util';

let statements = [''];

export function generateCommandsVar(model: Model, filePath: string): string[] {
    // const data = extractDestinationAndName(filePath, destination);
    // const generatedFilePath = `${path.join(data.destination, 'variables')}.hello`;

    // if (!fs.existsSync(data.destination)) {
    //     fs.mkdirSync(data.destination, { recursive: true });
    // }

    genVariables(model.stmts);

    return statements;
}

// function formatVariables(statements: Object[]): string {
//     let formattedContent = '';

//     // Iterate through the array of objects and format them as needed
//     for (const statement of statements) {
//         // Customize this part based on the structure of your statement objects
//         const formattedStatement = `${statement}\n`;
//         formattedContent += formattedStatement;
//     }

//     return formattedContent;
// }

function genVariables(statements: Object[]): void {
    // Iterate through the array of objects and format them as needed
    for (const statement of statements) {
        // Customize this part based on the structure of your statement objects
        if(isLocators(statement)) {
            generateVariablesLoc(statement.body);
        } else if(isValues(statement)) {
            generateVariablesVal(statement.body);
        }
    }
}


function generateVariablesLoc(locs: Loc[]): void {
    // Iterate through the array of objects and format them as needed
    for (const loc of locs) {
        // Customize this part based on the structure of your statement objects
        statements.push('${' + loc.name + '}' + '   ' + loc.value);
    }
}

function generateVariablesVal(vals: Val[]): void {
    // Iterate through the array of objects and format them as needed
    for (const val of vals) {
        // Customize this part based on the structure of your statement objects
        statements.push('${' + val.name + '}' + '   ' + val.value)
    }
}


