import * as fs from "fs";

export function day10() {
  console.log(`Example: ${knotHash([3, 4, 1, 5], [0, 1, 2, 3, 4]).result()}`);
  console.log(`Part 1: ${knotHash(readInput(), generateNumbers()).result()}`);
}

function readInput() {
  return fs
    .readFileSync("./10/input.txt")
    .toString()
    .trim()
    .split(",")
    .map(Number);
}

function generateNumbers() {
  return [...Array(256).keys()];
}

function knotHash(input: number[], state: number[]) {
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

  result() {
    return this.state[0] * this.state[1];
  }
}

day10();
