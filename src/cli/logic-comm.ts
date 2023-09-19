// executePython.ts
import { spawnSync } from 'child_process';

const pythonFilePath = './src/cli/LogicParse.py'; // Replace with the path to your Python script

export function parseLogicExpression(expr: string): string {
  const argu = [expr]; // Replace with the arguments you want to pass

  const pythonProcess = spawnSync('python', [pythonFilePath, ...argu]);

  const pythonOutput = pythonProcess.stdout.toString();
  const pythonError = pythonProcess.stderr.toString();

  if (pythonProcess.status === 0) {
    if (pythonError) {
      console.error('Python script error:', pythonError);
    }
    return pythonOutput;
  } else {
    console.error(`Python script exited with code ${pythonProcess.status}`);
    return '';
  }
}
