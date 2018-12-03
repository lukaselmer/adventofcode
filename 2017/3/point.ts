import { Direction } from "./direction";

export class Point {
  constructor(public x: number, public y: number) {}

  get getUp() {
    return new Point(this.x, this.y - 1);
  }
  get getLeft() {
    return new Point(this.x - 1, this.y);
  }
  get getDown() {
    return new Point(this.x, this.y + 1);
  }
  get getRight() {
    return new Point(this.x + 1, this.y);
  }

  moveRight() {
    this.x += 1;
  }
  moveUp() {
    this.y -= 1;
  }
  moveLeft() {
    this.x -= 1;
  }
  moveDown() {
    this.y += 1;
  }
  moveInDirection(direction: Direction) {
    switch (direction) {
      case Direction.Right:
        return this.moveRight();
      case Direction.Up:
        return this.moveUp();
      case Direction.Left:
        return this.moveLeft();
      case Direction.Down:
        return this.moveDown();
      default:
        throw new Error(`Invalid direction ${direction}`);
    }
  }
}
