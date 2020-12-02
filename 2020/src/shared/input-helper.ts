export function toSet(input: string) {
  return new Set(input.split('\n').map((el) => parseInt(el, 10)))
}

export function parseInt10(str: string) {
  return parseInt(str, 10)
}
