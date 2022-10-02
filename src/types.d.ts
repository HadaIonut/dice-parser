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

export type ParsedDiceResultType = {}

export type ParseResultType = {
  original: string,
  parsed: string,
  wasSuccessful: boolean,
  matches: string[],
  results: ParsedDiceResultType[]
}
