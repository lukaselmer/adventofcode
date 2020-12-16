import { input3, input3Example } from './inputs'

function main(input: string) {
  const forest = new Forest(input.split('\n'))
  forest.simulateR3D1()
  console.log(forest.encounteredTrees)
}

class Forest {
  position = new Point(-3, -1)
  encounteredTrees = 0

  constructor(private readonly lines: string[]) {}

  simulateR3D1() {
    while (this.position.y < this.lines.length) {
      this.position = this.position.add(new Point(3, 1))
      if (this.onTopOfTree) this.encounteredTrees += 1
    }
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
