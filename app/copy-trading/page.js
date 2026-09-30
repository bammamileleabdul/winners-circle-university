"use client";

import { useState } from "react";
import PageShell from "../../components/PageShell";
import { SITE } from "../../lib/site";

const STEPS = [
  {
    t: "Open an Exness account",
    d: "Sign up with Exness using our link and complete their identity checks. Exness is the regulated broker that holds your money, not us.",
  },
  {
    t: "Fund your account",
    d: "Deposit with any method Exness offers in your country. The money stays in your name, in your Exness account.",
  },
  {
    t: "Find the Winners Circle strategy",
    d: "Open the Exness Social Trading app (or the web version) and search for the Winners Circle strategy, or use our direct link.",
  },
  {
    t: `Invest from $${SITE.minInvestmentUsd}`,
    d: "Press Invest and choose an amount. Every trade we take is copied automatically, sized in proportion to what you invested.",
  },
  {
    t: "Stay in control",
    d: "Watch every trade live in the app. You can stop copying, close positions or withdraw at any time. No emails, no permission needed.",
  },
];

export default function CopyTradingPage() {
  const [i, setI] = useState(0);
  const hasSignup = Boolean(SITE.exnessSignupUrl);
  const hasStrategy = Boolean(SITE.strategyUrl);

  return (
    <PageShell
      eyebrow="Copy trading"
      title="Copy us through Exness"
      intro="You never give us a password and we never hold your money. You copy our strategy through Exness Social Trading, and Exness handles the account, the trades and the fee."
    >
      <div className="stepper fx-glass fx-hud">
        <ol className="rail" role="tablist" aria-label="Steps">
          {STEPS.map((s, k) => (
            <li key={s.t}>
              <button
                type="button"
                role="tab"
                aria-selected={k === i}
                className={k < i ? "done" : ""}
                onClick={() => setI(k)}
              >
                <span>{String(k + 1).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="slide" key={i}>
          <span className="big-n">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h2>{STEPS[i].t}</h2>
            <p>{STEPS[i].d}</p>
          </div>
        </div>
        <div className="ctrl">
          <button type="button" className="btn-ghost" disabled={i === 0} onClick={() => setI(i - 1)}>
            Back
          </button>
          {i < STEPS.length - 1 ? (
            <button type="button" className="btn" onClick={() => setI(i + 1)}>
              Next step
            </button>
          ) : hasSignup ? (
            <a className="btn" href={SITE.exnessSignupUrl} target="_blank" rel="noopener noreferrer">
              Open Exness account
            </a>
          ) : (
            <a className="btn" href="/waitlist">
              Join the waitlist
            </a>
          )}
        </div>
      </div>

      <div className="two">
        <div className="card fx-glass fx-tilt" data-tilt="4">
          <span className="fx-eyebrow">We can</span>
          <ul>
            <li>Take trades on the Winners Circle strategy account</li>
            <li>Set and adjust stop loss and take profit on those trades</li>
            <li>Size risk with the fixed rule: capital ÷ 14 per trade</li>
            <li>Pause trading when conditions aren’t clean</li>
          </ul>
        </div>
        <div className="card fx-glass fx-tilt" data-tilt="4">
          <span className="fx-eyebrow">We can’t</span>
          <ul>
            <li>See or use your Exness password</li>
            <li>Deposit, withdraw or move your money</li>
            <li>Change your copy amount or stop you leaving</li>
            <li>Access your card, bank or other accounts</li>
          </ul>
        </div>
      </div>

      <div className="card fx-glass">
        <span className="fx-eyebrow">The fee</span>
        <h2 className="h">{SITE.performanceFeePct}% of new profit, collected by Exness</h2>
        <p>
          The performance fee is set on the strategy inside Exness. At the end of each monthly period Exness works out
          the profit on your investment, takes {SITE.performanceFeePct}% of it and pays it to us. If there’s no new
          profit, there’s no fee. A high-water mark means that after a losing month you pay nothing until your
          investment is back above its previous peak.
        </p>
        <div className="ex" aria-label="Worked example">
          <div><span>Invested</span><b>$500</b></div>
          <div><span>End of month</span><b>$560</b></div>
          <div><span>Profit</span><b>$60</b></div>
          <div><span>Fee ({SITE.performanceFeePct}%)</span><b>${(60 * SITE.performanceFeePct / 100).toFixed(2)}</b></div>
          <div><span>You keep</span><b className="gold">${(560 - 60 * SITE.performanceFeePct / 100).toFixed(2)}</b></div>
        </div>
        <p className="fine">Example figures only, to show the maths. They are not a forecast.</p>
      </div>

      <div className="btn-row">
        {hasSignup ? (
          <a className="btn fx-mag" href={SITE.exnessSignupUrl} target="_blank" rel="noopener noreferrer">
            Open Exness account
          </a>
        ) : (
          <span className="btn is-off" aria-disabled="true">Exness link coming soon</span>
        )}
        {hasStrategy ? (
          <a className="btn-ghost fx-mag" href={SITE.strategyUrl} target="_blank" rel="noopener noreferrer">
            View our strategy
          </a>
        ) : (
          <a className="btn-ghost fx-mag" href="/waitlist">
            Get notified at launch
          </a>
        )}
      </div>

      <p className="fx-notice">
        <b>Risk</b>
        <span>
          Copying our trades means copying our losses too. Forex and CFDs are high risk and you can lose the money you
          invest. Only invest what you can afford to lose. Exness Social Trading isn’t available in every country; check
          it’s offered where you live.
        </span>
      </p>

      <style jsx>{`
        .stepper {
          display: grid;
          gap: 26px;
          padding: 24px;
        }
        .rail {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(${STEPS.length}, 1fr);
          gap: 8px;
        }
        .rail button {
          width: 100%;
          padding: 12px 0 0;
          text-align: left;
          background: transparent;
          border-top: 2px solid var(--line);
          border-radius: 0;
          color: var(--muted);
          font: 500 12px/1 var(--mono);
        }
        .rail button:hover {
          box-shadow: none;
          color: var(--fg);
        }
        .rail button.done {
          border-color: var(--gold-deep);
          color: var(--fg);
        }
        .rail button[aria-selected="true"] {
          border-color: var(--gold);
          color: var(--gold);
          box-shadow: 0 -6px 14px -8px var(--gold);
        }
        .slide {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 28px;
          align-items: center;
          min-height: 170px;
          animation: fx-rise 0.45s ease-out;
        }
        .slide h2 {
          margin: 0 0 10px;
          font-size: clamp(26px, 4vw, 38px);
        }
        .slide p {
          margin: 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.65;
          max-width: 56ch;
        }
        .big-n {
          font: 700 clamp(72px, 13vw, 130px) / 0.9 var(--display);
          background: linear-gradient(180deg, var(--gold), rgba(230, 195, 106, 0.08));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        @media (max-width: 560px) {
          .slide {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }
        .ctrl {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          flex-wrap: wrap;
        }
        .two {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 700px) {
          .two {
            grid-template-columns: 1fr;
          }
        }
        .card {
          display: grid;
          gap: 12px;
          align-content: start;
          padding: 24px;
        }
        .card ul {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 8px;
          line-height: 1.55;
        }
        .card li::marker {
          color: var(--gold);
        }
        .card p {
          margin: 0;
          color: #d9d1bd;
          line-height: 1.7;
          max-width: 70ch;
        }
        .h {
          margin: 0;
          font-size: clamp(24px, 3.5vw, 32px);
        }
        .ex {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          border: 1px solid var(--line);
        }
        .ex div {
          display: grid;
          gap: 8px;
          padding: 14px;
          border-right: 1px solid var(--line);
          background: rgba(8, 7, 5, 0.5);
        }
        .ex div:last-child {
          border-right: 0;
        }
        .ex span {
          font: 500 10px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .ex b {
          font: 600 22px/1 var(--display);
          font-variant-numeric: tabular-nums;
        }
        .ex .gold {
          color: var(--gold);
        }
        @media (max-width: 700px) {
          .ex {
            grid-template-columns: 1fr 1fr;
          }
          .ex div {
            border-bottom: 1px solid var(--line);
          }
        }
        .fine {
          font-size: 13px !important;
          color: var(--muted) !important;
        }
        .is-off {
          opacity: 0.5;
          cursor: default;
        }
      `}</style>
    </PageShell>
  );
}
