// Replays weekly returns on a starting balance with a performance fee on new
// profit above the high-water mark, charged every `billEvery` weeks (Exness bills monthly).
export function replay(start, returns, feePct, billEvery = 4) {
  let bal = start;
  let hwm = start;
  let fees = 0;
  let peak = start;
  let maxDD = 0;
  const points = [{ bal: start, fee: 0 }];
  returns.forEach((r, i) => {
    bal *= 1 + r / 100;
    let fee = 0;
    if ((i + 1) % billEvery === 0 && bal > hwm) {
      fee = (bal - hwm) * (feePct / 100);
      bal -= fee;
      hwm = bal;
    }
    fees += fee;
    peak = Math.max(peak, bal);
    maxDD = Math.max(maxDD, (peak - bal) / peak);
    points.push({ bal, fee, r });
  });
  return {
    points,
    end: bal,
    fees,
    maxDD,
    worst: Math.min(...returns),
    losing: returns.filter((r) => r < 0).length,
  };
}

export const money = (n) =>
  (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const pct = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
