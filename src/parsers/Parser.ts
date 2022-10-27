import type { ParseResultType } from '../types'
import { getMultipleDiceRolls } from './RollsProvider'

const ALL_TYPES_OF_DICE_REGEX = /(?:\d+d\d+)(?:r|rr|x|xo|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim
const STANDARD_DICE_REGEX = /^(\d+)d(\d+)$/gim

export const parseOriginalString = (parsedObj: ParseResultType): ParseResultType => {
  const { parsed, results } = parsedObj
  let parsedWithResults = parsed

  let lengthChanged = 0
  for (let i = 0; i < results.length; i++) {
    const res = results[i];
    const { m, result, start, end } = res

    if (typeof result === 'undefined') continue
    parsedWithResults = `${parsedWithResults.substring(0, start - lengthChanged)}${result}${parsedWithResults.substring(end - lengthChanged, parsedWithResults.length)}`
    lengthChanged += m.length - `${result}`.length
  }
  return { ...parsedObj, parsed: parsedWithResults }
}

export const standardDiceParser = (parsedObj: ParseResultType): ParseResultType => {
  const parsedResults = parsedObj.results.map((result) => {
    const { m } = result
    if (!m.match(STANDARD_DICE_REGEX)) return result

    const [_, numberOfDiceString, diceValueString] = STANDARD_DICE_REGEX.exec(m) as RegExpExecArray
    const numberOfDice = Number(numberOfDiceString)
    const diceValue = Number(diceValueString)

    const diceRolls = getMultipleDiceRolls(numberOfDice, diceValue)
    const diceSum = diceRolls.reduce((res, dice) => res + dice, 0)
    return { ...result, rolls: diceRolls, result: diceSum }
  })

  return { ...parsedObj, results: parsedResults }
}

export const parse = (text: string): ParseResultType => {
  let parsedObj: ParseResultType = { original: text, parsed: text, wasSuccessful: true, results: [] }

  try {
    parsedObj.results = Array.from(text.matchAll(ALL_TYPES_OF_DICE_REGEX), (m) => {
      const res = m[0]
      const { index: start } = m
      const end = start as number + res.length

      return { m: res, start, end }
    })

    parsedObj = standardDiceParser(parsedObj)

    return parseOriginalString(parsedObj)
  } catch (error) {
    console.error(error)
    parsedObj.wasSuccessful = false
    return parsedObj
  }
}
