import type { RandomOrgIntegerUrlType } from "./types"

const randomOrgQuotaUrl = (format: string = 'plain'): string => `https://www.random.org/quota/?format=${format}`
const randomOrgIntegerUrl = ({
  num = 10, min = 1, max = 20, col = 1, base = 10, format = "plain", rnd = "new"
}: RandomOrgIntegerUrlType = {}): string => `https://www.random.org/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=${rnd}`

const getQuota = async (): Promise<number> => {
  const quotaUrl = randomOrgQuotaUrl()
  const quotaResult = await fetch(quotaUrl)
  const quotaText = await quotaResult.text()

  return Number(quotaText);
}

const hasQuota = async (): Promise<boolean> => {
  const quota = await getQuota()
  return Number.isNaN(quota) ? false : quota > 1000
}

export { getQuota, hasQuota }