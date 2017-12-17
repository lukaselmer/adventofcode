import { generateN } from "../utils";

export function day17() {
  console.log(`Example part 1: ${spinlockShortCircuit(3)}`);
  console.log(`Part 1: ${spinlockShortCircuit(359)}`);
}

function spinlockShortCircuit(steps: number) {
  const spinlock: number[] = [0];
  let currentIndex = 0;
  generateN(2017)
    .map(value => value + 1)
    .forEach(value => {
      currentIndex = (currentIndex + steps + 1) % spinlock.length;
      spinlock.splice(currentIndex + 1, 0, value);
    });
  return spinlock[currentIndex + 2];
}

day17();
