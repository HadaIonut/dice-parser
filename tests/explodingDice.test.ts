import {describe, expect, it} from "vitest";
import {parse} from "../src";
import {basicRollTest} from "./utils";
import {sumArray} from "../src/utils/sum";


describe("dice with explode",() => {
  const explodingDice = parse('[[5d10x10]] [[1d20x<10]] [[1d20x>10]] [[20d1xo1]]')

  it('should explode on equals',  () => {
    const explodeResult = explodingDice.results[0]

    const numberOfEqualities = explodeResult.rolls.filter((currentRoll) => currentRoll === 10).length

    expect(explodeResult.rolls.length).eq(5 + numberOfEqualities)
    basicRollTest(explodeResult.rolls, explodeResult.result, 5 + numberOfEqualities, 10)
  });

  it('should explode on less then target',  () => {
    const explodeResult = explodingDice.results[1]

    const numberOfEqualities = explodeResult.rolls.filter((currentRoll) => currentRoll < 10).length

    expect(explodeResult.rolls.length).eq(1 + numberOfEqualities)
    basicRollTest(explodeResult.rolls, explodeResult.result, 1 + numberOfEqualities, 20)
  });

  it('should explode on greater then target',  () => {
    const explodeResult = explodingDice.results[2]

    const numberOfEqualities = explodeResult.rolls.filter((currentRoll) => currentRoll > 10).length

    expect(explodeResult.rolls.length).eq(1 + numberOfEqualities)
    basicRollTest(explodeResult.rolls, explodeResult.result, 1 + numberOfEqualities, 20)
  });

  it('should explode only once',  ()  => {
    const explodeResult = explodingDice.results[3]

    expect(explodeResult.rolls.length).eq(40)
    expect(sumArray(explodeResult.rolls)).eq(40).eq(explodeResult.result)
  });
})