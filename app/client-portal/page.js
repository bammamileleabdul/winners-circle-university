"use client";

export default function ClientPortal() {
  return (
    <div className="portalWrap">
      {/* TOP BAR */}
      <header className="cpHeader">
        <a href="/" className="cpBack">
          ← Back to Home
        </a>

        <div className="cpLogoRow">
          <img src="/emblem.jpg" alt="Winners Circle" className="cpLogo" />
          <span className="cpTag">Client Interface</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="cpMain">
        <h1>Winners Circle Client Portal</h1>
        <p className="cpIntro">
          This is a preview of the interface used by funded members inside the
          Circle. Here you see how your capital is deployed, how performance is
          tracked, and where your <span>30% performance fee</span> is settled.
          Nothing here is a promise — it’s structure, not hype.
        </p>

        {/* RISK + PERFORMANCE GRID */}
        <section className="cpSection">
          <h2>Your Risk & Performance Structure</h2>
          <p className="cpHint">
            Example run with <span>£500 capital</span>,{" "}
            <span>capital ÷ 14</span> risk model and a strict{" "}
            <span>1 : 1 RR</span>.
          </p>

          <div className="perfGrid">
            {/* LEFT: RISK SETUP */}
            <div className="perfCard">
              <div className="perfTag">Risk Setup</div>

              <div className="perfRow">
                <span className="perfLabel">Starting Capital</span>
                <span className="perfValue">£500</span>
              </div>

              <div className="perfRow">
                <span className="perfLabel">Risk / Trade (capital ÷ 14)</span>
                <span className="perfValue">≈ £35.70</span>
              </div>

              <div className="perfRow">
                <span className="perfLabel">Reward / Trade (1 : 1 RR)</span>
                <span className="perfValue">£35.70</span>
              </div>

              <div className="perfDivider" />

              <div className="perfRow">
                <span className="perfLabel">TP behaviour</span>
                <span className="perfValue">Pre-defined, no guessing</span>
              </div>

              <div className="perfRow">
                <span className="perfLabel">SL placement</span>
                <span className="perfValue">Based on structure, not vibes</span>
              </div>
            </div>

            {/* RIGHT: WEEKLY SNAPSHOT */}
            <div className="perfCard">
              <div className="perfTag">Weekly Snapshot (Example)</div>

              <div className="perfRow">
                <span className="perfLabel">Normal week</span>
                <span className="perfValue">7–9 clean TPs</span>
              </div>

              <div className="perfRow">
                <span className="perfLabel">Bad week</span>
                <span className="perfValue">≈ 7 TPs · still green</span>
              </div>

              <div className="perfRow">
                <span className="perfLabel">Worst realistic week</span>
                <span className="perfValue">4 TPs left</span>
              </div>

              <div className="perfDivider" />

              <div className="perfRow">
                <span className="perfLabel">Profit if 4 TPs land</span>
                <span className="perfValue">≈ £142</span>
              </div>

              <div className="perfRow">
                <span className="perfLabel">Profit if 9 TPs land</span>
                <span className="perfValue">≈ £321+</span>
              </div>

              <p className="perfFine">
                Live numbers will move with your capital, execution and risk
                profile. The only thing that doesn’t change:{" "}
                <span>discipline over dopamine</span>.
              </p>
            </div>
          </div>
        </section>

        {/* PAYMENT BLOCK */}
        <section className="cpSection">
          <h2>Settle Your 30% Performance Fee</h2>
          <p className="cpHint">
            When you withdraw, you keep <span>70%</span> of net profit. Winners
            Circle takes <span>30%</span> as a performance fee — only on profit,
            never on deposits.
          </p>

          <div className="payCard">
            <div className="paySummary">
              <div className="payRow">
                <span className="payLabel">Example net profit</span>
                <span className="payValue">£300</span>
              </div>
              <div className="payRow">
                <span className="payLabel">Your 70%</span>
                <span className="payValue">£210</span>
              </div>
              <div className="payRow">
                <span className="payLabel">Winners Circle 30%</span>
                <span className="payValue">£90</span>
              </div>
            </div>

            <div className="payMethods">
              <button
                type="button"
                className="payBtn"
                onClick={() =>
                  alert(
                    "Card payments coming soon. You’ll only ever pay on realised profit.",
                  )
                }
              >
                Pay with Card
              </button>

              <button
                type="button"
                className="payBtn payBtnGhost"
                onClick={() =>
                  alert(
                    "Crypto payments coming soon. Settlements are based on profit, not deposits.",
                  )
                }
              >
                Pay with Crypto
              </button>
            </div>

            <p className="payNote">
              This is a preview of the live portal. Final version connects to
              verified providers and automatically syncs with your performance
              data. No lottery, no hype — just structured execution and clear
              settlements.
            </p>
          </div>
        </section>
      </main>

      <style jsx>{`
        .portalWrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #1a1408, #000);
          color: #f1e7c6;
        }

        .cpHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 18px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.2);
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .cpBack {
          color: #e6c36a;
          font-size: 13px;
          text-decoration: none;
        }

        .cpLogoRow {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cpLogo {
          height: 32px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 14px rgba(230, 195, 106, 0.45));
        }

        .cpTag {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(230, 195, 106, 0.8);
        }

        .cpMain {
          padding: 36px 18px 60px;
          max-width: 960px;
          margin: 0 auto;
        }

        .cpMain h1 {
          font-size: 26px;
          margin-bottom: 12px;
          color: #e6c36a;
        }

        .cpIntro {
          font-size: 14px;
          line-height: 1.7;
          color: #d8d2b6;
          max-width: 640px;
          margin-bottom: 30px;
        }

        .cpIntro span {
          color: #e6c36a;
          font-weight: 600;
        }

        .cpSection {
          margin-bottom: 38px;
        }

        .cpSection h2 {
          font-size: 20px;
          margin-bottom: 8px;
          color: #e6c36a;
        }

        .cpHint {
          font-size: 13px;
          color: #a7a08a;
          margin-bottom: 16px;
        }

        .cpHint span {
          color: #e6c36a;
          font-weight: 600;
        }

        .perfGrid {
          display: grid;
          gap: 18px;
        }

        @media (min-width: 768px) {
          .perfGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .perfCard {
          text-align: left;
          border-radius: 22px;
          padding: 22px 20px;
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.12),
            rgba(0, 0, 0, 0.92)
          );
          border: 1px solid rgba(230, 195, 106, 0.4);
          box-shadow: 0 0 55px rgba(230, 195, 106, 0.16);
        }

        .perfTag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(230, 195, 106, 0.9);
          margin-bottom: 14px;
        }

        .perfRow {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 8px;
          gap: 10px;
        }

        .perfLabel {
          color: #a7a08a;
        }

        .perfValue {
          color: #f1e7c6;
          font-weight: 600;
        }

        .perfDivider {
          height: 1px;
          margin: 10px 0 12px;
          background: rgba(230, 195, 106, 0.28);
        }

        .perfFine {
          margin-top: 12px;
          font-size: 12px;
          color: #8f8872;
          line-height: 1.7;
        }

        .perfFine span {
          color: #e6c36a;
        }

        .payCard {
          text-align: left;
          border-radius: 26px;
          padding: 20px 18px;
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.16),
            rgba(0, 0, 0, 0.96)
          );
          border: 1px solid rgba(230, 195, 106, 0.45);
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.25);
        }

        .paySummary {
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          padding: 14px 14px 10px;
          margin-bottom: 16px;
          background: rgba(0, 0, 0, 0.75);
        }

        .payRow {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 6px;
        }

        .payLabel {
          color: #a7a08a;
        }

        .payValue {
          color: #f1e7c6;
          font-weight: 600;
        }

        .payMethods {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 10px;
        }

        .payBtn {
          border-radius: 999px;
          padding: 10px 16px;
          border: none;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #000;
        }

        .payBtnGhost {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.6);
          color: #e6c36a;
        }

        .payNote {
          font-size: 11px;
          color: #8f8872;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
}
