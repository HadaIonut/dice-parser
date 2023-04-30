import {math} from "./mathJs.js";

export const INLINE_MATH_REGEX = /\[\[([\d +-/*()]+)]]/gim

export const computeInlineMath = (text: string) => {
  if (!text.match(INLINE_MATH_REGEX)) return text

  return text.replace(INLINE_MATH_REGEX, (_, equation) => `[[${math.evaluate(equation)}]]`)
}

export const computeFullMessageMath = (text: string): string => {
  if (text.startsWith('/r')) return math.evaluate(text.replace('/r', ''))
  return text
}

export const computeMath = (text: string): string => {
  text = computeInlineMath(text)
  text = computeFullMessageMath(text)

  return text
}