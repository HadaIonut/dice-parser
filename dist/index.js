const v = (e, s) => Math.floor(Math.random() * (s - e + 1) + e), w = ({ num: e = 20, min: s = 1, max: r = 20 } = {}) => Array.from({ length: e }, () => v(s, r)), g = /* @__PURE__ */ new Map(), k = (e) => {
  var s;
  return g.has(e) && !!((s = g.get(e)) != null && s.length);
}, M = (e, s) => {
  const r = [...s], t = r.pop();
  return g.set(e, r), t;
}, O = (e) => {
  if (!k(e))
    return;
  const s = [...g.get(e) || []], r = s.pop();
  return g.set(e, s), r;
}, D = (e) => {
  if (k(e))
    return O(e);
  const r = w({ max: e });
  return M(e, r);
}, A = (e, s) => Array.from({ length: e }, () => D(s)), x = (e, s, r, t = []) => {
  const c = D(e), n = [...t, c];
  switch (s) {
    case "<":
      return c >= r ? n : x(e, s, r, n);
    case ">":
      return c <= r ? n : x(e, s, r, n);
    case "=":
      return c === r ? x(e, s, r, n) : n;
    case "o":
      return [c, D(e)];
  }
}, V = (e, s, r, t) => {
  let c = [];
  for (let n = 0; n < t; n++)
    c = [...c, ...x(e, s, r)];
  return c;
}, C = (e, s, r) => {
  switch (s) {
    case "=":
      return e === r;
    case ">":
      return e < r;
    case "<":
      return e > r;
    case "<=":
      return e >= r;
    case ">=":
      return e <= r;
  }
}, G = (e, s, r, t) => {
  const c = [], n = [...e];
  for (const l in e)
    if (C(e[l], s, r)) {
      const d = D(t);
      c.push(d), n[l] = d;
    }
  return [c, n];
}, N = (e, s) => (e.sort((r, t) => r - t), e.slice(0, s)), R = (e, s) => (e.sort((r, t) => t - r), e.slice(0, s)), h = (e) => e.reduce((s, r) => s + r, 0), L = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim, E = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, p = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dl|dh)?(\d+)?$/gim, _ = /^(\d+)d(\d+)(kh|kl|dl|dh)?(\d+)?$/gim, P = {
  x: "=",
  "x<": "<",
  "x>": ">",
  xo: "o"
}, X = (e) => {
  const { parsed: s, results: r } = e;
  let t = s, c = 0;
  for (let n = 0; n < r.length; n++) {
    const l = r[n], { m: d, result: o, start: a, end: u } = l;
    typeof o > "u" || (t = t.substring(0, a - c) + o + t.substring(u - c, t.length), c += d.length - `${o}`.length);
  }
  return { ...e, parsed: t };
}, $ = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(E))
      return r;
    const [c, n, l, d, o, a] = E.exec(t), u = Number(n), i = Number(l), b = Number(a), m = A(u, i);
    if (d === "r") {
      const [f, S] = G(m, o != null ? o : "=", b, i);
      return {
        ...r,
        rolls: [...m, ...f],
        rollsUsed: S,
        result: h(S)
      };
    }
    return { ...r, rolls: m, result: h(m) };
  });
  return { ...e, results: s };
}, y = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(_))
      return r;
    const [c, n, l, d, o] = _.exec(t), a = Number(n), u = Number(l), i = A(a, u);
    return d ? {
      ...r,
      rolls: i,
      result: h(I(d, Number(o != null ? o : 1), i))
    } : { ...r, rolls: i, result: h(i) };
  });
  return { ...e, results: s };
}, I = (e, s, r) => e === "kh" ? R(r, s) : e === "kl" ? N(r, s) : e === "dh" ? N(r, r.length - s) : e === "dl" ? R(r, r.length - s) : r, U = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(p))
      return r;
    const [c, n, l, d, o, a, u] = p.exec(t), i = Number(n), b = Number(l), m = Number(o), f = V(b, P[d], m, i);
    return a ? {
      ...r,
      rolls: f,
      result: h(I(a, Number(u != null ? u : 1), f))
    } : { ...r, rolls: f, result: h(f) };
  });
  return { ...e, results: s };
}, F = (e) => {
  let s = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return s.results = Array.from(e.matchAll(L), (r) => {
      const t = r[0], { index: c } = r, n = c + t.length;
      return { m: t, start: c, end: n };
    }), s = U(s), s = $(s), s = y(s), X(s);
  } catch (r) {
    return console.error(r), s.wasSuccessful = !1, s;
  }
};
(async () => {
  const s = F(`
    1d2 1d2 1d4 1d6 1d8 1d10 1d12 1d20 1d100 2d20 20d20 200d20
    1d10r1 2d20r<10 2d20rr<15 5d10x10 1d20x<10kh 1d20x>10kh 6d10xo10 5d10xo<8x10cs>=8
    3d10k 4d6k3 2d20kh 3d10kl 4d6kl3 2d20kl 3d6d 4d10d2 3d6dh 4d10min2 4d10max8
    10d20cs20 10d20cs>10 6d10cs>=6 1d100cs<=20 3d6even 5d10cs>=6df=1
    5d10cs>=8x=10 5d10cs>=8x>=9 10d10cs>=8x>=8 10d20cf20 10d20cf>10 6d10cf>=6
    1d100cf<=20 4d6cs6df1 10d10cs>5df1 1d10cs=10df=1 3d6sf<3 3d6ms10
    Ana are 1d6 mere.
    Ion a luat 1d8 slashing dmg de la sapa.
    1d6 + 2d4
  `);
  console.log(s.results);
})();
//# sourceMappingURL=index.js.map
