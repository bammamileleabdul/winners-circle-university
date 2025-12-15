"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1a1405 0%, #000 60%)",
        padding: "40px 18px",
        color: "#e6d8a8",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* HERO */}
      <section style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid rgba(201,162,77,0.4)",
            color: "#c9a24d",
            fontSize: 12,
            marginBottom: 20,
          }}
        >
          EARLY ACCESS · LIMITED ONBOARDING
        </div>

        <h1
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#d9b35f",
            lineHeight: 1.15,
            marginBottom: 18,
          }}
        >
          Winners Circle University
        </h1>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#e6d8a8",
            opacity: 0.9,
            marginBottom: 24,
          }}
        >
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p
          style={{
            fontSize: 14,
            color: "#bfae7a",
            marginBottom: 32,
          }}
        >
          No subscriptions. No upfront fees.  
          We only earn when you earn — a simple 30% performance share.
        </p>

        <Link href="/waitlist">
          <button
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #e3c87a, #c9a24d)",
              color: "#0b0b0b",
              fontSize: 16,
              fontWeight: 900,
              cursor: "pointer",
              marginBottom: 40,
            }}
          >
            Join the Waitlist
          </button>
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 600, margin: "0 auto 60px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 800,
            color: "#d9b35f",
            marginBottom: 24,
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            paddingBottom: 10,
          }}
        >
          {[
            {
              title: "Read Structure",
              text: "We don’t predict markets. We read price and react with precision.",
            },
            {
              title: "Risk First",
              text: "Capital preservation is non-negotiable before any return.",
            },
            {
              title: "Execution",
              text: "Systemised rules remove emotion from decision-making.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                minWidth: 240,
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(201,162,77,0.35)",
                borderRadius: 18,
                padding: 20,
              }}
            >
              <h3
                style={{
                  color: "#d9b35f",
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#e6d8a8",
                  opacity: 0.85,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 12,
            fontSize: 12,
            color: "#9f8f5f",
          }}
        >
          Swipe to explore →
        </p>
      </section>

      {/* PRINCIPLES */}
      <section
        style={{
          maxWidth: 520,
          margin: "0 auto 60px",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(201,162,77,0.35)",
          borderRadius: 22,
          padding: "30px 22px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#d9b35f",
            marginBottom: 20,
          }}
        >
          Our Principles
        </h2>

        {[
          "Discipline over dopamine.",
          "Risk before reward.",
          "Process over outcomes.",
          "Patience compounds.",
          "Consistency creates inevitability.",
        ].map((line, i) => (
          <p
            key={i}
            style={{
              fontSize: 15,
              color: "#e6d8a8",
              opacity: 0.9,
              marginBottom: 10,
            }}
          >
            {line}
          </p>
        ))}
      </section>

      {/* FILTER SECTION */}
      <section style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 800,
            color: "#d9b35f",
            marginBottom: 30,
          }}
        >
          This Is Not For Everyone
        </h2>

        <div
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(201,162,77,0.35)",
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <h3 style={{ color: "#c96a6a", marginBottom: 12 }}>
            ✖ Not for you if:
          </h3>
          {[
            "You want signals or shortcuts.",
            "You chase excitement.",
            "You ignore rules.",
            "You blame outcomes.",
          ].map((t, i) => (
            <p key={i} style={{ color: "#e6d8a8", opacity: 0.85 }}>
              • {t}
            </p>
          ))}
        </div>

        <div
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(201,162,77,0.35)",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <h3 style={{ color: "#8fd18f", marginBottom: 12 }}>
            ✔ For you if:
          </h3>
          {[
            "You value discipline.",
            "You respect risk.",
            "You think long-term.",
            "You want mastery.",
          ].map((t, i) => (
            <p key={i} style={{ color: "#e6d8a8", opacity: 0.9 }}>
              • {t}
            </p>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 18,
            fontSize: 13,
            color: "#9f8f5f",
          }}
        >
          If this made you uncomfortable — this probably isn’t your circle.
        </p>
      </section>
    </main>
  );
}
