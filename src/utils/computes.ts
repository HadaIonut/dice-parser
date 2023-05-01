import {ParseResultType} from "../types";
import {INLINE_EXPRESSION_REGEX} from "../constants/diceRegex";
import {math} from "../mathJs";
import {parseDiceRolls} from "../parsers/Parser";

export const computeInlineExpression = (computedObject: ParseResultType): ParseResultType => {
  if (!computedObject.parsed.match(INLINE_EXPRESSION_REGEX)) return computedObject

  computedObject.parsed = computedObject.parsed.replace(INLINE_EXPRESSION_REGEX, (_, equation) => {
    const parsedDiceRolls = parseDiceRolls(equation)
    computedObject.wasSuccessful = parsedDiceRolls.wasSuccessful
    computedObject.results.push(...parsedDiceRolls.results)

    return `[[${math.evaluate(parsedDiceRolls.parsed)}]]`
  })

  return computedObject
}

export const computeFullExpression = (computedObject: ParseResultType): ParseResultType => {
  if (computedObject.parsed.startsWith('/r')) {
    const rollExpression = computedObject.parsed.replace('/r', '')
    const parsedDiceRolls = parseDiceRolls(rollExpression)
    computedObject.results.push(...parsedDiceRolls.results)
    computedObject.wasSuccessful = parsedDiceRolls.wasSuccessful

    computedObject.parsed = math.evaluate(parsedDiceRolls.parsed)
  }

  return computedObject
}