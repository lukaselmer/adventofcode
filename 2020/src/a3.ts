import { input3, input3Example } from './inputs'

function main(input: string) {
  const forest = new Forest(input.split('\n'))
  forest.simulate(new Point(3, 1))
  console.log(forest.encounteredTrees)

  const strategies = [
    new Point(1, 1),
    new Point(3, 1),
    new Point(5, 1),
    new Point(7, 1),
    new Point(1, 2),
  ]
  const total = strategies
    .map((strategy) => {
      forest.reset()
      forest.simulate(strategy)
      return forest.encounteredTrees
    })
    .reduce((product, scalar) => product * scalar, 1)
  console.log(total)
}

class Forest {
  position = new Point(0, 0)
  encounteredTrees = 0

  constructor(private readonly lines: string[]) {}

  simulate(strategy: Point) {
    if (this.onTopOfTree) this.encounteredTrees += 1
    while (this.position.y < this.lines.length) {
      this.position = this.position.add(strategy)
      if (this.onTopOfTree) this.encounteredTrees += 1
    }
  }

  reset() {
    this.position = new Point(0, 0)
    this.encounteredTrees = 0
  }

  private get onTopOfTree() {
    const line = this.lines[this.position.y]
    return line?.[this.position.x % line.length] === '#'
  }
}

class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y)
  }
}

main(input3Example)
main(input3)
