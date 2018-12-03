import * as fs from "fs";

export function run() {
  console.log(
    `Example part 1: ${new BridgeBuilder(
      readParts("example")
    ).findStrongestBridge()}`
  );
  console.log(
    `Part 1: ${new BridgeBuilder(readParts("input")).findStrongestBridge()}`
  );
  console.log(
    `Example part 2: ${new BridgeBuilder(
      readParts("example")
    ).findLongestBridge()}`
  );
  console.log(
    `Part 2: ${new BridgeBuilder(readParts("input")).findLongestBridge()}`
  );
}

let currentID = 1;

function generateID() {
  return currentID++;
}

function readParts(filename: string) {
  return new Parts(
    fs
      .readFileSync(`./24/${filename}.txt`)
      .toString()
      .replace(/\r/gm, "")
      .trim()
      .split("\n")
      .map(convertToPart)
  );
}

function convertToPart(line: string) {
  const [a, b] = line.split("/").map(Number);
  return new Part(generateID(), a, b, a + b);
}

class Parts {
  constructor(public parts: Part[]) {}

  forEach(callbackfn: (value: Part, index: number, array: Part[]) => void) {
    this.parts.forEach(callbackfn);
  }

  combine(a: Part, b: Part) {
    if (a.a === b.a) this.combineExactly(a, b, a.b, b.b);
    if (a.a === b.b) this.combineExactly(a, b, a.b, b.a);
    if (a.b === b.a) this.combineExactly(a, b, a.a, b.b);
    if (a.b === b.b) this.combineExactly(a, b, a.a, b.a);
  }

  combineExactly(a: Part, b: Part, portA: number, portB: number) {
    this.parts.push(
      new Part(generateID(), portA, portB, a.strength + b.strength)
    );
    a.markUsed();
    b.markUsed();
  }

  removeUsed() {
    const newParts = this.parts.filter(part => !part.used);
    const removedCount = this.parts.length - newParts.length;
    this.parts = this.parts.filter(part => !part.used);
    return removedCount;
  }

  get remaining() {
    return this.parts.length;
  }
}

class Part {
  used = false;

  constructor(
    public id: number,
    public a: number,
    public b: number,
    public strength: number
  ) {}

  markUsed() {
    this.used = true;
  }
}

class Bridge {
  usedParts: { [partId: number]: boolean } = {};
  currentConnector = 0;
  strength = 0;

  canAppend(part: Part) {
    if (this.usedParts[part.id]) return false;
    if (part.used) return false;
    return this.currentConnector === part.a || this.currentConnector === part.b;
  }

  append(part: Part) {
    if (this.usedParts[part.id] || part.used)
      throw new Error("Part already in use");
    this.usedParts[part.id] = true;
    this.currentConnector = this.currentConnector === part.a ? part.b : part.a;
    this.strength += part.strength;
  }

  clone() {
    const clone = new Bridge();
    clone.currentConnector = this.currentConnector;
    clone.strength = this.strength;
    Object.keys(this.usedParts).forEach(k => {
      clone.usedParts[k as any] = this.usedParts[k as any];
    });
    return clone;
  }

  get length() {
    return Object.keys(this.usedParts).length;
  }
}

class BridgeBuilder {
  constructor(public parts: Parts) {}

  findStrongestBridge() {
    const strongest = this.findBridgeRec(
      new Bridge(),
      this.parts.parts,
      (best, current) => (best.strength >= current.strength ? best : current)
    );
    return strongest.strength;
  }

  findLongestBridge() {
    const strongest = this.findBridgeRec(
      new Bridge(),
      this.parts.parts,
      (best, current) => {
        if (best.length > current.length) return best;
        if (best.length < current.length) return current;
        return best.strength >= current.strength ? best : current;
      }
    );
    return strongest.strength;
  }

  private findBridgeRec(
    bridge: Bridge,
    parts: Part[],
    reduceFn: (previousValue: Bridge, currentValue: Bridge) => Bridge
  ): Bridge {
    const partCandidates = parts.filter(part => bridge.canAppend(part));
    const bridges = partCandidates.map(part => {
      const clone = bridge.clone();
      clone.append(part);
      return this.findBridgeRec(clone, parts.filter(p => p !== part), reduceFn);
    });
    return bridges.reduce(reduceFn, bridge);
  }
}

run();
