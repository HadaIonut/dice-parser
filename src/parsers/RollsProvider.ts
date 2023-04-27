import {getRandomIntegers} from '../random-number-generators/JavascriptRandom'
import {ExplodeUntilTypes} from "../types";

const diceRollsCache: Map<number, number[]> = new Map<number, number[]>()

const hasCache = (id: number): boolean => diceRollsCache.has(id) && !!diceRollsCache.get(id)?.length
const addToCache = (id: number, values: number[]): number | undefined => {
  const newValues = [...values]

  const value = newValues.pop()
  diceRollsCache.set(id, newValues)

  return value
}
const getFromCache = (id: number): number | undefined => {
  if (!hasCache(id)) return undefined

  const values: number[] = [...(diceRollsCache.get(id) || [])]
  const value = values.pop()

  diceRollsCache.set(id, values)
  return value
}

export const getDiceRoll = (dice: number): number => {
  const isCached: boolean = hasCache(dice)
  if (isCached) return getFromCache(dice) as number

  const generatedValues: number[] = getRandomIntegers({max: dice})
  return addToCache(dice, generatedValues) as number
}
export const getMultipleDiceRolls = (num: number, dice: number): number[] => Array.from({length: num}, () => getDiceRoll(dice))

export const getDiceRollUntil = (dice: number, targetType: ExplodeUntilTypes, target:number, outArray:number[] = []): number[] => {
  const diceValue = getDiceRoll(dice);
  const iterations = [...outArray, diceValue];
  switch (targetType) {
    case "<":
      if (diceValue >= target) return iterations
      return getDiceRollUntil(dice, targetType, target, iterations)
    case ">":
      if (diceValue <= target) return iterations
      return getDiceRollUntil(dice, targetType, target, iterations)
    case "=":
      if (diceValue === target) return  getDiceRollUntil(dice, targetType, target, iterations)
      return iterations
    case "o":
      return [diceValue, getDiceRoll(dice)] as number[]
  }
}

export const getMultipleDiceRollsUntil = (dice: number, targetType: ExplodeUntilTypes, target:number, count: number) => {
  let out:number[] = []
  for (let i = 0; i < count; i++) {
    out = [...out, ...getDiceRollUntil(dice, targetType, target)]
  }
  return out
}