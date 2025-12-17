"use client";

export default function AccessTradingPage() {
  return (
    <>
      <section className="wrap">
        <div className="card">
          <div className="pill">TRANSPARENCY · CONTROL</div>
          <h1>How We Access & Trade Your Account</h1>
          <p className="lead">
            Your capital stays with your broker. We only control entries, exits and risk,
            using a fixed framework and clear rules.
          </p>

          <div className="grid">
            <div className="block">
              <h2>What we need from you</h2>
              <p>
                To connect your account, we only need access to a single MT5 trading account –
                not your bank, not your card, not your email login.
              </p>
              <ul>
                <li>MT5 server name (e.g. Exness-MT5Real…)</li>
                <li>MT5 account number</li>
                <li>MT5 trading password for that account only</li>
              </ul>
              <p className="note">
                This lets our system log in to your MT5 and execute trades. It does{" "}
                <strong>not</strong> give us access to your broker funding or withdrawals.
              </p>
            </div>

            <div className="block">
              <h2>Your broker vs MT5</h2>
              <p>
                Think of it like this:
              </p>
              <ul>
                <li>
                  <strong>Your broker (Exness, FBS, Capital.com etc.)</strong> – this is where
                  your money lives. You deposit and withdraw there. Only you control that.
                </li>
                <li>
                  <strong>MT5</strong> – this is just the control screen. It shows the balance
                  from your broker and allows trades to be placed on that balance.
                </li>
              </ul>
              <p className="note">
                We live on the MT5 side. We never touch your funding rail.
              </p>
            </div>

            <div className="block">
              <h2>What we can do – and can&apos;t do</h2>
              <div className="columns">
                <div>
                  <h3 className="miniTitle">We can:</h3>
                  <ul>
                    <li>Place Buy/Sell positions according to the framework</li>
                    <li>Set and modify TP/SL on your trades</li>
                    <li>Size risk using the fixed formula (capital ÷ 14)</li>
                    <li>Pause trading on our side if conditions aren&apos;t clean</li>
                  </ul>
                </div>
                <div>
                  <h3 className="miniTitle">We can&apos;t:</h3>
                  <ul>
                    <li>Withdraw your funds from your broker</li>
                    <li>Change your broker login email or password</li>
                    <li>Access your card or bank details</li>
                    <li>Touch any other accounts in your broker profile</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="block">
              <h2>Risk framework (how the math works)</h2>
              <p>
                We do not wing it. Risk is fixed and transparent:
              </p>
              <ul>
                <li>
                  Core rule: <strong>Risk per trade = account capital ÷ 14</strong>
                </li>
                <li>
                  Base structure: <strong>1:1 RR</strong> – you risk X to aim for X
                </li>
              </ul>
              <p>
                Example with <strong>£500</strong>:
              </p>
              <ul>
                <li>Risk per trade ≈ <strong>£35.70</strong></li>
                <li>Target per clean TP ≈ <strong>£35.70</strong></li>
              </ul>
              <p>
                On a normal week with <strong>7–9 TPs left after SLs</strong>, this can mean
                roughly:
              </p>
              <ul>
                <li>A softer week: around <strong>£142</strong> profit (≈ 4 net TPs)</li>
                <li>A clean week: around <strong>£250 – £321</strong> profit</li>
              </ul>
              <p className="note">
                These are illustrations, not guarantees. Markets move, spreads change, and
                execution can vary – but the risk logic stays fixed.
              </p>
            </div>

            <div className="block">
              <h2>How you pay the 30%</h2>
              <p>
                We don&apos;t charge subscriptions or upfront fees. Our structure is simple:
              </p>
              <ul>
                <li>You withdraw profits from your broker when you decide</li>
                <li>You send us <strong>30% of the net profit</strong> for that period</li>
                <li>Payment methods: crypto or card (agreed privately with you)</li>
              </ul>
              <p className="note">
                If there&apos;s no net profit, there&apos;s nothing to pay. We are performance-first.
              </p>
            </div>

            <div className="block">
              <h2>How to disconnect us instantly</h2>
              <p>
                You stay in control. If you ever want to stop trading with us, you can:
              </p>
              <ul>
                <li>Change your MT5 trading password in your broker app</li>
                <li>Disable auto-trading on your MT5 terminal</li>
                <li>Withdraw funds from your broker account at any time</li>
              </ul>
              <p className="note">
                No paperwork, no emails needed. One password change and our access is gone.
              </p>
            </div>
          </div>

          <div className="ctaRow">
            <a href="/get-started" className="ghostBtn">
              ← Back to Get Started
            </a>
            <a href="/" className="goldBtn">
              Return to main page →
            </a>
          </div>

          <p className="disclaimer">
            Disclaimer: Trading is high risk. You can lose capital. Nothing here is financial advice
            or a guarantee of returns. We focus on structure and risk discipline, not gambling.
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
          max-width: 960px;
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.3);
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.08),
            rgba(0, 0, 0, 0.96)
          );
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.18);
          padding: 28px 20px 30px;
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

        .grid {
          display: grid;
          gap: 18px;
          margin-bottom: 24px;
        }

        .block {
          padding: 14px 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.25);
          background: rgba(0, 0, 0, 0.72);
        }

        .block h2 {
          margin: 0 0 6px;
          font-size: 16px;
          color: #e6c36a;
        }

        .block p {
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

        .columns {
          display: grid;
          gap: 12px;
        }

        .miniTitle {
          margin: 0 0 4px;
          font-size: 13px;
          color: #e6c36a;
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

        @media (min-width: 780px) {
          .card {
            padding: 32px 32px 30px;
          }

          h1 {
            font-size: 32px;
          }

          .grid {
            gap: 20px;
          }

          .columns {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}
