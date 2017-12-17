import { knotHash } from "../10/knot-hash";
import { sum } from "../utils";

export function day14() {
  console.log(`Example: ${usedSpaces("flqrgnkx")}`);
  console.log(`Part 1: ${usedSpaces("wenycdww")}`);
}

function usedSpaces(input: string) {
  const zeroTo127 = Array.from(Array(128).keys());
  return sum(
    zeroTo127.map(num => knotHash(`${input}-${num}`)).map(countStringBits)
  );
}

function countStringBits(hash: string) {
  return sum(hash.split("").map(countBits));
}

function countBits(char: string) {
  return sum(
    parseInt(char, 16)
      .toString(2)
      .split("")
      .filter(bit => bit === "1")
      .map(Number)
  );
}

day14();
