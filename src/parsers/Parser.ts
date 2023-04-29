import type {ParseResultType, RerollCondition} from '../types'
import {
  getMultipleDiceRolls,
  getMultipleDiceRollsUntil, recursiveRerollDice,
  rerollDice, countDice, rollMatchesTarget, getDiceRoll, explodeArray
} from './RollsProvider'
import {DiceKeepTypes, ExplodeMap, ExplodeTypes, ExplodeUntilTypes, MinMaxTypes} from "../types";
import {findGreatestN, findSmallestN} from "../utils/peaks";
import {sumArray} from "../utils/sum";

const ALL_TYPES_OF_DICE_REGEX = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?(\d)*(df|x)?(>=|<=|>|<|=)?(\d+)?/gim
const REROLL_DICE_REGEX = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim
const EXPLODING_DICE_REGEX = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dl|dh|min|max|)?(\d+)?$/gim
const COUNT_DICE_REGEX = /^(\d+)d(\d+)(cs|cf|even|odd)(>=|<=|>|<|=)?(\d+)?(df|x)?(>=|<=|>|<|=)?(\d+)?$/gim
const STANDARD_DICE_REGEX = /^(\d+)d(\d+)(kh|kl|dl|dh|min|max|)?(\d+)?$/gim

const explodeToSignMap: ExplodeMap = {
  x: '=',
  'x<': '<',
  'x>': '>',
  'xo': 'o'
}

export const keepDice = (keepType: DiceKeepTypes, keepCount: number, diceRolls: number[]) => {
  if (keepType === 'kh') return findGreatestN(diceRolls, keepCount)
  if (keepType === 'kl') return findSmallestN(diceRolls, keepCount)
  if (keepType === 'dh') return findSmallestN(diceRolls, diceRolls.length - keepCount)
  if (keepType === 'dl') return findGreatestN(diceRolls, diceRolls.length - keepCount)

  return diceRolls
}

export const applyMinMax = (modifierType: MinMaxTypes, modifierCap: number, diceRolls: number[]) => {
  if (modifierType === 'min') return diceRolls.map((roll) => roll <= modifierCap ? modifierCap : roll)
  if (modifierType === 'max') return diceRolls.map((roll) => roll >= modifierCap ? modifierCap : roll)

  return diceRolls
}

export const applyEndModifiers = (modifier: DiceKeepTypes | MinMaxTypes, target: number, diceRolls: number[]) => {
  return applyMinMax(modifier as MinMaxTypes, target, keepDice(modifier as DiceKeepTypes, target, diceRolls))
}

export const getRerollValues = (rolledValues: number[], rerollCondition: RerollCondition, rerollTarget: number, diceType: number, rerollType: string) => {
  if (rerollType === 'r') return rerollDice(rolledValues, rerollCondition as RerollCondition ?? '=', rerollTarget, diceType)
  if (rerollType === 'rr') return recursiveRerollDice(rolledValues, rerollCondition as RerollCondition ?? '=', rerollTarget, diceType)

  return [[], rolledValues]
}

export const parseOriginalString = (parsedObj: ParseResultType): ParseResultType => {
  const {parsed, results} = parsedObj
  let parsedWithResults = parsed

  let lengthChanged = 0
  for (let i = 0; i < results.length; i++) {
    const res = results[i];
    const {m, result, start, end} = res

    if (typeof result === 'undefined') continue
    parsedWithResults = parsedWithResults.substring(0, start - lengthChanged)
      + result
      + parsedWithResults.substring(end - lengthChanged, parsedWithResults.length)

    lengthChanged += m.length - `${result}`.length
  }
  return {...parsedObj, parsed: parsedWithResults}
}

export const countDiceParser = (parsedObj: ParseResultType): ParseResultType => {
  const parsedResults = parsedObj.results.map((result) => {
    const {m} = result
    if (!m.match(COUNT_DICE_REGEX)) return result

    const [_, numberOfDiceString, diceValueString, countType, condition, targetNumberString, difficulty, difficultyCondition, difficultyTarget] = COUNT_DICE_REGEX.exec(m) as RegExpExecArray
    const numberOfDice = Number(numberOfDiceString)
    const diceValue = Number(diceValueString)
    const targetNumber = Number(targetNumberString);
    const difficultyTargetNumber = Number(difficultyTarget);

    let diceRolls = getMultipleDiceRolls(numberOfDice, diceValue)
    let countedDice

    if (difficulty === 'x') {
      diceRolls = explodeArray(diceRolls, condition as RerollCondition, difficultyTargetNumber, diceValue)

      countedDice = Math.abs(diceRolls.reduce((acc, cur) =>
        acc + countDice(cur, condition as RerollCondition, countType, targetNumber, !!difficulty, "=", -1), 0))
    } else {
      countedDice = Math.abs(diceRolls.reduce((acc, cur) =>
        acc + countDice(cur, condition as RerollCondition, countType, targetNumber, !!difficulty, difficultyCondition as RerollCondition, difficultyTargetNumber), 0))
    }

    return {
      ...result,
      rolls: diceRolls,
      successes: countedDice,
      fails: diceRolls.length - countedDice
    }
  })

  return {...parsedObj, results: parsedResults}
}

