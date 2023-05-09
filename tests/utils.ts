import {expect} from "vitest";
import {sumArray} from "../src/utils/sum";
import {max} from "mathjs";

export const basicRollTest = (currentRoll: number[], expectedSum: number, numberOfDiceToExpect: number, maxDieValue: number) => {
  expect(currentRoll.length).eq(numberOfDiceToExpect)
  expect(sumArray(currentRoll)).eq(expectedSum)
  expect(max(...currentRoll)).toBeLessThanOrEqual(maxDieValue)
}