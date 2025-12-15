"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Waitlist
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Interactive reveals
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [vvipOpen, setVvipOpen] = useState(false);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      setStatus("You’re in. Welcome to the Circle.");
      setEmail("");
    } catch (err) {
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">Winners Circle</div>
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
          </nav>
        </div>
      )}

      {/* HERO */}
      <section id="overview" className="hero">
        <div className="pill">EARLY ACCESS · LIMITED ONBOARDING</div>

        <h1>Winners Circle University</h1>
        <p className="heroP">
          A performance-based gold trading framework combining structured AI
          modelling with disciplined human execution.
        </p>

        {/* WAITLIST FORM */}
        <form className="waitlistForm" onSubmit={handleWaitlistSubmit}>
          <input
            className="waitlistInput"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="goldBtn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Join the Waitlist"}
          </button>
          {status && <p className="status">{status}</p>}
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
              <p>Winners Circle was not built for excitement.</p>
              <p>It was built for longevity.</p>
              <p>
                This framework removes noise, emotion, and ego — replacing them
                with structure, risk awareness, and clarity.
              </p>
              <p>
                If you’re here to gamble, this isn’t for you. If you’re here to
                compound patiently — welcome.
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
    </>
  );
}
