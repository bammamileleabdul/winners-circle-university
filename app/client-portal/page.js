"use client";

export default function ClientPortal() {
  return (
    <>
      <div className="wrap">
        {/* TOP BAR */}
        <header className="header">
          <a href="/" className="logoRow">
            <img
              src="/emblem.jpg"
              alt="Winners Circle University"
              className="logoImg"
            />
          </a>

          <nav className="nav">
            <a href="/" className="navLink">
              Home
            </a>
            <a href="/how" className="navLink">
              How It Works
            </a>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="main">
          <h1>Client Portal</h1>
          <p className="subtitle">
            Private preview area for funded clients. Performance, profit share
            and payments will all live here once we go live.
          </p>

          {/* SUMMARY STRIP */}
          <div className="summaryRow">
            <div className="summaryBox">
              <div className="label">Account Equity</div>
              <div className="value">£—</div>
            </div>
            <div className="summaryBox">
              <div className="label">This Month %</div>
              <div className="value">—%</div>
            </div>
            <div className="summaryBox">
              <div className="label">Your 70% Share</div>
              <div className="value">£—</div>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid">
            <div className="card wide">
              <h2>Performance Breakdown</h2>
              <p>
                This section will show your TP / SL history, weekly breakdowns
                and compounding based on the capital ÷ 14 risk framework.
              </p>
              <ul className="list">
                <li>✅ Running win / loss streak</li>
                <li>✅ Average RR and risk per trade</li>
                <li>✅ Monthly % and £ performance</li>
              </ul>
            </div>

            <div className="card">
              <h2>Latest TP / SL</h2>
              <p className="muted">
                Snapshot of the most recent trades executed on your account:
              </p>
              <div className="metricRow">
                <span>Last TP count</span>
                <span>—</span>
              </div>
              <div className="metricRow">
                <span>Last SL count</span>
                <span>—</span>
              </div>
              <div className="metricRow">
                <span>Net result</span>
                <span>—</span>
              </div>
            </div>

            <div className="card">
              <h2>30% Performance Fee</h2>
              <p className="muted">
                At the end of each cycle, we calculate profits. You keep 70%.
                Our 30% only applies on net gains, never on deposits.
              </p>

              <div className="metricRow">
                <span>Profit this cycle</span>
                <span>£—</span>
              </div>
              <div className="metricRow">
                <span>Your 70%</span>
                <span>£—</span>
              </div>
              <div className="metricRow">
                <span>Our 30%</span>
                <span>£—</span>
              </div>

              <div className="btnRow">
                <button className="payBtn" disabled>
                  Pay with card (coming soon)
                </button>
                <button className="payBtn ghost" disabled>
                  Pay with crypto (coming soon)
                </button>
              </div>

              <p className="tiny">
                This is a preview only. No real payments are processed here yet.
              </p>
            </div>
          </div>

          <div className="backRow">
            <a href="/" className="backLink">
              ← Back to main page
            </a>
          </div>
        </main>
      </div>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #1a1408, #000);
          color: #f9f3dc;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 18px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.18);
          background: rgba(0, 0, 0, 0.9);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .logoRow {
          display: flex;
          align-items: center;
        }

        .logoImg {
          height: 40px;
          width: auto;
          object-fit: contain;
        }

        .nav {
          display: flex;
          gap: 16px;
        }

        .navLink {
          color: #e6c36a;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }

        .main {
          max-width: 960px;
          margin: 0 auto;
          padding: 40px 16px 60px;
        }

        h1 {
          font-size: 30px;
          color: #e6c36a;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #d8d2b6;
          max-width: 620px;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        .summaryRow {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 30px;
        }

        .summaryBox {
          padding: 14px 16px;
          border-radius: 18px;
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.18),
            rgba(0, 0, 0, 0.95)
          );
          border: 1px solid rgba(230, 195, 106, 0.25);
        }

        .label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(216, 210, 182, 0.8);
          margin-bottom: 4px;
        }

        .value {
          font-size: 18px;
          font-weight: 800;
          color: #e6c36a;
        }

        .grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1.4fr);
          gap: 18px;
        }

        .card {
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.08),
            rgba(0, 0, 0, 0.92)
          );
          border-radius: 22px;
          border: 1px solid rgba(230, 195, 106, 0.3);
          padding: 20px 18px;
          box-shadow: 0 0 60px rgba(230, 195, 106, 0.12);
        }

        .card h2 {
          font-size: 18px;
          color: #e6c36a;
          margin-bottom: 8px;
        }

        .card p {
          font-size: 14px;
          line-height: 1.7;
          color: #d8d2b6;
        }

        .muted {
          color: #b3aa8c;
        }

        .list {
          margin: 10px 0 0;
          padding-left: 18px;
          font-size: 14px;
          color: #d8d2b6;
        }

        .metricRow {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #d8d2b6;
          margin-top: 8px;
        }

        .btnRow {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .payBtn {
          flex: 1;
          min-width: 140px;
          padding: 10px 14px;
          border-radius: 999px;
          border: none;
          font-weight: 800;
          font-size: 13px;
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #000;
          opacity: 0.6;
        }

        .payBtn.ghost {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.45);
          color: #e6c36a;
        }

        .tiny {
          margin-top: 10px;
          font-size: 11px;
          color: #a7a08a;
        }

        .backRow {
          margin-top: 32px;
        }

        .backLink {
          color: rgba(230, 195, 106, 0.9);
          text-decoration: none;
          font-size: 14px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.4);
          padding-bottom: 2px;
        }

        @media (max-width: 720px) {
          .summaryRow {
            grid-template-columns: 1fr;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .nav {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
