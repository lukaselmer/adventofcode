import { sum } from 'lodash'
import { input14, input14Example } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(input: string) {
  const lines: (Mem | Mask)[] = input.split('\n').map(parseLine)
  const memory = new Map<number, number>()
  const state: State = { memory, mask: { type: 'mask', mask: [] } }
  lines.forEach((line) => processLine(line, state))
  return sum([...memory.values()])
}

function parseLine(line: string) {
  if (line.startsWith('mask')) return parseMask(line)
  if (line.startsWith('mem')) return parseMem(line)
  throw new Error(`Unexpected line ${line}`)
}

function parseMask(line: string) {
  const maskDigits = line.replace('mask = ', '').split('')
  return {
    type: 'mask' as const,
    mask: maskDigits.map((value) => (value === 'X' ? ('X' as const) : value === '1' ? 1 : 0)).reverse(),
  }
}

function parseMem(line: string) {
  const [address, value] = line.replace('mem[', '').split('] = ').map(parseInt10)
  return { type: 'mem' as const, address, value }
}

function processLine(line: Mem | Mask, state: State) {
  if (line.type === 'mask') {
    return (state.mask = line)
  }

  const { mask, memory } = state
  const binaryValue = toBinary(line.value)
  const maskedBinary = applyMask(mask, binaryValue)
  memory.set(line.address, toNumber(maskedBinary))
}

function toBinary(value: number): (0 | 1)[] {
  return value
    .toString(2)
    .split('')
    .map((digit) => (digit === '1' ? 1 : 0))
    .reverse()
}

function toNumber(value: (0 | 1)[]): number {
  return value.reduce<number>(
    (total, current, currentIndex) => (total += current === 1 ? 2 ** currentIndex : 0),
    0
  )
}

function applyMask(mask: Mask, binary: (0 | 1)[]): (0 | 1)[] {
  const newBinary = [...binary]
  mask.mask.forEach((value, index) => {
    if (value !== 'X') newBinary[index] = value
  })
  return newBinary
}

interface State {
  memory: Map<number, number>
  mask: Mask
}
type Mask = ReturnType<typeof parseMask>
type Mem = ReturnType<typeof parseMem>

assertEquals(main(input14Example), 165)
console.log(main(input14))
