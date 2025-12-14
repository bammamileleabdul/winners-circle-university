export default function WaitlistPage() {
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
          maxWidth: "520px",
          width: "100%",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(201,162,77,0.35)",
          borderRadius: "24px",
          padding: "48px 36px",
          textAlign: "center",
          boxShadow: "0 0 90px rgba(201,162,77,0.2)",
        }}
      >
        <h1
          style={{
            color: "#c9a24d",
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          Winners Circle Waitlist
        </h1>

        <p style={{ fontSize: "16px", lineHeight: 1.6, marginBottom: "32px" }}>
          We onboard selectively.  
          This is not signals. This is execution alignment.
        </p>

        <input
          type="email"
          placeholder="Your email address"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid rgba(201,162,77,0.4)",
            background: "#0b0b0b",
            color: "#ededed",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        />

        <button style={{ width: "100%" }}>Request Access</button>

        <p
          style={{
            marginTop: "24px",
            fontSize: "13px",
            opacity: 0.65,
          }}
        >
          If approved, onboarding begins immediately once live.
        </p>
      </div>
    </main>
  );
}
