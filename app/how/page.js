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
            We don’t promise magic. We promise a clean, rule-based framework:
            capital ÷ 14 risk, clear TP / SL, and disciplined execution.
          </p>

          <div className="cards">
            <div className="card">
              <h2>Read Structure</h2>
              <p>
                We react to price, not predictions. We wait for confirmation
                before committing capital.
              </p>
            </div>

            <div className="card">
              <h2>Risk First</h2>
              <p>
                Capital protection is non-negotiable. Survival and consistency
                come before any single trade.
              </p>
            </div>

            <div className="card">
              <h2>Execute Clean</h2>
              <p>
                Precision beats frequency. Rules remove emotion so you can
                execute calmly, like a pro.
              </p>
            </div>
          </div>

          <div className="backRow">
            <a href="/" className="backLink">
              ← Back to main site
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
          text-align: left;
        }

        h1 {
          font-size: 30px;
          color: #e6c36a;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #d8d2b6;
          max-width: 640px;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .cards {
          display: grid;
          gap: 18px;
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
          font-size: 20px;
          margin-bottom: 8px;
        }

        .card p {
          font-size: 14px;
          line-height: 1.7;
          color: #d8d2b6;
        }

        .backRow {
          margin-top: 30px;
        }

        .backLink {
          color: rgba(230, 195, 106, 0.9);
          text-decoration: none;
          font-size: 14px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.4);
          padding-bottom: 2px;
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
