export function sum(list: number[]): number {
  return list.reduce((sum, current) => sum + current, 0);
}

export function flatten<T>(list: T[][]): T[] {
  return list.reduce((all, current) => all.concat(current));
}
