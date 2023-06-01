import {describe, expect, it} from "vitest";
import {parse} from "../src";
import {sumArray} from "../src/utils/sum";

describe('dice with modifiers', () => {
  const parsedResult = parse('[[3d10k]] [[4d6k3]] [[2d20kh]] [[3d10kl]] [[4d6kl3]] [[2d20kl]] [[3d6d]] [[4d10d2]] [[3d6dh]] [[4d10min2]] [[4d10max8]]')

  it('should keep highest 1', ()  =>{
    const modifiedRolls = parsedResult.results[0]

    expect(Math.max(...modifiedRolls.rolls)).eq(modifiedRolls.result)
  });

  it('should keep highest n', ()  =>{
    const modifiedRolls = parsedResult.results[1]

    const sortedRolls = modifiedRolls.rolls.sort((a,b) => b - a)

    expect(sumArray(sortedRolls.splice(0, 3))).eq(modifiedRolls.result)
  });

  it('should keep highest 1 again', ()  =>{
    const modifiedRolls = parsedResult.results[2]

    expect(Math.max(...modifiedRolls.rolls)).eq(modifiedRolls.result)
  });

  it('should keep lowest 1', ()  =>{
    const modifiedRolls = parsedResult.results[3]

    expect(Math.min(...modifiedRolls.rolls)).eq(modifiedRolls.result)
  });

  it('should keep lowest 3', ()  =>{
    const modifiedRolls = parsedResult.results[4]

    const sortedRolls = modifiedRolls.rolls.sort((a, b) => a - b)

    expect(sumArray(sortedRolls.splice(0, 3))).eq(modifiedRolls.result)
  });

  it('should keep lowest 1 again', ()  =>{
    const modifiedRolls = parsedResult.results[5]

    expect(Math.min(...modifiedRolls.rolls)).eq(modifiedRolls.result)
  });

  it('should drop lowest 1 ', ()  =>{
    const modifiedRolls = parsedResult.results[6]

    const highestRolls = modifiedRolls.rolls.sort().splice(1)

    expect(sumArray(highestRolls)).eq(modifiedRolls.result)
  });

  it('should drop lowest 2 ', ()  =>{
    const modifiedRolls = parsedResult.results[7]

    const highestRolls = modifiedRolls.rolls.sort((a, b) => a - b).splice(2)

    expect(sumArray(highestRolls)).eq(modifiedRolls.result)
  });

  it('should drop highest 1 ', ()  =>{
    const modifiedRolls = parsedResult.results[8]

    const highestRolls = modifiedRolls.rolls.sort((a,b) =>b - a).splice(1)

    expect(sumArray(highestRolls)).eq(modifiedRolls.result)
  });

  it('should replace numbers lower then 2 with 2 ', ()  =>{
    const modifiedRolls = parsedResult.results[9]

    expect(Math.min(...modifiedRolls.rollsUsed as number[])).gte(2)
    expect(sumArray(modifiedRolls.rolls)).lte(sumArray(modifiedRolls.rollsUsed as number[]))

    expect(sumArray(modifiedRolls.rollsUsed as number[])).eq(modifiedRolls.result)
  });

  it('should replace numbers higher then 8 with 8 ', ()  =>{
    const modifiedRolls = parsedResult.results[10]

    expect(Math.max(...modifiedRolls.rollsUsed as number[])).lte(8)
    expect(sumArray(modifiedRolls.rolls)).gte(sumArray(modifiedRolls.rollsUsed as number[]))

    expect(sumArray(modifiedRolls.rollsUsed as number[])).eq(modifiedRolls.result)
  });
})