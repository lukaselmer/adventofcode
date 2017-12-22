export const enum Direction {
  Right = "right",
  Up = "up",
  Left = "left",
  Down = "down"
}

export function turnAround(direction: Direction) {
  return turnRight(turnRight(direction));
}

export function turnRight(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      return Direction.Right;
    case Direction.Right:
      return Direction.Down;
    case Direction.Down:
      return Direction.Left;
    case Direction.Left:
      return Direction.Up;
  }
}

export function turnLeft(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      return Direction.Left;
    case Direction.Left:
      return Direction.Down;
    case Direction.Down:
      return Direction.Right;
    case Direction.Right:
      return Direction.Up;
  }
}
