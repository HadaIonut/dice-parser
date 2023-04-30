import { parseDiceRolls } from './parsers/Parser'
import {computeMath} from "./mathHandler/computeMath.js";

(async () => {
  const testText = `
    1d2 1d2 1d4 1d6 1d8 1d10 1d12 1d20 1d100 2d20 20d20 200d20
    1d10r1 2d20r<10 2d20rr<15 5d10x10 1d20x<10kh 1d20x>10kh 6d10xo10
    3d10k 4d6k3 2d20kh 3d10kl 4d6kl3 2d20kl 3d6d 4d10d2 3d6dh 4d10min2 4d10max8
    10d20cs20 10d20cs>10 6d10cs>=6 1d100cs<=20 3d6even 5d10cs>=6df=1
    5d10cs>=8x=10 5d10cs>=8x>=9 10d10cs>=8x>=8 10d20cf20 10d20cf>10 6d10cf>=6
    1d100cf<=20 4d6cs6df1 10d10cs>5df<11 1d10cs=10df=1 3d6sf<3 
    Ana are 1d6 mere.
    Ion a luat 1d8 slashing dmg de la sapa.
    1d6 + 2d4
    1d6 - 2d4
    1d6 * 2d4
    1d6 / 2d4
  `
  const result = parseDiceRolls(testText)
  // console.log(result.original)
  // console.log(result.parsed)
  console.log(result.results)
})()

console.log(computeMath('ana are [[2 +4*(3+4) /5]] mere si [[ 5 + 7 ]] pere'))
console.log(computeMath('/r 2 + 6'))
console.log(computeMath('/r 2 + 6 test'))

export { }
