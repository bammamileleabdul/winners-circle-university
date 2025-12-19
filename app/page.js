"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  // manifesto + vvip toggles
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [vvipOpen, setVvipOpen] = useState(false);

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

            <a href="#how" onClick={() => setMenuOpen(false)}>
              How It Works
            </a>
            <a href="/how" onClick={() => setMenuOpen(false)}>
              How (Full Page)
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

            <a href="/client-portal" onClick={() => setMenuOpen(false)}>
              Client Portal
            </a>

            <a href="/ai" onClick={() => setMenuOpen(false)}>
              mini lelefx (AI)
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

        <div className="hintRow">
          <a className="ghostLink" href="#how">
            See How It Works →
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
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
              d: "Same rules, every session. Systems beat moods.",
            },
            {
              t: "No Hype, Only Proof",
              d: "We focus on results produced by rules — not noise.",
            },
          ].map((x) => (
            <div key={x.t} className="luxCard">
              <div className="luxTitle">{x.t}</div>
              <div className="luxText">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="section">
        <h2>Manifesto</h2>

        {!manifestoOpen ? (
          <button
            className="manifestoBtn"
            onClick={() => setManifestoOpen(true)}
          >
            Open the Manifesto
          </button>
        ) : (
          <div className="manifestoCard">
            <p className="manifestoText">
              We don’t chase trades.
              <br />
              We build frameworks.
              <br />
              We remove emotion.
              <br />
              We protect capital.
              <br />
              We let patience compound.
            </p>

            <button className="ghostBtn" onClick={() => setManifestoOpen(false)}>
              Close
            </button>
          </div>
        )}
      </section>

      {/* VVIP */}
      <section id="vvip" className="section">
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

      {/* MINI LELEFX ROBOT BUTTON → /ai */}
      <button
        className="aiFab"
        onClick={() => router.push("/ai")}
        aria-label="Open mini lelefx"
        title="mini lelefx"
      >
        <svg
          className="aiFabIcon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M10 2a1 1 0 0 1 1 1v1h2V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v7a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm-3 4a1 1 0 0 0-1 1v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V7a1 1 0 0 0-1-1H7Zm2 4a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 9 10Zm6 0a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 15 10Z" />
        </svg>
      </button>

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

        h1 {
          margin: 0;
          font-size: 42px;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
        }

        .heroP {
          max-width: 720px;
          margin: 16px auto 28px;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        .waitlistForm {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .waitlistInput {
          min-width: 260px;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid rgba(230, 195, 106, 0.18);
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
          outline: none;
        }

        .goldBtn {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 14px 22px;
          border-radius: 14px;
          font-weight: 900;
          color: #000;
        }

        .hintRow {
          margin-top: 18px;
          position: relative;
          z-index: 1;
        }

        .ghostLink {
          color: rgba(230, 195, 106, 0.9);
          font-weight: 700;
        }

        .section {
          padding: 64px 18px;
          max-width: 980px;
          margin: 0 auto;
        }

        h2 {
          margin: 0 0 22px;
          color: #e6c36a;
          font-size: 24px;
          letter-spacing: 0.02em;
        }

        .floatWrap {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

        .floatCard {
          border: 1px solid rgba(230, 195, 106, 0.14);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 18px;
        }

        .floatTitle {
          font-weight: 900;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 8px;
        }

        .floatText {
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.6;
        }

        .luxGrid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .luxCard {
          border: 1px solid rgba(230, 195, 106, 0.14);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 18px;
        }

        .luxTitle {
          font-weight: 900;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 8px;
        }

        .luxText {
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.6;
        }

        .manifestoBtn,
        .vvipBtn {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 14px 22px;
          border-radius: 14px;
          font-weight: 900;
          color: #000;
        }

        .ghostBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.3);
          color: #e6c36a;
          padding: 12px 18px;
          border-radius: 14px;
          font-weight: 800;
        }

        .manifestoCard,
        .vvipCard {
          border: 1px solid rgba(230, 195, 106, 0.14);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 18px;
        }

        .manifestoText {
          margin: 0 0 14px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          white-space: pre-line;
        }

        .vvipHead {
          color: #e6c36a;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .vvipText {
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.7;
          margin: 0 0 12px;
        }

        .vvipDivider {
          height: 1px;
          background: rgba(230, 195, 106, 0.18);
          margin: 12px 0;
        }

        .vvipTextMuted {
          color: rgba(255, 255, 255, 0.62);
          margin: 0 0 14px;
        }

        /* AI FAB (bot icon) */
        .aiFab {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 9998;
          width: 62px;
          height: 62px;
          border-radius: 999px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(
            circle at 30% 30%,
            #f3d27a,
            #c9a24d 55%,
            #1a1408 100%
          );
          border: 1px solid rgba(230, 195, 106, 0.55);
          box-shadow: 0 0 90px rgba(230, 195, 106, 0.22);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .aiFab:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 110px rgba(230, 195, 106, 0.3);
        }

        .aiFab:focus-visible {
          outline: 2px solid rgba(230, 195, 106, 0.7);
          outline-offset: 4px;
        }

        .aiFabIcon {
          width: 30px;
          height: 30px;
          fill: #0b0b0b;
          filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.35));
        }

        .aiFab::after {
          content: "mini lelefx";
          position: absolute;
          right: 72px;
          bottom: 14px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.88);
          border: 1px solid rgba(230, 195, 106, 0.25);
          color: #e6c36a;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.03em;
          opacity: 0;
          transform: translateX(8px);
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
          white-space: nowrap;
        }

        .aiFab:hover::after,
        .aiFab:focus-visible::after {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </>
  );
}
