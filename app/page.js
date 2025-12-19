"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Waitlist (we still keep state even though Formspree handles submit)
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // Interactive reveals
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [vvipOpen, setVvipOpen] = useState(false);

  // MINI LELEFX
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content:
        "I am mini lelefx.\n\nI operate on discipline, risk structure, and probability — not prediction.\n\nAsk a question or enter your capital and I’ll simulate the framework (demo mode).",
    },
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const sendAi = async () => {
    const text = aiInput.trim();
    if (!text || aiLoading) return;

    const userMsg = { role: "user", content: text };
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
            content: data.reply || "…",
          },
        ]);
      }
    } catch (err) {
      setAiMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "mini lelefx hit a connection issue. Re-center, then try again in a moment.",
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
        <div className="logo">
          <img
            src="/emblem.jpg"
            alt="Winners Circle Emblem"
            className="logoImg"
          />
        </div>

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
            <a href="/how" onClick={() => setMenuOpen(false)}>
              How It Works
            </a>
            <a href="/access-trading" onClick={() => setMenuOpen(false)}>
              Access &amp; Trading
            </a>
            <a href="/get-started" onClick={() => setMenuOpen(false)}>
              Get Started
            </a>
            <a href="/waitlist" onClick={() => setMenuOpen(false)}>
              Waitlist
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
            <a href="/clientportal" onClick={() => setMenuOpen(false)}>
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

        {/* WAITLIST FORM via Formspree */}
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

        <div className="heroCtas">
          <a className="ghostBtn" href="/get-started">
            Get Started
          </a>
          <a className="ghostBtn" href="/access-trading">
            Access &amp; Trading
          </a>
          <a className="ghostBtn" href="/clientportal">
            Client Portal
          </a>
        </div>

        <div className="hintRow">
          <a className="ghostLink" href="/how">
            See How It Works →
          </a>
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
                If you’re here to compound patiently — you’re in the right place.
              </p>

              <div className="signature">— Lelefx, Founder</div>

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

      {/* MINI LELEFX ROBOT FLOAT BUTTON */}
      <button
        className="aiFab"
        type="button"
        aria-label="Open mini lelefx"
        onClick={() => setAiOpen(true)}
      >
        <span className="aiFabBot" aria-hidden="true">
          <span className="aiFabBotFace" />
          <span className="aiFabBotGlow" />
          <span className="aiFabBotEye left" />
          <span className="aiFabBotEye right" />
        </span>
      </button>

      {aiOpen && (
        <div className="aiOverlay" onClick={() => setAiOpen(false)}>
          <div className="aiModal" onClick={(e) => e.stopPropagation()}>
            <div className="aiHeader">
              <div className="aiHeaderLeft">
                <div className="aiRobot">
                  <div className="aiRobotFace" />
                  <div className="aiRobotGlow" />
                </div>
                <div>
                  <div className="aiTitle">mini lelefx</div>
                  <div className="aiSub">Calm. Precise. Demo mode.</div>
                </div>
              </div>
              <button className="aiClose" onClick={() => setAiOpen(false)}>
                ×
              </button>
            </div>

            <div className="aiBody">
              <div className="aiChat">
                {aiMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`aiMsg ${m.role === "user" ? "user" : "bot"}`}
                  >
                    {m.content}
                  </div>
                ))}
                {aiLoading && <div className="aiMsg bot">Thinking…</div>}
              </div>

              <div className="aiInputRow">
                <input
                  className="aiInput"
                  placeholder="Ask a question or enter capital…"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendAi()}
                />
                <button className="aiSend" onClick={sendAi}>
                  Send
                </button>
              </div>

              <div className="aiNote">
                Demo mode (no OpenAI API). This uses the local mini-lelefx rules.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(230, 195, 106, 0.18);
        }

        .logoImg {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          box-shadow: 0 0 30px rgba(230, 195, 106, 0.25);
        }

        .menuBtn {
          background: transparent;
          color: #e6c36a;
          border: 1px solid rgba(230, 195, 106, 0.35);
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 18px;
          cursor: pointer;
        }

        .menuOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          z-index: 100;
          padding: 18px;
        }

        .menuClose {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.35);
          color: #e6c36a;
          padding: 12px 14px;
          border-radius: 14px;
          font-weight: 800;
          cursor: pointer;
        }

        .menuLinks {
          margin-top: 16px;
          display: grid;
          gap: 12px;
        }

        .menuLinks a {
          text-decoration: none;
          color: #f7f0da;
          padding: 14px 14px;
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.18);
          background: rgba(230, 195, 106, 0.06);
          font-weight: 700;
        }

        .hero {
          min-height: 100vh;
          padding: 110px 16px 60px;
          background: radial-gradient(circle at top, #1a1408, #000);
          color: #fff;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .heroEmblem {
          width: 110px;
          height: 110px;
          border-radius: 30px;
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.28);
          margin: 0 auto 18px;
          position: relative;
          z-index: 1;
        }

        .pill {
          display: inline-block;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          color: #e6c36a;
          font-size: 11px;
          letter-spacing: 0.16em;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }

        h1 {
          font-size: 34px;
          margin: 0 0 10px;
          color: #e6c36a;
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

        .heroCtas {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 14px;
          position: relative;
          z-index: 1;
        }

        .heroCtas .ghostBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.32);
          color: rgba(230, 195, 106, 0.95);
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          background: rgba(0, 0, 0, 0.35);
        }

        .heroCtas .ghostBtn:hover {
          background: rgba(230, 195, 106, 0.06);
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
          cursor: pointer;
        }

        .status {
          color: #e6c36a;
          font-size: 13px;
          margin: 6px 0 0;
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
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.06),
            #000
          );
        }

        .section h2 {
          color: #e6c36a;
          margin-bottom: 34px;
          font-size: 28px;
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
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 0 60px rgba(230, 195, 106, 0.1);
          cursor: pointer;
        }

        .curtainBtn:hover {
          background: rgba(230, 195, 106, 0.06);
        }

        .manifestoCard {
          max-width: 760px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.12),
            rgba(0, 0, 0, 0.93)
          );
          border: 1px solid rgba(230, 195, 106, 0.38);
          border-radius: 26px;
          padding: 26px;
          box-shadow: 0 0 90px rgba(230, 195, 106, 0.16);
          text-align: left;
        }

        .manifestoCard::before {
          content: "";
          position: absolute;
          top: 0;
          left: 16px;
          right: 16px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(230, 195, 106, 0.55),
            transparent
          );
          opacity: 0.9;
        }

        .manifestoCard::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.12),
            transparent 55%
          );
          pointer-events: none;
        }

        .manifestoHead {
          color: #e6c36a;
          font-weight: 900;
          font-size: 20px;
          margin-bottom: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .manifestoBody p {
          color: #d8d2b6;
          line-height: 1.9;
          font-size: 14px;
          margin: 12px 0;
          letter-spacing: 0.01em;
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
          cursor: pointer;
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
          cursor: pointer;
        }

        .last {
          padding-bottom: 110px;
        }

        /* MINI LELEFX ROBOT BUTTON + MODAL */
        .aiFab {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 9998;
          width: 62px;
          height: 62px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.55);
          background: radial-gradient(
              circle at top,
              rgba(230, 195, 106, 0.35),
              rgba(0, 0, 0, 0.92)
            ),
            linear-gradient(
              135deg,
              rgba(230, 195, 106, 0.25),
              rgba(143, 107, 31, 0.15)
            );
          box-shadow: 0 0 70px rgba(230, 195, 106, 0.22);
          cursor: pointer;
          display: grid;
          place-items: center;
          animation: aiFloat 3.8s ease-in-out infinite;
        }

        .aiFab:active {
          transform: translateY(1px);
        }

        @keyframes aiFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .aiFabBot {
          position: relative;
          width: 34px;
          height: 34px;
          border-radius: 14px;
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.55),
            #120d05
          );
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .aiFabBotFace {
          width: 20px;
          height: 20px;
          border-radius: 7px;
          border: 1px solid rgba(0, 0, 0, 0.8);
          background: radial-gradient(circle at top, #fff7d1, #c6a858);
          box-shadow: inset 0 0 14px rgba(0, 0, 0, 0.25);
        }

        .aiFabBotEye {
          position: absolute;
          top: 16px;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.85);
          box-shadow: 0 0 10px rgba(230, 195, 106, 0.45);
        }

        .aiFabBotEye.left {
          left: 12px;
        }

        .aiFabBotEye.right {
          right: 12px;
        }

        .aiFabBotGlow {
          position: absolute;
          inset: -30%;
          background: radial-gradient(
            circle at center,
            rgba(230, 195, 106, 0.25),
            transparent 60%
          );
          animation: aiGlow 2.8s ease-in-out infinite;
        }

        @keyframes aiGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.8;
          }
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
          padding: 14px 16px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.18);
        }

        .aiHeaderLeft {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .aiRobot {
          position: relative;
          width: 32px;
          height: 32px;
          border-radius: 12px;
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.5),
            #120d05
          );
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .aiRobotFace {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          border: 1px solid rgba(0, 0, 0, 0.8);
          background: radial-gradient(circle at top, #fff7d1, #c6a858);
        }

        .aiRobotGlow {
          position: absolute;
          inset: -30%;
          background: radial-gradient(
            circle at center,
            rgba(230, 195, 106, 0.25),
            transparent 60%
          );
          animation: aiGlow 2.8s ease-in-out infinite;
        }

        .aiTitle {
          font-weight: 900;
          color: #e6c36a;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .aiSub {
          color: #bfae78;
          font-size: 12px;
          margin-top: 2px;
        }

        .aiClose {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.25);
          color: #e6c36a;
          width: 34px;
          height: 34px;
          border-radius: 12px;
          font-size: 18px;
          cursor: pointer;
        }

        .aiBody {
          padding: 14px;
        }

        .aiChat {
          max-height: 52vh;
          overflow-y: auto;
          display: grid;
          gap: 10px;
          padding-bottom: 12px;
        }

        .aiMsg {
          padding: 12px 12px;
          border-radius: 16px;
          font-size: 13px;
          line-height: 1.6;
          white-space: pre-wrap;
          border: 1px solid rgba(230, 195, 106, 0.16);
        }

        .aiMsg.bot {
          background: rgba(230, 195, 106, 0.06);
          color: #f7f0da;
        }

        .aiMsg.user {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.12);
        }

        .aiInputRow {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: center;
        }

        .aiInput {
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(230, 195, 106, 0.28);
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          outline: none;
        }

        .aiSend {
          padding: 12px 14px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #000;
          font-weight: 900;
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
