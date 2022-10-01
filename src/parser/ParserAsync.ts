import { hasCache, getFromCache, addToCache } from "./ParserCommon"
import { getRandomOrgRandomIntegers } from "../random-numbers/RandomOrg"

export const getDiceRollAsync = async (dice: number): Promise<number> => {
  const id: string = `${dice}`

  const isCached: boolean = hasCache(id)
  if (isCached) return getFromCache(id) as number

  const generatedValues: number[] = await getRandomOrgRandomIntegers({max: dice})
  const diceValue: number = addToCache(id, generatedValues) as number

  return diceValue
}