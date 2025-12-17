"use client";

export default function ClientPortal() {
  return (
    <>
      <div className="wrap">
        {/* TOP BAR */}
        <header className="header">
          <a href="/" className="logoBlock">
            <img
              src="/emblem.jpg"
              alt="Winners Circle University"
              className="logoImg"
            />
            <span className="logoText">Back to main site</span>
          </a>

          <div className="tag">Live Client Portal · 70/30 Split</div>
        </header>

        {/* MAIN CONTENT */}
        <main className="main">
          {/* SUMMARY */}
          <section className="card summary">
            <h1>Client Performance Overview</h1>
            <p className="muted">
              This portal is for active clients only. Numbers here are example
              figures. Final payouts are always confirmed privately after each
              cycle.
            </p>

            <div className="statsGrid">
              <div className="statBox">
                <div className="label">Capital (example)</div>
                <div className="value">£500</div>
                <div className="hint">
                  You keep capital in your own account. We work on profit share
                  only.
                </div>
              </div>

              <div className="statBox">
                <div className="label">Framework Risk</div>
                <div className="value">Capital ÷ 14</div>
                <div className="hint">
                  Around £35.70 risk per trade at £500 starting balance.
                </div>
              </div>

              <div className="statBox">
                <div className="label">Target Split</div>
                <div className="value">70% / 30%</div>
                <div className="hint">
                  70% of realised profits to you, 30% to Winners Circle.
                </div>
              </div>
            </div>

            <div className="note">
              None of this is financial advice. It simply shows how our
              framework, risk and split are structured when you are onboarded.
            </div>
          </section>

          {/* TRADE & PAYOUT VIEW */}
          <section className="card trades">
            <h2>Example Session Snapshot</h2>
            <p className="muted small">
              A simple view of how TP / SL and performance can be shown.
            </p>

            <div className="table">
              <div className="row head">
                <span>Date</span>
                <span>Pair</span>
                <span>TP / SL</span>
                <span>Result</span>
              </div>

              <div className="row">
                <span>Mon</span>
                <span>XAUUSD</span>
                <span>TP hit</span>
                <span className="pos">+1R</span>
              </div>
              <div className="row">
                <span>Tue</span>
                <span>XAUUSD</span>
                <span>SL hit</span>
                <span className="neg">-1R</span>
              </div>
              <div className="row">
                <span>Wed</span>
                <span>XAUUSD</span>
                <span>TP hit</span>
                <span className="pos">+1R</span>
              </div>
              <div className="row">
                <span>Thu</span>
                <span>XAUUSD</span>
                <span>TP hit</span>
                <span className="pos">+1R</span>
              </div>
              <div className="row">
                <span>Fri</span>
                <span>XAUUSD</span>
                <span>TP hit</span>
                <span className="pos">+1R</span>
              </div>
            </div>

            <div className="weekBox">
              <div>
                <div className="label">Illustrative Week Result</div>
                <div className="value">+4R</div>
                <div className="hint">
                  At £35.70 per R, that’s around £142 profit.
                </div>
              </div>
              <div className="split">
                <div>
                  <span className="splitLabel">70% to you</span>
                  <span className="splitValue">£99.40</span>
                </div>
                <div>
                  <span className="splitLabel">30% to Winners Circle</span>
                  <span className="splitValue">£42.60</span>
                </div>
              </div>
            </div>

            <div className="divider" />

            <h3>Payout & Profit Share</h3>
            <p className="muted small">
              When a payout window opens, we confirm results together. Then you
              choose a method below to send the 30% share.
            </p>

            <div className="payMethods">
              <button className="payBtn primary">Pay 30% via Card</button>
              <button className="payBtn outline">Pay 30% via Crypto</button>
            </div>

            <p className="tiny">
              Payments are confirmed manually. This portal doesn’t process live
              payments yet – it is a clean interface for tracking and
              settlements.
            </p>
          </section>
        </main>
      </div>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #2a1f0f, #000);
          padding: 18px 14px 40px;
          color: #f7f0d0;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 26px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.25);
          padding-bottom: 12px;
        }

        .logoBlock {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logoImg {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          object-fit: contain;
          box-shadow: 0 0 24px rgba(230, 195, 106, 0.5);
        }

        .logoText {
          font-size: 13px;
          color: #e6c36a;
        }

        .tag {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.5);
          color: #e6c36a;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .main {
          display: grid;
          gap: 18px;
        }

        .card {
          border-radius: 22px;
          padding: 20px 18px;
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.06),
            rgba(0, 0, 0, 0.96)
          );
          border: 1px solid rgba(230, 195, 106, 0.3);
          box-shadow: 0 0 60px rgba(230, 195, 106, 0.2);
        }

        .summary h1 {
          font-size: 22px;
          margin-bottom: 8px;
          color: #e6c36a;
        }

        .muted {
          color: #b8b29b;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .muted.small {
          font-size: 13px;
        }

        .statsGrid {
          display: grid;
          gap: 12px;
          margin-top: 10px;
        }

        .statBox {
          padding: 14px 12px;
          border-radius: 18px;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(230, 195, 106, 0.25);
        }

        .label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(230, 195, 106, 0.85);
          margin-bottom: 4px;
        }

        .value {
          font-size: 20px;
          font-weight: 800;
          color: #f4d47c;
          margin-bottom: 4px;
        }

        .hint {
          font-size: 12px;
          color: #a7a08a;
        }

        .note {
          margin-top: 14px;
          font-size: 12px;
          color: #a7a08a;
        }

        .trades h2 {
          font-size: 18px;
          margin-bottom: 4px;
          color: #e6c36a;
        }

        .table {
          margin-top: 14px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(230, 195, 106, 0.25);
        }

        .row {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr 1.4fr 1fr;
          padding: 10px 12px;
          font-size: 13px;
        }

        .row:nth-child(odd):not(.head) {
          background: rgba(0, 0, 0, 0.6);
        }

        .row:nth-child(even):not(.head) {
          background: rgba(230, 195, 106, 0.03);
        }

        .row.head {
          background: rgba(0, 0, 0, 0.9);
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(230, 195, 106, 0.9);
        }

        .pos {
          color: #8cff9a;
          font-weight: 700;
        }

        .neg {
          color: #ff8f8f;
          font-weight: 700;
        }

        .weekBox {
          margin-top: 16px;
          padding: 14px 12px;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            rgba(230, 195, 106, 0.18),
            rgba(0, 0, 0, 0.85)
          );
          border: 1px solid rgba(230, 195, 106, 0.5);
          display: grid;
          gap: 10px;
        }

        .split {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .splitLabel {
          display: block;
          font-size: 11px;
          color: #f4e7c0;
          opacity: 0.9;
        }

        .splitValue {
          display: block;
          font-size: 15px;
          font-weight: 800;
          color: #f4d47c;
        }

        .divider {
          height: 1px;
          margin: 18px 0 12px;
          background: rgba(230, 195, 106, 0.25);
        }

        .payMethods {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
          margin-bottom: 8px;
        }

        .payBtn {
          border-radius: 999px;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 800;
          border: 1px solid rgba(230, 195, 106, 0.7);
          background: transparent;
          color: #f4e7c0;
        }

        .payBtn.primary {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #000;
        }

        .payBtn.outline {
          background: rgba(0, 0, 0, 0.6);
        }

        .tiny {
          font-size: 11px;
          color: #918a73;
          margin-top: 4px;
        }

        @media (min-width: 900px) {
          .wrap {
            padding: 28px 40px 40px;
          }

          .main {
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          }

          .summary h1 {
            font-size: 26px;
          }

          .row {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
