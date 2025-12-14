"use client";

import Link from "next/link";

export default function WaitlistPage() {
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
          maxWidth: "520px",
          width: "100%",
          background: "rgba(0,0,0,0.75)",
          border: "1px solid rgba(201,162,77,0.35)",
          borderRadius: "20px",
          padding: "48px 36px",
          textAlign: "center",
          boxShadow: "0 0 80px rgba(201,162,77,0.25)",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 900,
            color: "#c9a24d",
            marginBottom: "14px",
          }}
        >
          Join the Waitlist
        </h1>

        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#e5e5e5",
            marginBottom: "26px",
          }}
        >
          Early access to a performance-based gold trading framework.
          <br />
          Limited onboarding. No subscriptions.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("✅ You're on the list. We'll be in touch.");
          }}
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid rgba(201,162,77,0.4)",
              background: "#0b0b0b",
              color: "#ededed",
              marginBottom: "14px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #e3c87a, #c9a24d)",
              color: "#0b0b0b",
              border: "none",
              padding: "14px",
              fontSize: "16px",
              fontWeight: 900,
              borderRadius: "14px",
              cursor: "pointer",
            }}
          >
            Join Waitlist
          </button>
        </form>

        <div style={{ marginTop: "18px" }}>
          <Link
            href="/"
            style={{
              color: "#bdbdbd",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
