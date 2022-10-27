const E = (e, s) => Math.floor(Math.random() * (s - e + 1) + e), C = ({ num: e = 20, min: s = 1, max: t = 20 } = {}) => Array.from({ length: e }, () => E(s, t)), u = /* @__PURE__ */ new Map(), p = (e) => {
  var s;
  return u.has(e) && !!((s = u.get(e)) != null && s.length);
}, _ = (e, s) => {
  const t = [...s], r = t.pop();
  return u.set(e, t), r;
}, k = (e) => {
  if (!p(e))
    return;
  const s = [...u.get(e) || []], t = s.pop();
  return u.set(e, s), t;
}, b = (e) => {
  if (p(e))
    return k(e);
  const t = C({ max: e });
  return _(e, t);
}, x = (e, s) => Array.from({ length: e }, () => b(s)), A = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim, h = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim, f = /^(\d+)d(\d+)$/gim, v = (e) => {
  const { parsed: s, results: t } = e;
  let r = s, c = 0;
  for (let n = 0; n < t.length; n++) {
    const o = t[n], { m: i, result: d, start: l, end: a } = o;
    typeof d > "u" || (r = r.substring(0, l - c) + d + r.substring(a - c, r.length), c += i.length - `${d}`.length);
  }
  return { ...e, parsed: r };
}, V = (e) => {
  const s = e.results.map((t) => {
    const { m: r } = t;
    if (!r.match(h))
      return t;
    const [c, n, o, i, d, l] = h.exec(r), a = Number(n), m = Number(o), g = x(a, m), R = g.reduce((S, D) => S + D, 0);
    return { ...t, rolls: g, result: R };
  });
  return { ...e, results: s };
}, y = (e) => {
  const s = e.results.map((t) => {
    const { m: r } = t;
    if (!r.match(f))
      return t;
    const [c, n, o] = f.exec(r), i = Number(n), d = Number(o), l = x(i, d), a = l.reduce((m, g) => m + g, 0);
    return { ...t, rolls: l, result: a };
  });
  return { ...e, results: s };
}, I = (e) => {
  let s = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return s.results = Array.from(e.matchAll(A), (t) => {
      const r = t[0], { index: c } = t, n = c + r.length;
      return { m: r, start: c, end: n };
    }), s = V(s), s = y(s), v(s);
  } catch (t) {
    return console.error(t), s.wasSuccessful = !1, s;
  }
};
(async () => {
  const s = I(`
    1d2 1d2 1d4 1d6 1d8 1d10 1d12 1d20 1d100 2d20 20d20 200d20
    1d10r1 1d20r<10 1d20rr<3 5d10x10 1d20x<10kh 6d10xo10 5d10xo<8x10cs>=8
    3d10k 4d6k3 2d20kh 3d10kl 4d6kl3 2d20kl 3d6d 4d10d2 3d6dh 4d10min2 4d10max8
    10d20cs20 10d20cs>10 6d10cs>=6 1d100cs<=20 3d6even 5d10cs>=6df=1
    5d10cs>=8x=10 5d10cs>=8x>=9 10d10cs>=8x>=8 10d20cf20 10d20cf>10 6d10cf>=6
    1d100cf<=20 4d6cs6df1 10d10cs>5df1 1d10cs=10df=1 3d6sf<3 3d6ms10
    Ana are 1d6 mere.
    Ion a luat 1d8 slashing dmg de la sapa.
  `);
  console.log(s.original), console.log(s.parsed), console.log(s);
})();
//# sourceMappingURL=index.js.map
