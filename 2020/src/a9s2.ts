import { input9, input9Example } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(input: string, sum: number) {
  const numbers = input.split('\n').map(parseInt10)
  const end = findEnd(numbers, sum)
  const start = findStart(numbers, sum, end)
  const range = numbers.slice(numbers.indexOf(start), numbers.indexOf(end))
  return Math.min(...range) + Math.max(...range)
}

function findEnd(numbers: number[], sum: number) {
  const candidates: number[] = []

  for (const potentialEnd of numbers) {
    for (let index = 0; index < candidates.length; index++) candidates[index] += potentialEnd
    while (candidates.length > 0 && candidates[0] > sum) candidates.shift()
    if (candidates.some((candidate) => candidate === sum)) return potentialEnd
    candidates.push(potentialEnd)
  }

  throw new Error('End not found')
}

function findStart(numbers: number[], sum: number, end: number) {
  const endIndex = numbers.indexOf(end)

  for (let index = endIndex; index >= 0; index--) {
    sum -= numbers[index]
    if (sum === 0) return numbers[index]
  }

  throw new Error('Start not found')
}

assertEquals(main(input9Example, 127), 62)
console.log(main(input9, 14144619))
