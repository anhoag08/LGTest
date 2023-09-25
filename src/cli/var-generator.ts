// import path from 'path';
// import fs from 'fs'
// import { Model, Stmt, isClick, isDo, isOn, isSendText } from '../language/generated/ast';
import { Model, isValues, isLocators, Loc, Val, isSingleVal, isBundle, isAndTuple} from '../language/generated/ast';
// import { extractDestinationAndName } from './cli-util';

let statements = [''];

export function generateCommandsVar(model: Model, filePath: string): string[] {
    genVariables(model.stmts);

    return statements;
}


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
        if(isSingleVal(val)) {
            statements.push('${' + val.name + '}' + '   ' + val.value);
        } else if (isBundle(val)) {
            var temp = '@{' + val.name + '}'
            for (var i of val.values) {
                temp += '   ' + i
            }
            statements.push(temp);
        } else if (isAndTuple(val)) {
            for (var i in val.names) {
                var temp = '@{' + val.names[i] + '}'
                var index = 0;
                for (var j in val.values) {
                    if(index == parseInt(i)) {
                        temp += '   ' + val.values[j];
                    }
                    index++;
                    if(index > val.names.length-1) {
                        index = 0;
                    }
                }
                statements.push(temp);
            }
        }
    }
}


