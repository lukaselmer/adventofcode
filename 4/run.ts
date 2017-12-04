import * as fs from "fs";
import { sum } from "../utils";

export function day4() {
  const lines = fs
    .readFileSync("./4/input.txt")
    .toString()
    .trim()
    .split("\n");

  console.log(`Part 1: ${validPassphrasesCount(lines, word => word)}`);
  console.log(`Part 2: ${validPassphrasesCount(lines, sortCharacters)}`);
}

function validPassphrasesCount(
  input: string[],
  transform: (word: string) => string
): number {
  return sum(input.map(line => countIfNoDuplicates(line, transform)));
}

function countIfNoDuplicates(
  line: string,
  transform: (word: string) => string
): number {
  const words = line.split(" ");
  const set: any = {};
  words.forEach(word => (set[transform(word)] = true));
  const validPassphrase = Object.keys(set).length === words.length;
  return validPassphrase ? 1 : 0;
}

function sortCharacters(word: string){
  return word.split('').sort().join();
}

day4();
