export function program() {
  // further potential optimization:
  // generate prime numbers up to limit, and use the list to check if the number is prime
  let current = 108100;
  const limit = 125100;
  let counter = 0;

  while (current <= limit) {
    if (!isPrime(current)) counter++;
    current += 17;
  }
  console.log(counter);
}

function isPrime(num: number) {
  let a = 2,
    b = 2;
  // optimization: an integer is prime if it is not divisible by any prime less than or equal to its square root
  const sqrt = Math.sqrt(num);

  while (true) {
    if (a * b - num === 0) {
      return false;
    }

    b++;
    if (b >= sqrt) {
      a++;
      if (a >= num) {
        return true;
      } else {
        b = 2;
      }
    }
  }
}

/*
naive / original implementation
function isPrime(num: number) {
  let a = 2,
    b = 2;

  while (true) {
    if (a * b - num === 0) {
      return false;
    }

    b++;
    if (b === num) {
      a++;
      if (a === num) {
        return true;
      } else {
        b = 2;
      }
    }
  }
}*/

program();
