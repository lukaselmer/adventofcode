import { input8, input8Example } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'
import { assertNever } from './shared/ts-utils'

function main(input: string) {
  const ops = input.split('\n').map(parseOp)
  const state = { accumulator: 0, instructionPointer: 0 }

  const visited = new Set<number>()
  while (!visited.has(state.instructionPointer)) {
    const { name, value } = ops[state.instructionPointer]

    visited.add(state.instructionPointer)

    if (name === 'nop') state.instructionPointer++
    else if (name === 'acc') {
      state.accumulator += value
      state.instructionPointer++
    } else if (name === 'jmp') state.instructionPointer += value
    else assertNever(name)
  }

  return state.accumulator
}

function parseOp(op: string): Op {
  const [name, valueStr] = op.split(' ')
  const value = parseInt10(valueStr)

  if (name === 'acc' || name === 'jmp' || name === 'nop') return { name, value }

  throw new Error(`Invalid op ${op}`)
}

interface Op {
  name: 'acc' | 'jmp' | 'nop'
  value: number
}

assertEquals(main(input8Example), 5)
console.log(main(input8))
