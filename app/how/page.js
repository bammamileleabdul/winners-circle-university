"use client";

export default function How() {
  return (
    <>
      <section className="how">
        <div className="pill">HOW IT WORKS · TRANSPARENT MATH</div>

        <h1>How the Numbers Actually Work</h1>
        <p className="lead">
          No hype. No mystery. Just disciplined risk, fixed structure, and clear
          performance sharing between you and Winners Circle.
        </p>

        {/* CAPITAL & RISK BLOCK */}
        <div className="grid">
          <div className="card">
            <h2>Base Capital Example</h2>
            <ul className="list">
              <li>
                <span>Starting capital (example):</span>
                <strong>£500</strong>
              </li>
              <li>
                <span>Risk per trade:</span>
                <strong>capital ÷ 14</strong>
              </li>
              <li>
                <span>In this example:</span>
                <strong>£500 ÷ 14 ≈ £35.70</strong>
              </li>
              <li>
                <span>Reward per trade:</span>
                <strong>≈ £35.70 (1 : 1 RR)</strong>
              </li>
            </ul>
            <p className="copy">
              Every position is built around one idea:{" "}
              <strong>protect the account first</strong>, then let consistency
              do the work. There are no “all in” moments here.
            </p>
          </div>

          <div className="card">
            <h2>What Stays Constant</h2>
            <ul className="bullets">
              <li>Risk per trade is always capital ÷ 14.</li>
              <li>Reward per trade mirrors the risk (1:1 RR).</li>
              <li>No martingale, no revenge trading, no gambling.</li>
              <li>Account survival comes before speed of growth.</li>
            </ul>
            <p className="copy">
              The edge is not one single trade. The edge is{" "}
              <strong>the full series of trades</strong> played with discipline.
            </p>
          </div>
        </div>

        {/* WEEKLY SCENARIOS */}
        <h2 className="subhead">Weekly Outcome Scenarios (Illustration)</h2>
        <p className="subcopy">
          Markets are uncertain, so no week is ever identical. These examples
          simply show how the structure behaves if we end the week with
          different levels of clean take-profits left after stop-losses.
        </p>

        <div className="grid three">
          {/* Strong Week */}
          <div className="scenario">
            <div className="tag tag-strong">Strong week</div>
            <h3>9 clean TP remaining</h3>
            <ul className="list">
              <li>
                <span>Net result:</span>
                <strong>9 take-profits</strong>
              </li>
              <li>
                <span>Gross profit:</span>
                <strong>≈ £321</strong>
              </li>
              <li>
                <span>Your share (70%):</span>
                <strong>≈ £225</strong>
              </li>
              <li>
                <span>Winners Circle (30%):</span>
                <strong>≈ £96</strong>
              </li>
            </ul>
          </div>

          {/* Normal Week */}
          <div className="scenario">
            <div className="tag tag-base">Normal week</div>
            <h3>7 clean TP remaining</h3>
            <ul className="list">
              <li>
                <span>Net result:</span>
                <strong>7 take-profits</strong>
              </li>
              <li>
                <span>Gross profit:</span>
                <strong>£250</strong>
              </li>
              <li>
                <span>Your share (70%):</span>
                <strong>£175</strong>
              </li>
              <li>
                <span>Winners Circle (30%):</span>
                <strong>£75</strong>
              </li>
            </ul>
          </div>

          {/* Tough Week */}
          <div className="scenario">
            <div className="tag tag-tough">Tough but positive</div>
            <h3>4 clean TP remaining</h3>
            <ul className="list">
              <li>
                <span>Net result:</span>
                <strong>4 take-profits</strong>
              </li>
              <li>
                <span>Gross profit:</span>
                <strong>≈ £142</strong>
              </li>
              <li>
                <span>Your share (70%):</span>
                <strong>≈ £100</strong>
              </li>
              <li>
                <span>Winners Circle (30%):</span>
                <strong>≈ £43</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* DISCLAIMER / TRUST BLOCK */}
        <div className="disclaimerCard">
          <h2>Realism. Not guarantees.</h2>
          <p>
            These numbers are <strong>illustrations</strong>, not promises.
            Markets change. Volatility changes. Execution quality matters.
          </p>
          <p>
            What does not change is the{" "}
            <strong>risk structure, capital protection, and 70 / 30 split</strong>{" "}
            on performance:
          </p>
          <ul className="bullets">
            <li>You keep 70% of verified net profits.</li>
            <li>Winners Circle receives 30% as a performance fee.</li>
            <li>
              If the week is not profitable, there is{" "}
              <strong>no performance fee</strong>.
            </li>
          </ul>
          <p className="fine">
            This is not financial advice. It is a framework for disciplined
            execution and transparent sharing of upside.
          </p>
        </div>
      </section>

      <style jsx>{`
        .how {
          min-height: 100vh;
          padding: 80px 18px 100px;
          background: radial-gradient(circle at top, #1a1408, #000);
          color: #f5f5f5;
          max-width: 1100px;
          margin: 0 auto;
        }

        .pill {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.3);
          color: #e6c36a;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        h1 {
          font-size: 32px;
          margin: 0 0 12px;
          color: #e6c36a;
        }

        .lead {
          max-width: 620px;
          font-size: 14px;
          line-height: 1.8;
          color: #d6d6d6;
          margin-bottom: 32px;
        }

        .grid {
          display: grid;
          gap: 18px;
          margin-bottom: 40px;
        }

        .grid.three {
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .card {
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.08),
            rgba(0, 0, 0, 0.9)
          );
          border-radius: 22px;
          border: 1px solid rgba(230, 195, 106, 0.32);
          padding: 22px 20px;
          box-shadow: 0 0 40px rgba(230, 195, 106, 0.16);
        }

        .card h2 {
          margin: 0 0 12px;
          font-size: 18px;
          color: #e6c36a;
        }

        .copy {
          font-size: 13px;
          line-height: 1.7;
          color: #d8d2b6;
          margin-top: 10px;
        }

        .list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 13px;
          color: #d8d2b6;
        }

        .list li {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 6px;
        }

        .list span {
          opacity: 0.85;
        }

        .list strong {
          color: #f1e7c6;
        }

        .bullets {
          list-style: disc;
          padding-left: 18px;
          margin: 6px 0 0;
          font-size: 13px;
          color: #d8d2b6;
          line-height: 1.7;
        }

        .subhead {
          margin: 6px 0 6px;
          font-size: 20px;
          color: #e6c36a;
        }

        .subcopy {
          font-size: 13px;
          color: #c5c5c5;
          max-width: 680px;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .scenario {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.85),
            rgba(0, 0, 0, 0.98)
          );
          border-radius: 20px;
          border: 1px solid rgba(230, 195, 106, 0.32);
          padding: 18px 16px 18px;
          box-shadow: 0 0 35px rgba(230, 195, 106, 0.14);
        }

        .scenario h3 {
          margin: 6px 0 10px;
          font-size: 16px;
          color: #f1e7c6;
        }

        .tag {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .tag-strong {
          background: rgba(0, 128, 55, 0.18);
          border: 1px solid rgba(72, 201, 112, 0.6);
          color: #7bffb1;
        }

        .tag-base {
          background: rgba(230, 195, 106, 0.12);
          border: 1px solid rgba(230, 195, 106, 0.55);
          color: #e6c36a;
        }

        .tag-tough {
          background: rgba(255, 174, 0, 0.12);
          border: 1px solid rgba(255, 196, 87, 0.7);
          color: #ffdd9b;
        }

        .disclaimerCard {
          margin-top: 34px;
          padding: 22px 20px 20px;
          border-radius: 22px;
          border: 1px solid rgba(230, 195, 106, 0.45);
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.12),
            rgba(0, 0, 0, 0.95)
          );
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.2);
        }

        .disclaimerCard h2 {
          margin: 0 0 10px;
          color: #e6c36a;
          font-size: 18px;
        }

        .disclaimerCard p {
          font-size: 13px;
          line-height: 1.8;
          color: #d8d2b6;
          margin: 4px 0;
        }

        .fine {
          margin-top: 10px;
          font-size: 12px;
          color: #a7a08a;
        }

        @media (min-width: 720px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}
