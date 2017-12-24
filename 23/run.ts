import * as fs from "fs";
import { CoprocessorSimulator } from "../18/simulators";
import { convertToInstruction } from "../18/instructions";

export function run() {
  const processor = new CoprocessorSimulator(readInstructions());
  console.log(`Part 1: ${processor.countMultiplications()}`);
}

function readInstructions() {
  return fs
    .readFileSync(`./23/input.txt`)
    .toString()
    .trim()
    .split("\n")
    .map(line => line.trim())
    .map(line => convertToInstruction(3, ...line.split(" ")));
}

run();
