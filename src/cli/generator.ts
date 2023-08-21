import path from 'path';
import fs from 'fs'
import { Model, Stmt, isOn } from '../language/generated/ast';
import { extractDestinationAndName } from './cli-util';


export function generateCommands(model: Model, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.json`;

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }

    const result = generateStatements(model.stmts);

    fs.writeFileSync(generatedFilePath, JSON.stringify(result, undefined, 2));
    return generatedFilePath;
}


function generateStatements(stmts: Stmt[]): Object[] { 
    return stmts.flatMap(s => evalStmt(s)).filter(e => e !== undefined) as Object[];
}

/**
 * Takes an env, a drawing state, and the active file node we're appending to
 * Effectful & recursive statement evaluation
 */
function evalStmt(stmt: Stmt) : (Object | undefined)[] {
    if(isOn(stmt)) {
        return ['Open Browser   ' + stmt.url + '   Edge'];
    } else {
        throw new Error('Unrecognized Statement encountered: ' + (stmt as any)?.$type ?? 'Unknown Type');
    }
}
