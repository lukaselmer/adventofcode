import { input1 } from './inputs'
import { calcSingleFuelRequirements } from './a1s1'

function main() {
  const massesToProcess = input1.split('\n').map((el) => parseInt(el, 10))
  let currentFuel = 0
  while (massesToProcess.length > 0) {
    const currentMass = massesToProcess.shift()
    if (!currentMass) continue
    const fuelForCurrentMass = calcSingleFuelRequirements(currentMass)
    if (fuelForCurrentMass > 0) {
      currentFuel += fuelForCurrentMass
      massesToProcess.push(fuelForCurrentMass)
    }
  }
  console.log(currentFuel)
}

main()
