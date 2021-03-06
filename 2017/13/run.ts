import { sum } from "../utils";
import * as fs from "fs";

class Scanner {
  private scannerPosition = 1;
  private movingUpwards = true;

  constructor(public depth: number, private range: number) {}

  tick() {
    if (this.scannerPosition <= 1) this.movingUpwards = true;
    if (this.scannerPosition === this.range) this.movingUpwards = false;

    if (this.movingUpwards) {
      this.scannerPosition++;
    } else {
      this.scannerPosition--;
    }
  }

  cost() {
    return this.depth * this.range;
  }

  isAt(position: number) {
    return position === this.scannerPosition;
  }

  hitWhenStartingAt(position: number) {
    return (position + this.depth) % this.fullTripTime() === 0;
  }

  private fullTripTime() {
    return (this.range - 1) * 2;
  }
}

class Firewall {
  severity = 0;
  scannersMap: { [index: number]: Scanner } = {};

  constructor(private scanners: Scanner[]) {
    this.scanners.forEach(
      scanner => (this.scannersMap[scanner.depth] = scanner)
    );
  }

  tick() {
    this.scanners.forEach(scanner => scanner.tick());
  }

  size() {
    return this.scanners[this.scanners.length - 1].depth;
  }

  scanAt(position: number) {
    const scanner = this.scannersMap[position];
    if (scanner && scanner.isAt(1)) {
      // console.log(`caught by ${scanner.depth} with severity ${scanner.cost()}`);
      this.severity += scanner.cost();
    }
  }
}

export function day13() {
  console.log(`Part 1: ${tripSeverity(readFirewall())}`);
  console.log(`Part 1 alternative: ${tripSeverityAlt(readScanners())}`);
  console.log(`Part 2: ${picosecondsToWait(readScanners())}`);
}

function readFirewall(): Firewall {
  return new Firewall(readScanners());
}

function readScanners(): Scanner[] {
  return fs
    .readFileSync("./13/input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(line => {
      const [depth, range] = line.split(": ").map(Number);
      return new Scanner(depth, range);
    });
}

function tripSeverity(firewall: Firewall) {
  for (
    let currentPosition = 0;
    currentPosition <= firewall.size();
    currentPosition++
  ) {
    firewall.scanAt(currentPosition);
    firewall.tick();
  }
  return firewall.severity;
}

function tripSeverityAlt(scanners: Scanner[]) {
  return sum(
    scanners
      .filter(scanner => scanner.hitWhenStartingAt(0))
      .map(scanner => scanner.cost())
  );
}

function picosecondsToWait(scanners: Scanner[]) {
  let waitFor = 0;
  while (getsCaught(scanners, waitFor)) waitFor++;
  return waitFor;
}

function getsCaught(scanners: Scanner[], waitFor = 0) {
  return scanners.some(scanner => scanner.hitWhenStartingAt(waitFor));
}

// This is a simulation which may work (?), but takes too long to finish (?)
// function picosecondsToWaitSimulation(firewall: Firewall) {
//   let waitFor = 0;
//   while (tripSeverity(firewall, waitFor) !== 0) waitFor++;
//   return waitFor;
// }
// firewall.reset();
// for (let i = 0; i < waitFor; i++) firewall.tick();

day13();
