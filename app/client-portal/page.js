"use client";

export default function ClientPortal() {
  return (
    <div className="wrap">
      {/* TOP BAR */}
      <header className="topBar">
        <a href="/" className="backLink">
          <img
            src="/emblem.jpg"
            alt="Winners Circle University"
            className="logoImg"
          />
          <span>Back to main site</span>
        </a>

        <div className="liveBadge">
          <span>LIVE CLIENT PORTAL · 70/30 SPLIT</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main">
        {/* OVERVIEW CARD */}
        <section className="card heroCard">
          <h1 className="cardTitle">Client Performance Overview</h1>
          <p className="cardLead">
            This portal is for active clients only. Numbers here are example
            figures. Final payouts are always confirmed privately after each
            cycle.
          </p>

          <div className="statsGrid">
            {/* CAPITAL */}
            <div className="statBox">
              <div className="statLabel">Capital (example)</div>
              <div className="statValue">£500</div>
              <p className="statText">
                You keep capital in your own account. We work on profit share
                only.
              </p>
            </div>

            {/* FRAMEWORK RISK */}
            <div className="statBox">
              <div className="statLabel">Framework risk</div>
              <div className="statValue">Capital ÷ 14</div>
              <p className="statText">
                Around £35.70 risk per trade at £500 starting balance.
              </p>
            </div>

            {/* TARGET SPLIT */}
            <div className="statBox">
              <div className="statLabel">Target split</div>
              <div className="statValue">70% / 30%</div>
              <p className="statText">
                70% of realised profits to you, 30% to Winners Circle.
              </p>
            </div>
          </div>
        </section>

        {/* EXAMPLE SESSION SNAPSHOT */}
        <section className="card sessionCard">
          <h2 className="sectionTitle">Example Session Snapshot</h2>
          <p className="sectionText">
            A simple view of how TP / SL and performance can be shown.
          </p>

          <div className="table">
            <div className="row rowHead">
              <div>Date</div>
              <div>Pair</div>
              <div>TP / SL</div>
              <div className="right">Result</div>
            </div>

            <div className="row">
              <div>Mon</div>
              <div>XAUUSD</div>
              <div>TP hit</div>
              <div className="right pos">+1R</div>
            </div>
            <div className="row">
              <div>Tue</div>
              <div>XAUUSD</div>
              <div>SL hit</div>
              <div className="right neg">-1R</div>
            </div>
            <div className="row">
              <div>Wed</div>
              <div>XAUUSD</div>
              <div>TP hit</div>
              <div className="right pos">+1R</div>
            </div>
            <div className="row">
              <div>Thu</div>
              <div>XAUUSD</div>
              <div>TP hit</div>
              <div className="right pos">+1R</div>
            </div>
            <div className="row">
              <div>Fri</div>
              <div>XAUUSD</div>
              <div>TP hit</div>
              <div className="right pos">+1R</div>
            </div>
          </div>

          <div className="weekResult">
            <div className="weekLabel">Illustrative week result</div>
            <div className="weekR">+4R</div>
            <p className="weekText">
              At £35.70 per R, that’s around £142 profit.
            </p>

            <div className="splitGrid">
              <div>
                <div className="splitLabel">70% to you</div>
                <div className="splitValue">£99.40</div>
              </div>
              <div>
                <div className="splitLabel">30% to Winners Circle</div>
                <div className="splitValue">£42.60</div>
              </div>
            </div>
          </div>
        </section>

        {/* PAYOUT + SPLIT SECTION */}
        <section className="card payoutCard">
          <h2 className="sectionTitle">Payout &amp; Profit Share</h2>
          <p className="sectionText">
            When a payout window opens, we confirm results together. Then you
            choose a method below to send the 30% share.
          </p>

          <div className="btnGroup">
            <button
              className="primaryBtn"
              type="button"
              onClick={() => alert("Card payments are handled manually for now.")}
            >
              Pay 30% via Card
            </button>
            <button
              className="secondaryBtn"
              type="button"
              onClick={() =>
                alert("Crypto payments are handled manually for now.")
              }
            >
              Pay 30% via Crypto
            </button>
          </div>

          <p className="finePrint">
            Payments are confirmed manually. This portal doesn’t move money or
            connect directly to your broker. It is purely for structure,
            tracking and communication.
          </p>
        </section>

        <p className="disclaimer">
          None of this is financial advice. It simply shows how our framework,
          risk and split are structured when you are trading with your own
          capital.
        </p>
      </main>

      {/* STYLES */}
      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #2a1f0f, #000);
          color: #f7f0da;
          padding: 18px 14px 40px;
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 26px;
        }

        .backLink {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #f7f0da;
          font-size: 14px;
        }

        .logoImg {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          box-shadow: 0 0 24px rgba(230, 195, 106, 0.35);
        }

        .liveBadge {
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.45);
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.25),
            rgba(0, 0, 0, 0.9)
          );
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .liveBadge span {
          color: #f7e3a5;
        }

        .main {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 22px;
        }

        .card {
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: radial-gradient(
            circle at top left,
            rgba(230, 195, 106, 0.12),
            rgba(0, 0, 0, 0.92)
          );
          padding: 22px 18px 20px;
          box-shadow: 0 0 70px rgba(0, 0, 0, 0.6);
        }

        .heroCard {
          margin-top: 8px;
        }

        .cardTitle {
          font-size: 24px;
          margin: 0 0 10px;
          color: #f5e1a4;
        }

        .cardLead {
          margin: 0 0 20px;
          font-size: 14px;
          line-height: 1.7;
          color: #e0d6ba;
        }

        .statsGrid {
          display: grid;
          gap: 14px;
        }

        @media (min-width: 720px) {
          .statsGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .statBox {
          border-radius: 20px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.85),
            rgba(230, 195, 106, 0.04)
          );
          padding: 16px 16px 14px;
        }

        .statLabel {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #cbb68a;
          margin-bottom: 6px;
        }

        .statValue {
          font-size: 22px;
          font-weight: 800;
          color: #ffe29b;
          margin-bottom: 6px;
        }

        .statText {
          font-size: 13px;
          line-height: 1.7;
          color: #ddd0b1;
          margin: 0;
        }

        .sectionTitle {
          font-size: 18px;
          margin: 0 0 8px;
          color: #f5e1a4;
        }

        .sectionText {
          font-size: 14px;
          color: #e0d6ba;
          margin: 0 0 16px;
        }

        .table {
          margin-top: 4px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(230, 195, 106, 0.28);
          background: radial-gradient(
            circle at top,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.95)
          );
        }

        .row {
          display: grid;
          grid-template-columns: 1.1fr 1.6fr 1.5fr 1fr;
          padding: 10px 14px;
          font-size: 13px;
          align-items: center;
        }

        .rowHead {
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 11px;
          background: linear-gradient(
            90deg,
            rgba(230, 195, 106, 0.18),
            transparent
          );
        }

        .row:nth-child(odd):not(.rowHead) {
          background: rgba(255, 255, 255, 0.01);
        }

        .right {
          text-align: right;
        }

        .pos {
          color: #7bff9a;
          font-weight: 700;
        }

        .neg {
          color: #ff8d8d;
          font-weight: 700;
        }

        .weekResult {
          margin-top: 16px;
        }

        .weekLabel {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #cbb68a;
          margin-bottom: 4px;
        }

        .weekR {
          font-size: 22px;
          font-weight: 900;
          color: #ffe29b;
          margin-bottom: 4px;
        }

        .weekText {
          font-size: 13px;
          color: #e0d6ba;
          margin: 0 0 10px;
        }

        .splitGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .splitLabel {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #cbb68a;
          margin-bottom: 2px;
        }

        .splitValue {
          font-size: 18px;
          font-weight: 800;
          color: #ffe29b;
        }

        .payoutCard {
          margin-top: 4px;
        }

        .btnGroup {
          display: grid;
          gap: 10px;
          margin: 14px 0 10px;
        }

        @media (min-width: 640px) {
          .btnGroup {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .primaryBtn,
        .secondaryBtn {
          border-radius: 999px;
          padding: 14px 18px;
          border: none;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
        }

        .primaryBtn {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #000;
        }

        .secondaryBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.45);
          color: #f7e1aa;
        }

        .finePrint {
          margin-top: 8px;
          font-size: 12px;
          color: #cbbfa5;
          line-height: 1.7;
        }

        .disclaimer {
          margin-top: 10px;
          font-size: 11px;
          line-height: 1.7;
          color: #a99b7c;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
