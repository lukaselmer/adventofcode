import { generateN } from "../utils";

export function day17() {
  console.log(`Example part 1: ${spinlockShortCircuit(3)}`);
  console.log(`Part 1: ${spinlockShortCircuit(359)}`);
  console.log(`Part 2: ${spinlockValueAfterZero(359)}`);
}

function spinlockShortCircuit(steps: number) {
  const result = spinSpinlock(2017, steps);
  return result.spinlock[result.currentIndex + 2];
}

function spinSpinlock(spins: number, steps: number) {
  const spinlock: number[] = [0];
  let currentIndex = 0;
  generateN(spins)
    .map(value => value + 1)
    .forEach(value => {
      currentIndex = (currentIndex + steps + 1) % spinlock.length;
      spinlock.splice(currentIndex + 1, 0, value);
    });
  return { spinlock, currentIndex };
}

/*
brute force...
function spinlockValueAfterZero(steps: number) {
  const result = spinSpinlock(50000000 - 1, steps);
  const indexOfZero = result.spinlock.indexOf(0);
  return result.spinlock[indexOfZero + 1];
}
*/

function spinlockValueAfterZero(steps: number) {
  let currentIndex = 0;
  let lastAfter0 = 0;
  generateN(50000000 - 1)
    .map(value => value + 1)
    .forEach(value => {
      currentIndex = (currentIndex + steps + 1) % value;
      if (currentIndex === 0) lastAfter0 = value;
    });
  return lastAfter0;
}

day17();
