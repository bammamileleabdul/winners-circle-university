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
          "radial-gradient(circle at top, rgba(201,162,77,0.18), transparent 65%)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          textAlign: "center",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(201,162,77,0.3)",
          borderRadius: "24px",
          padding: "70px 50px",
          boxShadow: "0 0 90px rgba(201,162,77,0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 800,
            color: "#c9a24d",
            marginBottom: "22px",
          }}
        >
          Winners Circle University
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#e5e5e5",
            maxWidth: "720px",
            margin: "0 auto 20px",
          }}
        >
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human execution.
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#bdbdbd",
            maxWidth: "700px",
            margin: "0 auto 50px",
          }}
        >
          No subscriptions. No upfront fees.  
          We only earn when you earn — a simple 30% performance share.
        </p>

        <Link href="/waitlist">
          <button
            style={{
              background: "linear-gradient(135deg, #c9a24d, #f2d27a)",
              color: "#0b0b0b",
              border: "none",
              padding: "18px 44px",
              fontSize: "16px",
              fontWeight: 700,
              borderRadius: "18px",
              cursor: "pointer",
              boxShadow: "0 12px 35px rgba(201,162,77,0.4)",
            }}
          >
            Join the Winners Circle
          </button>
        </Link>

        <p
          style={{
            marginTop: "32px",
            fontSize: "14px",
            color: "#8a8a8a",
          }}
        >
          Gold (XAUUSD) only · Risk-managed execution · Limited onboarding
        </p>
      </div>
    </main>
  );
}
