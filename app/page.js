"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Waitlist
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // Interactive reveals
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [vvipOpen, setVvipOpen] = useState(false);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("You’re in. Welcome to the Circle.");
      setEmail("");
    } catch (err) {
      setStatus("Something went wrong. Try again.");
    }
  };

  // ✅ MINI LELEFX (ONLY ADD)
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
            content: data?.error || "Something went wrong. Try again.",
          },
        ]);
      } else {
        setAiMessages((m) => [
          ...m,
          { role: "assistant", content: data.reply || "…" },
        ]);
      }
    } catch (err) {
      setAiMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error. Try again." },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // simple placeholder click handler for pay buttons (UI ONLY)
  const handlePayClick = (method) => {
    alert(`Payment via ${method} coming soon. You’ll settle 30% of your net profit, not deposits.`);
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        {/* emblem logo */}
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
            <a href="#how" onClick={() => setMenuOpen(false)}>
              How It Works
            </a>
            <a href="#principles" onClick={() => setMenuOpen(false)}>
              Principles
            </a>
            <a href="#performance" onClick={() => setMenuOpen(false)}>
              Performance
            </a>
            <a href="#manifesto" onClick={() => setMenuOpen(false)}>
              Manifesto
            </a>
            <a href="#vvip" onClick={() => setMenuOpen(false)}>
              VVIP Access
            </a>
          </nav>
        </div>
      )}

      {/* HERO */}
      <section id="overview" className="hero">
        {/* faded hero watermark emblem */}
        <img src="/emblem.jpg" alt="" className="heroEmblem" />

        <div className="pill">EARLY ACCESS · LIMITED ONBOARDING</div>

        <h1>Winners Circle University</h1>
        <p className="heroP">
          A performance-based gold trading framework combining structured AI
          modelling with disciplined human execution.
        </p>

        {/* WAITLIST FORM (REAL) */}
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
          <a className="ghostLink" href="#how">
            See How It Works →
          </a>
        </div>
      </section>

      {/* HOW IT WORKS (Floating Gold Cards) */}
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

      {/* PRINCIPLES (Luxury Cards) */}
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

      {/* ✅ PERFORMANCE & PROFIT SHARE SECTION (NEW UI) */}
      <section id="performance" className="section">
        <h2>Performance & Profit Share</h2>
        <p className="perfIntro">
          Example based on a <span>£500</span> starting capital using our{" "}
          <span>capital ÷ 14</span> risk model. Numbers are illustrative, not
          guaranteed. We operate on structure, not promises.
        </p>

        <div className="perfGrid">
          {/* LEFT: WEEK SNAPSHOT */}
          <div className="perfCard">
            <div className="perfTag">Trade Structure</div>
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
              <span className="perfLabel">TP targets</span>
              <span className="perfValue">Fixed & pre-defined</span>
            </div>
            <div className="perfRow">
              <span className="perfLabel">SL placement</span>
              <span className="perfValue">Structure-based, not random</span>
            </div>
          </div>

          {/* RIGHT: WEEK PROJECTION */}
          <div className="perfCard">
            <div className="perfTag">Example Weekly Outcomes</div>
            <div className="perfRow">
              <span className="perfLabel">Normal week</span>
              <span className="perfValue">7–9 clean TPs</span>
            </div>
            <div className="perfRow">
              <span className="perfLabel">Bad week</span>
              <span className="perfValue">~7 TPs · still green</span>
            </div>
            <div className="perfRow">
              <span className="perfLabel">Worst realistic week</span>
              <span className="perfValue">4 TPs left</span>
            </div>
            <div className="perfDivider" />
            <div className="perfRow">
              <span className="perfLabel">Example profit (4 TPs)</span>
              <span className="perfValue">≈ £142</span>
            </div>
            <div className="perfRow">
              <span className="perfLabel">Example profit (9 TPs)</span>
              <span className="perfValue">≈ £321+</span>
            </div>
            <p className="perfFine">
              All scenarios assume strict risk rules and 1:1 execution. No
              compounding or overleveraging.
            </p>
          </div>
        </div>

        {/* PAYMENT BLOCK */}
        <div className="payCard">
          <div className="payTitle">Settle Your 30% Performance Fee</div>
          <p className="payText">
            You keep <span>70%</span> of net profit. Winners Circle takes{" "}
            <span>30%</span> as a performance fee — only on profit, never on
            deposits.
          </p>

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
              className="payBtn"
              type="button"
              onClick={() => handlePayClick("Card")}
            >
              Pay with Card
            </button>
            <button
              className="payBtn payBtnGhost"
              type="button"
              onClick={() => handlePayClick("Crypto")}
            >
              Pay with Crypto
            </button>
          </div>

          <div className="payNote">
            Payment rail is processed securely via third-party providers. No
            funds are ever held in-platform. This is a performance settlement,
            not a deposit request.
          </div>
        </div>
      </section>

      {/* MANIFESTO (Curtain / Reveal) */}
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

      {/* VVIP (Button -> Premium Reveal Panel) */}
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
              {aiLoading && <div className="aiMsg aiBot">Thinking…</div>}
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

            <div className="aiNote">Not financial advice. Process only.</div>
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
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(230, 195, 106, 0.18);
        }

        .logo {
          color: #e6c36a;
          font-weight: 700;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
        }

        .logoImg {
          height: 40px;
          width: auto;
          object-fit: contain;
          display: block;
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

        /* PERFORMANCE SECTION STYLES */
        .perfIntro {
          max-width: 640px;
          margin: 0 auto 28px;
          color: #d8d2b6;
          font-size: 14px;
          line-height: 1.7;
        }

        .perfIntro span {
          color: #e6c36a;
          font-weight: 600;
        }

        .perfGrid {
          display: grid;
          gap: 18px;
          max-width: 880px;
          margin: 0 auto 28px;
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

        .payCard {
          max-width: 880px;
          margin: 0 auto;
          text-align: left;
          border-radius: 26px;
          padding: 24px 20px;
          background: radial-gradient(
            circle at top,
            rgba(230, 195, 106, 0.16),
            rgba(0, 0, 0, 0.96)
          );
          border: 1px solid rgba(230, 195, 106, 0.45);
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.25);
        }

        .payTitle {
          color: #e6c36a;
          font-weight: 800;
          margin-bottom: 8px;
          font-size: 18px;
        }

        .payText {
          color: #d8d2b6;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .payText span {
          color: #e6c36a;
          font-weight: 600;
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
