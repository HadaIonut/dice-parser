const v = (s, e) => Math.floor(Math.random() * (e - s + 1) + s), I = ({ num: s = 20, min: e = 1, max: t = 20 } = {}) => Array.from({ length: s }, () => v(e, t)), f = /* @__PURE__ */ new Map(), k = (s) => {
  var e;
  return f.has(s) && !!((e = f.get(s)) != null && e.length);
}, O = (s, e) => {
  const t = [...e], n = t.pop();
  return f.set(s, t), n;
}, G = (s) => {
  if (!k(s))
    return;
  const e = [...f.get(s) || []], t = e.pop();
  return f.set(s, e), t;
}, h = (s) => {
  if (k(s))
    return G(s);
  const t = I({ max: s });
  return O(s, t);
}, M = (s, e) => Array.from({ length: s }, () => h(e)), D = (s, e, t, n = []) => {
  const c = h(s), r = [...n, c];
  switch (e) {
    case "<":
      return c >= t ? r : D(s, e, t, r);
    case ">":
      return c <= t ? r : D(s, e, t, r);
    case "=":
      return c === t ? D(s, e, t, r) : r;
    case "o":
      return [c, h(s)];
  }
}, V = (s, e, t, n) => {
  let c = [];
  for (let r = 0; r < n; r++)
    c = [...c, ...D(s, e, t)];
  return c;
}, w = (s, e, t) => {
  switch (e) {
    case "=":
      return s === t;
    case ">":
      return s > t;
    case "<":
      return s < t;
    case "<=":
      return s <= t;
    case ">=":
      return s >= t;
  }
}, L = (s, e, t, n) => {
  const c = [], r = [...s];
  for (const d in s)
    if (w(s[d], e, t)) {
      const u = h(n);
      c.push(u), r[d] = u;
    }
  return [c, r];
}, P = (s, e, t, n) => {
  const c = [...s];
  let r = [...s];
  for (const d in r)
    for (; w(r[d], e, t); ) {
      const u = h(n);
      c.push(u), r[d] = u;
    }
  return [c, r];
}, R = (s, e) => (s.sort((t, n) => t - n), s.slice(0, e)), E = (s, e) => (s.sort((t, n) => n - t), s.slice(0, e)), g = (s) => s.reduce((e, t) => e + t, 0), X = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim, N = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, p = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dl|dh|min|max|)?(\d+)?$/gim, _ = /^(\d+)d(\d+)(kh|kl|dl|dh|min|max|)?(\d+)?$/gim, $ = {
  x: "=",
  "x<": "<",
  "x>": ">",
  xo: "o"
}, y = (s, e, t) => s === "kh" ? E(t, e) : s === "kl" ? R(t, e) : s === "dh" ? R(t, t.length - e) : s === "dl" ? E(t, t.length - e) : t, U = (s, e, t) => s === "min" ? t.map((n) => n <= e ? e : n) : s === "max" ? t.map((n) => n >= e ? e : n) : t, A = (s, e, t) => U(s, e, y(s, e, t)), F = (s, e, t, n, c) => c === "r" ? L(s, e != null ? e : "=", t, n) : c === "rr" ? P(s, e != null ? e : "=", t, n) : [[], s], K = (s) => {
  const { parsed: e, results: t } = s;
  let n = e, c = 0;
  for (let r = 0; r < t.length; r++) {
    const d = t[r], { m: u, result: o, start: i, end: a } = d;
    typeof o > "u" || (n = n.substring(0, i - c) + o + n.substring(a - c, n.length), c += u.length - `${o}`.length);
  }
  return { ...s, parsed: n };
}, W = (s) => {
  const e = s.results.map((t) => {
    const { m: n } = t;
    if (!n.match(N))
      return t;
    const [c, r, d, u, o, i] = N.exec(n), a = Number(r), l = Number(d), S = Number(i), x = M(a, l), [m, b] = F(x, o != null ? o : "=", S, l, u);
    return {
      ...t,
      rolls: [...x, ...m],
      rollsUsed: b,
      result: g(b)
    };
  });
  return { ...s, results: e };
}, Y = (s) => {
  const e = s.results.map((t) => {
    const { m: n } = t;
    if (!n.match(_))
      return t;
    const [c, r, d, u, o] = _.exec(n), i = Number(r), a = Number(d), l = M(i, a);
    return u ? {
      ...t,
      rolls: l,
      result: g(A(u, Number(o != null ? o : 1), l))
    } : { ...t, rolls: l, result: g(l) };
  });
  return { ...s, results: e };
}, q = (s) => {
  const e = s.results.map((t) => {
    const { m: n } = t;
    if (!n.match(p))
      return t;
    const [c, r, d, u, o, i, a] = p.exec(n), l = Number(r), S = Number(d), x = Number(o), m = V(S, $[u], x, l);
    return i ? {
      ...t,
      rolls: m,
      result: g(A(i, Number(a != null ? a : 1), m))
    } : { ...t, rolls: m, result: g(m) };
  });
  return { ...s, results: e };
}, z = (s) => {
  let e = { original: s, parsed: s, wasSuccessful: !0, results: [] };
  try {
    return e.results = Array.from(s.matchAll(X), (t) => {
      const n = t[0], { index: c } = t, r = c + n.length;
      return { m: n, start: c, end: r };
    }), e = q(e), e = W(e), e = Y(e), K(e);
  } catch (t) {
    return console.error(t), e.wasSuccessful = !1, e;
  }
};
(async () => {
  const e = z(`
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
  console.log(e.results);
})();
//# sourceMappingURL=index.js.map
