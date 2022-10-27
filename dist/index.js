const p = (e, s) => Math.floor(Math.random() * (s - e + 1) + e), x = ({ num: e = 20, min: s = 1, max: t = 20 } = {}) => Array.from({ length: e }, () => p(s, t)), o = /* @__PURE__ */ new Map(), h = (e) => {
  var s;
  return o.has(e) && !!((s = o.get(e)) != null && s.length);
}, R = (e, s) => {
  const t = [...s], d = t.pop();
  return o.set(e, t), d;
}, k = (e) => {
  if (!h(e))
    return;
  const s = [...o.get(e) || []], t = s.pop();
  return o.set(e, s), t;
}, C = (e) => {
  if (h(e))
    return k(e);
  const t = x({ max: e });
  return R(e, t);
}, D = (e, s) => Array.from({ length: e }, () => C(s)), A = /(?:\d+d\d+)(?:r|rr|x|xo|kh|kl|dh|dl|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?\d*/gim, i = /^(\d+)d(\d+)$/gim, S = (e) => {
  const { parsed: s, results: t } = e;
  let d = s, n = 0;
  for (let r = 0; r < t.length; r++) {
    const a = t[r], { m: u, result: c, start: l, end: g } = a;
    typeof c > "u" || (d = `${d.substring(0, l - n)}${c}${d.substring(g - n, d.length)}`, n += u.length - `${c}`.length);
  }
  return { ...e, parsed: d };
}, v = (e) => {
  const s = e.results.map((t) => {
    const { m: d } = t;
    if (!d.match(i))
      return t;
    const [n, r, a] = i.exec(d), u = Number(r), c = Number(a), l = D(u, c), g = l.reduce((f, m) => f + m, 0);
    return { ...t, rolls: l, result: g };
  });
  return { ...e, results: s };
}, E = (e) => {
  let s = { original: e, parsed: e, wasSuccessful: !0, results: [] };
  try {
    return s.results = Array.from(e.matchAll(A), (t) => {
      const d = t[0], { index: n } = t, r = n + d.length;
      return { m: d, start: n, end: r };
    }), s = v(s), S(s);
  } catch (t) {
    return console.error(t), s.wasSuccessful = !1, s;
  }
};
(async () => {
  const s = E(`
    1d2 1d2 1d4 1d6 1d8 1d10 1d12 1d20 1d100 2d20 20d20 200d20
    1d10r1 1d20r<10 1d20rr<3 5d10x10 1d20x<10kh 6d10xo10 5d10xo<8x10cs>=8
    3d10k 4d6k3 2d20kh 3d10kl 4d6kl3 2d20kl 3d6d 4d10d2 3d6dh 4d10min2 4d10max8
    10d20cs20 10d20cs>10 6d10cs>=6 1d100cs<=20 3d6even 5d10cs>=6df=1
    5d10cs>=8x=10 5d10cs>=8x>=9 10d10cs>=8x>=8 10d20cf20 10d20cf>10 6d10cf>=6
    1d100cf<=20 4d6cs6df1 10d10cs>5df1 1d10cs=10df=1 3d6sf<3 3d6ms10
    Ana are 1d6 mere.
    Ion a luat 1d8 slashing dmg de la sapa.
  `);
  console.log(s);
})();
//# sourceMappingURL=index.js.map
