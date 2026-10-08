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

// Replays real 1:1 trades on a starting balance. The performance fee is taken on new
// profit above the high-water mark at the start of each new month (Exness bills monthly).
// mode "step":     risk starts at start ÷ riskDiv in dollars and doubles each time the
//                  balance doubles (2×, 4×, 8× the start). It never steps back down.
// mode "compound": risk is the current balance ÷ riskDiv on every trade.
export function replayTrades(start, trades, riskDiv, feePct, mode = "step") {
  let bal = start;
  let hwm = start;
  let fees = 0;
  let peak = start;
  let maxDD = 0;
  let streak = 0;
  let worstStreak = 0;
  let level = start; // balance at which the current risk was set
  let unit = start / riskDiv; // dollar risk per trade in step mode
  let blown = false;
  const doublings = []; // { index, label, risk }
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
  for (let i = 0; i < trades.length; i++) {
    const tr = trades[i];
    if (tr.t.slice(0, 7) !== month) {
      bill();
      month = tr.t.slice(0, 7);
    }
    let risk;
    if (mode === "step") {
      while (bal >= level * 2) {
        level *= 2;
        unit *= 2;
        doublings.push({ index: points.length - 1, label: tradeLabel(tr), risk: unit });
      }
      risk = Math.min(unit, bal);
    } else {
      risk = bal / riskDiv;
    }
    bal += tr.win ? risk : -risk;
    streak = tr.win ? 0 : streak + 1;
    worstStreak = Math.max(worstStreak, streak);
    peak = Math.max(peak, bal);
    maxDD = Math.max(maxDD, peak > 0 ? (peak - bal) / peak : 0);
    points.push({ bal, label: tradeLabel(tr) });
    if (bal <= 0.005) {
      bal = 0;
      blown = true;
      break;
    }
  }
  if (!blown) bill();
  if (points.length) points[points.length - 1].bal = bal;
  const played = points.length - 1;
  const wins = trades.slice(0, played).filter((x) => x.win).length;
  return {
    points,
    end: bal,
    fees,
    maxDD,
    worstStreak,
    wins,
    losses: played - wins,
    played,
    blown,
    doublings,
    startRisk: start / riskDiv,
    endRisk: mode === "step" ? unit : bal / riskDiv,
  };
}

export function tradeLabel(tr) {
  const d = new Date(tr.t);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }) + " · " + tr.side;
}
