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
        background:
          "radial-gradient(circle at top, rgba(201,162,77,0.15), transparent 60%)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          textAlign: "center",
          border: "1px solid rgba(201,162,77,0.25)",
          borderRadius: "22px",
          padding: "64px 48px",
          background: "rgba(0,0,0,0.65)",
          boxShadow: "0 0 80px rgba(201,162,77,0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "44px",
            fontWeight: 700,
            marginBottom: "24px",
            color: "#c9a24d",
          }}
        >
          Winners Circle University
        </h1>

        <p style={{ fontSize: "18px", lineHeight: 1.7, marginBottom: "20px" }}>
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p
          style={{
            fontSize: "16px",
            opacity: 0.85,
            marginBottom: "40px",
          }}
        >
          No subscriptions. No upfront fees.  
          We only earn when you earn — a simple 30% performance share.
        </p>

        <Link href="/waitlist">
          <button>Join the Winners Circle</button>
        </Link>

        <p
          style={{
            marginTop: "32px",
            fontSize: "14px",
            opacity: 0.6,
          }}
        >
          Gold (XAUUSD) only · Risk-managed execution · Limited onboarding
        </p>
      </div>
    </main>
  );
}
