import { assertEquals } from './shared/testing'

import { input5 } from './inputs'

function main(input: string) {
  console.log(Math.max(...input.split('\n').map(seatId)))
}

function seatId(row: string) {
  const binary = row.replace(/F|L/g, '0').replace(/B|R/g, '1')
  return parseInt(binary, 2)
}

assertEquals(seatId('BFFFBBFRRR'), 567)
assertEquals(seatId('FFFBBBFRRR'), 119)
assertEquals(seatId('BBFFBBFRLL'), 820)

main(input5)
