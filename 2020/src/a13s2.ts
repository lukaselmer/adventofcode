import { input13, input13Example } from './inputs'
import { truthy } from './shared/array'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(input: string) {
  const busPositions = input
    .split(',')
    .map((busId, offset) => (busId === 'x' ? undefined : { busId: parseInt10(busId), offset }))
    .filter(truthy)

  let minCycle = 1
  let currentPosition = 0

  for (const { busId, offset } of busPositions) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      currentPosition += minCycle
      if ((currentPosition + offset) % busId === 0) {
        minCycle *= busId
        break
      }
    }
  }

  return currentPosition
}

assertEquals(main('67,7,59,61'), 754018)
assertEquals(main(input13Example[1]), 1068781)
assertEquals(main('67,x,7,59,61'), 779210)
assertEquals(main('67,7,x,59,61'), 1261476)
assertEquals(main('1789,37,47,1889'), 1202161486)
console.log(main(input13[1]))
