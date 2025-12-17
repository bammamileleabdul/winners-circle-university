export default function HowItWorksPage() {
  return (
    <div className="howWrap">
      <div className="howCard">
        <header className="howHeader">
          <h1>How Winners Circle Works</h1>
          <p>Simple structure. Clear risk. Transparent profit split.</p>
        </header>

        <section className="howSection">
          <h2>1 — You fund the account</h2>
          <p>
            You bring the capital in your own trading account with a supported
            broker. You keep full ownership and control of the funds at all
            times.
          </p>
        </section>

        <section className="howSection">
          <h2>2 — Fixed risk: capital ÷ 14</h2>
          <p>
            Every trade is sized using a fixed formula:{" "}
            <strong>risk per trade = capital ÷ 14</strong>. This keeps risk
            consistent and avoids random over-leveraging.
          </p>
          <p className="exampleBox">
            Example: If you start with <strong>$1400</strong>, risk per trade is
            <strong> $100</strong>. If a setup fails, you already know the
            maximum hit.
          </p>
        </section>

        <section className="howSection">
          <h2>3 — We execute the framework</h2>
          <p>
            Winners Circle runs a focused gold strategy: clear levels, strict
            entries, and pre-planned exits. No gambling, no chasing candles, no
            “one last trade”.
          </p>
          <p>
            The goal is simple: protect downside first, then let high-probability
            moves compound over time.
          </p>
        </section>

        <section className="howSection">
          <h2>4 — Profit split: 70% you, 30% us</h2>
          <p>
            Profits are shared on performance only:{" "}
            <strong>you keep 70% of the net profit</strong> and{" "}
            <strong>Winners Circle takes 30%</strong> as a performance fee.
          </p>
          <ul className="list">
            <li>No management fee.</li>
            <li>No profit = no fee.</li>
            <li>You can withdraw or compound according to the agreement.</li>
          </ul>
        </section>

        <section className="howSection">
          <h2>5 — Transparency & tracking</h2>
          <p>
            You see the account history, risk per trade and equity curve. Mini
            lelefx can also simulate “what if” scenarios using past data so you
            understand how the framework behaves over time.
          </p>
        </section>

        <footer className="howFooter">
          <p className="disclaimer">
            Trading involves risk. Returns are not guaranteed. This is
            educational and process-focused, not financial advice.
          </p>

          <a href="/" className="backBtn">
            ← Back to overview
          </a>
        </footer>
      </div>

      <style jsx>{`
        .howWrap {
          min-height: 100vh;
          padding: 40px 16px;
          display: flex;
          justify-content: center;
          background: radial-gradient(circle at top, #2a1f0f, #000);
        }

        .howCard {
          width: 100%;
          max-width: 780px;
          border-radius: 28px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.06),
            rgba(0, 0, 0, 0.96)
          );
          box-shadow: 0 0 90px rgba(230, 195, 106, 0.16);
          padding: 26px 22px 28px;
          color: #f5f5f5;
        }

        .howHeader h1 {
          margin: 0 0 6px;
          font-size: 26px;
          color: #e6c36a;
        }

        .howHeader p {
          margin: 0;
          font-size: 14px;
          color: #d8d2b6;
        }

        .howSection {
          margin-top: 22px;
        }

        .howSection h2 {
          margin: 0 0 6px;
          font-size: 18px;
          color: #e6c36a;
        }

        .howSection p {
          margin: 0 0 8px;
          font-size: 14px;
          line-height: 1.7;
          color: #ddd6bc;
        }

        .exampleBox {
          margin-top: 6px;
          padding: 10px 12px;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(230, 195, 106, 0.25);
        }

        .list {
          margin: 6px 0 0 16px;
          padding: 0;
          font-size: 14px;
          line-height: 1.7;
          color: #ddd6bc;
        }

        .howFooter {
          margin-top: 26px;
          border-top: 1px solid rgba(230, 195, 106, 0.2);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .disclaimer {
          font-size: 12px;
          color: rgba(167, 160, 138, 0.9);
          margin: 0;
        }

        .backBtn {
          align-self: flex-start;
          margin-top: 4px;
          font-size: 14px;
          text-decoration: none;
          color: #000;
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          padding: 8px 14px;
          border-radius: 999px;
          font-weight: 700;
        }

        @media (max-width: 600px) {
          .howCard {
            padding: 22px 16px 24px;
          }

          .howHeader h1 {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}
