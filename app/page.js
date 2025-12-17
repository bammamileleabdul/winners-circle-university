"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Interactive reveals
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [vvipOpen, setVvipOpen] = useState(false);

  // MINI LELEFX
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content:
        "I’m mini lelefx. Calm. Precise. Ask me anything — principles, VVIP, or risk math (capital ÷ 14).",
    },
  ]);

  const sendAi = async (e) => {
    e.preventDefault();
    if (!aiInput.trim() || aiLoading) return;

    const userMsg = { role: "user", content: aiInput.trim() };
    setAiMessages((m) => [...m, userMsg]);
    setAiInput("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/mini-lelefx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAiMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              data?.error ||
              "mini lelefx hit a connection issue. Re-center, then try again in a moment.",
          },
        ]);
      } else {
        setAiMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.reply || "Calm answer, but it came back empty.",
          },
        ]);
      }
    } catch (err) {
      setAiMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Network issue. Breathe, refresh the page, and ask again calmly.",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <a href="/" className="logo">
          <img
            src="/emblem.jpg"
            alt="Winners Circle Emblem"
            className="logoImg"
          />
        </a>

        <button className="menuBtn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="menuOverlay">
          <button className="menuClose" onClick={() => setMenuOpen(false)}>
            × Close
          </button>

          <nav className="menuLinks">
            <a href="#overview" onClick={() => setMenuOpen(false)}>
              Overview
            </a>
            <a href="#how" onClick={() => setMenuOpen(false)}>
              How It Works
            </a>
            <a href="#principles" onClick={() => setMenuOpen(false)}>
              Principles
            </a>
            <a href="#manifesto" onClick={() => setMenuOpen(false)}>
              Manifesto
            </a>
            <a href="#vvip" onClick={() => setMenuOpen(false)}>
              VVIP Access
            </a>
            <a href="/client" onClick={() => setMenuOpen(false)}>
              Client Portal
            </a>
          </nav>
        </div>
      )}

      {/* HERO */}
      <section id="overview" className="hero">
        <img src="/emblem.jpg" alt="" className="heroEmblem" />

        <div className="pill">EARLY ACCESS · LIMITED ONBOARDING</div>

        <h1>Winners Circle University</h1>
        <p className="heroP">
          A performance-based gold trading framework combining structured AI
          modelling with disciplined human execution.
        </p>

        {/* WAITLIST FORM (Formspree) */}
        <form
          className="waitlistForm"
          action="https://formspree.io/f/xpwveaza"
          method="POST"
        >
          <input
            className="waitlistInput"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            type="hidden"
            name="source"
            value="Winners Circle Landing Page"
          />

          <button className="goldBtn" type="submit">
            Join the Waitlist
          </button>
        </form>

        <div className="hintRow">
          <a className="ghostLink" href="/how">
            See detailed breakdown →
          </a>
        </div>
      </section>

      {/* HOW IT WORKS (on main page) */}
      <section id="how" className="section">
        <h2>How It Works</h2>

        <div className="floatWrap">
          {[
            {
              t: "Read Structure",
              d: "We react to price, not predictions. We wait for confirmation.",
            },
            {
              t: "Risk First",
              d: "Capital protection is non-negotiable. Survival compounds.",
            },
            {
              t: "Execute Clean",
              d: "Precision beats frequency. Rules remove emotion.",
            },
          ].map((x) => (
            <div key={x.t} className="floatCard">
              <div className="floatTitle">{x.t}</div>
              <div className="floatText">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="section">
        <h2>Our Principles</h2>

        <div className="luxGrid">
          {[
            {
              t: "Discipline Over Dopamine",
              d: "We remove impulse from execution. Calm is an edge.",
            },
            {
              t: "Risk Before Reward",
              d: "If protection isn’t clear, the trade doesn’t exist.",
            },
            {
              t: "Process Over Outcomes",
              d: "We judge decisions, not single results. Mastery compounds.",
            },
            {
              t: "Patience Compounds",
              d: "Waiting is a skill. Quality beats activity.",
            },
            {
              t: "Consistency Creates Inevitability",
              d: "Repeat what works. Remove what doesn’t. Stay aligned.",
            },
          ].map((p) => (
            <div key={p.t} className="luxCard">
              <div className="luxTitle">{p.t}</div>
              <div className="luxText">{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="section">
        <h2>Manifesto</h2>

        {!manifestoOpen ? (
          <button className="curtainBtn" onClick={() => setManifestoOpen(true)}>
            This was not written for everyone
          </button>
        ) : (
          <div className="manifestoCard">
            <div className="manifestoHead">Founder’s Manifesto</div>
            <div className="manifestoBody">
              <p>
                Winners Circle was not built for excitement. <br />
                It was built for longevity.
              </p>
              <p>
                I’ve seen what impatience does to talented people. <br />
                I’ve seen discipline quietly outperform brilliance.
              </p>
              <p>
                This framework exists to remove noise, emotion, and ego —
                replacing them with structure, risk awareness, and clarity.
              </p>
              <p>
                If you’re here to rush, impress, or gamble — this won’t work.{" "}
                <br />
                If you’re here to compound patiently — you’re in the right
                place.
              </p>

              <div className="signature">— lelefx, Founder</div>

              <button
                className="ghostBtn"
                onClick={() => setManifestoOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* VVIP */}
      <section id="vvip" className="section last">
        <h2>VVIP Access</h2>

        {!vvipOpen ? (
          <button className="vvipBtn" onClick={() => setVvipOpen(true)}>
            Explore VVIP Access
          </button>
        ) : (
          <div className="vvipCard">
            <div className="vvipHead">Private • Invitation Only</div>

            <p className="vvipText">
              VVIP is not purchased. It is earned through consistency,
              discipline, and alignment over time.
            </p>

            <div className="vvipDivider" />

            <p className="vvipTextMuted">
              Some members may be contacted discreetly.
            </p>

            <button className="ghostBtn" onClick={() => setVvipOpen(false)}>
              Close
            </button>
          </div>
        )}
      </section>

      {/* MINI LELEFX FLOATING BUTTON + MODAL */}
      <button className="aiFab" onClick={() => setAiOpen(true)}>
        mini lelefx
      </button>

      {aiOpen && (
        <div className="aiOverlay" onClick={() => setAiOpen(false)}>
          <div className="aiModal" onClick={(e) => e.stopPropagation()}>
            <div className="aiHeader">
              <div>
                <div className="aiTitle">mini lelefx</div>
                <div className="aiSub">Calm. Precise. Luxury execution.</div>
              </div>
              <button className="aiClose" onClick={() => setAiOpen(false)}>
                ×
              </button>
            </div>

            <div className="aiBody">
              {aiMessages.map((m, i) => (
                <div
                  key={i}
                  className={`aiMsg ${m.role === "user" ? "aiUser" : "aiBot"}`}
                >
                  {m.content}
                </div>
              ))}
              {aiLoading && (
                <div className="aiMsg aiBot">Thinking…</div>
              )}
            </div>

            <form className="aiFooter" onSubmit={sendAi}>
              <input
                className="aiInput"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask mini lelefx…"
                required
              />
              <button className="aiSend" type="submit" disabled={aiLoading}>
                Send
              </button>
            </form>

            <div className="aiNote">
              Not financial advice. Process only.
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 18px;
          background: linear-gradient(180deg, #000, #1a1408);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(230, 195, 106, 0.18);
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logoImg {
          height: 40px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 14px rgba(230, 195, 106, 0.45));
        }

        .menuBtn {
          background: none;
          border: none;
          color: #e6c36a;
          font-size: 26px;
        }

        .menuOverlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          padding: 30px;
          background: radial-gradient(circle at top, #1a1408, #000);
        }

        .menuClose {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 10px 18px;
          border-radius: 14px;
          font-weight: 700;
          color: #000;
          margin-bottom: 40px;
          float: right;
        }

        .menuLinks a {
          display: block;
          font-size: 26px;
          margin-bottom: 26px;
          color: #e6c36a;
          text-decoration: none;
          letter-spacing: 0.02em;
        }

        .hero {
          text-align: center;
          padding: 78px 18px 60px;
          background: radial-gradient(circle at top, #2a1f0f, #000);
          position: relative;
          overflow: hidden;
        }

        .heroEmblem {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 420px;
          max-width: 90%;
          opacity: 0.06;
          pointer-events: none;
          filter: drop-shadow(0 0 70px rgba(230, 195, 106, 0.25));
        }

        .pill {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.28);
          color: #e6c36a;
          font-size: 12px;
          letter-spacing: 0.14em;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }

        .hero h1 {
          color: #e6c36a;
          font-size: 40px;
          margin: 0 0 16px;
          line-height: 1.12;
          position: relative;
          z-index: 1;
        }

        .heroP {
          color: #cfcfcf;
          max-width: 640px;
          margin: 0 auto 26px;
          line-height: 1.7;
          font-size: 15px;
          position: relative;
          z-index: 1;
        }

        .waitlistForm {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 380px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .waitlistInput {
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          font-size: 15px;
          outline: none;
        }

        .goldBtn {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 14px 18px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 800;
          color: #000;
        }

        .hintRow {
          margin-top: 18px;
          position: relative;
          z-index: 1;
        }

        .ghostLink {
          color: rgba(230, 195, 106, 0.9);
          text-decoration: none;
          font-size: 14px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.3);
          padding-bottom: 2px;
        }

        .section {
          padding: 80px 18px;
          text-align: center;
          background: radial-gradient(circle at top, rgba(230, 195, 106, 0.06), #000);
        }

        .section h2 {
          color: #e6c36a;
          margin-bottom: 34px;
          font-size: 28px;
        }

        .floatWrap {
          display: grid;
          gap: 16px;
          max-width: 520px;
          margin: 0 auto;
        }

        .floatCard {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.72),
            rgba(0, 0, 0, 0.92)
          );
          border: 1px solid rgba(230, 195, 106, 0.35);
          border-radius: 22px;
          padding: 24px;
          box-shadow: 0 0 40px rgba(230, 195, 106, 0.12);
          text-align: left;
        }

        .floatTitle {
          color: #e6c36a;
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .floatText {
          color: #d7d7d7;
          line-height: 1.6;
          font-size: 14px;
        }

        .luxGrid {
          display: grid;
          gap: 14px;
          max-width: 700px;
          margin: 0 auto;
        }

        .luxCard {
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.08),
            rgba(0, 0, 0, 0.9)
          );
          border: 1px solid rgba(230, 195, 106, 0.32);
          border-radius: 22px;
          padding: 26px;
          text-align: left;
          box-shadow: 0 0 55px rgba(230, 195, 106, 0.1);
        }

        .luxTitle {
          color: #e6c36a;
          font-weight: 900;
          font-size: 16px;
          letter-spacing: 0.02em;
          margin-bottom: 8px;
        }

        .luxText {
          color: #d8d2b6;
          font-size: 14px;
          line-height: 1.7;
        }

        .curtainBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.55);
          color: #e6c36a;
          padding: 16px 22px;
          border-radius: 999px;
          font-weight: 800;
        }

        .manifestoCard {
          max-width: 760px;
          margin: 0 auto;
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.1),
            rgba(0, 0, 0, 0.92)
          );
          border: 1px solid rgba(230, 195, 106, 0.35);
          border-radius: 26px;
          padding: 26px;
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.14);
          text-align: left;
        }

        .manifestoHead {
          color: #e6c36a;
          font-weight: 900;
          font-size: 20px;
          margin-bottom: 12px;
        }

        .manifestoBody p {
          color: #d8d2b6;
          line-height: 1.8;
          font-size: 14px;
          margin: 12px 0;
        }

        .signature {
          margin-top: 16px;
          color: #e6c36a;
          font-weight: 800;
        }

        .vvipBtn {
          background: linear-gradient(135deg, #e6c36a, #8f6b1f);
          border: none;
          padding: 16px 26px;
          border-radius: 999px;
          font-weight: 900;
          color: #000;
          box-shadow: 0 0 60px rgba(230, 195, 106, 0.15);
        }

        .vvipCard {
          max-width: 740px;
          margin: 0 auto;
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.12),
            rgba(0, 0, 0, 0.92)
          );
          border: 1px solid rgba(230, 195, 106, 0.4);
          border-radius: 26px;
          padding: 28px;
          box-shadow: 0 0 95px rgba(230, 195, 106, 0.18);
          text-align: left;
        }

        .vvipHead {
          color: #e6c36a;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 12px;
          margin-bottom: 14px;
        }

        .vvipText {
          color: #d8d2b6;
          line-height: 1.8;
          font-size: 14px;
          margin: 0 0 14px;
        }

        .vvipDivider {
          height: 1px;
          background: rgba(230, 195, 106, 0.25);
          margin: 14px 0;
        }

        .vvipTextMuted {
          color: #a7a08a;
          line-height: 1.7;
          font-size: 13px;
          margin: 0 0 14px;
        }

        .ghostBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.35);
          color: #e6c36a;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 800;
          margin-top: 10px;
        }

        .last {
          padding-bottom: 110px;
        }

        /* MINI LELEFX STYLES */
        .aiFab {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 9998;
          background: linear-gradient(135deg, #e6c36a, #8f6b1f);
          border: none;
          padding: 12px 16px;
          border-radius: 999px;
          font-weight: 900;
          color: #000;
          box-shadow: 0 0 70px rgba(230, 195, 106, 0.22);
          cursor: pointer;
        }

        .aiOverlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }

        .aiModal {
          width: 100%;
          max-width: 520px;
          border-radius: 24px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.08),
            rgba(0, 0, 0, 0.95)
          );
          box-shadow: 0 0 110px rgba(230, 195, 106, 0.18);
          overflow: hidden;
        }

        .aiHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 16px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.18);
        }

        .aiTitle {
          color: #e6c36a;
          font-weight: 900;
          letter-spacing: 0.02em;
          font-size: 16px;
        }

        .aiSub {
          color: rgba(216, 210, 182, 0.9);
          font-size: 12px;
          margin-top: 2px;
        }

        .aiClose {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.35);
          color: #e6c36a;
          width: 34px;
          height: 34px;
          border-radius: 999px;
          font-size: 18px;
          cursor: pointer;
        }

        .aiBody {
          padding: 14px;
          max-height: 52vh;
          overflow: auto;
          display: grid;
          gap: 10px;
        }

        .aiMsg {
          padding: 12px 14px;
          border-radius: 16px;
          line-height: 1.6;
          font-size: 14px;
          white-space: pre-wrap;
        }

        .aiBot {
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(230, 195, 106, 0.18);
          color: #d8d2b6;
        }

        .aiUser {
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.15),
            rgba(0, 0, 0, 0.65)
          );
          border: 1px solid rgba(230, 195, 106, 0.25);
          color: #f1e7c6;
        }

        .aiFooter {
          display: flex;
          gap: 10px;
          padding: 14px;
          border-top: 1px solid rgba(230, 195, 106, 0.18);
        }

        .aiInput {
          flex: 1;
          padding: 12px 14px;
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.28);
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          outline: none;
        }

        .aiSend {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 12px 14px;
          border-radius: 16px;
          font-weight: 900;
          color: #000;
          cursor: pointer;
        }

        .aiNote {
          padding: 0 14px 14px;
          color: rgba(167, 160, 138, 0.9);
          font-size: 12px;
        }
      `}</style>
    </>
  );
}
