import { input8, input8Example } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'
import { assertNever } from './shared/ts-utils'

function main(input: string) {
  const corruptedOps = input.split('\n').map(parseOp)
  const allOps = [...generateOps(corruptedOps)]
  const goodOps = allOps.find((ops) => simulate(ops) !== false)
  if (!goodOps) throw new Error('good ops not found :(')
  return simulate(goodOps)
}

function* generateOps(ops: Op[]): Generator<Op[]> {
  for (const [index, op] of ops.entries()) {
    const opsCopy = [...ops]
    if (op.name === 'jmp') {
      opsCopy[index] = { name: 'nop', value: op.value }
      yield opsCopy
    } else if (op.name === 'nop') {
      opsCopy[index] = { name: 'jmp', value: op.value }
      yield opsCopy
    }
  }
}

function simulate(ops: Op[]) {
  const state = { accumulator: 0, instructionPointer: 0 }

  const visited = new Set<number>()
  while (!visited.has(state.instructionPointer)) {
    const op = ops[state.instructionPointer]
    if (!op) break

    const { name, value } = op

    visited.add(state.instructionPointer)

    if (name === 'nop') state.instructionPointer++
    else if (name === 'acc') {
      state.accumulator += value
      state.instructionPointer++
    } else if (name === 'jmp') state.instructionPointer += value
    else assertNever(name)
  }

  if (state.instructionPointer === ops.length) return state.accumulator

  return false
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

assertEquals(main(input8Example), 8)
console.log(main(input8))
