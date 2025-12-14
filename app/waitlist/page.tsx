export default function WaitlistPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a1408 0%, #000 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "rgba(0,0,0,0.65)",
          border: "1px solid rgba(201,162,77,0.3)",
          borderRadius: "20px",
          padding: "48px 36px",
          textAlign: "center",
          boxShadow: "0 0 80px rgba(201,162,77,0.15)",
        }}
      >
        <h1 style={{ color: "#c9a24d", fontSize: "32px" }}>
          Winners Circle Access
        </h1>

        <p style={{ color: "#d6d6d6", marginBottom: "28px" }}>
          This is not a public product.
          <br />
          Access is granted to disciplined traders only.
        </p>

        <input placeholder="Full Name" style={inputStyle} />
        <input placeholder="Telegram Username" style={inputStyle} />
        <input placeholder="Estimated Capital ($)" style={inputStyle} />

        <button style={buttonStyle}>
          Request Invitation
        </button>

        <p style={{ marginTop: "24px", fontSize: "13px", color: "#999" }}>
          Applications are reviewed manually.
        </p>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "1px solid rgba(201,162,77,0.25)",
  background: "rgba(0,0,0,0.4)",
  color: "#ededed",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #c9a24d, #f2d58b)",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};
