// DEPRECATED

import type {RandomOrgRandomIntegerUrlType, RandomIntegerParamsType} from '../types'

const randomOrgQuotaUrl = (format = 'plain'): string => `https://www.random.org/quota/?format=${format}`
const randomOrgIntegerUrl = ({
  num = 10, min = 1, max = 20, col = 1, base = 10, format = 'plain', rnd = 'new',
}: RandomOrgRandomIntegerUrlType = {}): string => `https://www.random.org/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=${rnd}`

const getRandomOrgQuota = async (): Promise<number> => {
  try {
    const quotaUrl = randomOrgQuotaUrl()
    const quotaResult = await fetch(quotaUrl)
    const quotaText = await quotaResult.text()

    return Number(quotaText)
  } catch (error) {
    return NaN
  }
}

const hasRandomOrgQuota = async (): Promise<boolean> => {
  const quota = await getRandomOrgQuota()
  return Number.isNaN(quota) ? false : quota > 1000
}

export const getRandomOrgRandomIntegers = async ({num = 10, min = 1, max = 20}: RandomIntegerParamsType = {}): Promise<number[]> => {
  const quota = await hasRandomOrgQuota()
  if (!quota) return []

  try {
    const randomIntegerUrl = randomOrgIntegerUrl({num, min, max})
    const randomIntegersResult = await fetch(randomIntegerUrl)
    const randomIntegersText = await randomIntegersResult.text()

    const randomIntegersArray = randomIntegersText.split('\n')
    return randomIntegersArray.slice(0, randomIntegersArray.length - 1).map((n) => Number(n))
  } catch (error) {
    return []
  }
}

/* export const getDiceRollAsync = async (dice: number): Promise<number> => {
  const id = `${dice}`

  const isCached: boolean = hasCache(id)
  if (isCached) return getFromCache(id) as number

  const randomOrgGeneratedValues: number[] = await getRandomOrgRandomIntegers({max: dice})
  const generatedValues: number[] = getRandomIntegers({max: dice})
  const valueToCache: number[] = randomOrgGeneratedValues.length ? randomOrgGeneratedValues : generatedValues

  return addToCache(id, valueToCache) as number
} */
