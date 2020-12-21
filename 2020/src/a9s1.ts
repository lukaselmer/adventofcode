/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { input9, input9Example } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(input: string, windowSize: number) {
  const numbers = input.split('\n').map(parseInt10)
  const window: number[] = []
  while (window.length < windowSize) window.push(numbers.shift()!)

  while (numbers.length > 0) {
    const nextNumber = numbers.shift()!
    if (!isSum(window, nextNumber)) return nextNumber

    window.shift()
    window.push(nextNumber)
  }

  return -1
}

function isSum(window: number[], candidate: number) {
  const composites = new Set(window)
  const found = window.find((num) => composites.has(candidate - num) && candidate !== num * 2)
  return found || window.filter((el) => el === candidate / 2).length > 1
}

assertEquals(main(input9Example, 5), 127)
console.log(main(input9, 25))
