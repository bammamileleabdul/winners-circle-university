"use client";

import Link from "next/link";

const navButton = {
  background: "none",
  border: "none",
  color: "#c9a24d",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(201,162,77,0.15), #000 60%)",
        color: "#e6e6e6",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
        scrollBehavior: "smooth",
      }}
    >
      {/* TOP NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.85)",
          borderBottom: "1px solid rgba(201,162,77,0.25)",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#c9a24d", fontWeight: 900 }}>
          Winners Circle
        </span>

        <div style={{ display: "flex", gap: "14px" }}>
          <a href="#overview" style={navButton}>Overview</a>
          <a href="#how" style={navButton}>How</a>
          <a href="#principles" style={navButton}>Principles</a>
          <a href="#manifesto" style={navButton}>Manifesto</a>
          <a href="#vvip" style={navButton}>VVIP</a>
        </div>
      </nav>

      {/* SPACER FOR FIXED NAV */}
      <div style={{ height: "64px" }} />

      {/* OVERVIEW */}
      <section id="overview" style={{ padding: "90px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: "#d6b25e" }}>
          Winners Circle University
        </h1>

        <p style={{ maxWidth: 700, margin: "22px auto", lineHeight: 1.7 }}>
          A performance-based gold trading framework combining structured AI
          modelling with disciplined human execution.
        </p>

        <Link href="/waitlist">
          <button
            style={{
              marginTop: 20,
              padding: "14px 28px",
              borderRadius: 14,
              background: "linear-gradient(135deg,#e7c873,#c9a24d)",
              border: "none",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Join the Waitlist
          </button>
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#d6b25e", marginBottom: 30 }}>
          How It Works
        </h2>

        <div style={{ display: "flex", gap: 18, overflowX: "auto" }}>
          {[
            ["Read Structure", "We react to price, not predictions."],
            ["Risk First", "Capital protection defines every move."],
            ["Execute", "Rules remove emotion."],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                minWidth: 260,
                padding: 26,
                borderRadius: 22,
                border: "1px solid rgba(201,162,77,0.35)",
                background: "rgba(0,0,0,0.75)",
              }}
            >
              <h3 style={{ color: "#c9a24d" }}>{title}</h3>
              <p style={{ fontSize: 14 }}>{text}</p>
            </div>
          ))}
        </div>

        <a href="#principles" style={navButton}>
          → Read our principles
        </a>
      </section>

      {/* PRINCIPLES */}
      <section
        id="principles"
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "rgba(0,0,0,0.6)",
        }}
      >
        <h2 style={{ color: "#d6b25e", marginBottom: 24 }}>
          Our Principles
        </h2>

        {[
          "Discipline over dopamine.",
          "Risk before reward.",
          "Process over outcomes.",
          "Patience compounds.",
          "Consistency creates inevitability.",
        ].map((p) => (
          <p key={p} style={{ marginBottom: 10 }}>
            {p}
          </p>
        ))}

        <a href="#manifesto" style={navButton}>
          → Read the manifesto
        </a>
      </section>

      {/* MANIFESTO */}
      <section
        id="manifesto"
        style={{
          padding: "80px 20px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <h2 style={{ color: "#d6b25e", marginBottom: 18 }}>
          Founder’s Manifesto
        </h2>

        <p>
          Winners Circle was not built for excitement. It was built for
          longevity.
        </p>
        <p>
          Discipline quietly outperforms brilliance when time is involved.
        </p>

        <p style={{ marginTop: 18, color: "#c9a24d" }}>
          — Lelefx, Founder
        </p>

        <a href="#vvip" style={navButton}>
          → Explore VVIP access
        </a>
      </section>

      {/* VVIP */}
      <section
        id="vvip"
        style={{
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#d6b25e" }}>VVIP Access</h2>

        <p style={{ maxWidth: 700, margin: "18px auto" }}>
          VVIP is not purchased. It is earned through consistency, discipline,
          and long-term alignment.
        </p>

        <p style={{ fontSize: 14, color: "#9a9a9a" }}>
          Some members may be contacted privately.
        </p>
      </section>
    </main>
  );
}
