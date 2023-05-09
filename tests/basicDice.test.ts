import {describe, expect, it} from "vitest";
import {parse} from "../src";
import {basicRollTest} from "./utils";

describe('basic rolls', () => {
  const parsedBasicSingle = parse('[[1d2]] [[1d4]] [[1d6]] [[1d8]] [[1d10]] [[1d12]] [[1d20]] [[1d100]]')
  const parsedBasicMultiple = parse('[[2d20]] [[20d20]] [[200d20]]')

  it('should roll d2', () =>
    basicRollTest(parsedBasicSingle.results[0].rolls, parsedBasicSingle.results[0].result, 1, 2))
  it('should roll d4', () =>
    basicRollTest(parsedBasicSingle.results[1].rolls, parsedBasicSingle.results[1].result, 1, 4))
  it('should roll d6', () =>
    basicRollTest(parsedBasicSingle.results[2].rolls, parsedBasicSingle.results[2].result, 1, 6))
  it('should roll d8', () =>
    basicRollTest(parsedBasicSingle.results[3].rolls, parsedBasicSingle.results[3].result, 1, 8))
  it('should roll d10', () =>
    basicRollTest(parsedBasicSingle.results[4].rolls, parsedBasicSingle.results[4].result, 1, 10))
  it('should roll d12', () =>
    basicRollTest(parsedBasicSingle.results[5].rolls, parsedBasicSingle.results[5].result, 1, 12))
  it('should roll d20', () =>
    basicRollTest(parsedBasicSingle.results[6].rolls, parsedBasicSingle.results[6].result, 1, 20))
  it('should roll d100', () =>
    basicRollTest(parsedBasicSingle.results[7].rolls, parsedBasicSingle.results[7].result, 1, 100))

  it('should roll 2d20', () =>
    basicRollTest(parsedBasicMultiple.results[0].rolls, parsedBasicMultiple.results[0].result, 2, 20))
  it('should roll 20d20', () =>
    basicRollTest(parsedBasicMultiple.results[1].rolls, parsedBasicMultiple.results[1].result, 20, 20))
  it('should roll 200d20', () =>
    basicRollTest(parsedBasicMultiple.results[2].rolls, parsedBasicMultiple.results[2].result, 200, 20))
})