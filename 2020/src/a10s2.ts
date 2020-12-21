import { sortBy } from 'lodash'
import { input10, input10Example1, input10Example2 } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(input: string) {
  const numbers = sortBy(input.split('\n').map(parseInt10))
  numbers.unshift(0)
  numbers.push(numbers[numbers.length - 1] + 3)

  const groups: number[] = []
  let currentGroup = 1
  numbers.forEach((number, index) => {
    if (index === 0) return
    const diff = number - numbers[index - 1]
    if (diff === 1) currentGroup++
    if (diff === 3) {
      if (currentGroup > 2) groups.push(currentGroup - 3)
      currentGroup = 1
    }
  })

  const numChoices = groups.map((group) => [2, 4, 7][group])
  return numChoices.reduce((total, current) => total * current, 1)
}

assertEquals(main(input10Example1), 8)
assertEquals(main(input10Example2), 19208)
console.log(main(input10))
