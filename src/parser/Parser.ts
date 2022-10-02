import {getRandomIntegers} from '../random-numbers/JavascriptRandom'

const diceRollsCache: Map<string, number[]> = new Map<string, number[]>()

const hasCache = (id: string): boolean => diceRollsCache.has(id) && !!diceRollsCache.get(id)?.length
const addToCache = (id: string, values: number[]): number | undefined => {
  const newValues = [...values]

  const value = newValues.pop()
  diceRollsCache.set(id, newValues)

  return value
}
const getFromCache = (id: string): number | undefined => {
  if (!hasCache(id)) return undefined

  const values: number[] = [...(diceRollsCache.get(id) || [])]
  const value = values.pop()

  diceRollsCache.set(id, values)
  return value
}

export const getDiceRoll = (dice: number): number => {
  const id = `${dice}`

  const isCached: boolean = hasCache(id)
  if (isCached) return getFromCache(id) as number

  const generatedValues: number[] = getRandomIntegers({max: dice})
  return addToCache(id, generatedValues) as number
}
