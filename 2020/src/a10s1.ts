import { sortBy } from 'lodash'
import { input10, input10Example1, input10Example2 } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(input: string) {
  const numbers = sortBy(input.split('\n').map(parseInt10))
  numbers.unshift(0)
  numbers.push(numbers[numbers.length - 1] + 3)

  let ones = 0
  let threes = 0
  numbers.forEach((number, index) => {
    if (index === 0) return
    const diff = number - numbers[index - 1]
    if (diff === 1) ones++
    if (diff === 3) threes++
  })

  return ones * threes
}

assertEquals(main(input10Example1), 7 * 5)
assertEquals(main(input10Example2), 22 * 10)
console.log(main(input10))
