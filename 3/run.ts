const enum Direction {
  Right,
  Up,
  Left,
  Down
}

const input = 361527;

class SpiralMatrix {
  private values: number[][] = [];
  latestValueX: number;
  latestValueY: number;

  constructor(public centerX: number, public centerY: number) {
    this.latestValueX = centerX;
    this.latestValueY = centerY;
  }

  set(x: number, y: number, value: number) {
    if (!this.values[x]) this.values[x] = [];
    this.values[x][y] = value;
    this.latestValueX = x;
    this.latestValueY = y;
  }

  get(x: number, y: number) {
    if (!this.values[x]) return;
    return this.values[x][y];
  }
}

function buildSprialMatrix(limit: number): SpiralMatrix {
  const matrixWidth = Math.ceil(Math.sqrt(limit));

  let currentValue = 1;
  let x = Math.floor(matrixWidth / 2);
  let y = Math.floor(matrixWidth / 2);
  let nextDirection = Direction.Right;

  const matrix = new SpiralMatrix(x, y);

  matrix.set(x, y, currentValue);

  for (let currentValue = 1; currentValue < limit; currentValue++) {
    switch (nextDirection) {
      case Direction.Right:
        x += 1;
        matrix.set(x, y, currentValue);
        if (!matrix.get(x, y - 1)) {
          nextDirection = Direction.Up;
        }
        break;
      case Direction.Up:
        y -= 1;
        matrix.set(x, y, currentValue);
        if (!matrix.get(x - 1, y)) {
          nextDirection = Direction.Left;
        }
        break;
      case Direction.Left:
        x -= 1;
        matrix.set(x, y, currentValue);
        if (!matrix.get(x, y + 1)) {
          nextDirection = Direction.Down;
        }
        break;
      case Direction.Down:
        y += 1;
        matrix.set(x, y, currentValue);
        if (!matrix.get(x + 1, y)) {
          nextDirection = Direction.Right;
        }
        break;
    }
  }

  return matrix;
}

function calcDistance(matrix: SpiralMatrix) {
  return (
    Math.abs(matrix.centerX - matrix.latestValueX) +
    Math.abs(matrix.centerY - matrix.latestValueY)
  );
}

function calcSpiralMatrix(limit: number) {
  const matrix = buildSprialMatrix(limit);
  return calcDistance(matrix);
}

export function day3() {
  console.log(`Spiral 1 (should == 0): ${calcSpiralMatrix(1)}`);
  console.log(`Spiral 12 (should == 3): ${calcSpiralMatrix(12)}`);
  console.log(`Spiral 23 (should == 2): ${calcSpiralMatrix(23)}`);
  console.log(`Spiral 1024 (should == 31): ${calcSpiralMatrix(1024)}`);
  console.log(`Spiral input: ${calcSpiralMatrix(input)}`);
}

day3();
