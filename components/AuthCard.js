"use client";

import Crest from "./Crest";

// Shared frame for the login and sign-up screens.
export default function AuthCard({ eyebrow, title, lead, children, footer }) {
  return (
    <main className="auth">
      <div className="auth-card fx-glass fx-hud">
        <a className="auth-back" href="/">← Hub</a>
        <div className="auth-crest">
          <Crest size={110} />
        </div>
        <span className="fx-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {lead && <p className="auth-lead">{lead}</p>}
        {children}
        {footer && <div className="auth-foot">{footer}</div>}
      </div>
      <style jsx global>{`
        .auth {
          min-height: calc(100vh - 140px);
          display: grid;
          place-items: center;
          padding: 40px 16px;
        }
        .auth-card {
          width: min(440px, 100%);
          padding: 26px 28px 28px;
          display: grid;
          gap: 12px;
        }
        .auth-back {
          justify-self: start;
          font: 500 12px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .auth-crest {
          display: grid;
          place-items: center;
        }
        .auth-card h1 {
          margin: 0;
          font-size: 36px;
        }
        .auth-lead {
          margin: 0;
          color: var(--muted);
        }
        .auth-form {
          display: grid;
          gap: 14px;
          margin-top: 6px;
        }
        .auth-form .btn {
          width: 100%;
          margin-top: 4px;
        }
        .auth-msg {
          margin: 0;
          padding: 10px 12px;
          border: 1px solid var(--line-strong);
          background: var(--gold-soft);
          font-size: 14px;
        }
        .auth-foot {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          color: var(--muted);
        }
        .auth-foot a {
          color: var(--gold);
        }
      `}</style>
    </main>
  );
}
