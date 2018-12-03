import * as fs from "fs";
import { singleKnotHash, generateNumbers, knotHash } from "./knot-hash";

export function day10() {
  console.log(
    `Example: ${singleKnotHash([3, 4, 1, 5], [0, 1, 2, 3, 4]).part1Result()}`
  );
  const inNums = readInput()
    .split(",")
    .map(Number);
  console.log(
    `Part 1: ${singleKnotHash(inNums, generateNumbers()).part1Result()}`
  );
  console.log(`Part 2: ${knotHash(readInput())}`);
}

function readInput() {
  return fs
    .readFileSync("./10/input.txt")
    .toString()
    .trim();
}

day10();
