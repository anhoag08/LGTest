import chalk from 'chalk';
import { Command } from 'commander';
import { Model } from '../language/generated/ast';
import { HelloWorldLanguageMetaData } from '../language/generated/module';
import { createHelloWorldServices } from '../language/hello-world-module';
import { extractAstNode } from './cli-util';
import { generateCommands } from './generator';
import { NodeFileSystem } from 'langium/node';
import { extractDocument } from './cli-util';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createHelloWorldServices(NodeFileSystem).HelloWorld;
    const model = await extractAstNode<Model>(fileName, services);
    // now with 'generateCommands' instead
    const generatedFilePath = generateCommands(model, fileName, opts.destination);
    console.log(chalk.green(`MiniLogo commands generated successfully: ${generatedFilePath}`));
};

export type GenerateOptions = {
    destination?: string;
}

export const parseAndValidate = async (fileName: string): Promise<void> => {
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
    .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
    .option('-d, --destination <dir>', 'destination directory of generating')
    // new description
    .description('generates MiniLogo commands that can be used as simple drawing instructions')
    .action(generateAction);

    program
        .command('parseAndValidate')
        .argument('<file>', 'Source file to parse & validate (ending in ${fileExtensions})')
        .description('Indicates where a program parses & validates successfully, but produces no output code')
        .action(parseAndValidate) // we'll need to implement this function

    program.parse(process.argv);
}
