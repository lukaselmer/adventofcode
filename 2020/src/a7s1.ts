import { input7, input7Example1 } from './inputs'
import { parseInt10 } from './shared/input-helper'

function main(input: string) {
  const parsed = input.replace(/\./, '').split('\n').map(toMapping)

  const mappingContainedBy = extractMapping(parsed)

  const processed = new Set<string>()
  const toProcess = new Set<string>(['shiny gold'])
  while (toProcess.size) {
    const first = toProcess.values().next()
    if (first.done) throw new Error('Unexpected empty set')

    toProcess.delete(first.value)
    processed.add(first.value)
    const mapping = mappingContainedBy.get(first.value) || new Set()

    for (const id of mapping.values()) {
      if (processed.has(id)) continue
      toProcess.add(id)
    }
  }

  console.log(processed.size - 1)
}

function toMapping(line: string) {
  const [id, contentsStr] = line.split(' bags contain ')
  if (contentsStr === 'no other bags.') return { id, contents: [] }
  const contents = contentsStr.split(', ').map(parseContents)
  return { id, contents }
}

function parseContents(containingItem: string) {
  const [amount, ...rest] = containingItem.split(' ')
  rest.pop()
  return { amount: parseInt10(amount), id: rest.join(' ') }
}

function extractMapping(parsed: { id: string; contents: { amount: number; id: string }[] }[]) {
  const mappingContainedBy = new Map<string, Set<string>>()
  parsed.forEach((mapping) => {
    mapping.contents.forEach((item) => {
      const set = mappingContainedBy.get(item.id) || new Set<string>()
      mappingContainedBy.set(item.id, set.add(mapping.id))
    })
  })
  return mappingContainedBy
}

main(input7Example1)
main(input7)
