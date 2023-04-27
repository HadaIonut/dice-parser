import type {ParseResultType, RerollCondition} from '../types'
import {
  getMultipleDiceRolls,
  getMultipleDiceRollsUntil, recursiveRerollDice,
  rerollDice
} from './RollsProvider'
import {DiceKeepTypes, ExplodeMap, ExplodeTypes, ExplodeUntilTypes} from "../types";
import {findGreatestN, findSmallestN} from "../utils/peaks";
import {sumArray} from "../utils/sum";

const ALL_TYPES_OF_DICE_REGEX = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim
const REROLL_DICE_REGEX = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim
const EXPLODING_DICE_REGEX = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dl|dh)?(\d+)?$/gim
const STANDARD_DICE_REGEX = /^(\d+)d(\d+)(kh|kl|dl|dh)?(\d+)?$/gim

const explodeToSignMap: ExplodeMap = {
  x: '=',
  'x<': '<',
  'x>': '>',
  'xo': 'o'
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

export const rerollDiceParser = (parsedObj: ParseResultType): ParseResultType => {
  const parsedResults = parsedObj.results.map((result) => {
    const {m} = result
    if (!m.match(REROLL_DICE_REGEX)) return result

    const [_, numberOfDiceString, diceValueString, rerollString, operationString, rerollValueString] = REROLL_DICE_REGEX.exec(m) as RegExpExecArray
    const numberOfDice = Number(numberOfDiceString)
    const diceValue = Number(diceValueString)
    const rerollValue = Number(rerollValueString)

    const diceRolls = getMultipleDiceRolls(numberOfDice, diceValue)

    if (rerollString === 'r') {
      const [rerollDiceValues, diceToSum] = rerollDice(diceRolls, operationString as RerollCondition ?? '=', rerollValue, diceValue)

      return {
        ...result,
        rolls: [...diceRolls, ...rerollDiceValues],
        rollsUsed: diceToSum,
        result: sumArray(diceToSum)
      }
    } else if (rerollString === 'rr') {
      const [rerolledValues, diceToSum] = recursiveRerollDice(diceRolls, operationString as RerollCondition, rerollValue, diceValue)

      return {
        ...result,
        rolls: rerolledValues,
        rollsUsed: diceToSum,
        result: sumArray(diceToSum)
      }
    }

    return {...result, rolls: diceRolls, result: sumArray(diceRolls)}
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
      result: sumArray(keepDice(keepType as DiceKeepTypes, Number(keepCount ?? 1), diceRolls))
    }
  })

  return {...parsedObj, results: parsedResults}
}

export const keepDice = (keepType: DiceKeepTypes, keepCount: number, diceRolls: number[]) => {
  if (keepType === 'kh') return findGreatestN(diceRolls, keepCount)
  if (keepType === 'kl') return findSmallestN(diceRolls, keepCount)
  if (keepType === 'dh') return findSmallestN(diceRolls, diceRolls.length - keepCount)
  if (keepType === 'dl') return findGreatestN(diceRolls, diceRolls.length - keepCount)

  return diceRolls
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
      result: sumArray(keepDice(keepType as DiceKeepTypes, Number(keepCount ?? 1), diceRolls))
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
