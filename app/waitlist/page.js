"use client";

import { useState } from "react";
import Crest from "../../components/Crest";
import { SITE } from "../../lib/site";

export default function WaitlistPage() {
  const [state, setState] = useState("idle");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", country: "" });
  const [adult, setAdult] = useState(false);
  const [err, setErr] = useState("");

  const next = () => {
    setErr("");
    if (step === 0 && !form.name.trim()) return setErr("Add your first name.");
    if (step === 1) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setErr("Enter a valid email address.");
      if (!form.country) return setErr("Choose your country.");
    }
    setStep(step + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (step < 2) return next();
    if (!adult) return setErr("Confirm you are 18 or older to join.");
    setErr("");
    setState("sending");
    try {
      const r = await fetch(SITE.formspree, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Winners Circle Waitlist Page" }),
      });
      if (!r.ok) throw new Error();
      setState("done");
    } catch {
      setState("idle");
      setErr("That didn’t go through. Check your connection and try again.");
    }
  };

  return (
    <main className="wrap">
      <div className="card fx-glass fx-hud">
        <div className="top">
          <Crest size={120} />
        </div>

        {state !== "done" ? (
          <form onSubmit={submit} noValidate>
            <span className="fx-eyebrow">The waitlist</span>
            <h1>Join the Waitlist</h1>
            <p className="lead">Early access to a disciplined gold trading strategy you copy through Exness. Limited onboarding. No subscriptions.</p>

            <div className="prog" aria-hidden="true">
              {[0, 1, 2].map((n) => (
                <i key={n} className={n <= step ? "on" : ""} />
              ))}
            </div>

            {step === 0 && (
              <div className="field" key="s0">
                <span className="k">Step 1 of 3</span>
                <label className="fx-label" htmlFor="wl-name">First name</label>
                <input id="wl-name" className="fx-input" autoComplete="given-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
              </div>
            )}
            {step === 1 && (
              <div className="field" key="s1">
                <span className="k">Step 2 of 3</span>
                <label className="fx-label" htmlFor="wl-email">Email</label>
                <input id="wl-email" type="email" className="fx-input" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoFocus />
                <label className="fx-label" htmlFor="wl-country">Country</label>
                <select id="wl-country" className="fx-input" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                  <option value="">Select your country</option>
                  <option>Nigeria</option>
                  <option>Ghana</option>
                  <option>Kenya</option>
                  <option>South Africa</option>
                  <option>United Kingdom</option>
                  <option>Other</option>
                </select>
              </div>
            )}
            {step === 2 && (
              <div className="field" key="s2">
                <span className="k">Step 3 of 3</span>
                <label className="check" htmlFor="wl-age">
                  <input id="wl-age" type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} />
                  I’m 18 or older and understand trading carries a real risk of losing money.
                </label>
              </div>
            )}

            <p className="err" role="status" aria-live="polite">{err}</p>

            <div className="ctrl">
              {step > 0 && (
                <button type="button" className="btn-ghost" onClick={() => { setErr(""); setStep(step - 1); }}>
                  Back
                </button>
              )}
              <button type="submit" className="btn" disabled={state === "sending"}>
                {step < 2 ? "Continue" : state === "sending" ? "Joining…" : "Join Waitlist"}
              </button>
            </div>
            <a href="/" className="home">← Back to hub</a>
          </form>
        ) : (
          <div className="done">
            <span className="fx-eyebrow">Confirmed</span>
            <h2>Welcome to the Winners Circle</h2>
            <p>You’ve taken the first step toward disciplined growth and elite execution.</p>
            <div className="rule" />
            <p className="quote">This is where patience compounds.</p>
            <a className="btn" href="/">Back to hub</a>
          </div>
        )}
      </div>

      <style jsx>{`
        .wrap {
          min-height: calc(100vh - 140px);
          display: grid;
          place-items: center;
          padding: 40px 16px;
        }
        .card {
          width: min(480px, 100%);
          padding: 28px;
        }
        .top {
          display: grid;
          place-items: center;
          margin-bottom: 8px;
        }
        form,
        .done {
          display: grid;
          gap: 14px;
        }
        h1,
        h2 {
          margin: 0;
          font-size: 34px;
        }
        .lead {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }
        .prog {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .prog i {
          height: 3px;
          background: var(--line);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .prog i.on {
          background: var(--gold);
          box-shadow: 0 0 8px var(--gold);
        }
        .field {
          display: grid;
          gap: 4px;
          animation: fx-rise 0.35s ease-out;
        }
        .field :global(.fx-label) {
          margin-top: 10px;
        }
        .k {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .check {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          margin-top: 10px;
          line-height: 1.5;
          color: #d9d1bd;
        }
        .check input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: var(--gold);
          flex: none;
        }
        .err {
          margin: 0;
          min-height: 1.4em;
          color: var(--loss);
          font-size: 14px;
        }
        .ctrl {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        .home {
          justify-self: center;
          font-size: 13px;
          color: var(--muted);
        }
        .home:hover {
          color: var(--gold);
        }
        .done {
          justify-items: center;
          text-align: center;
        }
        .done p {
          margin: 0;
          color: #d9d1bd;
          line-height: 1.6;
        }
        .rule {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, var(--gold-hi), var(--gold-deep));
        }
        .quote {
          color: var(--gold) !important;
          font-family: var(--mono);
          font-size: 13px;
          letter-spacing: 0.06em;
        }
      `}</style>
    </main>
  );
}
