import { input1, input1Example } from './inputs'

export function main(input: string) {
  const n = input.split('\n').map((el) => parseInt(el, 10))
  for (const a of n) for (const b of n) for (const c of n) if (a + b + c === 2020) return a * b * c
}

console.log(main(input1Example))
console.log(main(input1))
