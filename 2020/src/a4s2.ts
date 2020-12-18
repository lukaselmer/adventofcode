import { input4, input4Example } from './inputs'

function main(input: string) {
  const passports = input
    .split('\n\n')
    .map((rows) => rows.split('\n').join(' '))
    .map(parsePassport)
  console.log(passports.filter(validPassport).length)
}

function parsePassport(line: string): Passport {
  const contents = new Map(line.split(' ').map((pair) => pair.split(':') as [string, string]))
  return {
    byr: parseYear(contents.get('byr')),
    iyr: parseYear(contents.get('iyr')),
    eyr: parseYear(contents.get('eyr')),
    hgt: parseHeight(contents.get('hgt')),
    hcl: parseHairColor(contents.get('hcl')),
    ecl: parseEyeColor(contents.get('ecl')),
    pid: parsePassportId(contents.get('pid')),
    cid: contents.get('cid'),
  }
}

function parseYear(content: string | undefined) {
  if (!content || content.length !== 4) return
  const options = '0123456789'.split('')
  if (content.split('').every((letter) => options.includes(letter))) return parseInt(content, 10)
}

function parseHeight(content: string | undefined): Passport['hgt'] {
  if (!content || content.length < 4) return
  try {
    const value = parseInt(content.slice(0, content.length - 2), 10)
    if (content.endsWith('in')) return { type: 'in', value }
    if (content.endsWith('cm')) return { type: 'cm', value }
  } catch {
    return undefined
  }
}

function parseHairColor(content: string | undefined) {
  if (!content || !content.startsWith('#') || content.length !== 7) return
  const [, ...rest] = content.split('')
  const options = '0123456789abcdef'.split('')
  if (rest.every((letter) => options.includes(letter))) return content
}

function parseEyeColor(content: string | undefined) {
  if (!content) return

  const options = 'amb blu brn gry grn hzl oth'.split(' ')
  if (options.includes(content)) return content
}

function parsePassportId(content: string | undefined) {
  if (!content || content.length !== 9) return
  const options = '0123456789'.split('')
  if (content.split('').every((letter) => options.includes(letter))) return content
}

function validPassport(passport: Passport) {
  return (
    isBetween(passport.byr, 1920, 2002) &&
    isBetween(passport.iyr, 2010, 2020) &&
    isBetween(passport.eyr, 2020, 2030) &&
    ((passport.hgt?.type === 'cm' && isBetween(passport.hgt.value, 150, 193)) ||
      (passport.hgt?.type === 'in' && isBetween(passport.hgt.value, 59, 76))) &&
    passport.hcl &&
    passport.ecl &&
    passport.pid
  )
}

function isBetween(value: number | undefined, min: number, max: number) {
  if (!value) return false
  return min <= value && value <= max
}

interface Passport {
  byr: number | undefined // (Birth Year)
  iyr: number | undefined // (Issue Year)
  eyr: number | undefined // (Expiration Year)
  hgt: { type: 'cm'; value: number } | { type: 'in'; value: number } | undefined // (Height)
  hcl: string | undefined // (Hair Color)
  ecl: string | undefined // (Eye Color)
  pid: string | undefined // (Passport ID)
  cid: string | undefined // (Country ID)
}

main(input4Example)
main(input4)
