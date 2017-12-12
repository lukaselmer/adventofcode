import * as fs from "fs";
import { Group } from "./group";
import { Parser } from "./parser";

const groups: { [inputText: string]: number } = {
  "{}": 1,
  "{{{}}}": 3,
  "{{},{}}": 3,
  "{{{},{},{{}}}}": 6,
  "{<{},{},{{}}>}": 1,
  "{<a>,<a>,<a>,<a>}": 1,
  "{{<a>},{<a>},{<a>},{<a>}}": 5,
  "{{<!>},{<!>},{<!>},{<a>}}": 2
};

const scores: { [inputText: string]: number } = {
  "{}": 1,
  "{{{}}}": 6,
  "{{},{}}": 5,
  "{{{},{},{{}}}}": 16,
  "{<a>,<a>,<a>,<a>}": 1,
  "{{<ab>},{<ab>},{<ab>},{<ab>}}": 9,
  "{{<!!>},{<!!>},{<!!>},{<!!>}}": 9,
  "{{<a!>},{<a!>},{<a!>},{<ab>}}": 3
};

const garbage: { [inputText: string]: number } = {
  "<>": 0,
  "<random characters>": 17,
  "<<<<>": 3,
  "<{!>}>": 2,
  "<!!>": 0,
  "<!!!>>": 0,
  '<{o"i!a,<{i<a>': 10
};

export function day9() {
  Object.keys(groups).forEach(inputText => {
    const expectedCount = groups[inputText];
    const count = countGroups(inputText);
    if (count !== expectedCount)
      throw new Error(
        `${inputText} should count ${expectedCount}, but was ${count}`
      );
    else console.log(`${inputText} counts correctly`);
  });

  Object.keys(scores).forEach(inputText => {
    const expectedScore = scores[inputText];
    const count = scoreGroups(inputText);
    if (count !== expectedScore)
      throw new Error(
        `${inputText} should score ${expectedScore}, but was ${count}`
      );
    else console.log(`${inputText} scores correctly`);
  });

  console.log(`--`);
  console.log(`Part 1: ${scoreGroups(readInput())}`);
  console.log(`--`);

  Object.keys(garbage).forEach(inputText => {
    const expectedGarbage = garbage[inputText];
    const count = countGarbage(inputText);
    if (count !== expectedGarbage)
      throw new Error(
        `${inputText} should count ${expectedGarbage} garbage, but was ${count}`
      );
    else console.log(`${inputText} counts the garbage correctly`);
  });

  console.log(`--`);
  console.log(`Part 2: ${countGarbage(readInput())}`);
  console.log(`--`);
}

function readInput() {
  return fs
    .readFileSync("./9/input.txt")
    .toString()
    .trim();
}

function countGroups(input: string) {
  const groups = parseGroups(input);
  return groups.count - 1;
}

function scoreGroups(input: string) {
  const groups = parseGroups(input);
  return groups.score;
}

function countGarbage(input: string) {
  const groups = parseGroups(input);
  return groups.garbage;
}

function parseGroups(input: string): Group {
  const parser = new Parser(input);
  return parser.parse();
}

day9();
