const r = /* @__PURE__ */ new Map(), c = () => r, m = (t) => {
  var e;
  return r.has(t) && !!((e = r.get(t)) != null && e.length);
}, h = (t, e) => {
  const o = [...e], n = o.pop();
  return r.set(t, o), n;
}, i = (t) => {
  if (!m(t))
    return;
  const e = [...r.get(t) || []], o = e.pop();
  return r.set(t, e), o;
}, w = (t = "plain") => `https://www.random.org/quota/?format=${t}`, p = ({
  num: t = 10,
  min: e = 1,
  max: o = 20,
  col: n = 1,
  base: a = 10,
  format: s = "plain",
  rnd: g = "new"
} = {}) => `https://www.random.org/integers/?num=${t}&min=${e}&max=${o}&col=${n}&base=${a}&format=${s}&rnd=${g}`, R = async () => {
  try {
    const t = w(), o = await (await fetch(t)).text();
    return Number(o);
  } catch {
    return NaN;
  }
}, f = async () => {
  const t = await R();
  return Number.isNaN(t) ? !1 : t > 1e3;
}, y = async ({ num: t = 10, min: e = 1, max: o = 20 } = {}) => {
  if (!await f())
    return [];
  try {
    const a = p({ num: t, min: e, max: o }), u = (await (await fetch(a)).text()).split(`
`);
    return u.slice(0, u.length - 1).map((d) => Number(d));
  } catch {
    return [];
  }
}, I = (t, e) => Math.floor(Math.random() * (e - t + 1) + t), $ = ({ num: t = 100, min: e = 1, max: o = 20 } = {}) => Array.from({ length: t }, () => I(e, o)), l = async (t) => {
  const e = `${t}`;
  if (m(e))
    return i(e);
  const n = await y({ max: t }), a = $({ max: t }), s = n.length ? n : a;
  return h(e, s);
};
(async () => (console.log(c().get("20")), console.log(await l(20)), console.log(c().get("20")), console.log(await l(20)), console.log(c().get("20")), console.log(await l(20)), console.log(c().get("20"))))();
//# sourceMappingURL=index.js.map
