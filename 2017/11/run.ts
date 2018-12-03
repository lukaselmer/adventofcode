import * as fs from "fs";
import { Path, Direction } from "./path";

export function day11() {
  const path = new Path(readPath());
  console.log(`Part 1: ${path.distance}`);
  const allDistances = allPaths(readPath()).map(path => path.distance);
  console.log(`Part 1: ${allDistances[allDistances.length - 1]}`);
  console.log(allDistances);
  console.log(`Part 2: ${Math.max(...allDistances)}`);
}

function readPath() {
  return fs
    .readFileSync("./11/input.txt")
    .toString()
    .trim()
    .split(",")
    .map(convertStep);
}

function convertStep(stepString: string): Direction {
  if (
    stepString !== "n" &&
    stepString !== "nw" &&
    stepString !== "ne" &&
    stepString !== "sw" &&
    stepString !== "s" &&
    stepString !== "se"
  )
    throw new Error(`Unknown direction ${stepString}`);

  return stepString;
}

function allPaths(directions: Direction[]): Path[] {
  const paths: Path[] = [];
  for (let i = 1; i <= directions.length; ++i) {
    const path = new Path(directions.slice(0, i));
    paths.push(path);
  }
  return paths;
}

day11();
