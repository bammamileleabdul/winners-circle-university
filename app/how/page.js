"use client";

export default function How() {
  return (
    <>
      <div className="wrap">
        <header className="header">
          <a href="/" className="logoBlock">
            <img
              src="/emblem.jpg"
              alt="Winners Circle University"
              className="logoImg"
            />
            <span className="logoText">Back to main site</span>
          </a>
        </header>

        <main className="main">
          <h1>How It Works – In Practice</h1>
          <p>
            We operate on a simple idea: protect capital first, then let
            consistency compound. Every decision starts with risk.
          </p>

          <h2>1. Capital and Risk</h2>
          <p>
            Example: you start with <strong>£500</strong>. We divide this into{" "}
            <strong>14 buckets</strong>. That gives around{" "}
            <strong>£35.70</strong> risk per position. Each position targets{" "}
            <strong>1:1 R:R</strong> – risk £35.70 to make £35.70.
          </p>

          <h2>2. A Normal Week</h2>
          <p>
            Most weeks finish in the range of <strong>7–9 clean TPs left</strong>{" "}
            after SLs. That’s roughly <strong>+£250 to +£321</strong> on this
            example capital.
          </p>

          <h2>3. Bad and Worst Weeks</h2>
          <p>
            On a bad week we still aim to close with around{" "}
            <strong>7 TPs left</strong>. On a worst-case week we work with about{" "}
            <strong>4 TPs left</strong>, which is still around{" "}
            <strong>+£142 profit</strong> at the same risk.
          </p>

          <h2>4. The Split</h2>
          <p>
            From realised profit, you keep <strong>70%</strong> and Winners
            Circle receives <strong>30%</strong>. No profit = no fee. You are
            always in full control of your capital.
          </p>

          <p className="disclaimer">
            This is not a guarantee or promise of returns. It’s a transparent
            explanation of the framework we work from, so you know exactly what
            we’re aiming for before you join.
          </p>
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
          align-items: center;
          margin-bottom: 24px;
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

        .main {
          max-width: 720px;
          margin: 0 auto;
        }

        h1 {
          font-size: 26px;
          margin-bottom: 12px;
          color: #e6c36a;
        }

        h2 {
          margin-top: 22px;
          margin-bottom: 6px;
          font-size: 18px;
          color: #f4d47c;
        }

        p {
          line-height: 1.7;
          color: #c8c2aa;
          font-size: 14px;
        }

        .disclaimer {
          margin-top: 20px;
          font-size: 12px;
          color: #9c9478;
        }

        @media (min-width: 900px) {
          .wrap {
            padding: 28px 40px 40px;
          }

          h1 {
            font-size: 30px;
          }
        }
      `}</style>
    </>
  );
}
