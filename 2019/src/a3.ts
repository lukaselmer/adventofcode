import { input3 } from './inputs'
import { assertNever } from './shared/ts-utils'

function main(wire1: string, wire2: string) {
  const board = new Board()
  board.addWire(wire1.split(','), 1)
  board.addWire(wire2.split(','), 2)
  board.addWire(wire1.split(','), 1)
  const centralPort = board.centralPort
  const distances = board.crossings.map((crossing) => crossing.distance(centralPort))

  return {
    minCentralPortDistance: Math.min(...distances),
    firstIntersectionDistance: board.firstIntersectionDistance,
  }
}

type WireID = number
type Distance = number

class Board {
  private maxPoint = pointFactory.newPoint(0, 0)
  private minPoint = pointFactory.newPoint(0, 0)
  private content: Map<Point, Set<WireID>> = new Map()
  private _crossings: Set<Point> = new Set()
  private crossingDistances: Map<Point, Record<WireID, Distance>> = new Map()
  private wires: Set<WireID> = new Set()

  addWire(wire: string[], wireNumber: WireID) {
    this.wires.add(wireNumber)

    let distanceFromStart = 0
    let currentPoint = this.centralPort
    while (wire.length > 0) {
      const instruction = this.parseInstruction(wire.shift())
      if (!instruction) continue

      let [direction, distance] = instruction
      while (distance > 0) {
        currentPoint = this.movePoint(direction, currentPoint)
        --distance
        ++distanceFromStart
        this.mark(currentPoint, wireNumber, distanceFromStart)
      }
    }
  }

  private movePoint(direction: Direction, currentPoint: Point) {
    switch (direction) {
      case 'U':
        return currentPoint.up
      case 'D':
        return currentPoint.down
      case 'L':
        return currentPoint.left
      case 'R':
        return currentPoint.right
    }
    assertNever(direction)
  }

  private parseInstruction(instruction: string | undefined) {
    if (!instruction) return null
    const [direction, ...rest] = instruction.split('')
    const distance = parseInt(rest.join(''), 10)
    return [direction as Direction, distance] as const
  }

  private mark(point: Point, wire: WireID, distanceFromStart: Distance) {
    this.minPoint = this.minPoint.min(point)
    this.maxPoint = this.maxPoint.max(point)
    const set = this.setFor(point)
    set.add(wire)
    if (set.size > 1) {
      this._crossings.add(point)
      const crossingDistance = this.crossingDistances.get(point) || {}
      crossingDistance[wire] = Math.min(crossingDistance[wire] || Infinity, distanceFromStart)
      this.crossingDistances.set(point, crossingDistance)
    }
  }

  private setFor(point: Point) {
    const set = this.content.get(point)
    if (set) return set

    const newSet = new Set<WireID>()
    this.content.set(point, newSet)
    return newSet
  }

  get center() {
    return this.minPoint.average(this.maxPoint)
  }

  get centralPort() {
    return pointFactory.newPoint(0, 0)
  }

  get crossings() {
    return [...this._crossings.keys()]
  }

  get firstIntersectionDistance() {
    const wires = [...this.wires.keys()]
    if (wires.length !== 2) throw new Error(`Meh ${this.wires}`)
    const [wire1, wire2] = wires
    const distances = this.crossings.map((crossing) => {
      const crossingDistances = this.crossingDistances.get(crossing)!
      return crossingDistances[wire1] + crossingDistances[wire2]
    })

    return Math.min(...distances)
  }
}

type Direction = 'U' | 'R' | 'D' | 'L'

class Point {
  constructor(private _x: number, private _y: number) {}

  static key(x: number, y: number) {
    return `${x}/${y}`
  }

  get up() {
    return pointFactory.newPoint(this.x, this.y + 1)
  }

  get down() {
    return pointFactory.newPoint(this.x, this.y - 1)
  }

  get left() {
    return pointFactory.newPoint(this.x - 1, this.y)
  }

  get right() {
    return pointFactory.newPoint(this.x + 1, this.y)
  }

  min(other: Point) {
    return pointFactory.newPoint(Math.min(this.x, other.x), Math.min(this.y, other.y))
  }

  max(other: Point) {
    return pointFactory.newPoint(Math.max(this.x, other.x), Math.max(this.y, other.y))
  }

  average(other: Point) {
    return pointFactory.newPoint((this.x + other.x) / 2, (this.y + other.y) / 2)
  }

  distance(other: Point): any {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y)
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }
}

class PointFactory {
  private cache: Map<string, Point> = new Map()

  newPoint(x: number, y: number) {
    const key = Point.key(x, y)
    const point = this.cache.get(key)
    if (point) return point

    const newPoint = new Point(x, y)
    this.cache.set(key, newPoint)
    return newPoint
  }
}

function assertEquals<T>(a: T, b: T) {
  if (JSON.stringify(a) !== JSON.stringify(b)) console.log(`Expected ${a} == ${b}`)
}

const pointFactory = new PointFactory()

assertEquals(main('R8,U5,L5,D3', 'U7,R6,D4,L4'), {
  minCentralPortDistance: 6,
  firstIntersectionDistance: 30,
})
assertEquals(main('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'), {
  minCentralPortDistance: 159,
  firstIntersectionDistance: 610,
})
assertEquals(
  main('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'),
  { minCentralPortDistance: 135, firstIntersectionDistance: 410 }
)

console.log(main(...input3))
