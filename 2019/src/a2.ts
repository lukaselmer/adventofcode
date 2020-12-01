import { times } from 'lodash'
import { input2Examples, input2Star1 } from './inputs'

function main(input: string, positionsToReplace: [number, number]) {
  console.log(calculate(input, positionsToReplace))
}

function calculate(input: string, positionsToReplace: [number, number]) {
  const codes = input.split(',').map((el) => parseInt(el, 10))
  codes.push(99)

  codes[1] = positionsToReplace[0]
  codes[2] = positionsToReplace[1]
  let currentPosition = 0

  while (codes[currentPosition] !== 99) {
    const currentCode = codes[currentPosition]

    if (currentCode === 1) {
      codes[codes[currentPosition + 3]] =
        codes[codes[currentPosition + 1]] + codes[codes[currentPosition + 2]]
    } else if (currentCode === 2) {
      codes[codes[currentPosition + 3]] =
        codes[codes[currentPosition + 1]] * codes[codes[currentPosition + 2]]
    }
    currentPosition += 4
  }

  return codes[0]
}

function combinations(list: number[]): [number, number][] {
  return list.flatMap((outer) => list.map((inner) => [outer, inner] as [number, number]))
}

main(input2Examples[0], [9, 10])
main(input2Examples[1], [0, 0])
main(input2Examples[2], [3, 0])
main(input2Examples[3], [4, 4])
main(input2Examples[4], [1, 1])

combinations(times(100)).filter((combination) => {
  const isChosenOne = calculate(input2Star1, combination) === 19690720
  if (isChosenOne) console.log(100 * combination[0] + combination[1])
  return isChosenOne
})
