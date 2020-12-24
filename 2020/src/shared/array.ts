export function equalArrayOfArray<T>(a: T[][], b: T[][]) {
  return a.length === b.length && a.every((aEl, index) => equalArrays(aEl, b[index]))
}

function equalArrays<T>(a: T[] | undefined, b: T[] | undefined) {
  return a && b && a.length === b.length && a.every((aEl, index) => aEl === b[index])
}
