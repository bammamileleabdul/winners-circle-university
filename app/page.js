'use client';

import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <span style={styles.badge}>EARLY ACCESS · LIMITED ONBOARDING</span>

        <h1 style={styles.title}>Winners Circle University</h1>

        <p style={styles.subtitle}>
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p style={styles.subtext}>
          No subscriptions. No upfront fees.
          <br />
          We only earn when you earn — a simple 30% performance share.
        </p>

        <button style={styles.primaryButton}>
          Join the Waitlist
        </button>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>

        <div style={styles.slider}>
          {cards.map((card, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardText}>{card.text}</p>
            </div>
          ))}

          {/* FINAL GOLD CARD */}
          <div style={{ ...styles.card, ...styles.finalCard }}>
            <h3 style={styles.finalTitle}>Execution Is Earned</h3>
            <p style={styles.finalText}>
              We don’t sell certainty.
              <br />
              We build consistency.
            </p>
            <div style={styles.divider} />
            <p style={styles.finalSub}>
              This is where patience compounds.
            </p>
          </div>
        </div>

        <p style={styles.swipeHint}>Swipe to explore →</p>
      </section>

      {/* WAITLIST MODAL */}
      {submitted && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.goldDot} />

            <h2 style={styles.modalTitle}>
              Welcome to the Winners Circle
            </h2>

            <p style={styles.modalText}>
              You’ve taken the first step toward disciplined growth
              and elite execution.
            </p>

            <div style={styles.divider} />

            <p style={styles.modalSub}>
              This is where patience compounds.
            </p>

            <button
              style={styles.primaryButton}
              onClick={() => setSubmitted(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const cards = [
  {
    title: 'Read Structure',
    text: 'We don’t predict markets. We read price and react with precision.'
  },
  {
    title: 'Risk First',
    text: 'Capital preservation comes before profit. Always.'
  },
  {
    title: 'Execution Rules',
    text: 'Entries are earned through confirmation, not emotion.'
  },
  {
    title: 'XAUUSD Focus',
    text: 'One market. Deep understanding. No distractions.'
  }
];

const gold = '#e3c26f';

const styles = {
  page: {
    background: 'radial-gradient(circle at top, #1a1408, #000)',
    minHeight: '100vh',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont'
  },

  hero: {
    padding: '80px 20px',
    textAlign: 'center',
    maxWidth: 720,
    margin: '0 auto'
  },

  badge: {
    display: 'inline-block',
    padding: '8px 16px',
    border: `1px solid ${gold}`,
    borderRadius: 999,
    color: gold,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 24
  },

  title: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 20,
    color: gold
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 1.6,
    opacity: 0.9,
    marginBottom: 16
  },

  subtext: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 32
  },

  primaryButton: {
    background: gold,
    color: '#000',
    border: 'none',
    padding: '16px 28px',
    borderRadius: 999,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer'
  },

  howItWorks: {
    padding: '60px 0 80px'
  },

  sectionTitle: {
    textAlign: 'center',
    fontSize: 28,
    color: gold,
    marginBottom: 32
  },

  slider: {
    display: 'flex',
    gap: 16,
    overflowX: 'auto',
    padding: '0 20px',
    scrollSnapType: 'x mandatory'
  },

  card: {
    minWidth: 260,
    padding: 24,
    borderRadius: 20,
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid rgba(227,194,111,0.25)',
    scrollSnapAlign: 'start',
    boxShadow: '0 0 30px rgba(227,194,111,0.1)'
  },

  cardTitle: {
    color: gold,
    fontSize: 18,
    marginBottom: 12
  },

  cardText: {
    fontSize: 14,
    opacity: 0.85,
    lineHeight: 1.5
  },

  finalCard: {
    border: `1px solid ${gold}`,
    boxShadow: `0 0 40px rgba(227,194,111,0.35)`
  },

  finalTitle: {
    color: gold,
    fontSize: 20,
    marginBottom: 12
  },

  finalText: {
    fontSize: 15,
    opacity: 0.9,
    marginBottom: 16
  },

  divider: {
    width: 40,
    height: 2,
    background: gold,
    margin: '12px auto'
  },

  finalSub: {
    fontSize: 13,
    opacity: 0.75,
    textAlign: 'center'
  },

  swipeHint: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 12,
    opacity: 0.6
  },

  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  modal: {
    background: '#000',
    borderRadius: 24,
    padding: 32,
    maxWidth: 360,
    width: '100%',
    textAlign: 'center',
    border: `1px solid ${gold}`,
    boxShadow: `0 0 50px rgba(227,194,111,0.4)`
  },

  goldDot: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: gold,
    margin: '0 auto 16px'
  },

  modalTitle: {
    color: gold,
    fontSize: 22,
    marginBottom: 12
  },

  modalText: {
    fontSize: 14,
    opacity: 0.9
  },

  modalSub: {
    fontSize: 13,
    opacity: 0.75,
    marginBottom: 24
  }
};
