"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [vvipOpen, setVvipOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div />
        <button className="menuBtn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>

        <img
          src="/emblem.png.jpg"
          alt="Winners Circle Emblem"
          className="headerEmblem"
        />
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="menuOverlay">
          <button className="menuClose" onClick={() => setMenuOpen(false)}>
            × Close
          </button>

          <nav className="menuLinks">
            <a href="#overview" onClick={() => setMenuOpen(false)}>Overview</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#principles" onClick={() => setMenuOpen(false)}>Principles</a>
            <a href="#manifesto" onClick={() => setMenuOpen(false)}>Manifesto</a>
            <a href="#vvip" onClick={() => setMenuOpen(false)}>VVIP Access</a>
          </nav>
        </div>
      )}

      {/* HERO */}
      <section id="overview" className="hero">
        <img
          src="/emblem.png.jpg"
          alt=""
          className="heroWatermark"
        />

        <div className="pill">EARLY ACCESS · LIMITED ONBOARDING</div>

        <h1>Winners Circle University</h1>
        <p className="heroP">
          A performance-based gold trading framework combining structured AI
          modelling with disciplined human execution.
        </p>

        {/* WAITLIST (FORMSPREE + OVERLAY) */}
        <form
          className="waitlistForm"
          action="https://formspree.io/f/xpwveaza"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;

            fetch(form.action, {
              method: "POST",
              body: new FormData(form),
              headers: { Accept: "application/json" },
            }).then(() => {
              form.reset();
              setShowSuccess(true);
            });
          }}
        >
          <input
            className="waitlistInput"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <input type="hidden" name="source" value="Winners Circle Landing Page" />

          <button className="goldBtn" type="submit">
            Join the Waitlist
          </button>
        </form>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section">
        <h2>How It Works</h2>
        <div className="floatWrap">
          {[
            ["Read Structure", "We react to price, not predictions."],
            ["Risk First", "Capital protection is non-negotiable."],
            ["Execute Clean", "Rules remove emotion from execution."],
          ].map(([t, d]) => (
            <div key={t} className="floatCard">
              <div className="floatTitle">{t}</div>
              <div className="floatText">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="section">
        <h2>Our Principles</h2>
        <div className="luxGrid">
          {[
            ["Discipline Over Dopamine", "Calm execution compounds."],
            ["Risk Before Reward", "If risk isn’t clear, the trade doesn’t exist."],
            ["Process Over Outcomes", "Decisions compound, not luck."],
            ["Patience Compounds", "Waiting is a skill."],
          ].map(([t, d]) => (
            <div key={t} className="luxCard">
              <div className="luxTitle">{t}</div>
              <div className="luxText">{d}</div>
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
            <p>Winners Circle was built for longevity, not excitement.</p>
            <p>If you’re here to gamble — this won’t work.</p>
            <p>If you’re here to compound patiently — welcome.</p>
            <div className="signature">— Lelefx</div>
            <button className="ghostBtn" onClick={() => setManifestoOpen(false)}>
              Close
            </button>
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
            <p>VVIP is invitation-only. Alignment comes first.</p>
            <button className="ghostBtn" onClick={() => setVvipOpen(false)}>
              Close
            </button>
          </div>
        )}
      </section>

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div className="successOverlay">
          <div className="successCard">
            <div className="successAccent" />
            <h3>You’re in.</h3>
            <p>
              Winners Circle moves with precision.<br />
              Updates will arrive shortly.
            </p>
            <button className="ghostBtn" onClick={() => setShowSuccess(false)}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        html { scroll-behavior: smooth; }

        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          background: rgba(0,0,0,.85);
          border-bottom: 1px solid rgba(230,195,106,.2);
        }

        .headerEmblem {
          width: 42px;
          height: 42px;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(230,195,106,.4));
        }

        .menuBtn {
          background: none;
          border: none;
          color: #e6c36a;
          font-size: 26px;
        }

        .hero {
          position: relative;
          text-align: center;
          padding: 90px 18px 70px;
          background: radial-gradient(circle at top, #2a1f0f, #000);
          overflow: hidden;
        }

        .heroWatermark {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 520px;
          opacity: 0.05;
          pointer-events: none;
        }

        .pill {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(230,195,106,.3);
          color: #e6c36a;
          font-size: 12px;
          letter-spacing: .14em;
          margin-bottom: 20px;
        }

        h1 { color: #e6c36a; font-size: 42px; }

        .heroP {
          color: #cfcfcf;
          max-width: 620px;
          margin: 0 auto 28px;
          line-height: 1.7;
        }

        .waitlistForm {
          max-width: 380px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .waitlistInput {
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(230,195,106,.35);
          background: rgba(0,0,0,.6);
          color: #fff;
        }

        .goldBtn {
          background: linear-gradient(135deg,#e6c36a,#b8963f);
          border: none;
          padding: 14px;
          border-radius: 999px;
          font-weight: 800;
        }

        .section {
          padding: 90px 18px;
          background: #000;
          text-align: center;
        }

        .successOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .successCard {
          background: #000;
          border: 1px solid rgba(230,195,106,.45);
          padding: 34px;
          border-radius: 26px;
          box-shadow: 0 0 80px rgba(230,195,106,.3);
          text-align: center;
        }

        .successAccent {
          height: 3px;
          width: 120px;
          background: linear-gradient(90deg,#e6c36a,#b8963f);
          margin: 0 auto 16px;
        }

        .ghostBtn {
          background: transparent;
          border: 1px solid rgba(230,195,106,.4);
          color: #e6c36a;
          padding: 12px 18px;
          border-radius: 999px;
          margin-top: 14px;
        }
      `}</style>
    </>
  );
}
