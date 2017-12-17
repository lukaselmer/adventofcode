import { sum, generateN } from "../utils";

const GENERATOR_A_FACTOR = 16807;
const GENERATOR_B_FACTOR = 48271;

const GENERATOR_A_PICKY = 4;
const GENERATOR_B_PICKY = 8;

class Generator {
  static GENERATOR_DIVISION = 2147483647;

  constructor(
    public state: number,
    private factor: number,
    private picky: number = 1
  ) {}

  next() {
    this.state = (this.state * this.factor) % Generator.GENERATOR_DIVISION;
  }

  nextPicky() {
    this.next();
    while (this.state % this.picky !== 0) this.next();
  }

  get lowest16Bits() {
    return this.state % 65536; // 65536 = 2^16
  }
}

export function day15() {
  console.log(`Example part 1: ${countMatches(65, 8921)}`);
  console.log(`Part 1: ${countMatches(516, 190)}`);
  console.log(`Example part 2: ${countPickyMatches(65, 8921)}`);
  console.log(`Part 2: ${countPickyMatches(516, 190)}`);
}

function countMatches(seedA: number, seedB: number) {
  const generatorA = new Generator(seedA, GENERATOR_A_FACTOR);
  const generatorB = new Generator(seedB, GENERATOR_B_FACTOR);
  return sum(
    generateN(40 * 1000 * 1000).map(() => {
      generatorA.next();
      generatorB.next();
      return matchFirst16Bits(generatorA, generatorB) ? 1 : 0;
    })
  );
}

function countPickyMatches(seedA: number, seedB: number) {
  const generatorA = new Generator(
    seedA,
    GENERATOR_A_FACTOR,
    GENERATOR_A_PICKY
  );
  const generatorB = new Generator(
    seedB,
    GENERATOR_B_FACTOR,
    GENERATOR_B_PICKY
  );
  return sum(
    generateN(5 * 1000 * 1000).map(() => {
      generatorA.nextPicky();
      generatorB.nextPicky();
      return matchFirst16Bits(generatorA, generatorB) ? 1 : 0;
    })
  );
}

function matchFirst16Bits(generatorA: Generator, generatorB: Generator) {
  return generatorA.lowest16Bits === generatorB.lowest16Bits;
}

day15();
