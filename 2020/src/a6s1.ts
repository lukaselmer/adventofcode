import { sum } from 'lodash'
import { input6, input6Example } from './inputs'

function main(input: string) {
  const groups = input.split('\n\n')
  console.log(sum(groups.map(countYesAnswers)))
}

function countYesAnswers(group: string) {
  return new Set(group.split('\n').flatMap((formContents) => formContents.split(''))).size
}

main(input6Example)
main(input6)
