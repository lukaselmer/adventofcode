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
}
