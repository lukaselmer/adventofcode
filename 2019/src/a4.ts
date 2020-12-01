import { input3 } from './inputs'

function main(start: number, end: number, matches: (password: number) => boolean) {
  let currentPassword = start
  let matchingPasswords = 0
  while (currentPassword <= end) {
    if (matches(currentPassword)) matchingPasswords++
    currentPassword++
  }
  return matchingPasswords
}

function neverDecreases(password: number) {
  const digits = password.toString().split('')
  let previousDigit: null | string = null
  for (const digit of digits) {
    if (previousDigit !== null && parseInt(previousDigit, 10) > parseInt(digit, 10)) return false
    previousDigit = digit
  }
  return true
}

function atLeastOneRepeated(password: number) {
  const digits = password.toString().split('')
  let previousDigit: null | string = null
  for (const digit of digits) {
    if (previousDigit !== null && previousDigit == digit) return true
    previousDigit = digit
  }
  return false
}

function atLeastOneDouble(password: number) {
  let streak = 1
  const digits = password.toString().split('')
  let previousDigit: null | string = null
  for (const digit of digits) {
    if (previousDigit !== null) {
      if (previousDigit == digit) streak++
      else if (streak == 2) return true
      else streak = 1
    }
    previousDigit = digit
  }
  return streak == 2
}

console.log(main(356261, 846303, (n) => neverDecreases(n) && atLeastOneRepeated(n)))
console.log(main(356261, 846303, (n) => neverDecreases(n) && atLeastOneDouble(n)))
