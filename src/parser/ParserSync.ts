import {hasCache, getFromCache, addToCache} from './ParserCommon'
import {getRandomIntegers} from '../random-numbers/JavascriptRandom'

export const getDiceRollSync = (dice: number): number => {
  const id = `${dice}`

  const isCached: boolean = hasCache(id)
  if (isCached) return getFromCache(id) as number

  const generatedValues: number[] = getRandomIntegers({max: dice})
  return addToCache(id, generatedValues) as number
}
