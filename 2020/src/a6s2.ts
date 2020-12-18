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
      .reduce<null | Set<string>>(intersection, null)?.size || 0
  )
}

function intersection<T>(a: Set<T> | null, b: Set<T>) {
  return a ? new Set([...a].filter((value) => b.has(value))) : b
}

main(input6Example)
main(input6)
