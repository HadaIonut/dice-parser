import {getCacheMap} from './parser/ParserCommon'
import {getDiceRollAsync} from './parser/ParserAsync'
import {getDiceRollSync} from './parser/ParserSync'

(async () => {
  console.log(getCacheMap().get('20'))
  console.log((await getDiceRollSync(20)))
  console.log(getCacheMap().get('20'))
  console.log((await getDiceRollSync(20)))
  console.log(getCacheMap().get('20'))
  console.log((await getDiceRollSync(20)))
  console.log(getCacheMap().get('20'))
})()

export { }
