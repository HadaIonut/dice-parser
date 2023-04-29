const X = (e, r) => Math.floor(Math.random() * (r - e + 1) + e), L = ({ num: e = 20, min: r = 1, max: s = 20 } = {}) => Array.from({ length: e }, () => X(r, s)), D = /* @__PURE__ */ new Map(), G = (e) => {
  var r;
  return D.has(e) && !!((r = D.get(e)) != null && r.length);
}, $ = (e, r) => {
  const s = [...r], n = s.pop();
  return D.set(e, s), n;
}, U = (e) => {
  if (!G(e))
    return;
  const r = [...D.get(e) || []], s = r.pop();
  return D.set(e, r), s;
}, b = (e) => {
  if (G(e))
    return U(e);
  const s = L({ max: e });
  return $(e, s);
}, E = (e, r) => Array.from({ length: e }, () => b(r)), S = (e, r, s, n = []) => {
  const c = b(e), t = [...n, c];
  switch (r) {
    case "<":
      return c >= s ? t : S(e, r, s, t);
    case ">":
      return c <= s ? t : S(e, r, s, t);
    case "=":
      return c === s ? S(e, r, s, t) : t;
    case "o":
      return c === s ? [c, b(e)] : t;
  }
}, F = (e, r, s, n) => {
  let c = [];
  for (let t = 0; t < n; t++)
    c = [...c, ...S(e, r, s)];
  return c;
}, g = (e, r, s) => {
  switch (r) {
    case "=":
      return e === s;
    case ">":
      return e > s;
    case "<":
      return e < s;
    case "<=":
      return e <= s;
    case ">=":
      return e >= s;
    case "even":
      return e % 2 === 0;
    case "odd":
      return e % 2 === 1;
  }
}, T = (e, r, s, n) => {
  const c = [], t = [...e];
  for (const u in e)
    if (g(e[u], r, s)) {
      const d = b(n);
      c.push(d), t[u] = d;
    }
  return [c, t];
}, y = (e, r, s, n) => {
  const c = [...e];
  let t = [...e];
  for (const u in t)
    for (; g(t[u], r, s); ) {
      const d = b(n);
      c.push(d), t[u] = d;
    }
  return [c, t];
}, O = (e, r, s, n, c, t, u) => {
  const d = Number(g(e, t != null ? t : "=", u != null ? u : 0));
  return s === "cs" || s === "cf" ? Math.max(Number(g(e, r != null ? r : "=", n != null ? n : 0)) - d, -1) : s === "odd" || s === "even" ? Math.max(Number(g(e, s, 0)) - d, -1) : e;
}, K = (e, r, s, n) => {
  const c = [...e];
  return e.forEach((t) => {
    g(t, r, s) && c.push(b(n));
  }), c;
}, p = (e, r) => (e.sort((s, n) => s - n), e.slice(0, r)), A = (e, r) => (e.sort((s, n) => n - s), e.slice(0, r)), N = (e) => e.reduce((r, s) => r + s, 0), B = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|k|d|sf|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?(\d)*(df|x)?(>=|<=|>|<|=)?(\d+)?(kh|kl|dh|dl|k|d)?/gim, M = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, v = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dh|dl|k|d|min|max)?(\d+)?$/gim, I = /^(\d+)d(\d+)(cs|cf|even|odd)(>=|<=|>|<|=)?(\d+)?(df|x)?(>=|<=|>|<|=)?(\d+)?$/gim, w = /^(\d+)d(\d+)(sf)(>=|<=|>|<|=)?(\d+)$/gim, V = /^(\d+)d(\d+)(kh|kl|dh|dl|k|d|min|max|)?(\d+)?$/gim, W = {
  x: "=",
  "x<": "<",
  "x>": ">",
  xo: "o"
}, Y = (e, r, s) => e === "kh" || e === "k" ? A(s, r) : e === "kl" ? p(s, r) : e === "dh" ? p(s, s.length - r) : e === "dl" ? A(s, s.length - r) : s, q = (e, r, s) => e === "min" ? s.map((n) => n <= r ? r : n) : e === "max" ? s.map((n) => n >= r ? r : n) : s, P = (e, r = 1, s) => q(e, r, Y(e, r, s)), z = (e, r, s, n, c) => c === "r" ? T(e, r != null ? r : "=", s, n) : c === "rr" ? y(e, r != null ? r : "=", s, n) : [[], e], H = (e) => {
  const { parsed: r, results: s } = e;
  let n = r, c = 0;
  for (let t = 0; t < s.length; t++) {
    const u = s[t], { m: d, result: o, start: a, end: i } = u;
    typeof o > "u" || (n = n.substring(0, a - c) + o + n.substring(i - c, n.length), c += d.length - `${o}`.length);
  }
  return { ...e, parsed: n };
}, J = (e) => {
  const { m: r } = e;
  if (!r.match(I))
    return e;
  const [s, n, c, t, u, d, o, a, i] = I.exec(r), m = Number(n), l = Number(c), f = Number(d), k = Number(i);
  let h = E(m, l), x;
  return o === "x" ? (h = K(h, u, k, l), x = Math.abs(h.reduce((R, _) => R + O(_, u, t, f, !!o, "=", -1), 0))) : x = Math.abs(h.reduce((R, _) => R + O(_, u, t, f, !!o, a, k), 0)), {
    ...e,
    rolls: h,
    result: t === "cs" ? x : h.length - x,
    successes: x,
    fails: h.length - x
  };
}, Q = (e) => {
  const { m: r } = e;
  if (!r.match(v))
    return e;
  const [s, n, c, t, u, d, o] = v.exec(r), a = Number(n), i = Number(c), m = Number(u), l = F(i, W[t], m, a);
  return d ? {
    ...e,
    rolls: l,
    result: N(P(d, Number(o != null ? o : 1), l))
  } : { ...e, rolls: l, result: N(l) };
}, Z = (e) => {
  const { m: r } = e;
  if (!r.match(M))
    return e;
  const [s, n, c, t, u, d] = M.exec(r), o = Number(n), a = Number(c), i = Number(d), m = E(o, a), [l, f] = z(m, u != null ? u : "=", i, a, t);
  return {
    ...e,
    rolls: [...m, ...l],
    rollsUsed: f,
    result: N(f)
  };
}, j = (e) => {
  const { m: r } = e;
  if (!r.match(w))
    return e;
  const [s, n, c, t, u, d] = w.exec(r), o = Number(n), a = Number(c), i = Number(d), m = E(o, a);
  return {
    ...e,
    rolls: m,
    result: m.reduce((l, f) => g(f, u, i) ? l : l + f, 0)
  };
}, C = (e) => {
  const { m: r } = e;
  if (!r.match(V))
    return e;
  const [s, n, c, t, u] = V.exec(r), d = Number(n), o = Number(c), a = E(d, o);
  return t ? {
    ...e,
    rolls: a,
    result: N(P(t, Number(u != null ? u : 1), a))
  } : { ...e, rolls: a, result: N(a) };
}, ee = (e, r) => {
  const s = e.results.map(r);
  return { ...e, results: s };
}, re = (e) => {
  let r = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return r.results = Array.from(e.matchAll(B), (n) => {
      const c = n[0], { index: t } = n, u = t + c.length;
      return { m: c, start: t, end: u };
    }), [J, Q, Z, C, j].forEach((n) => {
      r = ee(r, n);
    }), H(r);
  } catch (s) {
    return console.error(s), r.wasSuccessful = !1, r;
  }
};
(async () => {
  const r = re(`
    1d2 1d2 1d4 1d6 1d8 1d10 1d12 1d20 1d100 2d20 20d20 200d20
    1d10r1 2d20r<10 2d20rr<15 5d10x10 1d20x<10kh 1d20x>10kh 6d10xo10
    3d10k 4d6k3 2d20kh 3d10kl 4d6kl3 2d20kl 3d6d 4d10d2 3d6dh 4d10min2 4d10max8
    10d20cs20 10d20cs>10 6d10cs>=6 1d100cs<=20 3d6even 5d10cs>=6df=1
    5d10cs>=8x=10 5d10cs>=8x>=9 10d10cs>=8x>=8 10d20cf20 10d20cf>10 6d10cf>=6
    1d100cf<=20 4d6cs6df1 10d10cs>5df<11 1d10cs=10df=1 3d6sf<3 
    Ana are 1d6 mere.
    Ion a luat 1d8 slashing dmg de la sapa.
    1d6 + 2d4
    1d6 - 2d4
    1d6 * 2d4
    1d6 / 2d4
  `);
  console.log(r.results);
})();
//# sourceMappingURL=index.js.map
