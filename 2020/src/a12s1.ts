import { input12, input12Example } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'
import { assertNever } from './shared/ts-utils'

function main(input: string) {
  const instructions = input.split('\n').map(parseInstruction)
  const state: State = { direction: 'E', coords: { x: 0, y: 0 } }
  instructions.forEach((instruction) => process(instruction, state))
  return Math.abs(state.coords.x) + Math.abs(state.coords.y)
}

function parseInstruction(rawInstruction: string): Instruction {
  const [type, ...rest] = rawInstruction.split('')
  const value = parseInt10(rest.join(''))
  if (type === 'L') return { type: 'R', value: 360 - value }
  if (type === 'N' || type === 'E' || type === 'S' || type === 'W' || type === 'F' || type === 'R')
    return { type, value }
  throw new Error(`Invalid instruction ${rawInstruction}`)
}

function process(instruction: Instruction, state: State) {
  if (instruction.type === 'F') process({ type: state.direction, value: instruction.value }, state)
  else if (instruction.type === 'E') move(state, { x: instruction.value, y: 0 })
  else if (instruction.type === 'W') move(state, { x: -instruction.value, y: 0 })
  else if (instruction.type === 'N') move(state, { x: 0, y: instruction.value })
  else if (instruction.type === 'S') move(state, { x: 0, y: -instruction.value })
  else if (instruction.type === 'R') state.direction = rotate(instruction.value, state.direction)
}

function rotate(value: number, direction: Direction): Direction {
  if (value === 0) return direction
  else if (direction === 'N') return rotate(value - 90, 'E')
  else if (direction === 'E') return rotate(value - 90, 'S')
  else if (direction === 'S') return rotate(value - 90, 'W')
  else if (direction === 'W') return rotate(value - 90, 'N')
  assertNever(direction)
}

function move(state: State, movement: Point) {
  state.coords.x += movement.x
  state.coords.y += movement.y
}

interface Instruction {
  type: Direction | 'F' | 'R' // 'L'
  value: number
}

interface State {
  direction: Direction
  coords: Point
}

interface Point {
  x: number
  y: number
}

type Direction = 'N' | 'E' | 'S' | 'W'

assertEquals(main(input12Example), 25)
console.log(main(input12))
