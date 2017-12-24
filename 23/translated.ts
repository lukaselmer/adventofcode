let a = 0,
  b = 81,
  c = 0,
  d = 0,
  e = 0,
  f = false,
  g = 0,
  counter = 0;

b = 81;
b *= 100;
b += 100000;
c = b;
c += 17000;

while (true) {
  f = true;
  d = 2;
  e = 2;
  while (true) {
    g = d;
    g *= e;
    g -= b;
    if (g === 0) {
      f = false;
      break;
    }
    e += 1;
    g = e;
    g -= b;
    // jump -8
    if (g === 0) {
      d++;
      g = d;
      g -= b;
      if (g !== 0) {
        e = 2;
        // jump -12
      } else {
        break;
      }
    }
  }
  if (!f) counter++;
  g = b;
  g -= c;
  if (g === 0) break;
  b += 17;
}
console.log(counter);
