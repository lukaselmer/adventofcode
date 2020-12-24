import { input11, input11Example } from './inputs'
import { assertEquals } from './shared/testing'
import { equalArrayOfArray } from './shared/array'

function main(input: string) {
  let seats = input.split('\n').map((row) => row.split('').map(toSeat))
  let previousSeats: Seat[][] = []
  while (!equalArrayOfArray(previousSeats, seats)) {
    previousSeats = [...seats]
    seats = updateSeats(previousSeats)
  }
  return seats.flatMap((row) => row).filter((seat) => seat === '#').length
}

function toSeat(seat: string): Seat {
  if (seat === 'L' || seat === '.' || seat === '#') return seat
  throw new Error(`Invalid seat ${seat}`)
}

function updateSeats(previousSeats: Seat[][]): Seat[][] {
  return previousSeats.map((row, x) => row.map((_, y) => calculateSeatState(previousSeats, x, y)))
}

function calculateSeatState(seats: Seat[][], x: number, y: number) {
  const surroundingCoords = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
  const currentSeat = seats[x][y]
  const surroundingOccupiedCount = surroundingCoords
    .map(([offsetX, offsetY]) => seatState(seats, x + offsetX, y + offsetY))
    .filter((seat) => seat === '#').length

  if (currentSeat === '.') return '.'
  if (currentSeat === 'L' && surroundingOccupiedCount === 0) return '#'
  if (currentSeat === '#' && surroundingOccupiedCount >= 4) return 'L'
  return currentSeat
}

function seatState(seats: Seat[][], x: number, y: number) {
  return seats[x]?.[y] !== '#' ? 'L' : '#'
}

type Seat = 'L' | '.' | '#'

assertEquals(main(input11Example), 37)
console.log(main(input11))
