"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1a1405 0%, #000 65%)",
        padding: "32px 18px 60px",
        color: "#eaeaea",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* HERO */}
      <section
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(201,162,77,0.4)",
            color: "#c9a24d",
            fontSize: "12px",
            letterSpacing: "0.12em",
            marginBottom: "22px",
          }}
        >
          EARLY ACCESS • LIMITED ONBOARDING
        </div>

        <h1
          style={{
            fontSize: "44px",
            fontWeight: 900,
            color: "#c9a24d",
            lineHeight: 1.1,
            marginBottom: "18px",
          }}
        >
          Winners
          <br />
          Circle
          <br />
          University
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#d6d6d6",
            marginBottom: "12px",
          }}
        >
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#b5b5b5",
            marginBottom: "34px",
          }}
        >
          No subscriptions. No upfront fees.
          <br />
          We only earn when you earn — a simple 30% performance share.
        </p>

        <Link
          href="/waitlist"
          style={{
            display: "block",
            background: "linear-gradient(135deg, #e3c87a, #c9a24d)",
            color: "#0b0b0b",
            padding: "16px",
            fontSize: "16px",
            fontWeight: 900,
            borderRadius: "16px",
            textDecoration: "none",
            marginBottom: "40px",
          }}
        >
          Join the Waitlist
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          maxWidth: "100%",
          marginTop: "10px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#c9a24d",
            fontSize: "22px",
            fontWeight: 800,
            marginBottom: "18px",
          }}
        >
          How It Works
        </h2>

        {/* SWIPE CONTAINER */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            padding: "10px 16px 20px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[
            {
              title: "Read Structure",
              text: "We don’t predict markets. We read price and react with precision.",
            },
            {
              title: "Risk First",
              text: "Capital protection comes before profit. Survival is non-negotiable.",
            },
            {
              title: "Patience & Timing",
              text: "We wait for price to come to us. No chasing. No emotions.",
            },
            {
              title: "Aligned Performance",
              text: "We only earn when you earn. Incentives stay aligned — always.",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                minWidth: "260px",
                maxWidth: "260px",
                padding: "26px 22px",
                borderRadius: "22px",
                background: "rgba(0,0,0,0.75)",
                border: "1px solid rgba(201,162,77,0.35)",
                boxShadow: "0 0 50px rgba(201,162,77,0.15)",
                scrollSnapAlign: "center",
              }}
            >
              <h3
                style={{
                  color: "#c9a24d",
                  fontSize: "18px",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#d0d0d0",
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9a9a9a",
            marginTop: "8px",
          }}
        >
          Swipe to explore →
        </p>
      </section>
    </main>
  );
}
