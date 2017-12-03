import { Point } from "./point";
export class SpiralMatrix {
  private values: number[][] = [];
  latestValue: Point;

  constructor(public center: Point) {
    this.latestValue = center;
  }

  set(point: Point, value: number) {
    if (!this.values[point.x]) this.values[point.x] = [];
    this.values[point.x][point.y] = value;
    this.latestValue = point;
  }

  filled(point: Point): boolean {
    if (!this.values[point.x]) return false;
    return !!this.values[point.x][point.y];
  }

  get(point: Point) {
    if (!this.values[point.x])
      throw new Error(
        `"Null Pointer" exception for x=${point.x} and y=${point.y}`
      );

    return this.values[point.x][point.y];
  }
}
