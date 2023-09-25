// executePython.ts
import { spawnSync } from "child_process";

const pythonFilePath = "./src/cli/pythonLogic/TruthTable.py"; // Replace with the path to your Python script

export function TruthTable(expr: string, refTable: Record<string, string>): string | Record<string, number>[] {
  const argu = [expr]; // Replace with the arguments you want to pass

  const pythonProcess = spawnSync("python", [pythonFilePath, ...argu]);

  var pythonOutput = pythonProcess.stdout.toString();
  const pythonError = pythonProcess.stderr.toString();

  if (pythonProcess.status === 0) {
    if (pythonError) {
      console.error("Python script error:", pythonError);
    }
    pythonOutput = pythonOutput.replace(/(\w+)/g, '"$1"');
    for (const key in refTable) {
      if(refTable.hasOwnProperty(key)) {
        const regex = new RegExp(`${key}`, 'g');
        pythonOutput = pythonOutput.replace(regex, refTable[key]);
      }
    }
    let arrayOfDicts: Record<string, number>[];
    try {
      arrayOfDicts = JSON.parse(pythonOutput, (key, value) => {
        const numericValue = parseFloat(value);
        return isNaN(numericValue) ? value : numericValue;
      });
      return arrayOfDicts
    } catch (error) {
      return "Error parsing JSON:" + error;
    }
  } else {
    console.error(`Python script exited with code ${pythonProcess.status}`);
    return "";
  }
}
