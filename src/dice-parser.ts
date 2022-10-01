import { hasQuota } from "./RandomOrg"

(async () => {
  const q = await hasQuota()
  console.log(q)
})()

export { }