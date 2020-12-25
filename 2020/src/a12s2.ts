import { input12, input12Example } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(input: string) {
  const instructions = input.split('\n').map(parseInstruction)
  const state: State = { ship: { x: 0, y: 0 }, waypoint: { x: 10, y: 1 } }
  instructions.forEach((instruction) => process(instruction, state))
  return Math.abs(state.ship.x) + Math.abs(state.ship.y)
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
  if (instruction.type === 'F') {
    state.ship.x += state.waypoint.x * instruction.value
    state.ship.y += state.waypoint.y * instruction.value
  } else if (instruction.type === 'E') moveWaypoint(state, { x: instruction.value, y: 0 })
  else if (instruction.type === 'W') moveWaypoint(state, { x: -instruction.value, y: 0 })
  else if (instruction.type === 'N') moveWaypoint(state, { x: 0, y: instruction.value })
  else if (instruction.type === 'S') moveWaypoint(state, { x: 0, y: -instruction.value })
  else if (instruction.type === 'R') state.waypoint = rotate(instruction.value, state.waypoint)
}

function rotate(value: number, point: Point): Point {
  return value === 0 ? point : rotate(value - 90, { x: point.y, y: -point.x })
}

function moveWaypoint(state: State, movement: Point) {
  state.waypoint.x += movement.x
  state.waypoint.y += movement.y
}

interface Instruction {
  type: Direction | 'F' | 'R' // 'L'
  value: number
}

interface State {
  waypoint: Point
  ship: Point
}

interface Point {
  x: number
  y: number
}

type Direction = 'N' | 'E' | 'S' | 'W'

assertEquals(main(input12Example), 286)
console.log(main(input12))
