import {parse, parseDiceRolls} from "./parsers/Parser";

const runFunctionExamples = () => {
  const testText = `
    
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
  console.log(result)

  console.log(parse('ana are [[2 +4*(3+4) /5]] mere si [[ 5 + 7 ]] pere'))
  console.log(parse('/r 2 + 6'))
  console.log(parse('/r 2d6 + 6d10'))
  console.log(parse('ana are [[2d6 +4d4*(1d8+4) /5]] mere si [[ 5 + 7 ]] pere, merele s-au calculat cu 2d6 +4d4'))
  console.log(parse('/r 2d6 test'))
  debugger
}

runFunctionExamples()