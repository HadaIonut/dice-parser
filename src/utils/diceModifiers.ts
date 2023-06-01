import {DiceKeepTypes, MinMaxTypes, RerollCondition} from "../types";
import {findGreatestN, findSmallestN} from "./peaks";
import {recursiveRerollDice, rerollDice} from "../parsers/RollsProvider";

export const keepDice = (keepType: DiceKeepTypes, keepCount: number, diceRolls: number[]) => {
  if (keepType === 'kh' || keepType === 'k') return findGreatestN(diceRolls, keepCount)
  if (keepType === 'kl') return findSmallestN(diceRolls, keepCount)
  if (keepType === 'dh') return findSmallestN(diceRolls, diceRolls.length - keepCount)
  if (keepType === 'dl' || keepType === 'd') return findGreatestN(diceRolls, diceRolls.length - keepCount)

  return diceRolls
}

export const applyMinMax = (modifierType: MinMaxTypes, modifierCap: number, diceRolls: number[]) => {
  if (modifierType === 'min') return diceRolls.map((roll) => roll <= modifierCap ? modifierCap : roll)
  if (modifierType === 'max') return diceRolls.map((roll) => roll >= modifierCap ? modifierCap : roll)

  return diceRolls
}

export const applyEndModifiers = (modifier: DiceKeepTypes | MinMaxTypes, target: number = 1, diceRolls: number[]) => {
  return applyMinMax(modifier as MinMaxTypes, target, keepDice(modifier as DiceKeepTypes, target, diceRolls))
}

export const getRerollValues = (rolledValues: number[], rerollCondition: RerollCondition, rerollTarget: number, diceType: number, rerollType: string) => {
  if (rerollType === 'r') return rerollDice(rolledValues, rerollCondition as RerollCondition ?? '=', rerollTarget, diceType)
  if (rerollType === 'rr') return recursiveRerollDice(rolledValues, rerollCondition as RerollCondition ?? '=', rerollTarget, diceType)

  return [[], rolledValues]
}