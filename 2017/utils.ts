export function sum(list: number[]): number {
  return list.reduce((sum, current) => sum + current, 0);
}

export function flatten<T>(list: T[][]): T[] {
  return list.reduce((all, current) => all.concat(current));
}

export function generateN(amount: number): number[] {
  return Array.from(new Array(amount).keys());
}

export function objectValues<T>(object: { [index: number]: T }): T[] {
  return Object.keys(object).map(k => object[k as any]);
}
