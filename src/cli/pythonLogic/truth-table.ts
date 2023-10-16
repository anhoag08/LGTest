// executePython.ts
import { spawnSync } from "child_process";

const pythonFilePath = "./src/cli/pythonLogic/TruthTable.py"; // Replace with the path to your Python script

export function TruthTable(expr: string): string | Record<string, number>[] {
  const argu = [expr]; // Replace with the arguments you want to pass

  const pythonProcess = spawnSync("python", [pythonFilePath, ...argu]);

  var pythonOutput = pythonProcess.stdout.toString();
  const pythonError = pythonProcess.stderr.toString();

  if (pythonProcess.status === 0) {
    if (pythonError) {
      console.error("Python script error:", pythonError);
    }

    var header : string[] = [];
    var tbdict : Record<string, number>[] = [];

    pythonOutput = pythonOutput.replace(/[\ ]+/gm, ' ');

    var lines = pythonOutput.split("\n");

    for (var i=0; i<lines.length; i++) {
      if (i != 0) {
        lines[i] = lines[i].trim();
        if(lines[i].trim().slice(lines[i].length-1, lines[i].length) == '1') {
          var values = lines[i].split(":")[0].trim().split(' ');
          var tempRec : Record<string, number> = {};
          for(var j = 0; j < values.length; j++ ) {
            tempRec[header[j]] = Number(values[j]);
          }
          tbdict.push(tempRec);
        }
      } else {
        header = lines[i].trim().split(' ');
      }
    }

    if (tbdict.length > 0) {
      return tbdict;
    } else {
      var tempRec : Record<string, number> = {};
      tempRec[pythonOutput.trim()] = 1;
      tbdict.push(tempRec)
      return tbdict;
    }
  } else {
    console.error(`Python script exited with code ${pythonProcess.status}`);
    return "";
  }
}
