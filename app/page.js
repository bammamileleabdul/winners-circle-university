"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a1405 0%, #0b0b0b 65%)",
        color: "#eaeaea",
        padding: "32px 18px",
      }}
    >
      {/* HERO */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "40px",
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
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          Early Access • Limited Onboarding
        </div>

        <h1
          style={{
            fontSize: "44px",
            fontWeight: 900,
            color: "#c9a24d",
            lineHeight: 1.05,
            marginBottom: "16px",
          }}
        >
          Winners Circle
          <br />
          University
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 auto 12px",
            color: "#e5e5e5",
          }}
        >
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#bdbdbd",
            marginBottom: "28px",
          }}
        >
          No subscriptions. No upfront fees. We only earn when you earn — a simple
          30% performance share.
        </p>

        <Link
          href="/waitlist"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "360px",
            margin: "0 auto",
            background: "linear-gradient(135deg, #e3c87a, #c9a24d)",
            color: "#0b0b0b",
            padding: "16px",
            borderRadius: "16px",
            fontWeight: 900,
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          Join the Waitlist
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          maxWidth: "900px",
          margin: "70px auto 0",
          paddingBottom: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#c9a24d",
            fontSize: "28px",
            fontWeight: 800,
            marginBottom: "28px",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            paddingBottom: "10px",
          }}
        >
          {[
            {
              title: "Read Structure",
              text: "We don’t predict markets. We read price and react with precision.",
            },
            {
              title: "Risk First",
              text: "Capital protection is non-negotiable. Risk defines every decision.",
            },
            {
              title: "Execute Clean",
              text: "Execution is systematic, rule-based, and emotionless.",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                minWidth: "260px",
                background: "rgba(0,0,0,0.75)",
                borderRadius: "18px",
                padding: "22px",
                border: "1px solid rgba(201,162,77,0.25)",
                boxShadow: "0 0 40px rgba(201,162,77,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#c9a24d",
                  fontSize: "18px",
                  marginBottom: "8px",
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#888",
            marginTop: "10px",
          }}
        >
          Swipe to explore →
        </p>
      </section>

      {/* OUR PRINCIPLES */}
      <section
        style={{
          maxWidth: "720px",
          margin: "80px auto",
          background: "rgba(0,0,0,0.78)",
          borderRadius: "24px",
          padding: "36px 26px",
          border: "1px solid rgba(201,162,77,0.35)",
          boxShadow: "0 0 70px rgba(201,162,77,0.18)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#c9a24d",
            fontSize: "26px",
            fontWeight: 900,
            marginBottom: "14px",
          }}
        >
          Our Principles
        </h2>

        <div
          style={{
            width: "60px",
            height: "2px",
            background: "#c9a24d",
            margin: "0 auto 22px",
            borderRadius: "2px",
          }}
        />

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
              fontSize: "15px",
              marginBottom: "14px",
              color: "#e5e5e5",
            }}
          >
            {line}
          </p>
        ))}
      </section>
    </main>
  );
}
