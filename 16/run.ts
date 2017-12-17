import * as fs from "fs";

interface Move {
  dance(partners: string[]): string[];
}

class Spin implements Move {
  constructor(private size: number) {}

  dance(partners: string[]) {
    const sliceAt = partners.length - this.size;
    const newHead = partners.slice(sliceAt, partners.length);
    const newTail = partners.slice(0, sliceAt);
    return newHead.concat(newTail);
  }
}

class Exchange implements Move {
  constructor(private positionA: number, private positionB: number) {}

  dance(partners: string[]) {
    [partners[this.positionA], partners[this.positionB]] = [
      partners[this.positionB],
      partners[this.positionA]
    ];
    return partners;
  }
}

class Partner implements Move {
  constructor(private partnerA: string, private partnerB: string) {}

  dance(partners: string[]) {
    return new Exchange(
      partners.indexOf(this.partnerA),
      partners.indexOf(this.partnerB)
    ).dance(partners);
  }
}

export function day16() {
  console.log(
    `Example part 1: ${danceOrder(
      convertMoves("s1,x3/4,pe/b"),
      "abcde".split("")
    ).join("")}`
  );
  console.log(
    `Part 1: ${danceOrder(
      convertMoves(readInput()),
      "abcdefghijklmnop".split("")
    ).join("")}`
  );
  console.log(
    `Example part 2: ${oneBillionDances(
      convertMoves("s1,x3/4,pe/b"),
      "abcde".split("")
    )}`
  );
  console.log(
    `Part 2: ${oneBillionDances(
      convertMoves(readInput()),
      "abcdefghijklmnop".split("")
    )}`
  );
}

function readInput() {
  return fs
    .readFileSync("./16/input.txt")
    .toString()
    .trim();
}

function convertMoves(input: string): Move[] {
  return input.split(",").map(moveStr => {
    const moveType = moveStr[0];
    const movePayload = moveStr.slice(1, moveStr.length);
    switch (moveType) {
      case "s":
        return new Spin(Number(movePayload));
      case "x":
        return new Exchange(
          movePayload.split("/").map(Number)[0],
          movePayload.split("/").map(Number)[1]
        );
      case "p":
        return new Partner(
          movePayload.split("/")[0],
          movePayload.split("/")[1]
        );
      default:
        throw new Error(`Invalid move ${moveStr}`);
    }
  });
}

function oneBillionDances(moves: Move[], partners: string[] | string) {
  const previousResults: { [partnerConfiguration: string]: string } = {};
  for (let i = 0; i < 1000000000; ++i) {
    if (i % 50000000 === 0) console.log(`${i / 10000000}% done`);

    const startConfiguration =
      typeof partners === "string" ? partners : partners.join("");
    const knownResult = previousResults[startConfiguration];
    if (knownResult) {
      partners = knownResult;
    } else {
      if (typeof partners === "string")
        throw new Error("This should not happen");
      partners = danceOrder(moves, partners);
      previousResults[startConfiguration] = partners.join("");
    }
  }
  return partners;
}

function danceOrder(moves: Move[], partners: string[]) {
  return moves.reduce(
    (currentPartners, move) => move.dance(currentPartners),
    partners
  );
}

day16();
