"use client";

import { useState } from "react";

const RRS = [1, 2, 3];

// Break-even win rate and expected result per trade for a chosen reward:risk.
export default function RiskRewardLab() {
  const [rr, setRr] = useState(2);
  const [win, setWin] = useState(45);

  const breakeven = 100 / (1 + rr);
  const exp = (win / 100) * rr - (1 - win / 100); // in units of risk (R)
  const over20 = exp * 20;

  return (
    <div className="lab">
      <div className="lab-head">
        <span className="fx-eyebrow">Try it</span>
        <h3>Win rate vs reward:risk</h3>
      </div>
      <div className="lab-grid">
        <div className="lab-ctrls">
          <div>
            <span className="fx-label">Reward : risk</span>
            <div className="chips">
              {RRS.map((r) => (
                <button key={r} type="button" className="chip" aria-pressed={rr === r} onClick={() => setRr(r)}>{r}:1</button>
              ))}
            </div>
          </div>
          <div>
            <label className="fx-label" htmlFor="rr-win">Win rate <output>{win}%</output></label>
            <input id="rr-win" type="range" min="10" max="90" step="1" value={win} onChange={(e) => setWin(+e.target.value)} />
          </div>
          <div className="meter" aria-hidden="true">
            <div className="meter-fill" style={{ width: `${win}%` }} />
            <div className="meter-mark" style={{ left: `${breakeven}%` }}>
              <span>Break-even {breakeven.toFixed(0)}%</span>
            </div>
          </div>
        </div>
        <div className="lab-out">
          <div><span>Break-even win rate</span><b>{breakeven.toFixed(1)}%</b></div>
          <div><span>Average per trade</span><b className={exp >= 0 ? "up" : "down"}>{exp >= 0 ? "+" : "−"}{Math.abs(exp).toFixed(2)}R</b></div>
          <div className="hl"><span>Over 20 trades</span><b className={over20 >= 0 ? "up" : "down"}>{over20 >= 0 ? "+" : "−"}{Math.abs(over20).toFixed(1)}R</b></div>
          <p className="lab-note">
            “R” is the amount you risk on one trade. At {rr}:1 you only need to win {breakeven.toFixed(0)}% of trades to break
            even, before costs like spread. These are averages; real results come in streaks.
          </p>
        </div>
      </div>
    </div>
  );
}
