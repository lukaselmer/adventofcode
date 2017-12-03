import { SpiralMatrix } from "./spiral-matrix";
import { sum } from "../utils";
import { Point } from "./point";

const enum Direction {
  Right,
  Up,
  Left,
  Down
}

type WhileCondition = (currentIndex: number, latestValue: number) => boolean;

type FillFunction = (
  currentIndex: number,
  point: Point,
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
    index => index,
    currentIndex => currentIndex < limit
  );
  return calcDistance(matrix);
}

function calcDistance(matrix: SpiralMatrix) {
  return (
    Math.abs(matrix.center.x - matrix.lastPoint.x) +
    Math.abs(matrix.center.y - matrix.lastPoint.y)
  );
}

function spiralFirstLargerValue(limit: number) {
  const matrix = buildSprialMatrix(
    limit,
    fillWithSum,
    (_: number, latestValue: number) => latestValue <= limit
  );
  return matrix.get(new Point(matrix.lastPoint.x, matrix.lastPoint.y));
}

function fillWithSum(_: number, p: Point, matrix: SpiralMatrix): number {
  const adjacentIndices = [
    p.getLeft.getUp,
    p.getLeft,
    p.getLeft.getDown,
    p.getUp,
    p.getDown,
    p.getRight.getUp,
    p.getRight,
    p.getRight.getDown
  ];

  return sum(
    adjacentIndices
      .filter(point => matrix.filled(point))
      .map(point => matrix.get(point))
  );
}

function buildSprialMatrix(
  limit: number,
  fillFun: FillFunction,
  whileCondition: WhileCondition
): SpiralMatrix {
  const matrixWidth = Math.ceil(Math.sqrt(limit));

  const p = new Point(Math.floor(matrixWidth / 2), Math.floor(matrixWidth / 2));
  let nextDirection = Direction.Right;

  const matrix = new SpiralMatrix(p);
  matrix.set(p, 1);

  for (
    let currentIndex = 1;
    whileCondition(currentIndex, matrix.get(p));
    currentIndex++
  ) {
    moveInDirection(nextDirection, p);
    nextDirection = changeDirectionIfNeeded(matrix, nextDirection, p);
    matrix.set(p, fillFun(currentIndex, p, matrix));
  }

  return matrix;
}

function moveInDirection(direction: Direction, point: Point): void {
  switch (direction) {
    case Direction.Right:
      return point.moveRight();
    case Direction.Up:
      return point.moveUp();
    case Direction.Left:
      return point.moveLeft();
    case Direction.Down:
      return point.moveDown();
  }
}

function changeDirectionIfNeeded(
  matrix: SpiralMatrix,
  direction: Direction,
  point: Point
): Direction {
  if (direction === Direction.Right && !matrix.filled(point.getUp))
    return Direction.Up;

  if (direction === Direction.Up && !matrix.filled(point.getLeft))
    return Direction.Left;

  if (direction === Direction.Left && !matrix.filled(point.getDown))
    return Direction.Down;

  if (direction === Direction.Down && !matrix.filled(point.getRight))
    return Direction.Right;

  return direction;
}

day3();
