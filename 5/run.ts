import * as fs from "fs";

export function day5() {
  console.log(`Part 1: ${jumpUntilEscaped(readJumpInstructions(), () => 1)}`);
  console.log(
    `Part 2: ${jumpUntilEscaped(
      readJumpInstructions(),
      jump => (jump >= 3 ? -1 : 1)
    )}`
  );
}

function readJumpInstructions() {
  return fs
    .readFileSync("./5/input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(Number);
}

function jumpUntilEscaped(
  jumpInstructions: number[],
  strangenessJumpChanger: (jump: number) => number
): number {
  let currentInstructionIndex = 0;
  let counter = 0;
  while (
    currentInstructionIndex < jumpInstructions.length &&
    currentInstructionIndex >= 0
  ) {
    counter++;
    const jump = jumpInstructions[currentInstructionIndex];
    jumpInstructions[currentInstructionIndex] += strangenessJumpChanger(jump);
    currentInstructionIndex += jump;
  }
  return counter;
}

day5();
