"use client";

import { useMemo, useState } from "react";

const TERMS = [
  ["Ask", "The price you buy at. Always slightly above the bid."],
  ["Balance", "Your account money not counting trades that are still open."],
  ["Bid", "The price you sell at."],
  ["CFD", "Contract for difference. You trade the price change of gold or a currency without owning it."],
  ["Drawdown", "How far your account has fallen from its highest point, usually shown as a percentage."],
  ["Equity", "Your balance plus or minus the profit or loss on open trades, right now."],
  ["Fair value gap", "A fast move that leaves a gap between candle wicks. Price often comes back to it, but not always."],
  ["Free margin", "Equity minus the margin locked in open trades. What you have left to open new ones."],
  ["High-water mark", "Your account’s previous peak. Performance fees are only charged on profit above it."],
  ["Leverage", "Lets you open a position bigger than your deposit, e.g. 1:100. It changes margin, not the money per pip."],
  ["Liquidity", "Where lots of orders sit, often just above old highs or below old lows, where stop losses cluster."],
  ["Long", "A buy trade. Profits if price rises."],
  ["Lot", "Trade size. 1 standard lot = 100,000 units of a currency, or 100 ounces of gold on most brokers."],
  ["Margin", "Money the broker locks while a trade is open, as a deposit."],
  ["Margin call", "A warning that your equity is getting too low to support your open trades."],
  ["Market structure", "The pattern of highs and lows. Higher highs and higher lows is an uptrend; lower ones a downtrend."],
  ["Performance fee", "A share of profit paid to the strategy provider. For Winners Circle it’s collected by Exness."],
  ["Pip", "The standard unit of price movement. 0.0001 on most currency pairs, 0.01 on yen pairs."],
  ["Risk:reward", "How much you aim to make compared with how much you risk. 2:1 means aiming for twice your risk."],
  ["Short", "A sell trade. Profits if price falls."],
  ["Slippage", "When your order fills at a worse price than you asked for, usually in fast markets or news."],
  ["Spread", "The gap between ask and bid. A cost you pay on every trade."],
  ["Stop loss", "An order that closes your trade automatically at a set loss. Decided before you enter."],
  ["Stop out", "When the broker closes your trades automatically because your margin has run too low."],
  ["Swap", "A small fee or credit for holding a trade open overnight."],
  ["Take profit", "An order that closes your trade automatically at a set profit."],
];

export default function Glossary() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? TERMS.filter(([t, d]) => t.toLowerCase().includes(s) || d.toLowerCase().includes(s)) : TERMS;
  }, [q]);

  return (
    <div className="gl">
      <label className="fx-label" htmlFor="gl-q">Search {TERMS.length} terms</label>
      <input id="gl-q" className="fx-input" placeholder="e.g. margin, spread, liquidity" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="gl-grid">
        {list.map(([t, d]) => (
          <button key={t} type="button" className={`gl-item ${open === t ? "open" : ""}`} aria-expanded={open === t} onClick={() => setOpen(open === t ? null : t)}>
            <b>{t}</b>
            <span>{d}</span>
          </button>
        ))}
        {!list.length && <p className="lab-note">No terms match “{q}”. Try a shorter word.</p>}
      </div>
    </div>
  );
}
