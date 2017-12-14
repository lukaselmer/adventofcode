import * as fs from "fs";

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
  console.log(`Part 2: ${fullKnotHash(readInput(), generateNumbers())}`);
}

function readInput() {
  return fs
    .readFileSync("./10/input.txt")
    .toString()
    .trim();
}

function generateNumbers() {
  return [...Array(256).keys()];
}

function singleKnotHash(input: number[], state: number[]) {
  const hashState = new HashState(state);
  input.forEach(num => hashState.mutate(num));
  return hashState;
}

class HashState {
  currentPosition = 0;
  skipSize = 0;

  constructor(public state: number[]) {}

  mutate(num: number) {
    let sublist = this.state.slice(
      this.currentPosition,
      this.currentPosition + num
    );
    if (sublist.length < num)
      sublist = sublist.concat(this.state.slice(0, num - sublist.length));

    sublist.reverse();
    sublist.forEach(
      (value, index) =>
        (this.state[(this.currentPosition + index) % this.state.length] = value)
    );

    this.currentPosition =
      (num + this.currentPosition + this.skipSize) % this.state.length;
    this.skipSize++;
  }

  part1Result() {
    return this.state[0] * this.state[1];
  }
}

function fullKnotHash(input: string, state: number[]) {
  const magic = [17, 31, 73, 47, 23];
  const convertedSequence = input
    .split("")
    .map(convertFromAscii)
    .concat(magic);

  const hashState = new HashState(state);
  for (let i = 0; i < 64; i++)
    convertedSequence.forEach(num => hashState.mutate(num));

  return denseHash(state);
}

function convertFromAscii(char: string) {
  return char.charCodeAt(0);
}

function denseHash(state: number[]) {
  const chunks = inChunksOf(state, 16);
  return chunks
    .map(xor)
    .map(toHex)
    .join("");
}

function inChunksOf(state: number[], chunkSize: number) {
  const stateCopy = state.slice(0);
  const results = [];
  while (stateCopy.length > 0) results.push(stateCopy.splice(0, chunkSize));
  return results;
}

function xor(block: number[]): number {
  return block.reduce((result, num) => result ^ num, 0);
}

function toHex(num: number): string {
  const hex = num.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

day10();
