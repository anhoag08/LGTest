import chalk from 'chalk';
import { Command } from 'commander';
import { Model } from '../language/generated/ast';
import { HelloWorldLanguageMetaData } from '../language/generated/module';
import { createHelloWorldServices } from '../language/hello-world-module';
import { extractAstNode } from './cli-util';
import { generateCommands } from './generator';
import { NodeFileSystem } from 'langium/node';
import { extractDocument } from './cli-util';
import { generateCommandsRes } from './res-generator';
// import { generateCommandsRes } from './res-generator';
// import { generateCommandsVar } from './var-generator';

export const generateAction = async (sourceFileName: string, resourcesFileName : string,  opts: GenerateOptions): Promise<void> => {
    const services = createHelloWorldServices(NodeFileSystem).HelloWorld;
    const sourceModel = await extractAstNode<Model>(sourceFileName, services);
    const resourceModel = await extractAstNode<Model>(resourcesFileName, services);
    // now with 'generateCommands' instead
    const generatedFilePath = generateCommands(sourceModel, resourceModel, sourceFileName, resourcesFileName, opts.destination);
    console.log(chalk.green(`MiniLogo commands generated successfully: ${generatedFilePath}`));
};

export const generateResources = async (fileName: string, opts: GenerateOptions): Promise<void> => {

    const services = createHelloWorldServices(NodeFileSystem).HelloWorld;
    const model = await extractAstNode<Model>(fileName, services);
    // now with 'generateCommands' instead
    const generatedFilePath = generateCommandsRes(model, fileName, opts.destination);
    console.log(chalk.green(`Resources commands generated successfully: ${generatedFilePath}`));
};

// export const generateVariables = async (fileName: string, opts: GenerateOptions): Promise<void> => {
//     const services = createHelloWorldServices(NodeFileSystem).HelloWorld;
//     const model = await extractAstNode<Model>(fileName, services);
//     // now with 'generateCommands' instead
//     const generatedFilePath = generateCommandsVar(model, fileName, opts.destination);
//     console.log(chalk.green(`Variables commands generated successfully: ${generatedFilePath}`));
// };

export type GenerateOptions = {
    destination?: string;
}

export const parseAndValidate = async (fileName: string, resourcesFileName : string): Promise<void> => {
    // retrieve the services for our language
    const services = createHelloWorldServices(NodeFileSystem).HelloWorld;
    // extract a document for our program
    const document = await extractDocument(fileName, services);
    // extract the parse result details
    const parseResult = document.parseResult;
    // verify no lexer, parser, or general diagnostic errors show up
    if (parseResult.lexerErrors.length === 0 && 
        parseResult.parserErrors.length === 0
    ) {
        console.log(chalk.green(`Parsed and validated ${fileName} successfully!`));
    } else {
        console.log(chalk.red(`Failed to parse and validate ${fileName}!`));
    }
};

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    const fileExtensions = HelloWorldLanguageMetaData.fileExtensions.join(', ');
    program
    .command('generate')
    .argument('<file>',`source file (possible file extensions: ${fileExtensions})`)
    .argument('<file>',`source file (possible file extensions: ${fileExtensions})`)
    .option('-d, --destination <dir>', 'destination directory of generating')
    // new description
    .description('generates DSL')
    .action(generateAction);
    program
    .command('resource')
    .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
    .option('-d, --destination <dir>', 'destination directory of generating')
    // new description
    .description('generates resources')
    .action(generateResources);
    // program
    // .command('variable')
    // .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
    // .option('-d, --destination <dir>', 'destination directory of generating')
    // // new description
    // .description('generates variables')
    // .action(generateVariables);
    program
        .command('parseAndValidate')
        .argument('<file>', 'Source file to parse & validate (ending in ${fileExtensions})')
        .description('Indicates where a program parses & validates successfully, but produces no output code')
        .action(parseAndValidate) // we'll need to implement this function

    program.parse(process.argv);
}
