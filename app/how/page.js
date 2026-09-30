"use client";

import { useMemo, useState } from "react";
import PageShell from "../../components/PageShell";
import { SITE } from "../../lib/site";

const TABS = [
  {
    k: "risk",
    t: "Capital and risk",
    body: (
      <>
        <p>
          Every decision starts with risk. Capital is split into <b>14 equal risk units</b>, and no single trade risks
          more than one unit. On <b>£500</b> that’s about <b>£35.70</b> at risk per position.
        </p>
        <p>
          Each position is planned at <b>1:1 reward to risk</b>: risk £35.70 to aim for £35.70. If the stop loss isn’t
          clear before entry, the trade doesn’t happen.
        </p>
      </>
    ),
  },
  {
    k: "week",
    t: "A trading week",
    body: (
      <>
        <p>
          Some trades lose. That’s built into the plan, not a surprise. We judge a week by whether every trade followed
          the rules, not by any single result.
        </p>
        <p>
          When conditions aren’t clean we don’t trade. No revenge trades, no doubling up after a loss, and no forcing
          setups to hit a target.
        </p>
      </>
    ),
  },
  {
    k: "split",
    t: "The split",
    body: (
      <>
        <p>
          You copy the strategy through Exness Social Trading. On new profit, you keep <b>{100 - SITE.performanceFeePct}%</b>{" "}
          and Winners Circle receives <b>{SITE.performanceFeePct}%</b>, calculated and collected by Exness at the end of
          each monthly period.
        </p>
        <p>No profit means no fee. Your money stays in your own Exness account the whole time.</p>
      </>
    ),
  },
];

export default function How() {
  const [tab, setTab] = useState("risk");
  const [capital, setCapital] = useState(500);
  const [streak, setStreak] = useState(4);

  const perTrade = capital / 14;
  const bars = useMemo(() => {
    // Balance after each loss in a row, re-sizing risk to the new balance each time.
    let b = capital;
    const out = [b];
    for (let n = 0; n < streak; n++) {
      b -= b / 14;
      out.push(b);
    }
    return out;
  }, [capital, streak]);
  const lost = capital - bars[bars.length - 1];

  const current = TABS.find((t) => t.k === tab);

  return (
    <PageShell
      eyebrow="How it works"
      title="How it works, in practice"
      intro="We operate on a simple idea: protect capital first, then let consistency compound."
    >
      <div className="seg" role="tablist" aria-label="Topics">
        {TABS.map((t) => (
          <button key={t.k} type="button" role="tab" aria-selected={tab === t.k} onClick={() => setTab(t.k)}>
            {t.t}
          </button>
        ))}
      </div>
      <div className="pane fx-glass fx-hud" key={tab}>
        <h2>{current.t}</h2>
        {current.body}
      </div>

      <div className="lab fx-glass">
        <div className="lab-head">
          <span className="fx-eyebrow">Risk lab</span>
          <h2>What a losing streak does</h2>
          <p>Move the sliders to see risk per trade, and how the balance holds up through losses in a row.</p>
        </div>
        <div className="lab-grid">
          <div className="ctrls">
            <div>
              <label className="fx-label" htmlFor="cap">
                Capital <output>£{capital.toLocaleString("en-GB")}</output>
              </label>
              <input id="cap" type="range" min="50" max="10000" step="50" value={capital} onChange={(e) => setCapital(+e.target.value)} />
            </div>
            <div>
              <label className="fx-label" htmlFor="streak">
                Losses in a row <output>{streak}</output>
              </label>
              <input id="streak" type="range" min="1" max="10" step="1" value={streak} onChange={(e) => setStreak(+e.target.value)} />
            </div>
            <div className="nums">
              <div>
                <span>Risk per trade</span>
                <b>£{perTrade.toFixed(2)}</b>
              </div>
              <div>
                <span>Balance after streak</span>
                <b>£{bars[bars.length - 1].toFixed(2)}</b>
              </div>
              <div>
                <span>Drawdown</span>
                <b className="down">−{((lost / capital) * 100).toFixed(1)}%</b>
              </div>
            </div>
          </div>
          <div className="chart" aria-label={`Balance falls from £${capital} to £${bars[bars.length - 1].toFixed(2)} over ${streak} losses`}>
            {bars.map((v, n) => (
              <div key={n} className="col">
                <div className="bar" style={{ height: `${(v / capital) * 100}%` }} />
                <span>{n === 0 ? "Start" : `L${n}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="fx-notice">
        <b>Note</b>
        <span>
          This is not a guarantee or a promise of returns. It explains the framework we trade by, so you know exactly
          how risk is handled before you copy us.
        </span>
      </p>

      <style jsx>{`
        .seg {
          display: flex;
          flex-wrap: wrap;
          width: max-content;
          max-width: 100%;
          border: 1px solid var(--line);
          background: rgba(8, 7, 5, 0.6);
        }
        .seg button {
          background: transparent;
          color: var(--muted);
          border-radius: 0;
          padding: 14px 18px;
          font: 600 13px/1 var(--body);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .seg button:hover {
          box-shadow: none;
          color: var(--gold);
        }
        .seg button[aria-selected="true"] {
          background: var(--gold);
          color: #0b0b0b;
        }
        .pane {
          padding: 28px;
          display: grid;
          gap: 14px;
          animation: fx-rise 0.4s ease-out;
        }
        .pane h2 {
          margin: 0;
          font-size: 30px;
          color: var(--gold);
        }
        .pane :global(p) {
          margin: 0;
          font-size: 18px;
          line-height: 1.7;
          color: #ddd4bf;
          max-width: 64ch;
        }
        .pane :global(b) {
          color: var(--gold);
        }
        .lab {
          padding: 28px;
          display: grid;
          gap: 24px;
        }
        .lab-head {
          display: grid;
          gap: 8px;
        }
        .lab-head h2 {
          margin: 0;
          font-size: 30px;
        }
        .lab-head p {
          margin: 0;
          color: var(--muted);
        }
        .lab-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
          gap: 28px;
          align-items: stretch;
        }
        @media (max-width: 760px) {
          .lab-grid {
            grid-template-columns: 1fr;
          }
        }
        .ctrls {
          display: grid;
          gap: 22px;
          align-content: start;
        }
        .ctrls output {
          float: right;
          color: var(--gold);
        }
        input[type="range"] {
          width: 100%;
          accent-color: var(--gold);
        }
        .nums {
          display: grid;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }
        .nums div {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 12px 14px;
          background: rgba(8, 7, 5, 0.7);
        }
        .nums span {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .nums b {
          font: 600 20px/1 var(--display);
          font-variant-numeric: tabular-nums;
        }
        .down {
          color: var(--loss);
        }
        .chart {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 240px;
          padding: 10px 4px 26px;
          border-bottom: 1px solid var(--line);
        }
        .col {
          flex: 1;
          height: 100%;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .bar {
          width: min(38px, 80%);
          border-radius: 4px 4px 0 0;
          background: linear-gradient(180deg, var(--gold), var(--gold-deep));
          transition: height 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .col:not(:first-child) .bar {
          background: linear-gradient(180deg, #c98a6f, #7a4a36);
        }
        .col span {
          position: absolute;
          bottom: -22px;
          font: 400 11px/1 var(--mono);
          color: var(--muted);
        }
      `}</style>
    </PageShell>
  );
}
