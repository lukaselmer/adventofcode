import { input13, input13Example } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(startTime: number, input: string) {
  const busIds = input
    .split(',')
    .filter((value) => value !== 'x')
    .map(parseInt10)
  const { earliestDeparture, busId } = calculateEarliestDeparture(startTime, busIds)
  const waitTime = earliestDeparture - startTime
  return busId * waitTime
}

function calculateEarliestDeparture(startTime: number, busIds: number[]) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const busId = busIds.find((id) => startTime % id === 0)
    if (busId) return { earliestDeparture: startTime, busId }
    startTime++
  }
}

assertEquals(main(...input13Example), 295)
console.log(main(...input13))
