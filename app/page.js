"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState("overview");
  const [vvipOpen, setVvipOpen] = useState(false);

  return (
    <main style={styles.body}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <span style={styles.logo}>Winners Circle</span>
        <button style={styles.menuBtn} onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      </div>

      {/* Side Menu */}
      {menuOpen && (
        <div style={styles.sideMenu}>
          <button style={styles.closeBtn} onClick={() => setMenuOpen(false)}>✕</button>
          {["overview", "how", "principles", "manifesto", "vvip"].map((s) => (
            <button
              key={s}
              style={styles.menuItem}
              onClick={() => {
                setSection(s);
                setMenuOpen(false);
              }}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* CONTENT */}
      <section style={styles.section}>
        {section === "overview" && (
          <>
            <h1 style={styles.h1}>Winners Circle University</h1>
            <p style={styles.text}>
              A performance-based gold trading framework combining structured AI modelling
              with disciplined human execution.
            </p>
            <button style={styles.primaryBtn}>Join the Waitlist</button>
          </>
        )}

        {section === "how" && (
          <>
            <h2 style={styles.h2}>How It Works</h2>
            <div style={styles.card}>
              <h3 style={styles.gold}>Read Structure</h3>
              <p style={styles.text}>We react to price, not predictions.</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.gold}>Risk First</h3>
              <p style={styles.text}>Capital protection is non-negotiable.</p>
            </div>
          </>
        )}

        {section === "principles" && (
          <>
            <h2 style={styles.h2}>Our Principles</h2>
            {[
              "Discipline over dopamine.",
              "Risk before reward.",
              "Process over outcomes.",
              "Patience compounds.",
              "Consistency creates inevitability."
            ].map((p) => (
              <p key={p} style={styles.text}>{p}</p>
            ))}
          </>
        )}

        {section === "manifesto" && (
          <>
            <h2 style={styles.h2}>Founder’s Manifesto</h2>
            <p style={styles.text}>
              Winners Circle was not built for excitement.  
              It was built for longevity.
            </p>
            <p style={styles.text}>
              I’ve seen what impatience does to talented people.
              I’ve seen discipline quietly outperform brilliance.
            </p>
            <p style={styles.text}>
              This framework exists to remove noise, emotion, and ego —
              and replace them with structure, risk awareness, and clarity.
            </p>
            <p style={styles.text}>
              If you’re here to rush, impress, or gamble — this won’t work.  
              If you’re here to compound patiently — you’re in the right place.
            </p>
            <p style={styles.signature}>— Lelefx, Founder</p>
          </>
        )}

        {section === "vvip" && (
          <>
            <h2 style={styles.h2}>VVIP Access</h2>
            <p style={styles.text}>
              VVIP is not purchased.  
              It is earned through consistency, discipline, and alignment.
            </p>
            <button style={styles.vvipBtn} onClick={() => setVvipOpen(true)}>
              Request VVIP Access
            </button>
          </>
        )}
      </section>

      {/* VVIP MODAL */}
      {vvipOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.gold}>VVIP Circle</h3>
            <p style={styles.text}>
              Access is extended privately to a small number of traders
              operating at six-figure+ discipline and mindset.
            </p>
            <p style={styles.text}>
              If alignment exists — you will be contacted.
            </p>
            <button style={styles.primaryBtn} onClick={() => setVvipOpen(false)}>
              Understood
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* STYLES */
const styles = {
  body: {
    background: "radial-gradient(circle at top, #2a1f0f, #000)",
    minHeight: "100vh",
    color: "#e6e6e6",
    fontFamily: "system-ui",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
  },
  logo: { color: "#d4af37", fontWeight: 700 },
  menuBtn: {
    fontSize: "22px",
    background: "none",
    color: "#d4af37",
    border: "none",
  },
  sideMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "70%",
    height: "100%",
    background: "#0b0b0b",
    padding: "20px",
    zIndex: 10,
  },
  closeBtn: {
    background: "none",
    color: "#d4af37",
    border: "none",
    fontSize: "20px",
    marginBottom: "20px",
  },
  menuItem: {
    display: "block",
    width: "100%",
    padding: "14px",
    background: "none",
    border: "1px solid #2a1f0f",
    color: "#d4af37",
    marginBottom: "10px",
  },
  section: { padding: "40px 20px", textAlign: "center" },
  h1: { color: "#d4af37", fontSize: "32px" },
  h2: { color: "#d4af37", fontSize: "26px", marginBottom: "20px" },
  text: { fontSize: "15px", lineHeight: 1.6, marginBottom: "14px" },
  gold: { color: "#d4af37" },
  card: {
    border: "1px solid #2a1f0f",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "16px",
    background: "rgba(0,0,0,0.6)",
  },
  primaryBtn: {
    background: "#d4af37",
    color: "#000",
    border: "none",
    padding: "14px 24px",
    borderRadius: "30px",
    fontWeight: 600,
    marginTop: "20px",
  },
  vvipBtn: {
    background: "linear-gradient(135deg,#d4af37,#8f6b1f)",
    color: "#000",
    border: "none",
    padding: "16px 26px",
    borderRadius: "30px",
    fontWeight: 700,
    marginTop: "24px",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#0b0b0b",
    border: "1px solid #2a1f0f",
    borderRadius: "20px",
    padding: "30px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
  signature: {
    color: "#d4af37",
    marginTop: "20px",
    fontStyle: "italic",
  },
};
