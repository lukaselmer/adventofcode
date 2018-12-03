import * as fs from "fs";

export function day6() {
  console.log(`Part 1: ${countUntilLoop(readBanks())}`);
  console.log(`Part 2: ${loopSize(readBanks())}`);
}

function readBanks() {
  return fs
    .readFileSync("./6/input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(Number);
}

function countUntilLoop(banks: number[]): number {
  const set = redistributeUntilLoop(banks);
  return Object.keys(set).length;
}

function loopSize(banks: number[]): number {
  const set = redistributeUntilLoop(banks);
  return Object.keys(set).length - set[banks.join(",")];
}

function redistributeUntilLoop(banks: number[]) {
  const set: { [bankString: string]: number } = {};
  while (set[banks.join(",")] === undefined) {
    set[banks.join(",")] = Object.keys(set).length;
    redistribute(banks);
  }
  return set;
}

function redistribute(banks: number[]) {
  let currentIndex = banks.indexOf(Math.max(...banks));
  let value = banks[currentIndex];
  banks[currentIndex] = 0;
  while (value > 0) {
    value--;
    currentIndex++;
    banks[currentIndex % banks.length] += 1;
  }
}

day6();
