import { SpiralMatrix } from "./spiral-matrix";
import { sum } from "../utils";

const enum Direction {
  Right,
  Up,
  Left,
  Down
}

type WhileCondition = (currentIndex: number, latestValue: number) => boolean;

type FillFunction = (
  currentIndex: number,
  x: number,
  y: number,
  matrix: SpiralMatrix
) => number;

export function day3() {
  print(1, 1, 0, spiralDistance(1));
  print(1, 12, 3, spiralDistance(12));
  print(1, 23, 2, spiralDistance(23));
  print(1, 1024, 31, spiralDistance(1024));
  print(1, 361527, "?", spiralDistance(361527));

  print(2, 2, 4, spiralFirstLargerValue(2));
  print(2, 3, 4, spiralFirstLargerValue(3));
  print(2, 4, 5, spiralFirstLargerValue(4));
  print(2, 5, 10, spiralFirstLargerValue(5));
  print(2, 11, 23, spiralFirstLargerValue(11));
  print(2, 17, 23, spiralFirstLargerValue(17));
  print(2, 747, 806, spiralFirstLargerValue(747));
  print(2, 797, 806, spiralFirstLargerValue(797));
  print(2, 805, 806, spiralFirstLargerValue(805));
  print(2, 361527, "?", spiralFirstLargerValue(361527));
}

function print(
  part: number,
  limit: number,
  expected: number | string,
  result: number
) {
  console.log(`Part ${part}: ${limit} (should == ${expected}): ${result}`);
}

function spiralDistance(limit: number) {
  const matrix = buildSprialMatrix(
    limit,
    fillWithIndex,
    distanceWhileCondition(limit)
  );
  return calcDistance(matrix);
}

function fillWithIndex(index: number) {
  return index;
}

function distanceWhileCondition(limit: number): WhileCondition {
  return currentIndex => currentIndex < limit;
}

function calcDistance(matrix: SpiralMatrix) {
  return (
    Math.abs(matrix.centerX - matrix.latestValueX) +
    Math.abs(matrix.centerY - matrix.latestValueY)
  );
}

function spiralFirstLargerValue(limit: number) {
  const matrix = buildSprialMatrix(
    limit,
    fillWithSum,
    largestValueWhileCondition(limit)
  );
  return matrix.get(matrix.latestValueX, matrix.latestValueY);
}

function largestValueWhileCondition(limit: number): WhileCondition {
  return (_currentIndex: number, latestValue: number) => latestValue <= limit;
}

function fillWithSum(
  _: number,
  x: number,
  y: number,
  matrix: SpiralMatrix
): number {
  const adjacentIndices = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1]
  ];

  return sum(
    adjacentIndices
      .filter(point => matrix.filled(point[0], point[1]))
      .map(point => matrix.get(point[0], point[1]))
  );
}

function buildSprialMatrix(
  limit: number,
  fillFun: FillFunction,
  whileCondition: WhileCondition
): SpiralMatrix {
  const matrixWidth = Math.ceil(Math.sqrt(limit));

  let x = Math.floor(matrixWidth / 2);
  let y = Math.floor(matrixWidth / 2);
  let nextDirection = Direction.Right;

  const matrix = new SpiralMatrix(x, y);

  matrix.set(x, y, 1);

  for (
    let currentIndex = 1;
    whileCondition(currentIndex, matrix.get(x, y));
    currentIndex++
  ) {
    switch (nextDirection) {
      case Direction.Right:
        x += 1;
        if (!matrix.filled(x, y - 1)) nextDirection = Direction.Up;
        break;
      case Direction.Up:
        y -= 1;
        if (!matrix.filled(x - 1, y)) nextDirection = Direction.Left;
        break;
      case Direction.Left:
        x -= 1;
        if (!matrix.filled(x, y + 1)) nextDirection = Direction.Down;
        break;
      case Direction.Down:
        y += 1;
        if (!matrix.filled(x + 1, y)) nextDirection = Direction.Right;
        break;
    }
    matrix.set(x, y, fillFun(currentIndex, x, y, matrix));
  }

  return matrix;
}

day3();
