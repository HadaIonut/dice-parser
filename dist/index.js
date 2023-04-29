const X = (e, s) => Math.floor(Math.random() * (s - e + 1) + e), L = ({ num: e = 20, min: s = 1, max: r = 20 } = {}) => Array.from({ length: e }, () => X(s, r)), x = /* @__PURE__ */ new Map(), I = (e) => {
  var s;
  return x.has(e) && !!((s = x.get(e)) != null && s.length);
}, $ = (e, s) => {
  const r = [...s], t = r.pop();
  return x.set(e, r), t;
}, U = (e) => {
  if (!I(e))
    return;
  const s = [...x.get(e) || []], r = s.pop();
  return x.set(e, s), r;
}, D = (e) => {
  if (I(e))
    return U(e);
  const r = L({ max: e });
  return $(e, r);
}, E = (e, s) => Array.from({ length: e }, () => D(s)), S = (e, s, r, t = []) => {
  const c = D(e), n = [...t, c];
  switch (s) {
    case "<":
      return c >= r ? n : S(e, s, r, n);
    case ">":
      return c <= r ? n : S(e, s, r, n);
    case "=":
      return c === r ? S(e, s, r, n) : n;
    case "o":
      return [c, D(e)];
  }
}, F = (e, s, r, t) => {
  let c = [];
  for (let n = 0; n < t; n++)
    c = [...c, ...S(e, s, r)];
  return c;
}, g = (e, s, r) => {
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
}, K = (e, s, r, t) => {
  const c = [], n = [...e];
  for (const u in e)
    if (g(e[u], s, r)) {
      const d = D(t);
      c.push(d), n[u] = d;
    }
  return [c, n];
}, W = (e, s, r, t) => {
  const c = [...e];
  let n = [...e];
  for (const u in n)
    for (; g(n[u], s, r); ) {
      const d = D(t);
      c.push(d), n[u] = d;
    }
  return [c, n];
}, Y = (e, s, r, t, c, n, u) => {
  const d = Number(g(e, n != null ? n : "=", u != null ? u : 0));
  return r === "cs" || r === "cf" ? Math.max(Number(g(e, s != null ? s : "=", t != null ? t : 0)) - d, -1) : r === "odd" || r === "even" ? Math.max(Number(g(e, r, 0)) - d, -1) : e;
}, M = (e, s) => (e.sort((r, t) => r - t), e.slice(0, s)), p = (e, s) => (e.sort((r, t) => t - r), e.slice(0, s)), b = (e) => e.reduce((s, r) => s + r, 0), q = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?(\d)*(df)?(>=|<=|>|<|=)?(\d+)?/gim, k = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, v = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dl|dh|min|max|)?(\d+)?$/gim, w = /^(\d+)d(\d+)(cs|cf|even|odd)(>=|<=|>|<|=)?(\d+)?(df)?(>=|<=|>|<|=)?(\d+)?$/gim, A = /^(\d+)d(\d+)(kh|kl|dl|dh|min|max|)?(\d+)?$/gim, z = {
  x: "=",
  "x<": "<",
  "x>": ">",
  xo: "o"
}, B = (e, s, r) => e === "kh" ? p(r, s) : e === "kl" ? M(r, s) : e === "dh" ? M(r, r.length - s) : e === "dl" ? p(r, r.length - s) : r, H = (e, s, r) => e === "min" ? r.map((t) => t <= s ? s : t) : e === "max" ? r.map((t) => t >= s ? s : t) : r, O = (e, s, r) => H(e, s, B(e, s, r)), J = (e, s, r, t, c) => c === "r" ? K(e, s != null ? s : "=", r, t) : c === "rr" ? W(e, s != null ? s : "=", r, t) : [[], e], Q = (e) => {
  const { parsed: s, results: r } = e;
  let t = s, c = 0;
  for (let n = 0; n < r.length; n++) {
    const u = r[n], { m: d, result: o, start: m, end: a } = u;
    typeof o > "u" || (t = t.substring(0, m - c) + o + t.substring(a - c, t.length), c += d.length - `${o}`.length);
  }
  return { ...e, parsed: t };
}, T = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(w))
      return r;
    const [c, n, u, d, o, m, a, l, h] = w.exec(t), f = Number(n), i = Number(u), N = Number(m), G = Number(h), R = E(f, i), _ = Math.abs(R.reduce((P, V) => P + Y(V, o, d, N, !!a, l, G), 0));
    return {
      ...r,
      rolls: R,
      successes: _,
      fails: R.length - _
    };
  });
  return { ...e, results: s };
}, Z = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(v))
      return r;
    const [c, n, u, d, o, m, a] = v.exec(t), l = Number(n), h = Number(u), f = Number(o), i = F(h, z[d], f, l);
    return m ? {
      ...r,
      rolls: i,
      result: b(O(m, Number(a != null ? a : 1), i))
    } : { ...r, rolls: i, result: b(i) };
  });
  return { ...e, results: s };
}, y = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(k))
      return r;
    const [c, n, u, d, o, m] = k.exec(t), a = Number(n), l = Number(u), h = Number(m), f = E(a, l), [i, N] = J(f, o != null ? o : "=", h, l, d);
    return {
      ...r,
      rolls: [...f, ...i],
      rollsUsed: N,
      result: b(N)
    };
  });
  return { ...e, results: s };
}, j = (e) => {
  const s = e.results.map((r) => {
    const { m: t } = r;
    if (!t.match(A))
      return r;
    const [c, n, u, d, o] = A.exec(t), m = Number(n), a = Number(u), l = E(m, a);
    return d ? {
      ...r,
      rolls: l,
      result: b(O(d, Number(o != null ? o : 1), l))
    } : { ...r, rolls: l, result: b(l) };
  });
  return { ...e, results: s };
}, C = (e) => {
  let s = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return s.results = Array.from(e.matchAll(q), (r) => {
      const t = r[0], { index: c } = r, n = c + t.length;
      return { m: t, start: c, end: n };
    }), s = T(s), s = Z(s), s = y(s), s = j(s), Q(s);
  } catch (r) {
    return console.error(r), s.wasSuccessful = !1, s;
  }
};
(async () => {
  const s = C(`
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
