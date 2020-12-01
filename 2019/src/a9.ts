import { times } from 'lodash'
import { input2Examples, input2Star1, input5, input5Examples, input9, input9Examples } from './inputs'
import { assertEquals } from './shared/testing'
import { assertNever } from './shared/ts-utils'

function main(input: string, positionsToReplace: [number, number]) {
  console.log(run(input, { positionsToReplace }))
}

function run(
  program: string,
  options: {
    positionsToReplace?: [number, number]
    outputRegister?: number
    inputs?: number[]
    debug?: boolean
  } = {}
) {
  const { positionsToReplace, outputRegister = 0, inputs = [], debug = false } = options

  const inputCodes = program.split(',').map((el) => parseInt(el, 10))
  if (positionsToReplace) {
    inputCodes[1] = positionsToReplace[0]
    inputCodes[2] = positionsToReplace[1]
  }

  const { codes } = calculate(inputCodes.join(','), { inputs, debug })
  return codes[outputRegister]
}

function calculate(program: string, options: { inputs?: number[]; debug?: boolean } = {}) {
  const { inputs = [], debug = false } = options

  const codes = program.split(',').map((el) => parseInt(el, 10))

  let instructionPointer = 0
  let relativeBaseOffset = 0
  const outputs: number[] = []

  while (codes[instructionPointer] !== 99) {
    const instruction = parseInstruction(codes, instructionPointer)
    if (debug) {
      console.log(instruction)
      console.log(codes.slice(instructionPointer, instructionPointer + 5))
      console.log(codes.slice(0, 10).join(','))
    }

    const { p1, p2, p3 } = extractParameters(codes, relativeBaseOffset, instructionPointer, instruction)

    if (instruction.name == 'nop') {
      /* pass */
    } else if (instruction.numParams === 2 && 'operation' in instruction) {
      codes[
        (codes[instructionPointer + 3] || 0) +
          (instruction.modeP3 === 'relative' ? relativeBaseOffset : 0)
      ] = instruction.operation(p1, p2)
    } else if (instruction.name === 'input') {
      const input = inputs.shift()
      if (input === undefined) exit('No remaining inputs', codes)
      codes[
        (codes[instructionPointer + 1] || 0) +
          (instruction.modeP1 === 'relative' ? relativeBaseOffset : 0)
      ] = input
    } else if (instruction.name === 'output') {
      outputs.push(p1)
    } else if ('shouldJump' in instruction) {
      if (instruction.shouldJump(p1)) instructionPointer = p2
    } else if (instruction.name === 'setbase') {
      relativeBaseOffset += p1
    } else {
      assertNever(instruction)
    }

    if (!('shouldJump' in instruction) || !instruction.shouldJump(p1)) {
      instructionPointer += 2 + instruction.numParams
    }
  }

  return { codes, outputs }
}

type Mode = ReturnType<typeof parseInstruction>['modeP1' | 'modeP2' | 'modeP3']

function extractParameters(
  codes: number[],
  relativeBaseOffset: number,
  instructionPointer: number,
  instruction: { modeP1: Mode; modeP2: Mode; modeP3: Mode }
) {
  const code1 = codes[instructionPointer + 1] || 0
  const code2 = codes[instructionPointer + 2] || 0
  const code3 = codes[instructionPointer + 3] || 0
  const p1 = extractParameter(codes, relativeBaseOffset, instruction.modeP1, code1)
  const p2 = extractParameter(codes, relativeBaseOffset, instruction.modeP2, code2)
  const p3 = extractParameter(codes, relativeBaseOffset, instruction.modeP3, code3)
  return { p1, p2, p3 }
}

function extractParameter(
  codes: number[],
  relativeBaseOffset: number,
  mode: Mode,
  pointerOrValueOrRelative: number
) {
  if (mode === 'immediate') return pointerOrValueOrRelative
  if (mode === 'position') return codes[pointerOrValueOrRelative] || 0
  return codes[relativeBaseOffset + pointerOrValueOrRelative] || 0
}

function parseInstruction(codes: number[], currentPosition: number) {
  const code = codes[currentPosition] || 0
  const parsed = parseCodeAndModes(code)
  const { opcode } = parsed
  if (opcode === 1)
    return {
      name: 'add',
      operation: (p1: number, p2: number) => p1 + p2,
      numParams: 2,
      ...parsed,
    } as const
  if (opcode === 2)
    return {
      name: 'mul',
      operation: (p1: number, p2: number) => p1 * p2,
      numParams: 2,
      ...parsed,
    } as const
  if (opcode === 3) return { name: 'input', numParams: 0, ...parsed } as const
  if (opcode === 4) return { name: 'output', numParams: 0, ...parsed } as const
  if (opcode === 5)
    return { name: 'jmpt', shouldJump: (p1: number) => p1 !== 0, numParams: 1, ...parsed } as const
  if (opcode === 6)
    return { name: 'jmpf', shouldJump: (p1: number) => p1 === 0, numParams: 1, ...parsed } as const
  if (opcode === 7)
    return {
      name: 'lt',
      operation: (p1: number, p2: number) => (p1 < p2 ? 1 : 0),
      numParams: 2,
      ...parsed,
    } as const
  if (opcode === 8)
    return {
      name: 'eq',
      operation: (p1: number, p2: number) => (p1 === p2 ? 1 : 0),
      numParams: 2,
      ...parsed,
    } as const
  if (opcode === 9) return { name: 'setbase', numParams: 0, ...parsed } as const
  return { name: 'nop', numParams: 2, ...parsed } as const
}

function parseCodeAndModes(code: number) {
  let remaining = code
  const opcode = remaining % 100
  remaining = (remaining - opcode) / 100
  const c = remaining % 10
  remaining = (remaining - c) / 10
  const b = remaining % 10
  remaining = (remaining - b) / 10
  const a = remaining % 10
  return { opcode, modeP1: mode(c), modeP2: mode(b), modeP3: mode(a) } as const
}

function mode(rawMode: number) {
  return rawMode === 0 ? 'position' : rawMode === 1 ? 'immediate' : 'relative'
}

function exit(message: string, codes: number[]): never {
  console.error('--- exiting ---')
  console.error(message)
  console.error('Current state:')
  console.error(codes.join(','))
  throw new Error(message)
}

assertEquals(run(input2Examples[0]), 3500)
assertEquals(run(input2Examples[1]), 2)
assertEquals(run(input2Examples[2]), 2)
assertEquals(run(input2Examples[3]), 2)
assertEquals(run(input2Examples[4]), 30)
assertEquals(run(input2Star1, { positionsToReplace: [65, 77] }), 19690720)
assertEquals(run(input5Examples[0], { outputRegister: 4 }), 99)
assertEquals(calculate(input5, { inputs: [1] }).outputs.reverse()[0], 11933517)
assertEquals(calculate(input5, { inputs: [5] }).outputs[0], 10428568)

assertEquals(calculate(input9Examples[0], {}).outputs, input9Examples[0].split(',').map(Number))
assertEquals(calculate(input9Examples[1], {}).outputs[0], 1219070632396864)
assertEquals(calculate(input9Examples[2]).outputs[0], 1125899906842624)

assertEquals(calculate(input9, { inputs: [1] }).outputs, [2204990589])
assertEquals(calculate(input9, { inputs: [2] }).outputs, [50008])
