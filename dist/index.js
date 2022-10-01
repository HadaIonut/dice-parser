const n = /* @__PURE__ */ new Map(), s = () => n, l = (o) => {
  var e;
  return n.has(o) && !!((e = n.get(o)) != null && e.length);
}, g = (o, e) => {
  const t = [...e], c = t.pop();
  return n.set(o, t), c;
}, r = (o) => {
  if (!l(o))
    return;
  const e = [...n.get(o) || []], t = e.pop();
  return n.set(o, e), t;
}, h = (o, e) => Math.floor(Math.random() * (e - o + 1) + o), u = ({ num: o = 100, min: e = 1, max: t = 20 } = {}) => Array.from({ length: o }, () => h(e, t)), a = (o) => {
  const e = `${o}`;
  if (l(e))
    return r(e);
  const c = u({ max: o });
  return g(e, c);
};
(async () => (console.log(s().get("20")), console.log(await a(20)), console.log(s().get("20")), console.log(await a(20)), console.log(s().get("20")), console.log(await a(20)), console.log(s().get("20"))))();
//# sourceMappingURL=index.js.map