export const explodingDiceParser = (parsedObj: ParseResultType): ParseResultType => {
  const parsedResults = parsedObj.results.map((result) => {
    const {m} = result
    if (!m.match(EXPLODING_DICE_REGEX)) return result

    const [_, numberOfDiceString, diceValueString, explodeType, targetNumberString, keepType, keepCount] = EXPLODING_DICE_REGEX.exec(m) as RegExpExecArray
    const numberOfDice = Number(numberOfDiceString)
    const diceValue = Number(diceValueString)
    const targetNumber = Number(targetNumberString);

    const diceRolls = getMultipleDiceRollsUntil(diceValue, explodeToSignMap[explodeType as keyof typeof explodeToSignMap], targetNumber, numberOfDice)

    if (!keepType) {
      return {...result, rolls: diceRolls, result: sumArray(diceRolls)}
    }

    return {
      ...result,
      rolls: diceRolls,
      result: sumArray(applyEndModifiers(keepType as DiceKeepTypes, Number(keepCount ?? 1), diceRolls))
    }
  })

  return {...parsedObj, results: parsedResults}
}

export const rerollDiceParser = (parsedObj: ParseResultType): ParseResultType => {
  const parsedResults = parsedObj.results.map((result) => {
    const {m} = result
    if (!m.match(REROLL_DICE_REGEX)) return result

    const [_, numberOfDiceString, diceValueString, rerollString, operationString, rerollValueString] = REROLL_DICE_REGEX.exec(m) as RegExpExecArray
    const numberOfDice = Number(numberOfDiceString)
    const diceValue = Number(diceValueString)
    const rerollValue = Number(rerollValueString)

    const diceRolls = getMultipleDiceRolls(numberOfDice, diceValue)

    const [rerollDiceValues, diceToSum] = getRerollValues(diceRolls, operationString as RerollCondition ?? '=', rerollValue, diceValue, rerollString)

    return {
      ...result,
      rolls: [...diceRolls, ...rerollDiceValues],
      rollsUsed: diceToSum,
      result: sumArray(diceToSum)
    }
  })

  return {...parsedObj, results: parsedResults}
}

export const standardDiceParser = (parsedObj: ParseResultType): ParseResultType => {
  const parsedResults = parsedObj.results.map((result) => {
    const {m} = result
    if (!m.match(STANDARD_DICE_REGEX)) return result

    const [_, numberOfDiceString, diceValueString, keepType, keepCount] = STANDARD_DICE_REGEX.exec(m) as RegExpExecArray
    const numberOfDice = Number(numberOfDiceString)
    const diceValue = Number(diceValueString)

    const diceRolls = getMultipleDiceRolls(numberOfDice, diceValue)
    if (!keepType) return {...result, rolls: diceRolls, result: sumArray(diceRolls)}

    return {
      ...result,
      rolls: diceRolls,
      result: sumArray(applyEndModifiers(keepType as DiceKeepTypes, Number(keepCount ?? 1), diceRolls))
    }
  })

  return {...parsedObj, results: parsedResults}
}

export const parse = (text: string): ParseResultType => {
  let parsedObj: ParseResultType = {original: text, parsed: text, wasSuccessful: true, results: []}

  try {
    parsedObj.results = Array.from(text.matchAll(ALL_TYPES_OF_DICE_REGEX), (m) => {
      const res = m[0]
      const {index: start} = m
      const end = start as number + res.length

      return {m: res, start, end}
    })

    parsedObj = countDiceParser(parsedObj)
    parsedObj = explodingDiceParser(parsedObj)
    parsedObj = rerollDiceParser(parsedObj)
    parsedObj = standardDiceParser(parsedObj)

    return parseOriginalString(parsedObj)
  } catch (error) {
    console.error(error)
    parsedObj.wasSuccessful = false
    return parsedObj
  }
}
