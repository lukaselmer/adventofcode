export function sum(list: number[]): number {
  return list.reduce((sum, current) => sum + current, 0);
}
