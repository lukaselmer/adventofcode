import { CoprocessorSimulatorProductionMode } from "./../18/simulators";
import * as fs from "fs";
import { CoprocessorSimulatorDebugMode } from "../18/simulators";
import { convertToInstruction } from "../18/instructions";

export function run() {
  const debug = new CoprocessorSimulatorDebugMode(readInstructions("input"));
  console.log(`Part 1: ${debug.countMultiplications()}`);

  const production = new CoprocessorSimulatorProductionMode(
    readInstructions("optimized-input")
  );
  console.log(`Part 2: ${production.calculateRegisterH()}`);
}

function readInstructions(filename: string) {
  return fs
    .readFileSync(`./23/${filename}.txt`)
    .toString()
    .trim()
    .split("\n")
    .map(line => line.trim())
    .map(line => convertToInstruction(3, ...line.split(" ")));
}

run();
