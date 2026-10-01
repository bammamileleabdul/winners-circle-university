"use client";

import PageShell from "../../components/PageShell";
import { SITE } from "../../lib/site";

const STEPS = [
  {
    n: "01",
    t: "Create your Exness account",
    d: "Sign up with Exness through our link and verify your identity. Exness is the regulated broker that holds your funds.",
  },
  {
    n: "02",
    t: "Copy the Winners Circle strategy",
    d: `In Exness Social Trading, find our strategy and invest from $${SITE.minInvestmentUsd}. Trades copy automatically from then on.`,
  },
  {
    n: "03",
    t: "Pay only when profit exists",
    d: `Exness takes ${SITE.performanceFeePct}% of new profit at the end of each monthly period. No profit means no fee.`,
  },
];

export default function GetStartedPage() {
  const hasSignup = Boolean(SITE.exnessSignupUrl);

  return (
    <PageShell
      wide
      eyebrow="Get started"
      title="Get started in 3 steps"
      intro="Open an Exness account, copy our strategy, and only pay a fee when you’re in profit."
    >
      <div className="btn-row">
        {hasSignup ? (
          <a className="btn fx-mag" href={SITE.exnessSignupUrl} target="_blank" rel="noopener noreferrer">
            Open Exness account
          </a>
        ) : (
          <a className="btn fx-mag" href="/waitlist">
            Join the waitlist
          </a>
        )}
        <a className="btn-ghost fx-mag" href="/copy-trading">
          See the full walkthrough
        </a>
        <a className="btn-ghost fx-mag" href="/signup">
          Create members account
        </a>
      </div>

      <a className="newbie fx-glass fx-tilt" href="/learn">
        <span className="fx-eyebrow">New to trading?</span>
        <b>Read Foundations first: eight short chapters, from pips to copy trading.</b>
        <i>Start learning →</i>
      </a>

      <div className="steps">
        {STEPS.map((s) => (
          <div key={s.n} className="step fx-glass fx-tilt">
            <span className="n">{s.n}</span>
            <h2>{s.t}</h2>
            <p>{s.d}</p>
          </div>
        ))}
      </div>

      <div className="duo">
        <div className="card fx-glass fx-hud">
          <span className="fx-eyebrow">Performance fee</span>
          <div className="big fx-gradient-text">{SITE.performanceFeePct}%</div>
          <p>Of new profit only, charged by Exness each month. You never send money to us directly.</p>
        </div>
        <div className="card fx-glass">
          <span className="fx-eyebrow">What you get</span>
          <ul>
            <li>Every trade copied automatically to your Exness account</li>
            <li>Members area with the strategy’s record and your fee maths</li>
            <li>Trade breakdowns and lessons on the framework</li>
            <li>Support and onboarding guidance</li>
          </ul>
        </div>
      </div>

      <p className="fx-notice">
        <b>Risk</b>
        <span>
          Trading is high risk and you can lose the money you invest, including when copying. Past results do not
          guarantee future results. Nothing here is financial advice. Need help? <a href="/support">Support</a> ·{" "}
          <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a>
        </span>
      </p>

      <style jsx>{`
        .newbie {
          display: grid;
          gap: 8px;
          padding: 18px 22px;
          border-color: var(--gold-deep);
        }
        .newbie b {
          font: 600 20px/1.3 var(--display);
        }
        .newbie i {
          font: 600 12px/1 var(--mono);
          font-style: normal;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 860px) {
          .steps {
            grid-template-columns: 1fr;
          }
        }
        .step {
          display: grid;
          gap: 10px;
          align-content: start;
          padding: 26px 24px;
          min-height: 230px;
        }
        .n {
          font: 700 56px/1 var(--display);
          background: linear-gradient(180deg, var(--gold), rgba(230, 195, 106, 0.1));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .step h2 {
          margin: 0;
          font-size: 24px;
        }
        .step p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }
        .duo {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 760px) {
          .duo {
            grid-template-columns: 1fr;
          }
        }
        .card {
          display: grid;
          gap: 12px;
          align-content: start;
          padding: 26px 24px;
        }
        .card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
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
        .big {
          font: 700 72px/1 var(--display);
        }
        .fx-notice a {
          color: var(--gold);
        }
      `}</style>
    </PageShell>
  );
}
