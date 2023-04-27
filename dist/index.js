const I = (e, s) => Math.floor(Math.random() * (s - e + 1) + e), V = ({ num: e = 20, min: s = 1, max: r = 20 } = {}) => Array.from({ length: e }, () => I(s, r)), x = /* @__PURE__ */ new Map(), k = (e) => {
  var s;
  return x.has(e) && !!((s = x.get(e)) != null && s.length);
}, M = (e, s) => {
  const r = [...s], t = r.pop();
  return x.set(e, r), t;
}, O = (e) => {
  if (!k(e))
    return;
  const s = [...x.get(e) || []], r = s.pop();
  return x.set(e, s), r;
}, D = (e) => {
  if (k(e))
    return O(e);
  const r = V({ max: e });
  return M(e, r);
}, w = (e, s) => Array.from({ length: e }, () => D(s)), R = (e, s, r, t = []) => {
  const c = D(e), n = [...t, c];
  switch (s) {
    case "<":
      return c >= r ? n : R(e, s, r, n);
    case ">":
      return c <= r ? n : R(e, s, r, n);
    case "=":
      return c === r ? R(e, s, r, n) : n;
    case "o":
      return [c, D(e)];
  }
}, C = (e, s, r, t) => {
  let c = [];
  for (let n = 0; n < t; n++)
    c = [...c, ...R(e, s, r)];
  return c;
}, A = (e, s, r) => {
  switch (s) {
    case "=":
      return e === r;
    case ">":
      return e > r;
    case "<":
      return e < r;
    case "<=":
      return e <= r;
    case ">=":
      return e >= r;
  }
}, G = (e, s, r, t) => {
  const c = [], n = [...e];
  for (const l in e)
    if (A(e[l], s, r)) {
      const o = D(t);
      c.push(o), n[l] = o;
    }
  return [c, n];
}, L = (e, s, r, t) => {
  const c = [...e];
  let n = [...e];
  for (const l in n)
    for (; A(n[l], s, r); ) {
      const o = D(t);
      c.push(o), n[l] = o;
    }
  return [c, n];
}, b = (e, s) => (e.sort((r, t) => r - t), e.slice(0, s)), N = (e, s) => (e.sort((r, t) => t - r), e.slice(0, s)), h = (e) => e.reduce((s, r) => s + r, 0), P = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim, p = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, E = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dl|dh)?(\d+)?$/gim, _ = /^(\d+)d(\d+)(kh|kl|dl|dh)?(\d+)?$/gim, T = {
  x: "=",
  "x<": "<",
  "x>": ">",
  xo: "o"
}, X = (e) => {
  const { parsed: s, results: r } = e;
  let t = s, c = 0;
  for (let n = 0; n < r.length; n++) {
    const l = r[n], { m: o, result: d, start: a, end: i } = l;
    typeof d > "u" || (t = t.substring(0, a - c) + d + t.substring(i - c, t.length), c += o.length - `${d}`.length);
  }
  return { ...e, parsed: t };
}, y = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(p))
      return r;
    const [c, n, l, o, d, a] = p.exec(t), i = Number(n), u = Number(l), S = Number(a), f = w(i, u);
    if (o === "r") {
      const [m, g] = G(f, d != null ? d : "=", S, u);
      return {
        ...r,
        rolls: [...f, ...m],
        rollsUsed: g,
        result: h(g)
      };
    } else if (o === "rr") {
      const [m, g] = L(f, d, S, u);
      return {
        ...r,
        rolls: m,
        rollsUsed: g,
        result: h(g)
      };
    }
    return { ...r, rolls: f, result: h(f) };
  });
  return { ...e, results: s };
}, U = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(_))
      return r;
    const [c, n, l, o, d] = _.exec(t), a = Number(n), i = Number(l), u = w(a, i);
    return o ? {
      ...r,
      rolls: u,
      result: h(v(o, Number(d != null ? d : 1), u))
    } : { ...r, rolls: u, result: h(u) };
  });
  return { ...e, results: s };
}, v = (e, s, r) => e === "kh" ? N(r, s) : e === "kl" ? b(r, s) : e === "dh" ? b(r, r.length - s) : e === "dl" ? N(r, r.length - s) : r, $ = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(E))
      return r;
    const [c, n, l, o, d, a, i] = E.exec(t), u = Number(n), S = Number(l), f = Number(d), m = C(S, T[o], f, u);
    return a ? {
      ...r,
      rolls: m,
      result: h(v(a, Number(i != null ? i : 1), m))
    } : { ...r, rolls: m, result: h(m) };
  });
  return { ...e, results: s };
}, F = (e) => {
  let s = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return s.results = Array.from(e.matchAll(P), (r) => {
      const t = r[0], { index: c } = r, n = c + t.length;
      return { m: t, start: c, end: n };
    }), s = $(s), s = y(s), s = U(s), X(s);
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
