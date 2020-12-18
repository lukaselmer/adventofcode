import { input5 } from './inputs'
import { generateNumbers } from './shared/number'

function main(input: string) {
  const seats = new Set(input.split('\n').map(seatId))

  for (const id of generateNumbers(1)) {
    if (!seats.has(id) && seats.has(id - 1) && seats.has(id + 1)) return console.log(id)
  }
}

function seatId(row: string) {
  const binary = row.replace(/F|L/g, '0').replace(/B|R/g, '1')
  return parseInt(binary, 2)
}

main(input5)
