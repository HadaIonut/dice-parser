import {describe, expect, it} from "vitest";
import {parse} from "../src";
import {basicRollTest} from "./utils";

describe('dice with reroll', () => {
  const parsedReroll = parse('[[10d10r1]] [[20d20r<10]] [[20d20rr<15]]')

  it('should reroll 1s', () => {
    const rerollResult = parsedReroll.results[0]

    const numberOfOnes = rerollResult.rolls.filter((roll) => roll === 1).length
    const numberOfOnesUsed = rerollResult.rollsUsed?.filter((roll) => roll === 1).length ?? 0

    const numberOfRerolls = numberOfOnes - numberOfOnesUsed

    expect(rerollResult.rolls.length).eq(10 + numberOfRerolls)

    basicRollTest(rerollResult.rollsUsed as number[], rerollResult.result, 10, 10)
  })

  it('should reroll smaller then 10', () => {
    const rerollResult = parsedReroll.results[1]

    const rollsSmallerThenTarget = rerollResult.rolls.filter((roll) => roll < 10).length
    const smallerThenTargetAfterReroll = rerollResult?.rollsUsed?.filter?.((roll) => roll < 10)?.length ?? 0
    const numberOfRerolls = rollsSmallerThenTarget - smallerThenTargetAfterReroll

    expect(rerollResult.rolls.length).eq(20 + numberOfRerolls)

    basicRollTest(rerollResult.rollsUsed as number[], rerollResult.result, 20, 20)
  })

  it('should recursively reroll smaller then 15', () => {
    const rerollResult = parsedReroll.results[2]

    const smallerThenTargetAfterReroll = rerollResult?.rollsUsed?.filter?.((roll) => roll < 15)?.length ?? 0

    expect(smallerThenTargetAfterReroll).eq(0)

    basicRollTest(rerollResult.rollsUsed as number[], rerollResult.result, 20, 20)
  })
})