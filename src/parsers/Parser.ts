import type {ParsedDiceResultType, ParseResultType, RerollCondition} from '../types'
import {DiceKeepTypes, DiceParserMappingFunction} from "../types";
import {
  countDice,
  explodeArray,
  getMultipleDiceRolls,
  getMultipleDiceRollsUntil,
  rollMatchesTarget
} from './RollsProvider'
import {sumArray} from "../utils/sum";
import {math} from "../mathJs";
import {
  ALL_TYPES_OF_DICE_REGEX,
  CONDITIONAL_SUBTRACT_REGEX,
  COUNT_DICE_REGEX,
  EXPLODING_DICE_REGEX,
  INLINE_EXPRESSION_REGEX,
  REROLL_DICE_REGEX, STANDARD_DICE_REGEX
} from "../constants/diceRegex";
import {explodeToSignMap} from "../constants/conversionMaps";
import {applyEndModifiers, getRerollValues} from "../utils/diceModifiers";
import {computeFullExpression, computeInlineExpression} from "../utils/computes";

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

export const countDiceParser = (result: ParsedDiceResultType): ParsedDiceResultType => {
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
      acc + countDice(cur, condition as RerollCondition, countType, targetNumber, "=", -1), 0))
  } else {
    countedDice = Math.abs(diceRolls.reduce((acc, cur) =>
      acc + countDice(cur, condition as RerollCondition, countType, targetNumber, difficultyCondition as RerollCondition, difficultyTargetNumber), 0))
  }

  return {
    ...result,
    rolls: diceRolls,
    result: countType === 'cs' ? countedDice : diceRolls.length - countedDice,
    successes: countedDice,
    fails: diceRolls.length - countedDice
  }
}

export const explodingDiceParser = (result: ParsedDiceResultType): ParsedDiceResultType => {
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
}

export const rerollDiceParser = (result: ParsedDiceResultType): ParsedDiceResultType => {
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
}

export const conditionalSubtractionParser = (result: ParsedDiceResultType): ParsedDiceResultType => {
  const {m} = result
  if (!m.match(CONDITIONAL_SUBTRACT_REGEX)) return result

  const [_, numberOfDiceString, diceValueString, _1, condition, targetString] = CONDITIONAL_SUBTRACT_REGEX.exec(m) as RegExpExecArray
  const numberOfDice = Number(numberOfDiceString)
  const diceValue = Number(diceValueString)
  const targetValue = Number(targetString)

  const diceRolls = getMultipleDiceRolls(numberOfDice, diceValue)

  return {
    ...result,
    rolls: diceRolls,
    result: diceRolls.reduce((acc, cur) => {
      if (!rollMatchesTarget(cur, condition as RerollCondition, targetValue)) {
        return acc + cur
      }
      return acc
    }, 0)
  }
}

export const standardDiceParser = (result: ParsedDiceResultType): ParsedDiceResultType => {
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
}

export const parseDiceTypes = (parsedObj: ParseResultType, mappingFunction: DiceParserMappingFunction): ParseResultType => {
  const parsedResults = parsedObj.results.map(mappingFunction)

  return {...parsedObj, results: parsedResults}
}

export const parseDiceRolls = (text: string): ParseResultType => {
  let parsedObj: ParseResultType = {original: text, parsed: text, wasSuccessful: true, results: []}

  try {
    parsedObj.results = Array.from(text.matchAll(ALL_TYPES_OF_DICE_REGEX), (m): ParsedDiceResultType => {
      const res = m[0]
      const {index: start} = m
      const end = start as number + res.length

      return {m: res, start: start ?? 0, end, rolls: [], result: -1}
    })

    const parsingFunctionArray = [countDiceParser, explodingDiceParser, rerollDiceParser, standardDiceParser, conditionalSubtractionParser]

    parsingFunctionArray.forEach((mappingFunction) => {
      parsedObj = parseDiceTypes(parsedObj, mappingFunction)
    })

    return parseOriginalString(parsedObj)
  } catch (error) {
    console.error(error)
    parsedObj.wasSuccessful = false
    return parsedObj
  }
}

export const parse = (text: string): ParseResultType => {
  let computedObject: ParseResultType = {
    original: text,
    parsed: text,
    wasSuccessful: true,
    results: []
  }

  try {
    computedObject = computeInlineExpression(computedObject)
    computedObject = computeFullExpression(computedObject)
  } catch (e) {
    computedObject.wasSuccessful = false
  }


  return computedObject
}
