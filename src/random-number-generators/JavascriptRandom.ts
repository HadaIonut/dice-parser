import type {RandomIntegerParamsType} from '../types'

const getRandomInclusive = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)
export const getRandomIntegers = ({num = 100, min = 1, max = 20}: RandomIntegerParamsType = {}): number[] => Array.from({length: num}, () => getRandomInclusive(min, max))
