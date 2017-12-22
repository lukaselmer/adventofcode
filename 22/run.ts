import * as fs from "fs";
import { generateN, sum } from "../utils";
import { Direction } from "../3/direction";
import { Point } from "../3/point";

export function run() {
  console.log(`Example part 1: ${part1(readInput("example")).infectingBursts}`);
  console.log(`Part 1: ${part1(readInput("input")).infectingBursts}`);
  console.log(`Example part 2: ${part2(readInput("example")).infectingBursts}`);
  console.log(`Part 2: ${part2(readInput("input")).infectingBursts}`);
}

function readInput(filename: string) {
  return new Cells(
    fs
      .readFileSync(`./22/${filename}.txt`)
      .toString()
      .replace(/\r/gm, "")
      .trim()
      .split("\n")
  );
}

function part1(items: Cells) {
  const calculator = new Infector(items, 1);
  calculator.run(10000);
  return calculator;
}

function part2(items: Cells) {
  const calculator = new Infector(items, 2);
  calculator.run(10000000);
  return calculator;
}

class Cells {
  map: { [pos: string]: string | undefined } = {};
  size: number;

  constructor(cellsString: string[]) {
    this.size = cellsString.length;
    cellsString.map((line, x) => {
      line.split("").forEach((char, y) => {
        if (char === "#") this.map[combine(x, y)] = "#";
      });
    });
  }

  get infectedCount() {
    return Object.keys(this.map).filter(k => this.map[k]).length;
  }

  infected(point: Point) {
    return this.map[combine(point.y, point.x)] === "#";
  }

  weakened(point: Point) {
    return this.map[combine(point.y, point.x)] === "W";
  }

  flagged(point: Point) {
    return this.map[combine(point.y, point.x)] === "F";
  }

  weaken(point: Point) {
    this.map[combine(point.y, point.x)] = "W";
  }

  infect(point: Point) {
    this.map[combine(point.y, point.x)] = "#";
  }

  flag(point: Point) {
    this.map[combine(point.y, point.x)] = "F";
  }

  clean(point: Point) {
    delete this.map[combine(point.y, point.x)];
  }
}

function combine(y: number, x: number) {
  return `${y}/${x}`;
}

class Infector {
  direction = Direction.Up;
  position: Point;
  infectedInBeginning: number;
  infectingBursts = 0;

  constructor(public cells: Cells, private part: number) {
    this.infectedInBeginning = cells.infectedCount;
    this.position = new Point(
      (cells.size - cells.size % 2) / 2,
      (cells.size - cells.size % 2) / 2
    );
  }

  run(iterations: number) {
    generateN(iterations).forEach(() => this.iterateOnce());
  }

  iterateOnce() {
    if (this.part === 1) {
      if (this.cells.infected(this.position)) {
        this.turnRight();
        this.cells.clean(this.position);
      } else {
        this.turnLeft();
        this.cells.infect(this.position);
        this.infectingBursts++;
      }
    } else {
      if (this.cells.weakened(this.position)) {
        this.cells.infect(this.position);
        this.infectingBursts++;
      } else if (this.cells.infected(this.position)) {
        this.turnRight();
        this.cells.flag(this.position);
      } else if (this.cells.flagged(this.position)) {
        this.turnRight();
        this.turnRight();
        this.cells.clean(this.position);
      } else {
        this.turnLeft();
        this.cells.weaken(this.position);
      }
    }

    this.moveForward();
  }

  turnRight() {
    switch (this.direction) {
      case Direction.Up:
        this.direction = Direction.Right;
        break;
      case Direction.Right:
        this.direction = Direction.Down;
        break;
      case Direction.Down:
        this.direction = Direction.Left;
        break;
      case Direction.Left:
        this.direction = Direction.Up;
        break;
    }
  }

  turnLeft() {
    switch (this.direction) {
      case Direction.Up:
        this.direction = Direction.Left;
        break;
      case Direction.Left:
        this.direction = Direction.Down;
        break;
      case Direction.Down:
        this.direction = Direction.Right;
        break;
      case Direction.Right:
        this.direction = Direction.Up;
        break;
    }
  }

  moveForward() {
    this.position.moveInDirection(this.direction);
  }

  get part1() {
    return this.infectingBursts;
  }

  printMap() {
    const size = 16;
    const offset = size / 2 - 1;
    const range = generateN(15).map(x => x - offset);
    const mapString = range.map(y =>
      range.map(x => this.cells.map[combine(y, x)] || ".").join(" ")
    );
    // mark the current position using [ ]
    mapString[this.position.y + offset] =
      mapString[this.position.y + offset].slice(
        0,
        this.position.x * 2 + offset * 2 - 1
      ) +
      "[" +
      mapString[this.position.y + offset][this.position.x * 2 + offset * 2] +
      "]" +
      mapString[this.position.y + offset].slice(
        this.position.x * 2 + offset * 2 + 2,
        mapString[this.position.y + offset].length
      );
    console.log(mapString.join("\n"));
    console.log("--");
  }

  get part2() {
    return sum([42]);
  }
}

run();
