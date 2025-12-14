export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
        gap: "24px",
      }}
    >
      <h1 style={{ fontSize: "3rem", maxWidth: "900px" }}>
        Winners Circle University
      </h1>

      <p style={{ maxWidth: "720px", fontSize: "1.1rem", lineHeight: "1.7" }}>
        A performance-based gold trading framework combining advanced AI
        modelling with disciplined human market execution.
      </p>

      <p style={{ maxWidth: "720px", fontSize: "1.05rem", opacity: 0.9 }}>
        No subscriptions. No upfront fees.  
        We only earn when you earn — a simple 30% performance share.
      </p>

      <div style={{ marginTop: "20px" }}>
        <a
          href="https://t.me/freewinnercircle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Join the Winners Circle</button>
        </a>
      </div>

      <p style={{ marginTop: "30px", fontSize: "0.9rem", opacity: 0.7 }}>
        Gold (XAUUSD) only • Risk-managed execution • Limited onboarding
      </p>
    </main>
  );
}
