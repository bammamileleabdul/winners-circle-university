"use client";

import { useState } from "react";

const LEVERAGE = [10, 30, 100, 500];
const LOTS = [0.01, 0.05, 0.1, 0.5];

// Shows what leverage really changes (margin) and what it doesn't (money per $1 move).
export default function LeverageLab() {
  const [balance, setBalance] = useState("500");
  const [price, setPrice] = useState("3000");
  const [lev, setLev] = useState(100);
  const [lots, setLots] = useState(0.05);

  const bal = Math.max(0, parseFloat(balance) || 0);
  const px = Math.max(0, parseFloat(price) || 0);
  const ounces = lots * 100;
  const position = ounces * px;
  const margin = position / lev;
  const perDollar = ounces;
  const free = bal - margin;
  const wipe = perDollar > 0 ? bal / perDollar : 0;
  const canOpen = margin <= bal;

  return (
    <div className="lab">
      <div className="lab-head">
        <span className="fx-eyebrow">Try it</span>
        <h3>Leverage lab (gold)</h3>
      </div>
      <div className="lab-grid">
        <div className="lab-ctrls">
          <div className="two-in">
            <div>
              <label className="fx-label" htmlFor="ll-bal">Account balance ($)</label>
              <input id="ll-bal" className="fx-input" type="number" inputMode="decimal" value={balance} onChange={(e) => setBalance(e.target.value)} />
            </div>
            <div>
              <label className="fx-label" htmlFor="ll-px">Gold price (example)</label>
              <input id="ll-px" className="fx-input" type="number" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div>
            <span className="fx-label">Leverage</span>
            <div className="chips">
              {LEVERAGE.map((l) => (
                <button key={l} type="button" className="chip" aria-pressed={lev === l} onClick={() => setLev(l)}>1:{l}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="fx-label">Lot size</span>
            <div className="chips">
              {LOTS.map((l) => (
                <button key={l} type="button" className="chip" aria-pressed={lots === l} onClick={() => setLots(l)}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="lab-out">
          <div><span>Position size</span><b>${position.toLocaleString("en-US", { maximumFractionDigits: 0 })}</b></div>
          <div><span>Margin locked</span><b className={canOpen ? "" : "down"}>${margin.toLocaleString("en-US", { maximumFractionDigits: 2 })}</b></div>
          <div><span>Free margin</span><b className={free >= 0 ? "" : "down"}>${free.toLocaleString("en-US", { maximumFractionDigits: 2 })}</b></div>
          <div><span>Per $1 gold move</span><b>${perDollar.toFixed(2)}</b></div>
          <div className="hl"><span>Move that wipes the account</span><b className="down">${wipe.toFixed(2)}</b></div>
          <p className="lab-note">
            {canOpen
              ? `Change the leverage and watch: only the margin changes. The money per $1 move stays $${perDollar.toFixed(2)}, because that depends on lot size, not leverage.`
              : "Not enough balance to open this trade at this leverage. That’s the broker protecting you from an oversized position."}
          </p>
        </div>
      </div>
    </div>
  );
}
