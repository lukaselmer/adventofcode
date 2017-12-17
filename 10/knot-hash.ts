import { HashState } from "./hash-state";

export function knotHash(input: string) {
  return fullKnotHash(input, generateNumbers());
}

export function generateNumbers() {
  return [...Array(256).keys()];
}

export function singleKnotHash(input: number[], state: number[]) {
  const hashState = new HashState(state);
  input.forEach(num => hashState.mutate(num));
  return hashState;
}

function fullKnotHash(input: string, state: number[]) {
  const magic = [17, 31, 73, 47, 23];
  const convertedSequence = input
    .split("")
    .map(convertFromAscii)
    .concat(magic);

  const hashState = new HashState(state);
  for (let i = 0; i < 64; i++)
    convertedSequence.forEach(num => hashState.mutate(num));

  return denseHash(state);
}

function convertFromAscii(char: string) {
  return char.charCodeAt(0);
}

function denseHash(state: number[]) {
  const chunks = inChunksOf(state, 16);
  return chunks
    .map(xor)
    .map(toHex)
    .join("");
}

function inChunksOf(state: number[], chunkSize: number) {
  const stateCopy = state.slice(0);
  const results = [];
  while (stateCopy.length > 0) results.push(stateCopy.splice(0, chunkSize));
  return results;
}

function xor(block: number[]): number {
  return block.reduce((result, num) => result ^ num, 0);
}

function toHex(num: number): string {
  const hex = num.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
