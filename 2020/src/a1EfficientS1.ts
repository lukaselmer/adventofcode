import { input1, input1Example } from './inputs'
import { toSet } from './shared/input-helper'

export function main(input: string) {
  return a1s1(toSet(input))
}

export function a1s1(numbers: Set<number>) {
  for (const a of numbers) if (numbers.has(2020 - a)) return a * (2020 - a)
}

console.log(main(input1Example))
console.log(main(input1))
