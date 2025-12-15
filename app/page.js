import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(201,162,77,0.15), #000 60%)",
        padding: "40px 18px",
        color: "#e6e6e6",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* HERO */}
      <section style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid rgba(201,162,77,0.4)",
            color: "#c9a24d",
            fontSize: 12,
            letterSpacing: "0.12em",
            marginBottom: 24,
          }}
        >
          EARLY ACCESS • LIMITED ONBOARDING
        </div>

        <h1
          style={{
            fontSize: 46,
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#d6b25e",
            marginBottom: 22,
          }}
        >
          Winners Circle
          <br />
          University
        </h1>

        <p
          style={{
            maxWidth: 720,
            margin: "0 auto",
            fontSize: 17,
            lineHeight: 1.7,
            color: "#cfcfcf",
          }}
        >
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p
          style={{
            marginTop: 14,
            fontSize: 15,
            color: "#9f9f9f",
          }}
        >
          No subscriptions. No upfront fees. We only earn when you earn — a simple
          30% performance share.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/waitlist"
            style={{
              background:
                "linear-gradient(135deg, #e7c873, #c9a24d)",
              color: "#0b0b0b",
              padding: "14px 26px",
              borderRadius: 14,
              fontWeight: 800,
              textDecoration: "none",
              minWidth: 220,
              textAlign: "center",
            }}
          >
            Join the Waitlist
          </Link>

          <a
            href="#how"
            style={{
              border: "1px solid rgba(201,162,77,0.45)",
              color: "#e6e6e6",
              padding: "14px 26px",
              borderRadius: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        style={{
          maxWidth: 1000,
          margin: "80px auto 0",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#d6b25e", fontSize: 32, marginBottom: 32 }}>
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            gap: 18,
            overflowX: "auto",
            paddingBottom: 10,
          }}
        >
          {[
            {
              title: "Read Structure",
              text:
                "We don’t predict markets. We read price and react with precision.",
            },
            {
              title: "Risk First",
              text:
                "Capital preservation is non-negotiable. Risk is defined before reward.",
            },
            {
              title: "Systemized Execution",
              text:
                "Decisions are rule-based, repeatable, and free from emotion.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                minWidth: 260,
                background: "rgba(0,0,0,0.75)",
                border: "1px solid rgba(201,162,77,0.35)",
                borderRadius: 22,
                padding: 26,
                boxShadow: "0 0 40px rgba(201,162,77,0.15)",
              }}
            >
              <h3 style={{ color: "#c9a24d", marginBottom: 10 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section
        style={{
          maxWidth: 800,
          margin: "90px auto 0",
          textAlign: "center",
          background: "rgba(0,0,0,0.75)",
          border: "1px solid rgba(201,162,77,0.35)",
          borderRadius: 26,
          padding: "50px 30px",
        }}
      >
        <h2 style={{ color: "#d6b25e", marginBottom: 26 }}>
          Our Principles
        </h2>

        {[
          "Discipline over dopamine.",
          "Risk before reward.",
          "Process over outcomes.",
          "Patience compounds.",
          "Consistency creates inevitability.",
        ].map((p) => (
          <p
            key={p}
            style={{
              fontSize: 16,
              marginBottom: 14,
              color: "#d0c6a0",
            }}
          >
            {p}
          </p>
        ))}
      </section>

      {/* FOUNDER */}
      <section
        style={{
          maxWidth: 820,
          margin: "90px auto 0",
          background: "rgba(0,0,0,0.75)",
          border: "1px solid rgba(201,162,77,0.35)",
          borderRadius: 26,
          padding: "50px 34px",
        }}
      >
        <h2 style={{ color: "#d6b25e", marginBottom: 18 }}>
          The Founder’s Manifesto
        </h2>

        <p style={{ lineHeight: 1.7, marginBottom: 14 }}>
          Winners Circle was not built for excitement. It was built for
          longevity.
        </p>

        <p style={{ lineHeight: 1.7, marginBottom: 14 }}>
          I’ve seen what impatience does to talented people. I’ve seen discipline
          quietly outperform brilliance.
        </p>

        <p style={{ lineHeight: 1.7, marginBottom: 14 }}>
          This framework exists to remove noise, emotion, and ego — and replace
          them with structure, risk awareness, and clarity.
        </p>

        <p style={{ lineHeight: 1.7 }}>
          If you’re here to rush, impress, or gamble — this won’t work. If you’re
          here to compound patiently — you’re in the right place.
        </p>

        <p style={{ marginTop: 22, color: "#c9a24d" }}>
          — Lelefx, Founder • Winners Circle
        </p>
      </section>

      {/* VVIP */}
      <section
        style={{
          maxWidth: 800,
          margin: "90px auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#d6b25e", marginBottom: 22 }}>
          VVIP Access
        </h2>

        <p style={{ maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
          VVIP is not purchased. It is earned.
          <br />
          Access is extended privately to individuals who demonstrate discipline,
          consistency, and respect for risk over time.
        </p>

        <p
          style={{
            marginTop: 16,
            color: "#a9a9a9",
            fontSize: 14,
          }}
        >
          Some members may be contacted discreetly.
        </p>
      </section>
    </main>
  );
}
