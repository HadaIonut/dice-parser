import { getRandomOrgRandomIntegers } from "./random-numbers/RandomOrg"
import { getRandomIntegers } from "./random-numbers/JavascriptRandom"

(async () => {
  const roInts = await getRandomOrgRandomIntegers()
  const jsInts = getRandomIntegers()

  console.log(roInts)
  console.log(jsInts)
})()

export { }