import {hasCache, getFromCache, addToCache} from './ParserCommon'
import {getRandomOrgRandomIntegers} from '../random-numbers/RandomOrg'
import {getRandomIntegers} from '../random-numbers/JavascriptRandom'

export const getDiceRollAsync = async (dice: number): Promise<number> => {
  const id = `${dice}`

  const isCached: boolean = hasCache(id)
  if (isCached) return getFromCache(id) as number

  const randomOrgGeneratedValues: number[] = await getRandomOrgRandomIntegers({max: dice})
  const generatedValues: number[] = getRandomIntegers({max: dice})
  const valueToCache: number[] = randomOrgGeneratedValues.length ? randomOrgGeneratedValues : generatedValues

  return addToCache(id, valueToCache) as number
}
