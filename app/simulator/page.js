"use client";

import { useMemo, useState } from "react";
import PageShell from "../../components/PageShell";
import BalanceChart from "../../components/BalanceChart";
import { SITE, WEEKLY_RETURNS, RETURNS_ARE_SAMPLE } from "../../lib/site";
import { replay, money, pct } from "../../lib/replay";

const AMOUNTS = [50, 250, 1000, 5000];
const PERIODS = [12, 26, 52];

export default function SimulatorPage() {
  const [amount, setAmount] = useState("250");
  const [weeks, setWeeks] = useState(26);

  const amt = parseFloat(amount);
  const valid = amt >= SITE.minInvestmentUsd;
  const rets = WEEKLY_RETURNS.slice(-weeks);
  const res = useMemo(() => (valid ? replay(amt, rets, SITE.performanceFeePct) : null), [amt, weeks, valid]); // eslint-disable-line react-hooks/exhaustive-deps
  const labels = ["Start", ...rets.map((_, i) => `Week ${i + 1}`)];
  const gain = res ? res.end - amt : 0;

  return (
    <PageShell
      wide
      eyebrow="Simulator"
      title="Replay the history"
      intro={`Pick a starting amount and a period. We replay the strategy’s weekly results on it, including the ${SITE.performanceFeePct}% monthly fee and every losing week.`}
    >
      {RETURNS_ARE_SAMPLE && (
        <p className="fx-notice">
          <b>Sample</b>
          <span>Running on placeholder data until the verified Exness strategy history is published. Past performance does not guarantee future results.</span>
        </p>
      )}

      <div className="grid">
        <div className="panel fx-glass fx-hud">
          <div>
            <label className="fx-label" htmlFor="sim-amt">Starting amount (USD)</label>
            <div className="amount">
              <span>$</span>
              <input id="sim-amt" type="number" inputMode="decimal" min={SITE.minInvestmentUsd} step="10" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>
          <div className="chips">
            {AMOUNTS.map((a) => (
              <button key={a} type="button" className="chip" aria-pressed={amt === a} onClick={() => setAmount(String(a))}>
                ${a.toLocaleString("en-US")}
              </button>
            ))}
          </div>
          <div>
            <span className="fx-label">Period</span>
            <div className="chips">
              {PERIODS.map((w) => (
                <button key={w} type="button" className="chip" aria-pressed={weeks === w} onClick={() => setWeeks(w)}>
                  {w} weeks
                </button>
              ))}
            </div>
          </div>
          {!valid && <p className="err">Enter at least ${SITE.minInvestmentUsd}, the minimum investment.</p>}
          {res && (
            <div className="result">
              <span className="fx-eyebrow">Ending balance</span>
              <span className="big">{money(res.end)}</span>
              <span className={`sub ${gain >= 0 ? "" : "neg"}`}>
                {gain >= 0 ? "+" : "-"}
                {money(Math.abs(gain)).replace("-", "")} ({pct((gain / amt) * 100)}) after fees over {weeks} weeks
              </span>
            </div>
          )}
        </div>

        <div className="panel fx-glass">
          <div className="head">
            <h2>Simulated balance</h2>
            <span>{weeks} weeks</span>
          </div>
          {res && <BalanceChart values={res.points.map((p) => p.bal)} labels={labels} />}
          {res && (
            <div className="stats">
              <div><span>Fees paid</span><b>{money(res.fees)}</b></div>
              <div><span>Losing weeks</span><b>{res.losing} of {weeks}</b></div>
              <div><span>Worst week</span><b className="neg">{pct(res.worst)}</b></div>
              <div><span>Max drawdown</span><b className="neg">-{(res.maxDD * 100).toFixed(2)}%</b></div>
            </div>
          )}
          <p className="fine">
            Hypothetical. Assumes every trade is copied at the same proportion with the fee charged every 4 weeks, before
            spreads and swaps. Real results vary. You can lose your whole investment.
          </p>
        </div>
      </div>

      <div className="btn-row">
        <a className="btn fx-mag" href="/copy-trading">How to copy us</a>
        <a className="btn-ghost fx-mag" href="/how">The risk framework</a>
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .panel {
          display: grid;
          gap: 18px;
          padding: 22px;
          min-width: 0;
        }
        .amount {
          display: flex;
          align-items: center;
          border: 1px solid var(--line);
          background: rgba(8, 7, 5, 0.7);
        }
        .amount:focus-within {
          border-color: var(--gold);
        }
        .amount span {
          padding-left: 14px;
          color: var(--gold);
          font: 500 20px/1 var(--mono);
        }
        .amount input {
          width: 100%;
          min-height: 52px;
          padding: 0 12px;
          border: 0;
          background: transparent;
          color: var(--fg);
          font: 500 20px/1 var(--mono);
          outline: none;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chip {
          padding: 10px 14px;
          background: transparent;
          color: var(--fg);
          border: 1px solid var(--line);
          font: 500 13px/1 var(--mono);
          letter-spacing: 0;
        }
        .chip:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .chip[aria-pressed="true"] {
          border-color: var(--gold);
          color: var(--gold);
          background: var(--gold-soft);
        }
        .err {
          margin: 0;
          color: var(--loss);
          font-size: 14px;
        }
        .result {
          display: grid;
          gap: 6px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }
        .big {
          font: 700 clamp(40px, 7vw, 56px) / 1 var(--display);
          color: var(--gold);
          font-variant-numeric: tabular-nums;
        }
        .sub {
          font: 400 13px/1.4 var(--mono);
          color: var(--muted);
        }
        .head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
        }
        .head h2 {
          margin: 0;
          font-size: 24px;
        }
        .head span {
          font: 400 12px/1 var(--mono);
          color: var(--muted);
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid var(--line);
        }
        @media (max-width: 620px) {
          .stats {
            grid-template-columns: 1fr 1fr;
          }
        }
        .stats div {
          display: grid;
          gap: 8px;
          padding: 14px;
          background: rgba(8, 7, 5, 0.6);
          border-right: 1px solid var(--line);
        }
        .stats span {
          font: 500 10px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .stats b {
          font: 600 20px/1 var(--display);
          font-variant-numeric: tabular-nums;
        }
        .neg {
          color: var(--loss);
        }
        .fine {
          margin: 0;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
      `}</style>
    </PageShell>
  );
}
