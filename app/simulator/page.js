"use client";

import { useMemo, useState } from "react";
import PageShell from "../../components/PageShell";
import BalanceChart from "../../components/BalanceChart";
import { SITE } from "../../lib/site";
import { TRACK, TRADES, RISK_LEVELS } from "../../lib/track";
import { replayTrades, money, pct } from "../../lib/replay";

const AMOUNTS = [50, 250, 1000, 5000];
const PERIODS = [
  { k: "all", label: `Since ${TRACK.from.replace(" 2026", "")}`, from: "0000" },
  { k: "jul", label: "Since 1 Jul", from: "2026-07-01" },
  { k: "sep", label: "Since 1 Sep", from: "2026-09-01" },
];

const fmtDate = (t) =>
  new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }) +
  " " +
  new Date(t).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });

export default function SimulatorPage() {
  const [amount, setAmount] = useState("250");
  const [div, setDiv] = useState(14);
  const [period, setPeriod] = useState("all");
  const [showLog, setShowLog] = useState(false);

  const amt = parseFloat(amount);
  const valid = amt >= SITE.minInvestmentUsd;
  const trades = useMemo(() => TRADES.filter((t) => t.t >= PERIODS.find((p) => p.k === period).from), [period]);
  const res = useMemo(() => (valid ? replayTrades(amt, trades, div, SITE.performanceFeePct) : null), [amt, trades, div, valid]);
  const level = RISK_LEVELS.find((r) => r.div === div);
  const fiveLoss = (1 - Math.pow(1 - 1 / div, 5)) * 100;
  const gain = res ? res.end - amt : 0;

  return (
    <PageShell
      wide
      eyebrow="Simulator"
      title="Replay the real trades"
      intro={`Pick a starting amount and a risk level. We replay every public ${TRACK.channel} signal since ${TRACK.from}, wins and losses in the order they happened, with the ${SITE.performanceFeePct}% monthly fee taken off.`}
    >
      <div className="src fx-glass fx-hud">
        <span className="badge">Real trades</span>
        <div className="src-nums">
          <div><b>{TRACK.trades}</b><span>Signals</span></div>
          <div><b className="up">{TRACK.wins}</b><span>Hit TP</span></div>
          <div><b className="down">{TRACK.losses}</b><span>Hit SL</span></div>
          <div><b>{Math.round((TRACK.wins / TRACK.trades) * 100)}%</b><span>Win rate</span></div>
        </div>
        <p>
          Every free gold signal posted in the{" "}
          <a href={TRACK.channelUrl} target="_blank" rel="noopener noreferrer">{TRACK.channel} Telegram channel</a>{" "}
          from {TRACK.from} to {TRACK.to}, with entry, take profit and stop loss published before the result. All
          trades are 1:1. Open the trade log below to check any of them on Telegram.
        </p>
      </div>

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
            <span className="fx-label">Risk per trade</span>
            <div className="risks">
              {RISK_LEVELS.map((r) => (
                <button key={r.div} type="button" className={`risk r${r.div}`} aria-pressed={div === r.div} onClick={() => setDiv(r.div)}>
                  <b>Capital {r.label}</b>
                  <span>{r.pct} per trade</span>
                  <i>{r.tone}</i>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="fx-label">Period</span>
            <div className="chips">
              {PERIODS.map((p) => (
                <button key={p.k} type="button" className="chip" aria-pressed={period === p.k} onClick={() => setPeriod(p.k)}>
                  {p.label}
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
                {money(Math.abs(gain)).replace("-", "")} ({pct((gain / amt) * 100)}) after {money(res.fees)} in fees, over {trades.length} trades
              </span>
            </div>
          )}

          <p className={`warn r${div}`}>
            <b>{level.tone}.</b> At {level.pct} per trade, 5 losses in a row would cut the account by {fiveLoss.toFixed(0)}%. Losing
            streaks happen even in good strategies.
          </p>
        </div>

        <div className="panel fx-glass">
          <div className="head">
            <h2>Simulated balance</h2>
            <span>{trades.length} trades · {level.label}</span>
          </div>
          {res && <BalanceChart values={res.points.map((p) => p.bal)} labels={res.points.map((p) => p.label)} />}
          {res && (
            <div className="stats">
              <div><span>Wins / losses</span><b>{res.wins} / {res.losses}</b></div>
              <div><span>Win rate</span><b>{trades.length ? Math.round((res.wins / trades.length) * 100) : 0}%</b></div>
              <div><span>Max drawdown</span><b className="neg">-{(res.maxDD * 100).toFixed(1)}%</b></div>
              <div><span>Longest losing run</span><b>{res.worstStreak}</b></div>
            </div>
          )}
          <p className="fine">
            Hypothetical: assumes every signal was taken at exactly its entry, take profit and stop loss, risking the
            chosen share of the balance each time, with the fee charged at each month end. Real copied results will
            differ because of spreads, slippage, timing and position sizing. Past results don’t guarantee future ones.
            You can lose your whole investment.
          </p>
        </div>
      </div>

      <div className="log fx-glass">
        <button type="button" className="log-toggle" aria-expanded={showLog} onClick={() => setShowLog(!showLog)}>
          <span>
            <b>Trade log</b>
            <i>{trades.length} trades in this period, newest first</i>
          </span>
          <span className="log-cta">{showLog ? "Hide" : "Show"}</span>
        </button>
        {showLog && (
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Date (UTC)</th>
                  <th>Side</th>
                  <th>Entry</th>
                  <th>TP</th>
                  <th>SL</th>
                  <th>Result</th>
                  <th>Post</th>
                </tr>
              </thead>
              <tbody>
                {[...trades].reverse().map((t) => (
                  <tr key={t.id}>
                    <td>{fmtDate(t.t)}</td>
                    <td className={t.side === "BUY" ? "up" : "down"}>{t.side}</td>
                    <td>{t.entry}</td>
                    <td>{t.tp}</td>
                    <td>{t.sl}</td>
                    <td><span className={`pill ${t.win ? "w" : "l"}`}>{t.win ? "TP hit" : "SL hit"}</span></td>
                    <td><a href={t.url} target="_blank" rel="noopener noreferrer">#{t.id}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="btn-row">
        <a className="btn fx-mag" href="/copy-trading">How to copy us</a>
        <a className="btn-ghost fx-mag" href="/how">The risk framework</a>
      </div>

      <style jsx>{`
        .src {
          display: grid;
          gap: 14px;
          padding: 20px 22px;
          border-color: var(--gold-deep);
        }
        .badge {
          justify-self: start;
          font: 600 11px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0b0b0b;
          background: var(--gold);
          padding: 7px 10px;
        }
        .src-nums {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid var(--line);
        }
        .src-nums div {
          display: grid;
          gap: 6px;
          padding: 14px;
          background: rgba(8, 7, 5, 0.6);
          border-right: 1px solid var(--line);
        }
        .src-nums div:last-child {
          border-right: 0;
        }
        .src-nums b {
          font: 700 clamp(26px, 4vw, 36px) / 1 var(--display);
        }
        .src-nums span {
          font: 500 10px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        @media (max-width: 560px) {
          .src-nums {
            grid-template-columns: 1fr 1fr;
          }
          .src-nums div:nth-child(-n + 2) {
            border-bottom: 1px solid var(--line);
          }
        }
        .src p {
          margin: 0;
          color: #d9d1bd;
          line-height: 1.6;
          max-width: 80ch;
        }
        .src a {
          color: var(--gold);
          border-bottom: 1px solid var(--line-strong);
        }
        .up {
          color: var(--gold);
        }
        .down,
        .neg {
          color: var(--loss);
        }
        .grid {
          display: grid;
          grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 880px) {
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
        .risks {
          display: grid;
          gap: 8px;
        }
        .risk {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-areas: "b i" "s i";
          gap: 4px 10px;
          align-items: center;
          padding: 12px 14px;
          text-align: left;
          background: rgba(8, 7, 5, 0.6);
          color: var(--fg);
          border: 1px solid var(--line);
          letter-spacing: 0;
        }
        .risk:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .risk b {
          grid-area: b;
          font: 700 17px/1 var(--display);
        }
        .risk span {
          grid-area: s;
          font: 400 12px/1 var(--mono);
          color: var(--muted);
        }
        .risk i {
          grid-area: i;
          font: 600 10px/1 var(--mono);
          font-style: normal;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 8px;
          border: 1px solid currentColor;
          color: #e0b46f;
        }
        .risk.r10 i {
          color: #e39b6f;
        }
        .risk.r5 i {
          color: #ef6f5a;
        }
        .risk[aria-pressed="true"] {
          border-color: var(--gold);
          background: var(--gold-soft);
        }
        .risk.r5[aria-pressed="true"] {
          border-color: #ef6f5a;
          background: rgba(239, 111, 90, 0.1);
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
          font: 400 13px/1.45 var(--mono);
          color: var(--muted);
        }
        .warn {
          margin: 0;
          padding: 12px 14px;
          border-left: 2px solid #e0b46f;
          background: rgba(224, 180, 111, 0.08);
          font-size: 14px;
          line-height: 1.5;
        }
        .warn.r10 {
          border-color: #e39b6f;
        }
        .warn.r5 {
          border-color: #ef6f5a;
          background: rgba(239, 111, 90, 0.1);
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
        .fine {
          margin: 0;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
        }
        .log {
          padding: 0;
          overflow: hidden;
        }
        .log-toggle {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 18px 22px;
          background: transparent;
          color: var(--fg);
          text-align: left;
          letter-spacing: 0;
        }
        .log-toggle:hover {
          box-shadow: none;
          background: var(--gold-soft);
        }
        .log-toggle span:first-child {
          display: grid;
          gap: 6px;
        }
        .log-toggle b {
          font: 700 22px/1 var(--display);
        }
        .log-toggle i {
          font: 400 12px/1 var(--mono);
          font-style: normal;
          color: var(--muted);
        }
        .log-cta {
          font: 600 12px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .tbl-wrap {
          overflow-x: auto;
          max-height: 520px;
          overflow-y: auto;
          border-top: 1px solid var(--line);
        }
        .tbl {
          width: 100%;
          min-width: 640px;
          border-collapse: collapse;
          font: 400 13px/1.4 var(--mono);
          font-variant-numeric: tabular-nums;
        }
        .tbl th {
          position: sticky;
          top: 0;
          background: #0e0c09;
          text-align: left;
          padding: 10px 14px;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          border-bottom: 1px solid var(--line);
        }
        .tbl td {
          padding: 10px 14px;
          border-bottom: 1px solid var(--line);
        }
        .tbl a {
          color: var(--gold);
        }
        .pill {
          display: inline-block;
          padding: 4px 8px;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 1px solid;
        }
        .pill.w {
          color: var(--gold);
        }
        .pill.l {
          color: var(--loss);
        }
      `}</style>
    </PageShell>
  );
}
