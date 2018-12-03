import { sum } from "../utils";

export type Direction = "n" | "nw" | "ne" | "sw" | "s" | "se";

export class Path {
  private stepCounts: { [direction: string]: number };

  constructor(private exactPath: Direction[]) {
    this.stepCounts = this.exactPath.reduce(
      (stepCounts, current) => {
        if (!stepCounts[current]) stepCounts[current] = 0;
        stepCounts[current] += 1;
        return stepCounts;
      },
      {} as { [step: string]: number }
    );
    this.simplifyStepCounts();
  }

  private simplifyStepCounts(): any {
    let lastDistance: number;
    do {
      lastDistance = this.distance;
      this.cancelPair("n", "s");
      this.cancelPair("ne", "sw");
      this.cancelPair("nw", "se");
      // clockwise
      this.simplifyTriangle("ne", "s", "se");
      this.simplifyTriangle("se", "sw", "s");
      this.simplifyTriangle("s", "nw", "sw");
      this.simplifyTriangle("sw", "n", "nw");
      this.simplifyTriangle("nw", "ne", "n");
      this.simplifyTriangle("n", "se", "ne");
      // counterclockwise
      this.simplifyTriangle("n", "sw", "nw");
      this.simplifyTriangle("nw", "s", "sw");
      this.simplifyTriangle("sw", "se", "s");
      this.simplifyTriangle("s", "ne", "se");
      this.simplifyTriangle("se", "n", "ne");
      this.simplifyTriangle("ne", "nw", "n");
    } while (lastDistance > this.distance);
  }

  private cancelPair(direction: Direction, opposite: Direction) {
    if (!this.stepCounts[direction] || !this.stepCounts[opposite]) return;

    if (this.stepCounts[direction] < this.stepCounts[opposite]) {
      this.stepCounts[opposite] -= this.stepCounts[direction];
      this.stepCounts[direction] = 0;
    } else {
      this.stepCounts[direction] -= this.stepCounts[opposite];
      this.stepCounts[opposite] = 0;
    }
  }

  private simplifyTriangle(
    stepA: Direction,
    stepB: Direction,
    simplifiedDirection: Direction
  ) {
    if (!this.stepCounts[stepA] || !this.stepCounts[stepB]) return;

    if (!this.stepCounts[simplifiedDirection])
      this.stepCounts[simplifiedDirection] = 0;

    const simplifiedMoves = Math.min(
      this.stepCounts[stepA],
      this.stepCounts[stepB]
    );
    this.stepCounts[simplifiedDirection] += simplifiedMoves;
    this.stepCounts[stepA] -= simplifiedMoves;
    this.stepCounts[stepB] -= simplifiedMoves;
  }

  get distance(): number {
    return sum(
      Object.keys(this.stepCounts).map(direction => this.stepCounts[direction])
    );
  }
}
