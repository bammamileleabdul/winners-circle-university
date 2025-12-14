"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at top, #1a1405 0%, #0b0b0b 65%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* MAIN CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(0,0,0,0.82)",
          borderRadius: "22px",
          padding: "42px 28px",
          textAlign: "center",
          border: "1px solid rgba(201,162,77,0.35)",
          boxShadow: "0 0 80px rgba(201,162,77,0.25)",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 900,
            color: "#c9a24d",
            marginBottom: "12px",
          }}
        >
          Join the Waitlist
        </h1>

        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.6,
            color: "#e5e5e5",
            marginBottom: "28px",
          }}
        >
          Early access to a performance-based gold trading framework.
          <br />
          Limited onboarding. No subscriptions.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
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
              fontSize: "15px",
              marginBottom: "16px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, #e3c87a, #c9a24d)",
              color: "#0b0b0b",
              fontWeight: 900,
              fontSize: "16px",
              border: "none",
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
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>

      {/* SLIDE-IN SUCCESS CARD */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          bottom: submitted ? "24px" : "-260px",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "380px",
          background:
            "linear-gradient(180deg, #1a1405, #0b0b0b)",
          borderRadius: "22px",
          padding: "26px",
          textAlign: "center",
          border: "1px solid rgba(201,162,77,0.45)",
          boxShadow: "0 15px 60px rgba(201,162,77,0.45)",
          transition: "bottom 0.45s ease",
          zIndex: 999,
        }}
      >
        <div
          style={{
            fontSize: "26px",
            marginBottom: "10px",
          }}
        >
          🟡
        </div>

        <h3
          style={{
            color: "#c9a24d",
            fontSize: "18px",
            fontWeight: 900,
            marginBottom: "6px",
          }}
        >
          You’re In
        </h3>

        <p
          style={{
            color: "#e5e5e5",
            fontSize: "14px",
            lineHeight: 1.5,
            marginBottom: "18px",
          }}
        >
          Your request has been received.
          <br />
          We’ll be in touch shortly.
        </p>

        <button
          onClick={() => setSubmitted(false)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, #e3c87a, #c9a24d)",
            color: "#0b0b0b",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
          }}
        >
          Done
        </button>
      </div>
    </main>
  );
}
