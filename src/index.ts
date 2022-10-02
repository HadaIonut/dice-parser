import {getDiceRoll} from './parsers/TextParser'

(async () => {
  console.log((await getDiceRoll(20)))
  console.log((await getDiceRoll(20)))
  console.log((await getDiceRoll(20)))
})()

export { }
