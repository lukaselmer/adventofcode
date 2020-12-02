import { input2, input2Example } from './inputs'
import { parseInt10 } from './shared/input-helper'

function main(input: string) {
  console.log(input.split('\n').map(parsePasswordPolicy).filter(isValidPolicy).length)
}

function parsePasswordPolicy(line: string): PasswordPolicy {
  const [part1, password] = line.split(': ')
  const [part2, letter] = part1.split(' ')
  const [min, max] = part2.split('-').map(parseInt10)
  return { password, letter, min, max }
}

function isValidPolicy({ password, letter, min, max }: PasswordPolicy) {
  const letterCount = password.split('').filter((currentLetter) => currentLetter === letter).length
  return letterCount >= min && letterCount <= max
}

interface PasswordPolicy {
  min: number
  max: number
  letter: string
  password: string
}

main(input2Example)
main(input2)
