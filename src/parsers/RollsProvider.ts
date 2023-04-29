import {getRandomIntegers} from '../random-number-generators/JavascriptRandom'
import {ExplodeUntilTypes, RerollCondition} from "../types";

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

export const getDiceRollUntil = (dice: number, targetType: ExplodeUntilTypes, target: number, outArray: number[] = []): number[] => {
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
      if (diceValue === target) return getDiceRollUntil(dice, targetType, target, iterations)
      return iterations
    case "o":
      return [diceValue, getDiceRoll(dice)] as number[]
  }
}

export const getMultipleDiceRollsUntil = (dice: number, targetType: ExplodeUntilTypes, target: number, count: number) => {
  let out: number[] = []
  for (let i = 0; i < count; i++) {
    out = [...out, ...getDiceRollUntil(dice, targetType, target)]
  }
  return out
}

export const rollMatchesTarget = (rolledValue: number, condition: RerollCondition, target: number) => {
  switch (condition) {
    case "=":
      return rolledValue === target;
    case ">":
      return rolledValue > target;
    case "<":
      return rolledValue < target;
    case "<=":
      return rolledValue <= target;
    case ">=":
      return rolledValue >= target;
    case "even":
      return rolledValue % 2 === 0
    case "odd":
      return rolledValue % 2 === 1
  }
}

export const rerollDice = (rolledValues: number[], rerollCondition: RerollCondition, rerollTarget: number, diceType: number) => {
  const rerolledDice = []
  const diceToSum = [...rolledValues]
  for (const rolledValueKey in rolledValues) {
    if (rollMatchesTarget(rolledValues[rolledValueKey], rerollCondition, rerollTarget)) {
      const newRoll = getDiceRoll(diceType)
      rerolledDice.push(newRoll)
      diceToSum[rolledValueKey] = newRoll
    }
  }
  return [rerolledDice, diceToSum]
}

export const recursiveRerollDice = (rolledValues: number[], rerollCondition: RerollCondition, rerollTarget: number, diceType: number) => {
  const rerolledValues = [...rolledValues]
  let diceToSum = [...rolledValues]

  for (const diceToSumKey in diceToSum) {
    while (rollMatchesTarget(diceToSum[diceToSumKey], rerollCondition, rerollTarget)) {
      const newRoll = getDiceRoll(diceType)
      rerolledValues.push(newRoll)
      diceToSum[diceToSumKey] = newRoll
    }
  }

  return [rerolledValues, diceToSum]
}

export const countDice = (die: number, condition: RerollCondition, countType: string, target?: number, hasDifficulty?: boolean, difficultyCondition?: RerollCondition, difficultyTarget?: number): number => {
  const difficultyModifier = Number(rollMatchesTarget(die, difficultyCondition ?? '=', difficultyTarget ?? 0))
  
  if (countType === 'cs' || countType === 'cf')
    return Math.max(Number(rollMatchesTarget(die, condition ?? '=', target ?? 0)) - difficultyModifier, -1)
  if (countType === 'odd' || countType === 'even')
    return Math.max(Number(rollMatchesTarget(die, countType, 0)) - difficultyModifier, -1)

  return die
}

export const explodeArray = (dice: number[], condition: RerollCondition, target: number, diceType: number) => {
  const explodedArray = [...dice]

  dice.forEach((die) => {
    if (rollMatchesTarget(die, condition as RerollCondition, target))
      explodedArray.push(getDiceRoll(diceType))
  })

  return explodedArray
}
