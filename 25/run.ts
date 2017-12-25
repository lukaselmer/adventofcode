import * as fs from "fs";
import { generateN, sum, objectValues } from "../utils";

export function run() {
  console.log(`Example part 1: ${readParts("example").run()}`);
  console.log(`Part 1: ${readParts("input").run()}`);
}

function readParts(filename: string) {
  return parse(
    fs
      .readFileSync(`./25/${filename}.txt`)
      .toString()
      .replace(/\r/gm, "")
      .trim()
      .split("\n")
      .map(line => line.trim())
  );
}

function parse(lines: string[]) {
  const startStateName = lines[0]
    .replace(".", "")
    .split(" ")
    .reverse()[0];
  const runFor = parseInt(lines[1].split(" ").reverse()[1], 10);
  const states = lines
    .slice(3)
    .join("\n")
    .split("\n\n")
    .map(parseState)
    .reduce(
      (map, state) => {
        map[state.name] = state;
        return map;
      },
      {} as { [stateName: string]: State }
    );
  return new TouringMachine(startStateName, runFor, states);
}

function parseState(stateStr: string): State {
  const lines = stateStr.split("\n");
  const name = lines[0]
    .replace(":", "")
    .split(" ")
    .reverse()[0];
  return {
    name,
    zeroInstruction: parseInstruction(lines.slice(2, 5)),
    oneInstruction: parseInstruction(lines.slice(6, 9))
  };
}

function parseInstruction(instructionStrings: string[]): Instruction {
  const isOne = instructionStrings[0].includes("1");
  const isLeft = instructionStrings[1].includes("left");
  const nextStateName = instructionStrings[2]
    .replace(".", "")
    .split(" ")
    .reverse()[0];
  return {
    write: isOne ? 1 : 0,
    movement: isLeft ? "left" : "right",
    nextStateName
  };
}

class State {
  name: string;
  zeroInstruction: Instruction;
  oneInstruction: Instruction;
}

interface Instruction {
  write: 0 | 1;
  movement: "left" | "right";
  nextStateName: string;
}

class TouringMachine {
  currentState: State;
  tape: { [index: number]: number } = {};
  cursor = 0;

  constructor(
    startStateName: string,
    private runFor: number,
    private states: { [stateName: string]: State }
  ) {
    this.currentState = this.states[startStateName];
  }

  run() {
    generateN(this.runFor).forEach(() => {
      const instruction = this.tape[this.cursor]
        ? this.currentState.oneInstruction
        : this.currentState.zeroInstruction;
      this.tape[this.cursor] = instruction.write;
      instruction.movement === "left" ? this.cursor-- : this.cursor++;
      this.currentState = this.states[instruction.nextStateName];
    });
    return sum(objectValues(this.tape).filter(num => num));
  }
}

run();
