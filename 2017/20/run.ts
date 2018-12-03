import * as fs from "fs";

export function run() {
  console.log(`Part 1: ${read("input").part1()}`);
  console.log(`Part 2: ${read("input").part2()}`);
}

function read(filename: string) {
  return new Solution(
    fs
      .readFileSync(`./20/${filename}.txt`)
      .toString()
      .replace(/\r/gm, "")
      .trim()
      .split("\n")
  );
}

class Solution {
  particles: Particle[];

  constructor(input: string[]) {
    this.particles = input.map(line => {
      const [ps, vs, as] = line.split("|");
      const p = new Vector(ps.split(",").map(Number));
      const v = new Vector(vs.split(",").map(Number));
      const a = new Vector(as.split(",").map(Number));
      return new Particle(p, v, a);
    });
  }

  part2() {
    for (let i = 0; i < 10000; ++i) {
      const potentialCollisions: { [distance: number]: number[] } = {};
      this.particles.forEach((particle, index) => {
        if (!potentialCollisions[particle.distance()])
          potentialCollisions[particle.distance()] = [];
        potentialCollisions[particle.distance()].push(index);
      });
      Object.keys(potentialCollisions).forEach((key: any) => {
        const indices = potentialCollisions[key];
        if (indices.length === 1) return;
        this.flagIfCollision(indices);
      });
      this.particles = this.particles.filter(p => p.alive);
      this.particles.forEach(particle => particle.update());
    }
    return this.particles.length;
  }

  flagIfCollision(indices: number[]) {
    indices.forEach(outer => {
      indices.forEach(inner => {
        if (outer === inner) return;
        if (this.particles[outer].atSamePositionAs(this.particles[inner])) {
          this.particles[outer].alive = false;
          this.particles[inner].alive = false;
        }
      });
    });
  }

  part1() {
    const z = this.particles.map(
      p => Math.abs(p.a.a) + Math.abs(p.a.b) + Math.abs(p.a.c)
    );
    const min = Math.min(...z);
    return z.findIndex(p => p === min);
  }
}

class Vector {
  a = 0;
  b = 0;
  c = 0;

  constructor(arr: number[]) {
    this.a = arr[0];
    this.b = arr[1];
    this.c = arr[2];
  }
}

class Particle {
  alive = true;

  constructor(public p: Vector, public v: Vector, public a: Vector) {}

  update() {
    this.v.a += this.a.a;
    this.v.b += this.a.b;
    this.v.c += this.a.c;
    this.p.a += this.v.a;
    this.p.b += this.v.b;
    this.p.c += this.v.c;
  }

  distance() {
    return (
      Math.abs(0 - this.p.a) + Math.abs(0 - this.p.b) + Math.abs(0 - this.p.c)
    );
  }

  atSamePositionAs(other: Particle) {
    return (
      this.p.a === other.p.a && this.p.b === other.p.b && this.p.c === other.p.c
    );
  }
}

run();
