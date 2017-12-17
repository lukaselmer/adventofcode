import { knotHash } from "../10/knot-hash";
import { sum, flatten } from "../utils";

export function day14() {
  console.log(`Example part 1: ${usedSpaces("flqrgnkx")}`);
  console.log(`Part 1: ${usedSpaces("wenycdww")}`);
  console.log(`Example part 2: ${connectedRegions("flqrgnkx")}`);
  console.log(`Part 2: ${connectedRegions("wenycdww")}`);
}

function usedSpaces(input: string) {
  return sum(
    zeroTo127()
      .map(num => knotHash(`${input}-${num}`))
      .map(countStringBits)
  );
}

function zeroTo127() {
  return Array.from(Array(128).keys());
}

function countStringBits(hash: string) {
  return sum(convertToBitmask(hash).map(sum));
}

function connectedRegions(input: string) {
  const regions = zeroTo127()
    .map(num => knotHash(`${input}-${num}`))
    .map(convertToBitmask)
    .map(flatten);
  visualize(regions, 8, 8);
  const visited = regions.map(row => row.map(() => false));
  regions.forEach((row, x) =>
    row.forEach((_, y) => reduceRegion(regions, visited, x, y))
  );
  console.log("reduced");
  visualize(regions, 8, 8);
  return sum(regions.map(sum));
}

function convertToBitmask(hash: string) {
  return hash.split("").map(toBits);
}

function toBits(char: string) {
  const bits = parseInt(char, 16)
    .toString(2)
    .split("")
    .map(Number);
  while (bits.length !== 4) bits.unshift(0);
  return bits;
}

function reduceRegion(
  regions: number[][],
  visited: boolean[][],
  x: number,
  y: number
) {
  if (visited[x] && visited[x][y]) return;
  if (!regions[x] || !regions[x][y]) return;
  reduceRegionRec(regions, visited, x, y);
  regions[x][y] = 1;
}

function reduceRegionRec(
  regions: number[][],
  visited: boolean[][],
  x: number,
  y: number
) {
  if (visited[x] && visited[x][y]) return;

  visited[x][y] = true;

  if (!regions[x] || !regions[x][y]) return;

  setToZero(regions, visited, x + 1, y);
  setToZero(regions, visited, x - 1, y);
  setToZero(regions, visited, x, y + 1);
  setToZero(regions, visited, x, y - 1);
}

function setToZero(
  regions: number[][],
  visited: boolean[][],
  x: number,
  y: number
) {
  if (regions[x] && regions[x][y]) {
    reduceRegionRec(regions, visited, x, y);
    regions[x][y] = 0;
  }
}

function visualize(regions: number[][], numRows: number, numColumns: number) {
  regions.slice(0, numRows).forEach(row =>
    console.log(
      row
        .slice(0, numColumns)
        .map(num => (num ? "#" : "."))
        .join("")
    )
  );
}

day14();
