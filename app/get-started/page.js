"use client";

export default function GetStartedPage() {
  return (
    <>
      <section className="wrap">
        <div className="card">
          <div className="pill">ONBOARDING · STEP BY STEP</div>
          <h1>How to Get Started</h1>
          <p className="lead">
            Your money stays with your broker. We handle structure, risk and execution.
            Here is exactly how to plug into Winners Circle.
          </p>

          <div className="steps">
            <div className="step">
              <div className="stepLabel">Step 1</div>
              <h2>Join the Circle</h2>
              <p>
                Join the waitlist on the main page with your best email. This is where
                you&apos;ll receive onboarding instructions, risk updates, and key changes.
              </p>
            </div>

            <div className="step">
              <div className="stepLabel">Step 2</div>
              <h2>Open & fund your own broker account</h2>
              <p>
                You create and fund a live MT5 account in your own name with your chosen broker
                (Exness, FBS, Capital.com etc.). Deposits and withdrawals stay under your control.
                We never receive your card, bank, or login details.
              </p>
            </div>

            <div className="step">
              <div className="stepLabel">Step 3</div>
              <h2>Send us your MT5 trading access</h2>
              <p>
                From your broker app, copy the details of the MT5 account you want us to trade:
              </p>
              <ul>
                <li>MT5 server name (e.g. Exness-MT5Real…)</li>
                <li>MT5 account number</li>
                <li>MT5 trading password for that account</li>
              </ul>
              <p className="note">
                This gives us trading access only – not funding or withdrawal access. You can
                disconnect us any time by changing this password in your broker app.
              </p>
            </div>

            <div className="step">
              <div className="stepLabel">Step 4</div>
              <h2>We connect your account to our framework</h2>
              <p>
                We connect your MT5 account to our internal system. Orders are placed according
                to our rules – not emotion:
              </p>
              <ul>
                <li>Gold-only framework (XAUUSD focus)</li>
                <li>Fixed risk formula: <strong>capital ÷ 14</strong> per trade</li>
                <li>Clean TP / SL structure with 1:1 RR as the base</li>
              </ul>
            </div>

            <div className="step">
              <div className="stepLabel">Step 5</div>
              <h2>Track performance & settle the 30%</h2>
              <p>
                You can watch every trade live on MT5. When you choose to withdraw profits
                from your broker, you send us <strong>30% of the net profit</strong> for that
                period via the agreed method (crypto or card).
              </p>
              <p className="note">
                If there&apos;s no net profit, there&apos;s nothing to pay. We only eat when you eat.
              </p>
            </div>

            <div className="step">
              <div className="stepLabel">Step 6</div>
              <h2>You stay in control 24/7</h2>
              <p>
                At any point you can:
              </p>
              <ul>
                <li>Change your MT5 password → instantly disconnects us</li>
                <li>Disable auto-trading locally</li>
                <li>Withdraw all or part of your funds from your broker</li>
              </ul>
              <p className="note">
                No lock-ins. No custody of your capital. Just structure, risk discipline and execution.
              </p>
            </div>
          </div>

          <div className="ctaRow">
            <a href="/" className="ghostBtn">
              ← Back to main page
            </a>
            <a href="/access-trading" className="goldBtn">
              See how we access & trade →
            </a>
          </div>

          <p className="disclaimer">
            Disclaimer: Trading carries risk. Past data and simulations do not guarantee future results.
            Only trade with capital you can afford to risk.
          </p>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          padding: 60px 18px;
          background: radial-gradient(circle at top, #1a1408, #000);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          width: 100%;
          max-width: 860px;
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.3);
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.08),
            rgba(0, 0, 0, 0.96)
          );
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.18);
          padding: 26px 20px 28px;
        }

        .pill {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          color: #e6c36a;
          font-size: 11px;
          letter-spacing: 0.18em;
          margin-bottom: 14px;
        }

        h1 {
          color: #e6c36a;
          font-size: 28px;
          margin: 0 0 10px;
        }

        .lead {
          color: #d8d2b6;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 22px;
        }

        .steps {
          display: grid;
          gap: 18px;
          margin-bottom: 24px;
        }

        .step {
          padding: 14px 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.25);
          background: rgba(0, 0, 0, 0.72);
        }

        .stepLabel {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(230, 195, 106, 0.9);
          margin-bottom: 4px;
        }

        .step h2 {
          margin: 0 0 6px;
          font-size: 16px;
          color: #e6c36a;
        }

        .step p {
          margin: 0;
          color: #d7d7d7;
          font-size: 13px;
          line-height: 1.7;
        }

        ul {
          margin: 8px 0 0 18px;
          padding: 0;
          color: #d7d7d7;
          font-size: 13px;
          line-height: 1.7;
        }

        .note {
          margin-top: 8px;
          font-size: 12px;
          color: #bfae78;
        }

        .ctaRow {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }

        .goldBtn,
        .ghostBtn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
        }

        .goldBtn {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          color: #000;
        }

        .ghostBtn {
          border: 1px solid rgba(230, 195, 106, 0.4);
          color: #e6c36a;
          background: transparent;
        }

        .disclaimer {
          margin-top: 14px;
          font-size: 11px;
          color: rgba(167, 160, 138, 0.95);
          line-height: 1.6;
        }

        @media (min-width: 720px) {
          .card {
            padding: 32px 32px 30px;
          }

          h1 {
            font-size: 32px;
          }

          .steps {
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
}
