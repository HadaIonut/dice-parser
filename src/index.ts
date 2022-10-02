import {getCacheMap} from './parser/Parser'
import {getDiceRoll} from './parser/Parser'

(async () => {
  console.log((await getDiceRoll(20)))
  console.log((await getDiceRoll(20)))
  console.log((await getDiceRoll(20)))
})()

export { }
