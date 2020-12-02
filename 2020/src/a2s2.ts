import { input2, input2Example } from './inputs'
import { parseInt10 } from './shared/input-helper'

function main(input: string) {
  console.log(input.split('\n').map(parsePasswordPolicy).filter(isValidPolicy).length)
}

function parsePasswordPolicy(line: string): PasswordPolicy {
  const [part1, password] = line.split(': ')
  const [part2, letter] = part1.split(' ')
  const [pos1, pos2] = part2.split('-').map(parseInt10)
  return { password, letter, pos1, pos2 }
}

function isValidPolicy({ password, letter, pos1, pos2 }: PasswordPolicy) {
  const passwordLetters = password.split('')
  const letterPos1 = passwordLetters[pos1 - 1]
  const letterPos2 = passwordLetters[pos2 - 1]
  return (letterPos1 === letter || letterPos2 === letter) && letterPos1 !== letterPos2
}

interface PasswordPolicy {
  pos1: number
  pos2: number
  letter: string
  password: string
}

main(input2Example)
main(input2)
