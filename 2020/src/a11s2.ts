import { input11, input11Example } from './inputs'
import { assertEquals } from './shared/testing'
import { equalArrayOfArray } from './shared/array'

function main(input: string) {
  let seats = parseSeats(input)
  let previousSeats = [...seats]
  seats = updateSeats(previousSeats)
  while (!equalArrayOfArray(previousSeats, seats)) {
    previousSeats = [...seats]
    seats = updateSeats(previousSeats)
  }
  return seats.flatMap((row) => row).filter((seat) => seat === '#').length
}

function parseSeats(input: string) {
  return input.split('\n').map((row) => row.split('').map(toSeat))
}

function toSeat(seat: string): Seat {
  if (seat === 'L' || seat === '.' || seat === '#') return seat
  throw new Error(`Invalid seat ${seat} (${typeof seat})`)
}

function updateSeats(previousSeats: Seat[][]): Seat[][] {
  return previousSeats.map((row, x) => row.map((_, y) => calculateSeatState(previousSeats, x, y)))
}

function calculateSeatState(seats: Seat[][], x: number, y: number) {
  const currentSeat = seats[x][y]
  const surroundingOccupiedCount = countSurroundingOccupiedSeats(seats, x, y)

  if (currentSeat === '.') return '.'
  if (currentSeat === 'L' && surroundingOccupiedCount === 0) return '#'
  if (currentSeat === '#' && surroundingOccupiedCount >= 5) return 'L'
  return currentSeat
}

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

function countSurroundingOccupiedSeats(seats: Seat[][], x: number, y: number) {
  return surroundingCoords
    .map(([baseOffsetX, baseOffsetY]) => {
      let [offsetX, offsetY] = [baseOffsetX, baseOffsetY]
      while (
        !outOfBounds(seats, x + offsetX, y + offsetY) &&
        seatState(seats, x + offsetX, y + offsetY) === '.'
      ) {
        offsetX += baseOffsetX
        offsetY += baseOffsetY
      }
      return seatState(seats, x + offsetX, y + offsetY)
    })
    .filter((seat) => seat === '#').length
}

function seatState(seats: Seat[][], x: number, y: number) {
  const seat = seats[x]?.[y]
  return seat === '#' || seat === 'L' ? seat : '.'
}

function outOfBounds(seats: Seat[][], x: number, y: number) {
  return x < 0 || y < 0 || x >= seats.length || y >= seats[x].length
}

type Seat = 'L' | '.' | '#'

const countSurroundingTestCases = [
  {
    seats: `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`,
    x: 4,
    y: 3,
    count: 8,
  },

  {
    seats: `.............
.L.L.#.#.#.#.
.............`,
    x: 1,
    y: 3,
    count: 1,
  },

  {
    seats: `.............
.L.L.#.#.#.#.
.............`,
    x: 1,
    y: 1,
    count: 0,
  },

  {
    seats: `.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`,
    x: 3,
    y: 3,
    count: 0,
  },
]

countSurroundingTestCases.forEach(({ seats, x, y, count }) =>
  assertEquals(countSurroundingOccupiedSeats(parseSeats(seats), x, y), count)
)

assertEquals(main(input11Example), 26)
console.log(main(input11))
