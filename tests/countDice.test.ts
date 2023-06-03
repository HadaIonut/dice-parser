import {describe, expect, it} from "vitest";
import {parse} from "../src";

describe('dice counting', () => {
  const parsedRolls = parse('[[40d20cs20]] [[10d20cs>10]] [[6d10cs>=6]] [[1d100cs<=20]] [[3d6even]] [[5d10cs>=6df=1]]' +
    '[[5d10cs>=8x=10]] [[5d10cs>=8x>=9]] [[10d20cf20]] [[10d20cf>10]]')

  it('should count number of 20s', () => {
    const rolls = parsedRolls.results[0].rolls

    const targetSum = rolls.filter((roll) => roll === 20).length
    expect(targetSum).eq(parsedRolls.results[0].result)
  });

  it('should count greater then target', () => {
    const rolls = parsedRolls.results[1].rolls

    const targetSum = rolls.filter((roll) => roll > 10).length
    expect(targetSum).eq(parsedRolls.results[1].result)
  });

  it('should count greater or equal then target', () => {
    const rolls = parsedRolls.results[2].rolls

    const targetSum = rolls.filter((roll) => roll >= 6).length
    expect(targetSum).eq(parsedRolls.results[2].result)
  });

  it('should count smaller or equal to target', () => {
    const rolls = parsedRolls.results[3].rolls

    const targetSum = rolls.filter((roll) => roll <= 20).length
    expect(targetSum).eq(parsedRolls.results[3].result)
  });

  it('should count even rolls', () => {
    const rolls = parsedRolls.results[4].rolls

    const targetSum = rolls.filter((roll) => roll % 2 === 0).length
    expect(targetSum).eq(parsedRolls.results[4].result)
  });

  it('should count greater then target and subtract 1s', () => {
    const rolls = parsedRolls.results[5].rolls

    const targetSum = Math.abs(rolls.reduce((acc, cur) => {
      if (cur === 1) return acc - 1;
      if (cur >= 6) return acc + 1;

      return acc;
    }, 0))

    expect(targetSum).eq(parsedRolls.results[5].result)
  });

  it('should count greater then target explode on 10s', () => {
    const rolls = parsedRolls.results[6].rolls

    const targetSum = rolls.filter((roll) => roll >= 8).length
    const explodedCount = rolls.slice(0, 5).filter((roll) => roll === 10).length

    expect(targetSum).eq(parsedRolls.results[6].result)
    expect(5 + explodedCount).eq(rolls.length)
  });

  it('should count greater then target explode on 9s and 10s', () => {
    const rolls = parsedRolls.results[7].rolls

    const targetSum = rolls.filter((roll) => roll >= 8).length
    const explodedCount = rolls.slice(0, 5).filter((roll) => roll >= 9).length

    expect(targetSum).eq(parsedRolls.results[7].result)
    expect(5 + explodedCount).eq(rolls.length)
  });

  it('should count number of 20s as fails', () => {
    const rolls = parsedRolls.results[8].rolls

    const targetSum = rolls.filter((roll) => roll !== 20).length
    expect(targetSum).eq(parsedRolls.results[8].result)
  });

  it('should count greater then target as fails', () => {
    const rolls = parsedRolls.results[9].rolls

    const targetSum = rolls.filter((roll) => !(roll > 10)).length
    expect(targetSum).eq(parsedRolls.results[9].result)
  });
})