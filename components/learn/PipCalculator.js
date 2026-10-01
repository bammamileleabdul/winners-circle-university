"use client";

import { useState } from "react";

const INSTRUMENTS = {
  EURUSD: { label: "EUR/USD", unit: "pips", per: "pip", value: 10, hint: "1 standard lot ≈ $10 per pip" },
  GBPUSD: { label: "GBP/USD", unit: "pips", per: "pip", value: 10, hint: "1 standard lot ≈ $10 per pip" },
  XAUUSD: { label: "XAU/USD (gold)", unit: "dollars", per: "$1 move", value: 100, hint: "1 standard lot = 100 oz, so $100 per $1 move" },
};
const LOTS = [0.01, 0.05, 0.1, 0.5, 1];

// Shows how lot size and price movement turn into money.
export default function PipCalculator() {
  const [sym, setSym] = useState("XAUUSD");
  const [lots, setLots] = useState(0.01);
  const [move, setMove] = useState(5);
  const [dir, setDir] = useState("up");
  const [side, setSide] = useState("buy");

  const ins = INSTRUMENTS[sym];
  const perUnit = ins.value * lots;
  const win = (side === "buy") === (dir === "up");
  const pl = perUnit * move * (win ? 1 : -1);

  return (
    <div className="lab">
      <div className="lab-head">
        <span className="fx-eyebrow">Try it</span>
        <h3>Pips, lots and money</h3>
      </div>
      <div className="lab-grid">
        <div className="lab-ctrls">
          <div>
            <span className="fx-label">Market</span>
            <div className="chips">
              {Object.entries(INSTRUMENTS).map(([k, v]) => (
                <button key={k} type="button" className="chip" aria-pressed={sym === k} onClick={() => { setSym(k); setMove(k === "XAUUSD" ? 5 : 20); }}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="fx-label">Your trade</span>
            <div className="chips">
              <button type="button" className="chip" aria-pressed={side === "buy"} onClick={() => setSide("buy")}>Buy (long)</button>
              <button type="button" className="chip" aria-pressed={side === "sell"} onClick={() => setSide("sell")}>Sell (short)</button>
            </div>
          </div>
          <div>
            <span className="fx-label">Lot size</span>
            <div className="chips">
              {LOTS.map((l) => (
                <button key={l} type="button" className="chip" aria-pressed={lots === l} onClick={() => setLots(l)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="fx-label" htmlFor="pc-move">
              Price moves {dir === "up" ? "up" : "down"} by <output>{sym === "XAUUSD" ? `$${move}` : `${move} pips`}</output>
            </label>
            <input id="pc-move" type="range" min="1" max={sym === "XAUUSD" ? 50 : 200} step="1" value={move} onChange={(e) => setMove(+e.target.value)} />
            <div className="chips tight">
              <button type="button" className="chip" aria-pressed={dir === "up"} onClick={() => setDir("up")}>Price goes up</button>
              <button type="button" className="chip" aria-pressed={dir === "down"} onClick={() => setDir("down")}>Price goes down</button>
            </div>
          </div>
        </div>
        <div className="lab-out">
          <div><span>Value per {ins.per}</span><b>${perUnit.toFixed(2)}</b></div>
          <div className="hl"><span>Result</span><b className={pl >= 0 ? "up" : "down"}>{pl >= 0 ? "+" : "−"}${Math.abs(pl).toFixed(2)}</b></div>
          <p className="lab-note">
            {ins.hint}. You {side === "buy" ? "bought" : "sold"} {lots} lot and price went {dir}, so this trade {win ? "makes" : "loses"} money.
          </p>
        </div>
      </div>
    </div>
  );
}
