export type RandomOrgRandomIntegerUrlType = {
  num?: number,
  min?: number,
  max?: number,
  col?: number,
  base?: number,
  format?: string,
  rnd?: string
}

export type RandomIntegerParamsType = {
  num?: number,
  min?: number,
  max?: number
}

export type ParsedDiceResultType = {
  m: string
  start: number
  end: number
  rolls: number[]
  rollsUsed?: number[]
  successes?: number
  fails?: number
  result: number
}

export type ParseResultType = {
  original: string,
  parsed: string,
  wasSuccessful: boolean,
  results: ParsedDiceResultType[]
}

export type ExplodeUntilTypes = '='|'<'|'>'|'o'

export type ExplodeTypes = 'x' | 'x<' | 'x>' | 'xo'

export type ExplodeMap = {[key in ExplodeTypes] : ExplodeUntilTypes}

export type DiceKeepTypes = 'kh' | 'kl' | 'dl' | 'dh' | 'k' | 'd'

export type MinMaxTypes = 'min' | 'max' | undefined

export type RerollCondition = '>='|'<='|'>'|'<'|'='|'odd'|'even'

export type DiceParserMappingFunction = (result: ParsedDiceResultType) => ParsedDiceResultType
