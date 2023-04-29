const V = (e, r) => Math.floor(Math.random() * (r - e + 1) + e), X = ({ num: e = 20, min: r = 1, max: s = 20 } = {}) => Array.from({ length: e }, () => V(r, s)), D = /* @__PURE__ */ new Map(), G = (e) => {
  var r;
  return D.has(e) && !!((r = D.get(e)) != null && r.length);
}, L = (e, r) => {
  const s = [...r], n = s.pop();
  return D.set(e, s), n;
}, $ = (e) => {
  if (!G(e))
    return;
  const r = [...D.get(e) || []], s = r.pop();
  return D.set(e, r), s;
}, g = (e) => {
  if (G(e))
    return $(e);
  const s = X({ max: e });
  return L(e, s);
}, R = (e, r) => Array.from({ length: e }, () => g(r)), S = (e, r, s, n = []) => {
  const c = g(e), t = [...n, c];
  switch (r) {
    case "<":
      return c >= s ? t : S(e, r, s, t);
    case ">":
      return c <= s ? t : S(e, r, s, t);
    case "=":
      return c === s ? S(e, r, s, t) : t;
    case "o":
      return c === s ? [c, g(e)] : t;
  }
}, F = (e, r, s, n) => {
  let c = [];
  for (let t = 0; t < n; t++)
    c = [...c, ...S(e, r, s)];
  return c;
}, x = (e, r, s) => {
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
}, U = (e, r, s, n) => {
  const c = [], t = [...e];
  for (const u in e)
    if (x(e[u], r, s)) {
      const d = g(n);
      c.push(d), t[u] = d;
    }
  return [c, t];
}, y = (e, r, s, n) => {
  const c = [...e];
  let t = [...e];
  for (const u in t)
    for (; x(t[u], r, s); ) {
      const d = g(n);
      c.push(d), t[u] = d;
    }
  return [c, t];
}, p = (e, r, s, n, c, t, u) => {
  const d = Number(x(e, t != null ? t : "=", u != null ? u : 0));
  return s === "cs" || s === "cf" ? Math.max(Number(x(e, r != null ? r : "=", n != null ? n : 0)) - d, -1) : s === "odd" || s === "even" ? Math.max(Number(x(e, s, 0)) - d, -1) : e;
}, K = (e, r, s, n) => {
  const c = [...e];
  return e.forEach((t) => {
    x(t, r, s) && c.push(g(n));
  }), c;
}, M = (e, r) => (e.sort((s, n) => s - n), e.slice(0, r)), A = (e, r) => (e.sort((s, n) => n - s), e.slice(0, r)), N = (e) => e.reduce((r, s) => r + s, 0), W = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|k|d|sf|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?(\d)*(df|x)?(>=|<=|>|<|=)?(\d+)?(kh|kl|dh|dl|k|d)?/gim, O = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, v = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dh|dl|k|d|min|max)?(\d+)?$/gim, w = /^(\d+)d(\d+)(cs|cf|even|odd)(>=|<=|>|<|=)?(\d+)?(df|x)?(>=|<=|>|<|=)?(\d+)?$/gim, I = /^(\d+)d(\d+)(kh|kl|dh|dl|k|d|min|max|)?(\d+)?$/gim, Y = {
  x: "=",
  "x<": "<",
  "x>": ">",
  xo: "o"
}, q = (e, r, s) => e === "kh" || e === "k" ? A(s, r) : e === "kl" ? M(s, r) : e === "dh" ? M(s, s.length - r) : e === "dl" ? A(s, s.length - r) : s, z = (e, r, s) => e === "min" ? s.map((n) => n <= r ? r : n) : e === "max" ? s.map((n) => n >= r ? r : n) : s, P = (e, r = 1, s) => z(e, r, q(e, r, s)), B = (e, r, s, n, c) => c === "r" ? U(e, r != null ? r : "=", s, n) : c === "rr" ? y(e, r != null ? r : "=", s, n) : [[], e], H = (e) => {
  const { parsed: r, results: s } = e;
  let n = r, c = 0;
  for (let t = 0; t < s.length; t++) {
    const u = s[t], { m: d, result: o, start: a, end: m } = u;
    typeof o > "u" || (n = n.substring(0, a - c) + o + n.substring(m - c, n.length), c += d.length - `${o}`.length);
  }
  return { ...e, parsed: n };
}, J = (e) => {
  const { m: r } = e;
  if (!r.match(w))
    return e;
  const [s, n, c, t, u, d, o, a, m] = w.exec(r), f = Number(n), l = Number(c), b = Number(d), _ = Number(m);
  let i = R(f, l), h;
  return o === "x" ? (i = K(i, u, _, l), h = Math.abs(i.reduce((E, k) => E + p(k, u, t, b, !!o, "=", -1), 0))) : h = Math.abs(i.reduce((E, k) => E + p(k, u, t, b, !!o, a, _), 0)), {
    ...e,
    rolls: i,
    result: t === "cs" ? h : i.length - h,
    successes: h,
    fails: i.length - h
  };
}, Q = (e) => {
  const { m: r } = e;
  if (!r.match(v))
    return e;
  const [s, n, c, t, u, d, o] = v.exec(r), a = Number(n), m = Number(c), f = Number(u), l = F(m, Y[t], f, a);
  return d ? {
    ...e,
    rolls: l,
    result: N(P(d, Number(o != null ? o : 1), l))
  } : { ...e, rolls: l, result: N(l) };
}, T = (e) => {
  const { m: r } = e;
  if (!r.match(O))
    return e;
  const [s, n, c, t, u, d] = O.exec(r), o = Number(n), a = Number(c), m = Number(d), f = R(o, a), [l, b] = B(f, u != null ? u : "=", m, a, t);
  return {
    ...e,
    rolls: [...f, ...l],
    rollsUsed: b,
    result: N(b)
  };
}, Z = (e) => {
  const { m: r } = e;
  if (!r.match(I))
    return e;
  const [s, n, c, t, u] = I.exec(r), d = Number(n), o = Number(c), a = R(d, o);
  return t ? {
    ...e,
    rolls: a,
    result: N(P(t, Number(u != null ? u : 1), a))
  } : { ...e, rolls: a, result: N(a) };
}, j = (e, r) => {
  const s = e.results.map(r);
  return { ...e, results: s };
}, C = (e) => {
  let r = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return r.results = Array.from(e.matchAll(W), (n) => {
      const c = n[0], { index: t } = n, u = t + c.length;
      return { m: c, start: t, end: u };
    }), [J, Q, T, Z].forEach((n) => {
      r = j(r, n);
    }), H(r);
  } catch (s) {
    return console.error(s), r.wasSuccessful = !1, r;
  }
};
(async () => {
  const r = C(`
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
