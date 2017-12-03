export class SpiralMatrix {
  private values: number[][] = [];
  latestValueX: number;
  latestValueY: number;

  constructor(public centerX: number, public centerY: number) {
    this.latestValueX = centerX;
    this.latestValueY = centerY;
  }

  set(x: number, y: number, value: number) {
    if (!this.values[x]) this.values[x] = [];
    this.values[x][y] = value;
    this.latestValueX = x;
    this.latestValueY = y;
  }

  filled(x: number, y: number): boolean {
    if (!this.values[x]) return false;
    return !!this.values[x][y];
  }

  get(x: number, y: number) {
    if (!this.values[x])
      throw new Error(`"Null Pointer" exception for x=${x} and y=${y}`);

    return this.values[x][y];
  }
}
