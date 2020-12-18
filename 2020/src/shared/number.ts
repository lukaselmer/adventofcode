export function* generateNumbers(start: number) {
  while (true) yield start++
}
