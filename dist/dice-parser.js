const a = /* @__PURE__ */ new Map(), s = () => a, m = (t) => {
  var e;
  return a.has(t) && !!((e = a.get(t)) != null && e.length);
}, d = (t, e) => {
  const o = [...e], n = o.pop();
  return a.set(t, o), n;
}, w = (t) => {
  if (!m(t))
    return;
  const e = [...a.get(t) || []], o = e.pop();
  return a.set(t, e), o;
}, h = (t = "plain") => `https://www.random.org/quota/?format=${t}`, p = ({
  num: t = 10,
  min: e = 1,
  max: o = 20,
  col: n = 1,
  base: r = 10,
  format: l = "plain",
  rnd: g = "new"
} = {}) => `https://www.random.org/integers/?num=${t}&min=${e}&max=${o}&col=${n}&base=${r}&format=${l}&rnd=${g}`, R = async () => {
  try {
    const t = h(), o = await (await fetch(t)).text();
    return Number(o);
  } catch {
    return NaN;
  }
}, y = async () => {
  const t = await R();
  return Number.isNaN(t) ? !1 : t > 1e3;
}, $ = async ({ num: t = 10, min: e = 1, max: o = 20 } = {}) => {
  if (!await y())
    return [];
  try {
    const r = p({ num: t, min: e, max: o }), u = (await (await fetch(r)).text()).split(`
`);
    return u.slice(0, u.length - 1).map((i) => Number(i));
  } catch {
    return [];
  }
}, c = async (t) => {
  const e = `${t}`;
  if (m(e))
    return w(e);
  const n = await $({ max: t });
  return d(e, n);
};
(async () => (console.log(s().get("20")), console.log(await c(20)), console.log(s().get("20")), console.log(await c(20)), console.log(s().get("20")), console.log(await c(20)), console.log(s().get("20"))))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljZS1wYXJzZXIuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZXIvUGFyc2VyQ29tbW9uLnRzIiwiLi4vc3JjL3JhbmRvbS1udW1iZXJzL1JhbmRvbU9yZy50cyIsIi4uL3NyYy9wYXJzZXIvUGFyc2VyQXN5bmMudHMiLCIuLi9zcmMvZGljZS1wYXJzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGljZVJvbGxzQ2FjaGU6IE1hcDxzdHJpbmcsIG51bWJlcltdPiA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXJbXT4oKVxuZXhwb3J0IGNvbnN0IGdldENhY2hlTWFwID0gKCk6IE1hcDxzdHJpbmcsIG51bWJlcltdPiA9PiBkaWNlUm9sbHNDYWNoZVxuXG5leHBvcnQgY29uc3QgaGFzQ2FjaGUgPSAoaWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4gZGljZVJvbGxzQ2FjaGUuaGFzKGlkKSAmJiAhIWRpY2VSb2xsc0NhY2hlLmdldChpZCk/Lmxlbmd0aFxuZXhwb3J0IGNvbnN0IGFkZFRvQ2FjaGUgPSAoaWQ6IHN0cmluZywgdmFsdWVzOiBudW1iZXJbXSk6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IG5ld1ZhbHVlcyA9IFsuLi52YWx1ZXNdXG5cbiAgY29uc3QgdmFsdWUgPSBuZXdWYWx1ZXMucG9wKClcbiAgZGljZVJvbGxzQ2FjaGUuc2V0KGlkLCBuZXdWYWx1ZXMpXG5cbiAgcmV0dXJuIHZhbHVlXG59XG5leHBvcnQgY29uc3QgZ2V0RnJvbUNhY2hlID0gKGlkOiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoIWhhc0NhY2hlKGlkKSkgcmV0dXJuIHVuZGVmaW5lZFxuXG4gIGNvbnN0IHZhbHVlczogbnVtYmVyW10gPSBbLi4uKGRpY2VSb2xsc0NhY2hlLmdldChpZCkgfHwgW10pXVxuICBjb25zdCB2YWx1ZSA9IHZhbHVlcy5wb3AoKVxuXG4gIGRpY2VSb2xsc0NhY2hlLnNldChpZCwgdmFsdWVzKVxuICByZXR1cm4gdmFsdWVcbn1cbiIsImltcG9ydCB0eXBlIHtSYW5kb21PcmdSYW5kb21JbnRlZ2VyVXJsVHlwZSwgUmFuZG9tSW50ZWdlclBhcmFtc1R5cGV9IGZyb20gJy4uL3R5cGVzJ1xuXG5jb25zdCByYW5kb21PcmdRdW90YVVybCA9IChmb3JtYXQgPSAncGxhaW4nKTogc3RyaW5nID0+IGBodHRwczovL3d3dy5yYW5kb20ub3JnL3F1b3RhLz9mb3JtYXQ9JHtmb3JtYXR9YFxuY29uc3QgcmFuZG9tT3JnSW50ZWdlclVybCA9ICh7XG4gIG51bSA9IDEwLCBtaW4gPSAxLCBtYXggPSAyMCwgY29sID0gMSwgYmFzZSA9IDEwLCBmb3JtYXQgPSAncGxhaW4nLCBybmQgPSAnbmV3Jyxcbn06IFJhbmRvbU9yZ1JhbmRvbUludGVnZXJVcmxUeXBlID0ge30pOiBzdHJpbmcgPT4gYGh0dHBzOi8vd3d3LnJhbmRvbS5vcmcvaW50ZWdlcnMvP251bT0ke251bX0mbWluPSR7bWlufSZtYXg9JHttYXh9JmNvbD0ke2NvbH0mYmFzZT0ke2Jhc2V9JmZvcm1hdD0ke2Zvcm1hdH0mcm5kPSR7cm5kfWBcblxuY29uc3QgZ2V0UmFuZG9tT3JnUXVvdGEgPSBhc3luYyAoKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBxdW90YVVybCA9IHJhbmRvbU9yZ1F1b3RhVXJsKClcbiAgICBjb25zdCBxdW90YVJlc3VsdCA9IGF3YWl0IGZldGNoKHF1b3RhVXJsKVxuICAgIGNvbnN0IHF1b3RhVGV4dCA9IGF3YWl0IHF1b3RhUmVzdWx0LnRleHQoKVxuXG4gICAgcmV0dXJuIE51bWJlcihxdW90YVRleHQpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIE5hTlxuICB9XG59XG5cbmNvbnN0IGhhc1JhbmRvbU9yZ1F1b3RhID0gYXN5bmMgKCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICBjb25zdCBxdW90YSA9IGF3YWl0IGdldFJhbmRvbU9yZ1F1b3RhKClcbiAgcmV0dXJuIE51bWJlci5pc05hTihxdW90YSkgPyBmYWxzZSA6IHF1b3RhID4gMTAwMFxufVxuXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tT3JnUmFuZG9tSW50ZWdlcnMgPSBhc3luYyAoe251bSA9IDEwLCBtaW4gPSAxLCBtYXggPSAyMH06IFJhbmRvbUludGVnZXJQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPG51bWJlcltdPiA9PiB7XG4gIGNvbnN0IHF1b3RhID0gYXdhaXQgaGFzUmFuZG9tT3JnUXVvdGEoKVxuICBpZiAoIXF1b3RhKSByZXR1cm4gW11cblxuICB0cnkge1xuICAgIGNvbnN0IHJhbmRvbUludGVnZXJVcmwgPSByYW5kb21PcmdJbnRlZ2VyVXJsKHtudW0sIG1pbiwgbWF4fSlcbiAgICBjb25zdCByYW5kb21JbnRlZ2Vyc1Jlc3VsdCA9IGF3YWl0IGZldGNoKHJhbmRvbUludGVnZXJVcmwpXG4gICAgY29uc3QgcmFuZG9tSW50ZWdlcnNUZXh0ID0gYXdhaXQgcmFuZG9tSW50ZWdlcnNSZXN1bHQudGV4dCgpXG5cbiAgICBjb25zdCByYW5kb21JbnRlZ2Vyc0FycmF5ID0gcmFuZG9tSW50ZWdlcnNUZXh0LnNwbGl0KCdcXG4nKVxuICAgIHJldHVybiByYW5kb21JbnRlZ2Vyc0FycmF5LnNsaWNlKDAsIHJhbmRvbUludGVnZXJzQXJyYXkubGVuZ3RoIC0gMSkubWFwKChuKSA9PiBOdW1iZXIobikpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiIsImltcG9ydCB7aGFzQ2FjaGUsIGdldEZyb21DYWNoZSwgYWRkVG9DYWNoZX0gZnJvbSAnLi9QYXJzZXJDb21tb24nXG5pbXBvcnQge2dldFJhbmRvbU9yZ1JhbmRvbUludGVnZXJzfSBmcm9tICcuLi9yYW5kb20tbnVtYmVycy9SYW5kb21PcmcnXG5cbmV4cG9ydCBjb25zdCBnZXREaWNlUm9sbEFzeW5jID0gYXN5bmMgKGRpY2U6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IGlkID0gYCR7ZGljZX1gXG5cbiAgY29uc3QgaXNDYWNoZWQ6IGJvb2xlYW4gPSBoYXNDYWNoZShpZClcbiAgaWYgKGlzQ2FjaGVkKSByZXR1cm4gZ2V0RnJvbUNhY2hlKGlkKSBhcyBudW1iZXJcblxuICBjb25zdCBnZW5lcmF0ZWRWYWx1ZXM6IG51bWJlcltdID0gYXdhaXQgZ2V0UmFuZG9tT3JnUmFuZG9tSW50ZWdlcnMoe21heDogZGljZX0pXG4gIGNvbnN0IGRpY2VWYWx1ZTogbnVtYmVyID0gYWRkVG9DYWNoZShpZCwgZ2VuZXJhdGVkVmFsdWVzKSBhcyBudW1iZXJcblxuICByZXR1cm4gZGljZVZhbHVlXG59XG4iLCJpbXBvcnQge2dldENhY2hlTWFwfSBmcm9tICcuL3BhcnNlci9QYXJzZXJDb21tb24nXG5pbXBvcnQge2dldERpY2VSb2xsQXN5bmN9IGZyb20gJy4vcGFyc2VyL1BhcnNlckFzeW5jJ1xuXG4oYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhnZXRDYWNoZU1hcCgpLmdldCgnMjAnKSlcbiAgY29uc29sZS5sb2coKGF3YWl0IGdldERpY2VSb2xsQXN5bmMoMjApKSlcbiAgY29uc29sZS5sb2coZ2V0Q2FjaGVNYXAoKS5nZXQoJzIwJykpXG4gIGNvbnNvbGUubG9nKChhd2FpdCBnZXREaWNlUm9sbEFzeW5jKDIwKSkpXG4gIGNvbnNvbGUubG9nKGdldENhY2hlTWFwKCkuZ2V0KCcyMCcpKVxuICBjb25zb2xlLmxvZygoYXdhaXQgZ2V0RGljZVJvbGxBc3luYygyMCkpKVxuICBjb25zb2xlLmxvZyhnZXRDYWNoZU1hcCgpLmdldCgnMjAnKSlcbn0pKClcblxuZXhwb3J0IHsgfVxuIl0sIm5hbWVzIjpbImRpY2VSb2xsc0NhY2hlIiwiZ2V0Q2FjaGVNYXAiLCJoYXNDYWNoZSIsImlkIiwiX2EiLCJhZGRUb0NhY2hlIiwidmFsdWVzIiwibmV3VmFsdWVzIiwidmFsdWUiLCJnZXRGcm9tQ2FjaGUiLCJyYW5kb21PcmdRdW90YVVybCIsImZvcm1hdCIsInJhbmRvbU9yZ0ludGVnZXJVcmwiLCJudW0iLCJtaW4iLCJtYXgiLCJjb2wiLCJiYXNlIiwicm5kIiwiZ2V0UmFuZG9tT3JnUXVvdGEiLCJxdW90YVVybCIsInF1b3RhVGV4dCIsImhhc1JhbmRvbU9yZ1F1b3RhIiwicXVvdGEiLCJnZXRSYW5kb21PcmdSYW5kb21JbnRlZ2VycyIsInJhbmRvbUludGVnZXJVcmwiLCJyYW5kb21JbnRlZ2Vyc0FycmF5IiwibiIsImdldERpY2VSb2xsQXN5bmMiLCJkaWNlIiwiZ2VuZXJhdGVkVmFsdWVzIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSx3QkFBNEMsT0FDckNDLElBQWMsTUFBNkJELEdBRTNDRSxJQUFXLENBQUNDO0FBSHpCLE1BQUFDO0FBR2lELFNBQUFKLEVBQWUsSUFBSUcsQ0FBRSxLQUFLLENBQUMsR0FBQ0MsSUFBQUosRUFBZSxJQUFJRyxDQUFFLE1BQXJCLFFBQUFDLEVBQXdCO0FBQUEsR0FDeEZDLElBQWEsQ0FBQ0YsR0FBWUcsTUFBeUM7QUFDeEUsUUFBQUMsSUFBWSxDQUFDLEdBQUdELENBQU0sR0FFdEJFLElBQVFELEVBQVU7QUFDVCxTQUFBUCxFQUFBLElBQUlHLEdBQUlJLENBQVMsR0FFekJDO0FBQ1QsR0FDYUMsSUFBZSxDQUFDTixNQUFtQztBQUMxRCxNQUFBLENBQUNELEVBQVNDLENBQUU7QUFBVTtBQUVwQixRQUFBRyxJQUFtQixDQUFDLEdBQUlOLEVBQWUsSUFBSUcsQ0FBRSxLQUFLLENBQUEsQ0FBRyxHQUNyREssSUFBUUYsRUFBTztBQUVOLFNBQUFOLEVBQUEsSUFBSUcsR0FBSUcsQ0FBTSxHQUN0QkU7QUFDVCxHQ2xCTUUsSUFBb0IsQ0FBQ0MsSUFBUyxZQUFvQix3Q0FBd0NBLEtBQzFGQyxJQUFzQixDQUFDO0FBQUEsRUFDM0IsS0FBQUMsSUFBTTtBQUFBLEVBQUksS0FBQUMsSUFBTTtBQUFBLEVBQUcsS0FBQUMsSUFBTTtBQUFBLEVBQUksS0FBQUMsSUFBTTtBQUFBLEVBQUcsTUFBQUMsSUFBTztBQUFBLEVBQUksUUFBQU4sSUFBUztBQUFBLEVBQVMsS0FBQU8sSUFBTTtBQUMzRSxJQUFtQyxDQUFBLE1BQWUsd0NBQXdDTCxTQUFXQyxTQUFXQyxTQUFXQyxVQUFZQyxZQUFlTixTQUFjTyxLQUU5SkMsSUFBb0IsWUFBNkI7QUFDakQsTUFBQTtBQUNGLFVBQU1DLElBQVdWLEtBRVhXLElBQVksT0FERSxNQUFNLE1BQU1ELENBQVEsR0FDSjtBQUVwQyxXQUFPLE9BQU9DLENBQVM7QUFBQTtBQUVoQixXQUFBO0FBQUEsRUFDVDtBQUNGLEdBRU1DLElBQW9CLFlBQThCO0FBQ2hELFFBQUFDLElBQVEsTUFBTUo7QUFDcEIsU0FBTyxPQUFPLE1BQU1JLENBQUssSUFBSSxLQUFRQSxJQUFRO0FBQy9DLEdBRWFDLElBQTZCLE9BQU8sRUFBQyxLQUFBWCxJQUFNLElBQUksS0FBQUMsSUFBTSxHQUFHLEtBQUFDLElBQU0sR0FBK0IsSUFBQSxPQUEwQjtBQUVsSSxNQUFJLENBRFUsTUFBTU87QUFDUixXQUFPO0FBRWYsTUFBQTtBQUNGLFVBQU1HLElBQW1CYixFQUFvQixFQUFDLEtBQUFDLEdBQUssS0FBQUMsR0FBSyxLQUFBQyxHQUFJLEdBSXREVyxLQUZxQixPQURFLE1BQU0sTUFBTUQsQ0FBZ0IsR0FDSCxRQUVQLE1BQU07QUFBQSxDQUFJO0FBQ3pELFdBQU9DLEVBQW9CLE1BQU0sR0FBR0EsRUFBb0IsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDQyxNQUFNLE9BQU9BLENBQUMsQ0FBQztBQUFBO0FBRXhGLFdBQU87RUFDVDtBQUNGLEdDbkNhQyxJQUFtQixPQUFPQyxNQUFrQztBQUN2RSxRQUFNMUIsSUFBSyxHQUFHMEI7QUFHVixNQURzQjNCLEVBQVNDLENBQUU7QUFDdkIsV0FBT00sRUFBYU4sQ0FBRTtBQUVwQyxRQUFNMkIsSUFBNEIsTUFBTU4sRUFBMkIsRUFBQyxLQUFLSyxFQUFLLENBQUE7QUFHdkUsU0FGbUJ4QixFQUFXRixHQUFJMkIsQ0FBZTtBQUcxRDtBQUFBLENDVkMsYUFDQyxRQUFRLElBQUk3QixFQUFBLEVBQWMsSUFBSSxJQUFJLENBQUMsR0FDbkMsUUFBUSxJQUFLLE1BQU0yQixFQUFpQixFQUFFLENBQUUsR0FDeEMsUUFBUSxJQUFJM0IsRUFBQSxFQUFjLElBQUksSUFBSSxDQUFDLEdBQ25DLFFBQVEsSUFBSyxNQUFNMkIsRUFBaUIsRUFBRSxDQUFFLEdBQ3hDLFFBQVEsSUFBSTNCLEVBQUEsRUFBYyxJQUFJLElBQUksQ0FBQyxHQUNuQyxRQUFRLElBQUssTUFBTTJCLEVBQWlCLEVBQUUsQ0FBRSxHQUN4QyxRQUFRLElBQUkzQixFQUFBLEVBQWMsSUFBSSxJQUFJLENBQUMsSUFDbEM7In0=
