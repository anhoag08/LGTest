import path from 'path';
import fs from 'fs'
// import { Model, Stmt, isClick, isDo, isOn, isSendText } from '../language/generated/ast';
import { Model, Stmt, isClick, isDo, isOn, isSendText, Action, Expr} from '../language/generated/ast';
import { extractDestinationAndName } from './cli-util';
import { generateCommandsVar } from './var-generator';


let openBrowser = [''];
let SettingsHeader = ['***Settings***\n'
                +'Library    SeleniumLibrary\n'
                +'Library    XML\n'
                +'Library    String\n'
                +'Library    Telnet\n'];
let VarHeader = ['***Variables***']



export function generateCommands(sourceModel: Model, resourceModel:Model,  sourceFilePath: string, resourcesFilePath: string, destination: string | undefined): string {
    const sourceData = extractDestinationAndName(sourceFilePath, destination);
    const generatedFilePath = `${path.join(sourceData.destination, sourceData.name)}.robot`;

    if (!fs.existsSync(sourceData.destination)) {
        fs.mkdirSync(sourceData.destination, { recursive: true });
    }

    const varStatements = VarHeader.concat(generateCommandsVar(resourceModel, resourcesFilePath)).concat('\n');

    const statements = SettingsHeader.concat(varStatements.concat(generateStatements(sourceModel.stmts)));
    
    // Convert the array of objects to a custom formatted string
    const formattedContent = formatStatements(statements);

    fs.writeFileSync(generatedFilePath, formattedContent);
    return generatedFilePath;
}

function formatStatements(statements: Object[]): string {
    let formattedContent = '';

    // Iterate through the array of objects and format them as needed
    for (const statement of statements) {
        // Customize this part based on the structure of your statement objects
        const formattedStatement = `${statement}\n`;
        formattedContent += formattedStatement;
    }

    return formattedContent;
}



function generateStatements(stmts: Stmt[]): string[] { 
    return stmts.flatMap(s => evalStmt(s)).filter(e => e !== undefined) as string[];
}

function generateActions(actions: Action[]): string[] { 
    return actions.flatMap(s => evalAction(s)).filter(e => e !== undefined) as string[];
}

/**
 * Takes an env, a drawing state, and the active file node we're appending to
 * Effectful & recursive statement evaluation
 */
function evalStmt(stmt: Stmt) : (Object | undefined)[] {
    if(isOn(stmt)) {
        openBrowser = ['\n   Open Browser   ' + stmt.value + '   Edge\n'
                      +'   Maximize Browser Window'];
        return ['***Test Cases***']
    } else if(isDo(stmt)) {
        const actions = stmt.body;
        return ([`${stmt.name}` + openBrowser].concat(generateActions(actions))).concat('\n');
    } else {
        throw new Error('Unrecognized Statement encountered: ' + (stmt as any)?.$type ?? 'Unknown Type');
    }
}


function evalAction(action: Action) : (Object | undefined)[] {
    if(isClick(action)) {
        return ['   Click Element   ' + '${' + action.locator + '}'];
    } else if(isSendText(action)) {
        const expr = action.expr;
        return [evalExpr(expr)];
    } else {
        throw new Error('Unrecognized Action encountered: ' + (action as any)?.$type ?? 'Unknown Type');
    }
}

function evalExpr(expr: Expr) : string {
    return "";
}



