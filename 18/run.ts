import * as fs from "fs";
import { SoundCardSimulator, ProcSimulator } from "./simulators";
import { convertToInstruction } from "./instructions";

export function run() {
  console.log(
    `Example part 1: ${new SoundCardSimulator(
      readInstructions("example", 1)
    ).runUntilRecover()}`
  );
  console.log(
    `Part 1: ${new SoundCardSimulator(
      readInstructions("input", 1)
    ).runUntilRecover()}`
  );
  console.log(
    `Example part 2: ${new ProcSimulator(
      readInstructions("example-procs", 2)
    ).runUntilDeadlock()}`
  );
  console.log(
    `Part 2: ${new ProcSimulator(
      readInstructions("input", 2)
    ).runUntilDeadlock()}`
  );
}

function readInstructions(filename: string, part: number) {
  return fs
    .readFileSync(`./18/${filename}.txt`)
    .toString()
    .trim()
    .split("\n")
    .map(line => line.trim())
    .map(line => convertToInstruction(part, ...line.split(" ")));
}

run();
