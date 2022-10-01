import { getCacheMap } from "./parser/ParserCommon"
import { getDiceRollAsync } from "./parser/ParserAsync"

(async () => {
  console.log(getCacheMap().get('20'))
  console.log((await getDiceRollAsync(20)))
  console.log(getCacheMap().get('20'))
  console.log((await getDiceRollAsync(20)))
  console.log(getCacheMap().get('20'))
  console.log((await getDiceRollAsync(20)))
  console.log(getCacheMap().get('20'))
})()

export { }