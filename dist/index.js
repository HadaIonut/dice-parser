const l = (e, o) => Math.floor(Math.random() * (o - e + 1) + e), r = ({ num: e = 100, min: o = 1, max: t = 20 } = {}) => Array.from({ length: e }, () => l(o, t)), n = /* @__PURE__ */ new Map(), c = (e) => {
  var o;
  return n.has(e) && !!((o = n.get(e)) != null && o.length);
}, g = (e, o) => {
  const t = [...o], a = t.pop();
  return n.set(e, t), a;
}, h = (e) => {
  if (!c(e))
    return;
  const o = [...n.get(e) || []], t = o.pop();
  return n.set(e, o), t;
}, s = (e) => {
  const o = `${e}`;
  if (c(o))
    return h(o);
  const a = r({ max: e });
  return g(o, a);
};
(async () => (console.log(await s(20)), console.log(await s(20)), console.log(await s(20))))();
//# sourceMappingURL=index.js.map
