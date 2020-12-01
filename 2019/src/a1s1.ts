import { input1 } from './inputs'

export function main() {
  console.log(
    input1
      .split('\n')
      .map((el) => parseInt(el, 10))
      .map(calcSingleFuelRequirements)
      .reduce((sum, current) => sum + current, 0)
  )
}

export function calcSingleFuelRequirements(number: number): number {
  return Math.floor(number / 3) - 2
}

main()
