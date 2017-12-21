import * as fs from "fs";
import { generateN, sum } from "../utils";

const START_PATTERN = [".#.", "..#", "###"]; // .map(convertPatternToNumber)

export function run() {
  console.log(
    `Example part 1: ${runIterations(readRules("example"), 2).pixelsWhichAreOn}`
  );
  console.log(
    `Part 1: ${runIterations(readRules("input"), 5).pixelsWhichAreOn}`
  );
  console.log(
    `Part 2: ${runIterations(readRules("input"), 18).pixelsWhichAreOn}`
  );
}

function readRules(filename: string) {
  return new Rules(
    fs
      .readFileSync(`./21/${filename}.txt`)
      .toString()
      .replace(/\r/gm, "")
      .trim()
      .split("\n")
  );
}

function runIterations(rules: Rules, iterations: number) {
  const artist = new Artist(START_PATTERN, rules);
  artist.iterate(iterations);
  return artist;
}

class Rules {
  private rules: Rule[];

  constructor(rulesStrings: string[]) {
    this.rules = rulesStrings.map(line => {
      const [from, to] = line.split(" => ");
      return new Rule(from.split("/"), to.split("/"));
    });
  }

  apply(part: string[]): string[] {
    if (this.rules.filter(rule => rule.matches(part)).length > 1)
      throw new Error(`multiple rules applyable for part \n${part.join("\n")}`);

    const rule = this.rules.find(rule => rule.matches(part));
    if (!rule)
      throw new Error(`No matching rule found for \n${part.join("/")}`);
    return rule.to;
  }
}

class Rule {
  constructor(public from: string[], public to: string[]) {}

  private get size() {
    return this.from.length;
  }

  matches(pattern: string[]) {
    if (pattern.length != this.size) return false;

    return (
      this.matchesExactly(pattern) ||
      this.matchesExactly(this.flip(pattern)) ||
      this.matchesExactly(this.rotate(pattern, 1)) ||
      this.matchesExactly(this.rotate(pattern, 2)) ||
      this.matchesExactly(this.rotate(pattern, 3)) ||
      this.matchesExactly(this.flip(this.rotate(pattern, 1))) ||
      this.matchesExactly(this.flip(this.rotate(pattern, 2))) ||
      this.matchesExactly(this.flip(this.rotate(pattern, 3)))
    );
  }

  private rotate(pattern: string[], times: number) {
    for (let i = 0; i < times; i++) pattern = this.rotateOnce(pattern);
    return pattern;
  }

  private rotateOnce(pattern: string[]) {
    if (pattern.length === 2) {
      return [
        `${pattern[1][0]}${pattern[0][0]}`,
        `${pattern[1][1]}${pattern[0][1]}`
      ];
    }
    return [
      `${pattern[2][0]}${pattern[1][0]}${pattern[0][0]}`,
      `${pattern[2][1]}${pattern[1][1]}${pattern[0][1]}`,
      `${pattern[2][2]}${pattern[1][2]}${pattern[0][2]}`
    ];
  }

  private flip(pattern: string[]) {
    if (pattern.length === 2) {
      return [
        `${pattern[0][1]}${pattern[0][0]}`,
        `${pattern[1][1]}${pattern[1][0]}`
      ];
    }
    return [
      `${pattern[0][2]}${pattern[0][1]}${pattern[0][0]}`,
      `${pattern[1][2]}${pattern[1][1]}${pattern[1][0]}`,
      `${pattern[2][2]}${pattern[2][1]}${pattern[2][0]}`
    ];
  }

  private matchesExactly(pattern: string[]) {
    return this.from.every((value, index) => value === pattern[index]);
  }
}

class Artist {
  constructor(private image: string[], private rules: Rules) {}

  iterate(iterations: number) {
    generateN(iterations).forEach(() => this.iterateOnce());
  }

  private iterateOnce() {
    const parts =
      this.image.length % 2 === 0
        ? this.splitInTwoByTwo()
        : this.splitInThreeByThree();
    const newParts = parts.map(line =>
      line.map(part => this.rules.apply(part))
    );
    this.combineImage(newParts);
    console.log(".");
  }

  private splitInTwoByTwo(): string[][][] {
    const lineArrays = this.image.map(line => line.match(/.{2}/g) as string[]);
    const parts: string[][][] = [];
    for (let y = 0; y < this.image.length / 2; y++) {
      if (!parts[y]) parts[y] = [];
      lineArrays[0].forEach((_, x) => {
        const part = [];
        part[0] = lineArrays[y * 2][x];
        part[1] = lineArrays[y * 2 + 1][x];
        parts[y][x] = part;
      });
    }
    return parts;
  }

  private splitInThreeByThree(): string[][][] {
    const lineArrays = this.image.map(line => line.match(/.{3}/g) as string[]);
    const parts: string[][][] = [];
    for (let y = 0; y < this.image.length / 3; y++) {
      if (!parts[y]) parts[y] = [];
      lineArrays[0].forEach((_, x) => {
        const part = [];
        part[0] = lineArrays[y * 3][x];
        part[1] = lineArrays[y * 3 + 1][x];
        part[2] = lineArrays[y * 3 + 2][x];
        parts[y][x] = part;
      });
    }
    return parts;
  }

  private combineImage(parts: string[][][]) {
    const newImage: string[] = [];
    const partSize = parts[0][0].length;
    parts.forEach((partLine, outerY) =>
      partLine.forEach(part =>
        part.forEach((partLine, innerY) => {
          const y = outerY * partSize + innerY;
          if (!newImage[y]) newImage[y] = "";
          newImage[y] += partLine;
        })
      )
    );
    this.image = newImage;
  }

  get pixelsWhichAreOn() {
    return sum(
      this.image.map(line =>
        sum(line.split("").map(char => (char === "#" ? 1 : 0)))
      )
    );
  }
}

run();
