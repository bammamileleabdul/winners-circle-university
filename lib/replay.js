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

// Replays real 1:1 trades on a starting balance. Each trade risks balance ÷ riskDiv and
// wins or loses that amount. The performance fee is taken on new profit above the
// high-water mark at the start of each new month (Exness bills monthly).
export function replayTrades(start, trades, riskDiv, feePct) {
  let bal = start;
  let hwm = start;
  let fees = 0;
  let peak = start;
  let maxDD = 0;
  let streak = 0;
  let worstStreak = 0;
  let month = trades.length ? trades[0].t.slice(0, 7) : "";
  const bill = () => {
    if (bal > hwm) {
      const f = (bal - hwm) * (feePct / 100);
      fees += f;
      bal -= f;
      hwm = bal;
    }
  };
  const points = [{ bal: start, label: "Start" }];
  trades.forEach((tr) => {
    if (tr.t.slice(0, 7) !== month) {
      bill();
      month = tr.t.slice(0, 7);
    }
    const risk = bal / riskDiv;
    bal += tr.win ? risk : -risk;
    streak = tr.win ? 0 : streak + 1;
    worstStreak = Math.max(worstStreak, streak);
    peak = Math.max(peak, bal);
    maxDD = Math.max(maxDD, (peak - bal) / peak);
    points.push({ bal, label: tradeLabel(tr) });
  });
  bill();
  if (points.length) points[points.length - 1].bal = bal;
  const wins = trades.filter((x) => x.win).length;
  return { points, end: bal, fees, maxDD, worstStreak, wins, losses: trades.length - wins };
}

export function tradeLabel(tr) {
  const d = new Date(tr.t);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }) + " · " + tr.side;
}
