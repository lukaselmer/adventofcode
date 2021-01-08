import { readdirSync } from 'fs'
import { last, sortBy } from 'lodash'

async function main() {
  const filenames = readdirSync('./src').filter(
    (name) => name.startsWith('a') && (name.endsWith('s1.ts') || name.endsWith('s2.ts'))
  )
  const latest = last(sortBy(filenames, (filename) => [filename.length, filename]))
  await import(`./${latest}`)
}

main()
