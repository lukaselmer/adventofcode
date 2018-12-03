import { Point } from "./../3/point";
import * as fs from "fs";
import { Direction } from "../3/direction";

export function run() {
  console.log(
    `Example part 1: ${readMaze("example").passThroughMaze().letters}`
  );
  console.log(`Part 1: ${readMaze("input").passThroughMaze().letters}`);
  console.log(`Example part 2: ${readMaze("example").passThroughMaze().steps}`);
  console.log(`Part 2: ${readMaze("input").passThroughMaze().steps}`);
}

function readMaze(filename: string) {
  return new Maze(
    fs
      .readFileSync(`./19/${filename}.txt`)
      .toString()
      .replace(/\r/gm, "")
      .split("\n")
  );
}

class Maze {
  currentPosition: Point;
  direction = Direction.Down;
  letters = "";
  steps = 0;

  constructor(private fields: string[]) {
    this.currentPosition = new Point(this.fields[0].indexOf("|"), 0);
  }

  passThroughMaze() {
    while (!this.finished) this.follow();
    return { letters: this.letters, steps: this.steps };
  }

  private get finished() {
    return this.currentTile === " ";
  }

  private follow() {
    switch (this.currentTile) {
      case "|":
      case "-":
        return this.moveInCurrentDirection();
      case "+":
        return this.findAndFollowNextLine();
      default:
        return this.collectLetter();
    }
  }

  private moveInCurrentDirection() {
    this.steps++;
    this.currentPosition.moveInDirection(this.direction);
  }

  private findAndFollowNextLine() {
    this.steps++;
    const moveTo = this.candidateMoves().find(
      move => this.getTile(move.point) !== " "
    );
    if (!moveTo) throw new Error(`Unable to move to any direction after cross`);
    this.currentPosition = moveTo.point;
    this.direction = moveTo.newDirection;
  }

  private candidateMoves() {
    const p = this.currentPosition;
    const candidates = [];
    if (this.direction !== Direction.Down)
      candidates.push({ point: p.getUp, newDirection: Direction.Up });
    if (this.direction !== Direction.Up)
      candidates.push({ point: p.getDown, newDirection: Direction.Down });
    if (this.direction !== Direction.Left)
      candidates.push({ point: p.getRight, newDirection: Direction.Right });
    if (this.direction !== Direction.Right)
      candidates.push({ point: p.getLeft, newDirection: Direction.Left });
    return candidates;
  }

  private collectLetter() {
    this.letters += this.currentTile;
    this.moveInCurrentDirection();
  }

  private get currentTile() {
    return this.getTile(this.currentPosition);
  }

  private getTile(point: Point): string {
    if (!this.fields[point.y] || !this.fields[point.y][point.x]) return " ";
    return this.fields[point.y][point.x];
  }
}

run();
