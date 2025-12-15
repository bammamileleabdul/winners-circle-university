"use client";

import { useState } from "react";

export default function Page() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <img
          src="/emblem.png.jpg"
          alt="Winners Circle Emblem"
          className="headerLogo"
        />
      </header>

      {/* HERO */}
      <section className="hero">
        {/* Faded Background Emblem */}
        <img
          src="/emblem.png.jpg"
          alt=""
          className="heroEmblem"
        />

        <div className="pill">EARLY ACCESS · LIMITED ONBOARDING</div>

        <h1>Winners Circle University</h1>

        <p className="heroText">
          A performance-based gold trading framework combining structured AI
          modelling with disciplined human execution.
        </p>

        {/* WAITLIST FORM */}
        <form
          className="waitlistForm"
          action="https://formspree.io/f/xpwveaza"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;

            fetch(form.action, {
              method: "POST",
              body: new FormData(form),
              headers: { Accept: "application/json" },
            }).then(() => {
              form.reset();
              setShowSuccess(true);
            });
          }}
        >
          <input
            className="waitlistInput"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <button className="goldBtn" type="submit">
            Join the Waitlist
          </button>
        </form>
      </section>

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div className="successOverlay">
          <div className="successCard">
            <div className="successAccent" />
            <h3>You’re in.</h3>
            <p>
              Winners Circle moves with precision.
              <br />
              Updates will arrive shortly.
            </p>
            <button className="ghostBtn" onClick={() => setShowSuccess(false)}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        body {
          margin: 0;
        }

        /* HEADER */
        .header {
          position: fixed;
          top: 18px;
          right: 18px;
          z-index: 50;
        }

        .headerLogo {
          width: 46px;
          opacity: 0.9;
        }

        /* HERO */
        .hero {
          position: relative;
          min-height: 100vh;
          padding: 100px 20px;
          text-align: center;
          background: radial-gradient(circle at top, #1a1408, #000);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .heroEmblem {
          position: absolute;
          width: 520px;
          opacity: 0.05;
          filter: blur(1px);
          pointer-events: none;
        }

        .pill {
          border: 1px solid rgba(230, 195, 106, 0.35);
          color: #e6c36a;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.14em;
          margin-bottom: 22px;
          z-index: 2;
        }

        h1 {
          color: #e6c36a;
          font-size: 42px;
          font-weight: 900;
          margin-bottom: 18px;
          line-height: 1.1;
          z-index: 2;
        }

        .heroText {
          color: #d6d6d6;
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 32px;
          font-size: 15px;
          z-index: 2;
        }

        .waitlistForm {
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 2;
        }

        .waitlistInput {
          padding: 15px 18px;
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.4);
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          font-size: 15px;
          outline: none;
        }

        .goldBtn {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 14px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 15px;
          color: #000;
          cursor: pointer;
        }

        /* SUCCESS OVERLAY */
        .successOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .successCard {
          position: relative;
          max-width: 420px;
          width: 90%;
          background: linear-gradient(
            180deg,
            rgba(230, 195, 106, 0.08),
            rgba(0, 0, 0, 0.95)
          );
          border: 1px solid rgba(230, 195, 106, 0.45);
          border-radius: 26px;
          padding: 36px 28px;
          text-align: center;
          box-shadow: 0 0 90px rgba(230, 195, 106, 0.28);
        }

        .successAccent {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 3px;
          background: linear-gradient(90deg, #e6c36a, #b8963f);
          border-radius: 999px;
        }

        .successCard h3 {
          color: #e6c36a;
          font-size: 26px;
          font-weight: 900;
          margin-bottom: 14px;
        }

        .successCard p {
          color: #d8d2b6;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 26px;
        }

        .ghostBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.4);
          color: #e6c36a;
          padding: 12px 20px;
          border-radius: 999px;
          font-weight: 800;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
