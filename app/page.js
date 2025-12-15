"use client";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [vvipOpen, setVvipOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">Winners Circle</div>
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="menu-overlay">
          <button className="menu-close" onClick={() => setMenuOpen(false)}>
            × Close
          </button>

          <nav className="menu-links">
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
        <h1>Winners Circle University</h1>
        <p>
          A performance-based gold trading framework combining structured AI
          modelling with disciplined human execution.
        </p>
        <button className="gold-btn">Join the Waitlist</button>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section">
        <h2>How It Works</h2>

        <div className="card">
          <h3>Read Structure</h3>
          <p>We react to price, not predictions.</p>
        </div>

        <div className="card">
          <h3>Risk First</h3>
          <p>Capital protection is non-negotiable.</p>
        </div>

        <div className="card">
          <h3>Execute Clean</h3>
          <p>Precision beats frequency.</p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="section">
        <h2>Our Principles</h2>

        <div className="gold-card">
          <p><strong>Discipline over dopamine.</strong><br />No impulse. No noise.</p>
        </div>

        <div className="gold-card">
          <p><strong>Risk before reward.</strong><br />Survival compounds.</p>
        </div>

        <div className="gold-card">
          <p><strong>Process over outcomes.</strong><br />Execution beats emotion.</p>
        </div>

        <div className="gold-card">
          <p><strong>Patience compounds.</strong><br />Time is leverage.</p>
        </div>

        <div className="gold-card">
          <p><strong>Consistency creates inevitability.</strong></p>
        </div>
      </section>

      {/* MANIFESTO CURTAIN */}
      <section id="manifesto" className="section">
        {!manifestoOpen ? (
          <button className="curtain-btn" onClick={() => setManifestoOpen(true)}>
            Open Founder’s Manifesto
          </button>
        ) : (
          <div className="gold-card manifesto">
            <h2>The Founder’s Manifesto</h2>
            <p>
              Winners Circle was not built for excitement.  
              It was built for longevity.
            </p>
            <p>
              I’ve seen what impatience does to talented people.
              I’ve seen discipline quietly outperform brilliance.
            </p>
            <p>
              This framework removes noise, emotion, and ego — and replaces them
              with structure, risk awareness, and clarity.
            </p>
            <p>
              If you’re here to rush, impress, or gamble — this won’t work.
              If you’re here to compound patiently — you’re in the right place.
            </p>
            <span className="signature">— Lelefx, Founder</span>
          </div>
        )}
      </section>

      {/* VVIP */}
      <section id="vvip" className="section">
        {!vvipOpen ? (
          <button className="gold-btn" onClick={() => setVvipOpen(true)}>
            Explore VVIP Access
          </button>
        ) : (
          <div className="gold-card">
            <h2>VVIP Access</h2>
            <p>
              VVIP is not purchased.  
              It is earned through consistency, discipline,
              and long-term alignment.
            </p>
            <p>
              Select members may be contacted privately.
            </p>
          </div>
        )}
      </section>

      {/* STYLES */}
      <style jsx>{`
        body {
          margin: 0;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          color: #e6c36a;
        }

        .menu-btn {
          background: none;
          border: none;
          color: #e6c36a;
          font-size: 26px;
        }

        .menu-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at top, #1a1408, #000);
          z-index: 1000;
          padding: 30px;
        }

        .menu-close {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 10px 18px;
          border-radius: 14px;
          font-weight: 600;
          margin-bottom: 40px;
        }

        .menu-links a {
          display: block;
          font-size: 26px;
          margin-bottom: 26px;
          color: #e6c36a;
          text-decoration: none;
        }

        .hero {
          text-align: center;
          padding: 100px 20px;
        }

        .hero h1 {
          color: #e6c36a;
          font-size: 42px;
        }

        .hero p {
          color: #ccc;
          max-width: 600px;
          margin: 20px auto;
        }

        .gold-btn {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 16px 30px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
        }

        .section {
          padding: 80px 20px;
          text-align: center;
        }

        h2 {
          color: #e6c36a;
          margin-bottom: 40px;
        }

        .card,
        .gold-card {
          background: linear-gradient(180deg, #0b0b0b, #000);
          border: 1px solid rgba(230,195,106,0.35);
          border-radius: 24px;
          padding: 30px;
          margin: 20px auto;
          max-width: 420px;
          color: #ddd;
        }

        .gold-card h2 {
          margin-bottom: 20px;
        }

        .curtain-btn {
          background: none;
          border: 1px solid #e6c36a;
          color: #e6c36a;
          padding: 18px 30px;
          border-radius: 30px;
          font-size: 16px;
        }

        .signature {
          display: block;
          margin-top: 20px;
          color: #e6c36a;
        }
      `}</style>
    </>
  );
}
