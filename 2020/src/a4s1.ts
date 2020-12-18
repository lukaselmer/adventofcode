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
    byr: contents.get('byr'),
    iyr: contents.get('iyr'),
    eyr: contents.get('eyr'),
    hgt: contents.get('hgt'),
    hcl: contents.get('hcl'),
    ecl: contents.get('ecl'),
    pid: contents.get('pid'),
    cid: contents.get('cid'),
  }
}

function validPassport(passport: Passport) {
  return (
    passport.byr &&
    passport.iyr &&
    passport.eyr &&
    passport.hgt &&
    passport.hcl &&
    passport.ecl &&
    passport.pid
  )
}

interface Passport {
  byr: string | undefined // (Birth Year)
  iyr: string | undefined // (Issue Year)
  eyr: string | undefined // (Expiration Year)
  hgt: string | undefined // (Height)
  hcl: string | undefined // (Hair Color)
  ecl: string | undefined // (Eye Color)
  pid: string | undefined // (Passport ID)
  cid: string | undefined // (Country ID)
}

main(input4Example)
main(input4)
