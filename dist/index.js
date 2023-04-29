const L = (e, s) => Math.floor(Math.random() * (s - e + 1) + e), $ = ({ num: e = 20, min: s = 1, max: r = 20 } = {}) => Array.from({ length: e }, () => L(s, r)), N = /* @__PURE__ */ new Map(), V = (e) => {
  var s;
  return N.has(e) && !!((s = N.get(e)) != null && s.length);
}, U = (e, s) => {
  const r = [...s], t = r.pop();
  return N.set(e, r), t;
}, F = (e) => {
  if (!V(e))
    return;
  const s = [...N.get(e) || []], r = s.pop();
  return N.set(e, s), r;
}, g = (e) => {
  if (V(e))
    return F(e);
  const r = $({ max: e });
  return U(e, r);
}, M = (e, s) => Array.from({ length: e }, () => g(s)), R = (e, s, r, t = []) => {
  const c = g(e), n = [...t, c];
  switch (s) {
    case "<":
      return c >= r ? n : R(e, s, r, n);
    case ">":
      return c <= r ? n : R(e, s, r, n);
    case "=":
      return c === r ? R(e, s, r, n) : n;
    case "o":
      return [c, g(e)];
  }
}, K = (e, s, r, t) => {
  let c = [];
  for (let n = 0; n < t; n++)
    c = [...c, ...R(e, s, r)];
  return c;
}, x = (e, s, r) => {
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
    case "even":
      return e % 2 === 0;
    case "odd":
      return e % 2 === 1;
  }
}, W = (e, s, r, t) => {
  const c = [], n = [...e];
  for (const d in e)
    if (x(e[d], s, r)) {
      const u = g(t);
      c.push(u), n[d] = u;
    }
  return [c, n];
}, Y = (e, s, r, t) => {
  const c = [...e];
  let n = [...e];
  for (const d in n)
    for (; x(n[d], s, r); ) {
      const u = g(t);
      c.push(u), n[d] = u;
    }
  return [c, n];
}, v = (e, s, r, t, c, n, d) => {
  const u = Number(x(e, n != null ? n : "=", d != null ? d : 0));
  return r === "cs" || r === "cf" ? Math.max(Number(x(e, s != null ? s : "=", t != null ? t : 0)) - u, -1) : r === "odd" || r === "even" ? Math.max(Number(x(e, r, 0)) - u, -1) : e;
}, q = (e, s, r, t) => {
  const c = [...e];
  return e.forEach((n) => {
    x(n, s, r) && c.push(g(t));
  }), c;
}, A = (e, s) => (e.sort((r, t) => r - t), e.slice(0, s)), w = (e, s) => (e.sort((r, t) => t - r), e.slice(0, s)), S = (e) => e.reduce((s, r) => s + r, 0), y = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?(\d)*(df|x)?(>=|<=|>|<|=)?(\d+)?/gim, I = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, O = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dl|dh|min|max|)?(\d+)?$/gim, G = /^(\d+)d(\d+)(cs|cf|even|odd)(>=|<=|>|<|=)?(\d+)?(df|x)?(>=|<=|>|<|=)?(\d+)?$/gim, P = /^(\d+)d(\d+)(kh|kl|dl|dh|min|max|)?(\d+)?$/gim, z = {
  x: "=",
  "x<": "<",
  "x>": ">",
  xo: "o"
}, B = (e, s, r) => e === "kh" ? w(r, s) : e === "kl" ? A(r, s) : e === "dh" ? A(r, r.length - s) : e === "dl" ? w(r, r.length - s) : r, H = (e, s, r) => e === "min" ? r.map((t) => t <= s ? s : t) : e === "max" ? r.map((t) => t >= s ? s : t) : r, X = (e, s, r) => H(e, s, B(e, s, r)), J = (e, s, r, t, c) => c === "r" ? W(e, s != null ? s : "=", r, t) : c === "rr" ? Y(e, s != null ? s : "=", r, t) : [[], e], Q = (e) => {
  const { parsed: s, results: r } = e;
  let t = s, c = 0;
  for (let n = 0; n < r.length; n++) {
    const d = r[n], { m: u, result: o, start: m, end: a } = d;
    typeof o > "u" || (t = t.substring(0, m - c) + o + t.substring(a - c, t.length), c += u.length - `${o}`.length);
  }
  return { ...e, parsed: t };
}, T = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(G))
      return r;
    const [c, n, d, u, o, m, a, l, D] = G.exec(t), f = Number(n), i = Number(d), b = Number(m), k = Number(D);
    let h = M(f, i), E;
    return a === "x" ? (h = q(h, o, k, i), E = Math.abs(h.reduce((p, _) => p + v(_, o, u, b, !!a, "=", -1), 0))) : E = Math.abs(h.reduce((p, _) => p + v(_, o, u, b, !!a, l, k), 0)), {
      ...r,
      rolls: h,
      successes: E,
      fails: h.length - E
    };
  });
  return { ...e, results: s };
}, Z = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(O))
      return r;
    const [c, n, d, u, o, m, a] = O.exec(t), l = Number(n), D = Number(d), f = Number(o), i = K(D, z[u], f, l);
    return m ? {
      ...r,
      rolls: i,
      result: S(X(m, Number(a != null ? a : 1), i))
    } : { ...r, rolls: i, result: S(i) };
  });
  return { ...e, results: s };
}, j = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(I))
      return r;
    const [c, n, d, u, o, m] = I.exec(t), a = Number(n), l = Number(d), D = Number(m), f = M(a, l), [i, b] = J(f, o != null ? o : "=", D, l, u);
    return {
      ...r,
      rolls: [...f, ...i],
      rollsUsed: b,
      result: S(b)
    };
  });
  return { ...e, results: s };
}, C = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(P))
      return r;
    const [c, n, d, u, o] = P.exec(t), m = Number(n), a = Number(d), l = M(m, a);
    return u ? {
      ...r,
      rolls: l,
      result: S(X(u, Number(o != null ? o : 1), l))
    } : { ...r, rolls: l, result: S(l) };
  });
  return { ...e, results: s };
}, ee = (e) => {
  let s = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return s.results = Array.from(e.matchAll(y), (r) => {
      const t = r[0], { index: c } = r, n = c + t.length;
      return { m: t, start: c, end: n };
    }), s = T(s), s = Z(s), s = j(s), s = C(s), Q(s);
  } catch (r) {
    return console.error(r), s.wasSuccessful = !1, s;
  }
};
(async () => {
  const s = ee(`
    1d2 1d2 1d4 1d6 1d8 1d10 1d12 1d20 1d100 2d20 20d20 200d20
    1d10r1 2d20r<10 2d20rr<15 5d10x10 1d20x<10kh 1d20x>10kh 6d10xo10 5d10xo<8x10cs>=8
    3d10k 4d6k3 2d20kh 3d10kl 4d6kl3 2d20kl 3d6d 4d10d2 3d6dh 4d10min2 4d10max8
    10d20cs20 10d20cs>10 6d10cs>=6 1d100cs<=20 3d6even 5d10cs>=6df=1
    5d10cs>=8x=10 5d10cs>=8x>=9 10d10cs>=8x>=8 10d20cf20 10d20cf>10 6d10cf>=6
    1d100cf<=20 4d6cs6df1 10d10cs>5df<11 1d10cs=10df=1 3d6sf<3 3d6ms10
    Ana are 1d6 mere.
    Ion a luat 1d8 slashing dmg de la sapa.
    1d6 + 2d4
  `);
  console.log(s.results);
})();
//# sourceMappingURL=index.js.map
