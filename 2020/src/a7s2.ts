import { input7, input7Example1, input7Example2 } from './inputs'
import { parseInt10 } from './shared/input-helper'
import { assertEquals } from './shared/testing'

function main(input: string) {
  const parsed = input.replace(/\./, '').split('\n').map(toMapping)

  const mappingContaining = extractMapping(parsed)

  const shinyGoldContents = mappingContaining.get('shiny gold')
  if (!shinyGoldContents) throw new Error('shiny gold missing from input')

  const toProcess = [...shinyGoldContents]
  let totalBags = 0
  while (toProcess.length) {
    const currentItem = toProcess.pop()
    if (!currentItem) throw new Error('invalid items state')

    totalBags += currentItem.amount
    const contents = mappingContaining.get(currentItem.id) || []
    contents.forEach((item) => toProcess.push({ ...item, amount: item.amount * currentItem.amount }))
  }

  return totalBags
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

function extractMapping(parsed: { id: string; contents: Item[] }[]) {
  const mappingContaining = new Map<string, Item[]>()
  parsed.forEach(({ id, contents }) => mappingContaining.set(id, contents))
  return mappingContaining
}

interface Item {
  amount: number
  id: string
}

assertEquals(main(input7Example1), 32)
assertEquals(main(input7Example2), 126)
console.log(main(input7))
