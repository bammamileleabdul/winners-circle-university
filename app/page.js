"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>EARLY ACCESS • LIMITED</div>

        <h1 style={styles.title}>
          Winners Circle
          <br />
          University
        </h1>

        <p style={styles.subtitle}>
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human execution.
        </p>

        <p style={styles.note}>
          No subscriptions. No upfront fees.
          <br />
          We only earn when you earn — <strong>30% performance share</strong>.
        </p>

        <div style={styles.actions}>
          <Link href="/waitlist" style={styles.primaryBtn}>
            Join the Waitlist
          </Link>

          <Link href="/waitlist" style={styles.secondaryBtn}>
            See How It Works
          </Link>
        </div>

        <div style={styles.tags}>
          <span>XAUUSD Focus</span>
          <span>Risk First</span>
          <span>Psychology</span>
          <span>Systemized Execution</span>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #1a1405 0%, #000 60%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(0,0,0,0.85)",
    borderRadius: "26px",
    padding: "42px 28px",
    textAlign: "center",
    border: "1px solid rgba(201,162,77,0.35)",
    boxShadow: "0 0 80px rgba(201,162,77,0.25)",
    animation: "slideUp 0.9s ease-out forwards",
    opacity: 0,
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(201,162,77,0.4)",
    color: "#c9a24d",
    fontSize: "11px",
    letterSpacing: "0.12em",
    marginBottom: "22px",
  },

  title: {
    fontSize: "36px",
    fontWeight: 900,
    color: "#c9a24d",
    lineHeight: 1.15,
    marginBottom: "18px",
  },

  subtitle: {
    fontSize: "15px",
    lineHeight: 1.7,
    color: "#e6e6e6",
    marginBottom: "18px",
  },

  note: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#bdbdbd",
    marginBottom: "28px",
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "26px",
  },

  primaryBtn: {
    background: "linear-gradient(135deg, #e3c87a, #c9a24d)",
    color: "#0b0b0b",
    padding: "14px",
    borderRadius: "14px",
    fontWeight: 900,
    fontSize: "16px",
    textDecoration: "none",
  },

  secondaryBtn: {
    border: "1px solid rgba(201,162,77,0.4)",
    color: "#e6e6e6",
    padding: "14px",
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "15px",
    textDecoration: "none",
    background: "rgba(0,0,0,0.35)",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    fontSize: "12px",
    color: "#9a9a9a",
  },
};

/* slide-in animation */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}
