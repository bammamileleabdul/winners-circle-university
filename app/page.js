import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "radial-gradient(circle at top, #1a1405 0%, #0b0b0b 60%)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          textAlign: "center",
          background: "rgba(0,0,0,0.70)",
          border: "1px solid rgba(201,162,77,0.35)",
          borderRadius: "24px",
          padding: "70px 50px",
          boxShadow: "0 0 90px rgba(201,162,77,0.18)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(201,162,77,0.35)",
            color: "#c9a24d",
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          Early Access • Limited Onboarding
        </div>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: 900,
            color: "#c9a24d",
            marginBottom: "18px",
            lineHeight: 1.05,
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
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#e5e5e5",
            maxWidth: "720px",
            margin: "0 auto 18px",
          }}
        >
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#bdbdbd",
            maxWidth: "700px",
            margin: "0 auto 42px",
          }}
        >
          No subscriptions. No upfront fees. We only earn when you earn — a
          simple 30% performance share.
        </p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
          <Link
            href="/waitlist"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #e3c87a, #c9a24d)",
              color: "#0b0b0b",
              padding: "14px 22px",
              fontSize: "16px",
              fontWeight: 800,
              borderRadius: "14px",
              textDecoration: "none",
              minWidth: "240px",
            }}
          >
            Join the Waitlist
          </Link>

          <Link
            href="/waitlist"
            style={{
              display: "inline-block",
              border: "1px solid rgba(201,162,77,0.40)",
              color: "#e5e5e5",
              padding: "14px 22px",
              fontSize: "16px",
              fontWeight: 700,
              borderRadius: "14px",
              textDecoration: "none",
              background: "rgba(0,0,0,0.25)",
            }}
          >
            See How It Works
          </Link>
        </div>

        <div
          style={{
            marginTop: "38px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            color: "#9a9a9a",
            fontSize: "12px",
          }}
        >
          <span style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "8px 10px", borderRadius: "999px" }}>
            XAUUSD Focus
          </span>
          <span style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "8px 10px", borderRadius: "999px" }}>
            Risk First
          </span>
          <span style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "8px 10px", borderRadius: "999px" }}>
            Premium/Psychology
          </span>
          <span style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "8px 10px", borderRadius: "999px" }}>
            Systemized Execution
          </span>
        </div>
      </div>
    </main>
  );
}
