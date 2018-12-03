import * as fs from "fs";

interface Instruction {
  variable: string;
  operator: "inc" | "dec";
  value: number;
  conditionVariable: string;
  conditionOperator: "<" | "<=" | ">" | ">=" | "==" | "!=";
  conditionValue: number;
}

export function day8() {
  const result = processRegisters(readInstructions());
  console.log(`Part 1: ${result.endMax}`);
  console.log(`Part 2: ${result.duringMax}`);
}

function readInstructions() {
  return fs
    .readFileSync("./8/input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(convertInstruction);
}

function convertInstruction(line: string): Instruction {
  const [
    variable,
    operator,
    valueStr,
    ,
    conditionVariable,
    conditionOperator,
    conditionValueStr
  ] = line.split(" ");

  if (operator !== "inc" && operator !== "dec")
    throw new Error(`Invalid operator ${operator}`);

  if (
    conditionOperator !== "<" &&
    conditionOperator !== "<=" &&
    conditionOperator !== ">" &&
    conditionOperator !== ">=" &&
    conditionOperator !== "==" &&
    conditionOperator !== "!="
  )
    throw new Error(`Invalid condition operator ${conditionOperator}`);

  const value = Number(valueStr);
  const conditionValue = Number(conditionValueStr);

  return {
    variable,
    operator,
    value,
    conditionVariable,
    conditionOperator,
    conditionValue
  };
}

function processRegisters(instructions: Instruction[]) {
  const registers = new Proxy({} as { [name: string]: number }, {
    get: (object, property) =>
      object.hasOwnProperty(property) ? object[property] : 0
  });

  const tmpMax = instructions.map(instruction => {
    applyInstruction(registers, instruction);
    return maxRegisterValue(registers);
  });

  return {
    duringMax: Math.max(...tmpMax),
    endMax: maxRegisterValue(registers)
  };
}

function maxRegisterValue(registers: { [name: string]: number }) {
  return Math.max(
    ...Object.keys(registers).map(variable => registers[variable])
  );
}

function applyInstruction(
  registers: { [name: string]: number },
  instruction: Instruction
) {
  if (validCondition(registers[instruction.conditionVariable], instruction))
    registers[instruction.variable] += operation(instruction);
}

function validCondition(registerValue: number, instruction: Instruction) {
  switch (instruction.conditionOperator) {
    case "<":
      return registerValue < instruction.conditionValue;
    case "<=":
      return registerValue <= instruction.conditionValue;
    case ">":
      return registerValue > instruction.conditionValue;
    case ">=":
      return registerValue >= instruction.conditionValue;
    case "==":
      return registerValue == instruction.conditionValue;
    case "!=":
      return registerValue != instruction.conditionValue;
  }
}

function operation(instruction: Instruction) {
  switch (instruction.operator) {
    case "inc":
      return instruction.value;
    case "dec":
      return -instruction.value;
  }
}

day8();
