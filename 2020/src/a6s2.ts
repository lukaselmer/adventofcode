import { sum } from 'lodash'
import { input6, input6Example } from './inputs'

function main(input: string) {
  const groups = input.split('\n\n')
  console.log(sum(groups.map(countYesAnswers)))
}

function countYesAnswers(group: string) {
  return (
    group
      .split('\n')
      .flatMap((formContents) => new Set(formContents.split('')))
      .reduce<null | Set<string>>(
        (previous, current) => (previous ? intersection(previous, current) : current),
        null
      )?.size || 0
  )
}

function intersection<T>(a: Set<T>, b: Set<T>) {
  return new Set([...a].filter((value) => b.has(value)))
}

main(input6Example)
main(input6)
