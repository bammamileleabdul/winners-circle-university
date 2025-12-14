import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1a1405 0%, #0b0b0b 65%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(0,0,0,0.75)",
          border: "1px solid rgba(201,162,77,0.35)",
          borderRadius: "22px",
          padding: "36px 22px",
          textAlign: "center",
          boxShadow: "0 0 70px rgba(201,162,77,0.18)",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(201,162,77,0.4)",
            color: "#c9a24d",
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Early Access • Limited Onboarding
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#c9a24d",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Winners
          <br />
          Circle
          <br />
          University
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#e5e5e5",
            marginBottom: "14px",
          }}
        >
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#bdbdbd",
            lineHeight: 1.6,
            marginBottom: "26px",
          }}
        >
          No subscriptions. No upfront fees.
          <br />
          We only earn when you earn — a simple 30% performance share.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "26px",
          }}
        >
          <Link
            href="/waitlist"
            style={{
              display: "block",
              width: "100%",
              background: "linear-gradient(135deg, #e3c87a, #c9a24d)",
              color: "#0b0b0b",
              padding: "14px",
              fontSize: "16px",
              fontWeight: 900,
              borderRadius: "14px",
              textDecoration: "none",
            }}
          >
            Join the Waitlist
          </Link>

          <Link
            href="/waitlist"
            style={{
              display: "block",
              width: "100%",
              border: "1px solid rgba(201,162,77,0.45)",
              color: "#e5e5e5",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 700,
              borderRadius: "14px",
              textDecoration: "none",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            See How It Works
          </Link>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            fontSize: "12px",
            color: "#9a9a9a",
          }}
        >
          {["XAUUSD Focus", "Risk First", "Psychology", "Systemized Execution"].map(
            (item) => (
              <span
                key={item}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </main>
  );
}
