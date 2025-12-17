"use client";

export default function HowPage() {
  return (
    <>
      <div className="wrap">
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
            <a href="/client" className="navLink">
              Client Portal
            </a>
          </nav>
        </header>

        <main className="main">
          <h1>How It Works</h1>
          <p className="subtitle">
            One framework. Clear risk. No gambling. Your capital is split into
            14 controlled pieces and every decision is rule-based.
          </p>

          <div className="cards">
            <div className="card">
              <h2>1. Read Structure</h2>
              <p>
                We react to price, not predictions. No random entries. We wait
                for clean structure and confirmation before touching capital.
              </p>
            </div>
            <div className="card">
              <h2>2. Risk First</h2>
              <p>
                Capital protection is non-negotiable. We size positions from
                risk backwards, not from greed forwards.
              </p>
            </div>
            <div className="card">
              <h2>3. Execute Clean</h2>
              <p>
                Precision beats frequency. Rules remove emotion so execution
                feels calm, repeatable and professional.
              </p>
            </div>
          </div>

          <section className="example">
            <h2>Example · £500 account</h2>
            <p>
              Imagine you fund with <strong>£500</strong>. We don’t throw the
              whole balance at one setup. We divide the account into{" "}
              <strong>14 equal risk slices</strong>.
            </p>
            <p>
              That gives a risk of about <strong>£35.70 per trade</strong>.
              Each position is built as roughly <strong>1:1 RR</strong> — risk{" "}
              £35.7 to make £35.7 when price reaches TP.
            </p>
            <p>
              On a <strong>normal week</strong>, after stop-losses, we target{" "}
              around <strong>7–9 clean TPs left</strong>. That’s roughly{" "}
              <strong>£250 – £321</strong> net profit.
            </p>
            <p>
              On a tougher week, with only <strong>4 TPs left</strong>, you’d
              still be looking at about <strong>£142</strong> in profit. No wild
              promises — just structured, controlled compounding.
            </p>
            <p className="disclaimer">
              Numbers above are examples, not guarantees. Markets carry risk;
              capital is always at risk.
            </p>
          </section>

          <div className="backRow">
            <a href="/" className="backBtn">
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

        .cards {
          display: grid;
          gap: 18px;
          margin-bottom: 32px;
        }

        .card {
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.22),
            rgba(0, 0, 0, 0.95)
          );
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.32);
          padding: 22px 20px;
          box-shadow: 0 0 70px rgba(230, 195, 106, 0.18);
        }

        .card h2 {
          color: #e6c36a;
          font-size: 18px;
          margin-bottom: 6px;
        }

        .card p {
          font-size: 14px;
          line-height: 1.7;
          color: #d8d2b6;
        }

        .example {
          margin-top: 10px;
          padding: 22px 20px;
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.4);
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.12),
            rgba(0, 0, 0, 0.94)
          );
          box-shadow: 0 0 90px rgba(230, 195, 106, 0.22);
        }

        .example h2 {
          color: #e6c36a;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .example p {
          font-size: 14px;
          line-height: 1.8;
          color: #d8d2b6;
          margin-bottom: 10px;
        }

        .disclaimer {
          font-size: 11px;
          color: #a7a08a;
        }

        .backRow {
          margin-top: 32px;
        }

        .backBtn {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.4);
          color: #e6c36a;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 720px) {
          .nav {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
