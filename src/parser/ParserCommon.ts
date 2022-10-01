const diceRollsCache: Map<string, number[]> = new Map<string, number[]>()
export const getCacheMap = (): Map<string, number[]> => diceRollsCache

export const hasCache = (id: string): boolean => diceRollsCache.has(id) && !!diceRollsCache.get(id)?.length
export const addToCache = (id: string, values: number[]): number | undefined => {
  const newValues = [...values]

  const value = newValues.pop()
  diceRollsCache.set(id, newValues)

  return value
}
export const getFromCache = (id: string): number | undefined => {
  if (!hasCache(id)) return undefined

  const values: number[] = [...(diceRollsCache.get(id) || [])]
  const value = values.pop()

  diceRollsCache.set(id, values)
  return value
}