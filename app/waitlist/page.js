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
          "radial-gradient(circle at top, rgba(201,162,77,0.15), #000 65%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(0,0,0,0.85)",
          borderRadius: "22px",
          padding: "36px 28px",
          border: "1px solid rgba(201,162,77,0.35)",
          boxShadow: "0 0 80px rgba(201,162,77,0.25)",
          textAlign: "center",
        }}
      >
        {!submitted ? (
          <>
            {/* TITLE */}
            <h1
              style={{
                color: "#c9a24d",
                fontSize: "28px",
                fontWeight: 900,
                marginBottom: "12px",
              }}
            >
              Join the Waitlist
            </h1>

            <p
              style={{
                color: "#d8d8d8",
                fontSize: "14px",
                lineHeight: 1.6,
                marginBottom: "26px",
              }}
            >
              Early access to a performance-based gold trading framework.
              <br />
              Limited onboarding. No subscriptions.
            </p>

            {/* FORM */}
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
                  borderRadius: "14px",
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
                  background:
                    "linear-gradient(135deg, #e3c87a, #c9a24d)",
                  color: "#0b0b0b",
                  border: "none",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 900,
                  borderRadius: "16px",
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
          </>
        ) : (
          <>
            {/* SUCCESS STATE */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                margin: "0 auto 18px",
                background:
                  "linear-gradient(135deg, #e3c87a, #c9a24d)",
                boxShadow: "0 0 30px rgba(201,162,77,0.6)",
              }}
            />

            <h2
              style={{
                color: "#c9a24d",
                fontSize: "22px",
                fontWeight: 900,
                marginBottom: "8px",
              }}
            >
              Welcome to the Winners Circle
            </h2>

            <p
              style={{
                color: "#d4d4d4",
                fontSize: "14px",
                lineHeight: 1.6,
                marginBottom: "18px",
              }}
            >
              You’ve taken the first step toward disciplined growth
              and elite execution.
            </p>

            {/* GOLD DIVIDER */}
            <div
              style={{
                width: "48px",
                height: "2px",
                background:
                  "linear-gradient(90deg, #e3c87a, #c9a24d)",
                margin: "0 auto 18px",
                borderRadius: "2px",
              }}
            />

            <p
              style={{
                color: "#bfae7a",
                fontSize: "13px",
                letterSpacing: "0.04em",
                marginBottom: "26px",
              }}
            >
              This is where patience compounds.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg, #e3c87a, #c9a24d)",
                color: "#0b0b0b",
                border: "none",
                padding: "14px",
                fontSize: "16px",
                fontWeight: 900,
                borderRadius: "16px",
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </>
        )}
      </div>
    </main>
  );
}
