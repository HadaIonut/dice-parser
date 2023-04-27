const A = (e, r) => Math.floor(Math.random() * (r - e + 1) + e), I = ({ num: e = 20, min: r = 1, max: t = 20 } = {}) => Array.from({ length: e }, () => A(r, t)), m = /* @__PURE__ */ new Map(), R = (e) => {
  var r;
  return m.has(e) && !!((r = m.get(e)) != null && r.length);
}, v = (e, r) => {
  const t = [...r], s = t.pop();
  return m.set(e, t), s;
}, O = (e) => {
  if (!R(e))
    return;
  const r = [...m.get(e) || []], t = r.pop();
  return m.set(e, r), t;
}, D = (e) => {
  if (R(e))
    return O(e);
  const t = I({ max: e });
  return v(e, t);
}, _ = (e, r) => Array.from({ length: e }, () => D(r)), x = (e, r, t, s = []) => {
  const c = D(e), n = [...s, c];
  switch (r) {
    case "<":
      return c >= t ? n : x(e, r, t, n);
    case ">":
      return c <= t ? n : x(e, r, t, n);
    case "=":
      return c === t ? x(e, r, t, n) : n;
    case "o":
      return [c, D(e)];
  }
}, C = (e, r, t, s) => {
  let c = [];
  for (let n = 0; n < s; n++)
    c = [...c, ...x(e, r, t)];
  return c;
}, S = (e, r) => (e.sort((t, s) => t - s), e.slice(0, r)), b = (e, r) => (e.sort((t, s) => s - t), e.slice(0, r)), f = (e) => e.reduce((r, t) => r + t, 0), G = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim, p = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, E = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dl|dh)?(\d+)?$/gim, N = /^(\d+)d(\d+)(kh|kl|dl|dh)?(\d+)?$/gim, M = {
  x: "=",
  "x<": "<",
  "x>": ">",
  xo: "o"
}, w = (e) => {
  const { parsed: r, results: t } = e;
  let s = r, c = 0;
  for (let n = 0; n < t.length; n++) {
    const u = t[n], { m: a, result: d, start: i, end: o } = u;
    typeof d > "u" || (s = s.substring(0, i - c) + d + s.substring(o - c, s.length), c += a.length - `${d}`.length);
  }
  return { ...e, parsed: s };
}, L = (e) => {
  const r = e.results.map((t) => {
    const { m: s } = t;
    if (!s.match(p))
      return t;
    const [c, n, u, a, d, i] = p.exec(s), o = Number(n), l = Number(u), h = _(o, l);
    return { ...t, rolls: h, result: f(h) };
  });
  return { ...e, results: r };
}, P = (e) => {
  const r = e.results.map((t) => {
    const { m: s } = t;
    if (!s.match(N))
      return t;
    const [c, n, u, a, d] = N.exec(s), i = Number(n), o = Number(u), l = _(i, o);
    return a ? {
      ...t,
      rolls: l,
      result: f(k(a, Number(d != null ? d : 1), l))
    } : { ...t, rolls: l, result: f(l) };
  });
  return { ...e, results: r };
}, k = (e, r, t) => e === "kh" ? b(t, r) : e === "kl" ? S(t, r) : e === "dh" ? S(t, t.length - r) : e === "dl" ? b(t, t.length - r) : t, X = (e) => {
  const r = e.results.map((t) => {
    const { m: s } = t;
    if (!s.match(E))
      return t;
    const [c, n, u, a, d, i, o] = E.exec(s), l = Number(n), h = Number(u), V = Number(d), g = C(h, M[a], V, l);
    return i ? {
      ...t,
      rolls: g,
      result: f(k(i, Number(o != null ? o : 1), g))
    } : { ...t, rolls: g, result: f(g) };
  });
  return { ...e, results: r };
}, $ = (e) => {
  let r = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return r.results = Array.from(e.matchAll(G), (t) => {
      const s = t[0], { index: c } = t, n = c + s.length;
      return { m: s, start: c, end: n };
    }), r = X(r), r = L(r), r = P(r), w(r);
  } catch (t) {
    return console.error(t), r.wasSuccessful = !1, r;
  }
};
(async () => {
  const r = $(`
    1d2 1d2 1d4 1d6 1d8 1d10 1d12 1d20 1d100 2d20 20d20 200d20
    1d10r1 1d20r<10 1d20rr<3 5d10x10 1d20x<10kh 1d20x>10kh 6d10xo10 5d10xo<8x10cs>=8
    3d10k 4d6k3 2d20kh 3d10kl 4d6kl3 2d20kl 3d6d 4d10d2 3d6dh 4d10min2 4d10max8
    10d20cs20 10d20cs>10 6d10cs>=6 1d100cs<=20 3d6even 5d10cs>=6df=1
    5d10cs>=8x=10 5d10cs>=8x>=9 10d10cs>=8x>=8 10d20cf20 10d20cf>10 6d10cf>=6
    1d100cf<=20 4d6cs6df1 10d10cs>5df1 1d10cs=10df=1 3d6sf<3 3d6ms10
    Ana are 1d6 mere.
    Ion a luat 1d8 slashing dmg de la sapa.
    1d6 + 2d4
  `);
  console.log(r.results);
})();
//# sourceMappingURL=index.js.map
