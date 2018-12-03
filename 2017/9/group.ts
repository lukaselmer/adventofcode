import { sum } from "../utils";

export class Group {
  private children: Group[] = [];
  private garbageCount = 0;

  get count(): number {
    return 1 + sum(this.children.map(child => child.count));
  }

  get score(): number {
    return this.calcScore(0);
  }

  get garbage(): number {
    return this.garbageCount + sum(this.children.map(child => child.garbage));
  }

  private calcScore(level: number): number {
    return level + sum(this.children.map(child => child.calcScore(level + 1)));
  }

  addGroup(group: Group) {
    this.children.push(group);
  }

  addGarbage() {
    this.garbageCount++;
  }
}
