export function toSet(input: string) {
  return new Set(input.split('\n').map((el) => parseInt(el, 10)))
}
