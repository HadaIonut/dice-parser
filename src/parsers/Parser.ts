import type {ParseResultType} from '../types'
import {standardDiceParser} from './dice-parsers/StandardDiceParser'

const ALL_TYPES_OF_DICE_REGEX = /(?:\d+d\d+)(?:r|rr|x|xo|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim

export const parse = (text: string): ParseResultType => {
  let parsedObj: ParseResultType = {original: text, parsed: text, wasSuccessful: true, matches: [], results: []}

  try {
    parsedObj.matches = text.match(ALL_TYPES_OF_DICE_REGEX) || []
    parsedObj = standardDiceParser(parsedObj)

    return parsedObj
  } catch (error) {
    console.error(error)
    parsedObj.wasSuccessful = false
    return parsedObj
  }
}
