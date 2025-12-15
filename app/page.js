"use client";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a1408 0%, #000 55%)",
        color: "#fff",
        fontFamily: "Inter, system-ui, sans-serif",
        paddingBottom: "120px",
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "120px 20px 80px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(201,162,77,0.4)",
            color: "#c9a24d",
            fontSize: "12px",
            marginBottom: "24px",
          }}
        >
          EARLY ACCESS • LIMITED ONBOARDING
        </div>

        <h1
          style={{
            fontSize: "44px",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#c9a24d",
          }}
        >
          Winners Circle University
        </h1>

        <p
          style={{
            marginTop: "22px",
            fontSize: "16px",
            color: "#d0d0d0",
            lineHeight: 1.7,
          }}
        >
          A performance-based gold trading framework combining disciplined
          human execution with structured market logic.
        </p>

        <p
          style={{
            marginTop: "12px",
            fontSize: "14px",
            color: "#a0a0a0",
          }}
        >
          No subscriptions. No upfront fees.  
          We earn only when you earn — a simple 30% performance share.
        </p>

        <button
          style={{
            marginTop: "36px",
            padding: "18px 34px",
            fontSize: "16px",
            fontWeight: 700,
            borderRadius: "14px",
            background: "#c9a24d",
            color: "#000",
            border: "none",
          }}
        >
          Join the Waitlist
        </button>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: 900,
            color: "#c9a24d",
            marginBottom: "40px",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "10px",
          }}
        >
          {[
            {
              title: "Read Structure",
              text:
                "We don’t predict markets. We read price, structure, and liquidity with precision.",
            },
            {
              title: "Risk First",
              text:
                "Capital protection is non-negotiable. Risk defines every decision.",
            },
            {
              title: "Execution",
              text:
                "Entries are systematic. No impulse. No chasing.",
            },
            {
              title: "Review & Refine",
              text:
                "Every outcome is reviewed. Process always improves.",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                minWidth: "260px",
                background: "rgba(0,0,0,0.75)",
                border: "1px solid rgba(201,162,77,0.3)",
                borderRadius: "22px",
                padding: "26px",
              }}
            >
              <h3
                style={{
                  color: "#c9a24d",
                  fontSize: "20px",
                  fontWeight: 800,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "#d0d0d0",
                  lineHeight: 1.6,
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "16px",
            fontSize: "13px",
            color: "#888",
          }}
        >
          Swipe to explore →
        </p>
      </section>

      {/* THE PATH */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 900,
            color: "#c9a24d",
          }}
        >
          The Path
        </h2>

        <p
          style={{
            marginTop: "18px",
            maxWidth: "700px",
            marginInline: "auto",
            fontSize: "15px",
            color: "#cfcfcf",
            lineHeight: 1.7,
          }}
        >
          This is not fast money.  
          This is slow, controlled, professional growth.
        </p>
      </section>

      {/* PRINCIPLES */}
      <section
        style={{
          padding: "80px 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(201,162,77,0.4)",
            borderRadius: "30px",
            padding: "50px 30px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 900,
              color: "#c9a24d",
            }}
          >
            Our Principles
          </h2>

          <div
            style={{
              marginTop: "28px",
              display: "grid",
              gap: "14px",
              fontSize: "15px",
              color: "#e0e0e0",
            }}
          >
            <p>Discipline over dopamine.</p>
            <p>Risk before reward.</p>
            <p>Process over outcomes.</p>
            <p>Patience compounds.</p>
            <p>Consistency creates inevitability.</p>
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section
        style={{
          padding: "100px 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "1000px", width: "100%" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "34px",
              fontWeight: 900,
              color: "#c9a24d",
              marginBottom: "24px",
            }}
          >
            This Is Not For Everyone
          </h2>

          <div
            style={{
              display: "grid",
              gap: "22px",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(201,162,77,0.3)",
                borderRadius: "26px",
                padding: "34px",
              }}
            >
              <h3 style={{ color: "#ff6b6b", fontWeight: 800 }}>
                ❌ Not for you if:
              </h3>
              <p>• You want signals or shortcuts.</p>
              <p>• You chase excitement.</p>
              <p>• You ignore rules.</p>
              <p>• You blame outcomes.</p>
            </div>

            <div
              style={{
                border: "1px solid rgba(201,162,77,0.6)",
                borderRadius: "26px",
                padding: "34px",
                boxShadow: "0 0 50px rgba(201,162,77,0.2)",
              }}
            >
              <h3 style={{ color: "#c9a24d", fontWeight: 800 }}>
                ✔ For you if:
              </h3>
              <p>• You value discipline.</p>
              <p>• You respect risk.</p>
              <p>• You think long-term.</p>
              <p>• You want mastery.</p>
            </div>
          </div>

          <p
            style={{
              marginTop: "16px",
              textAlign: "center",
              fontSize: "13px",
              color: "#888",
            }}
          >
            If this made you uncomfortable — this probably isn’t your circle.
          </p>
        </div>
      </section>
    </main>
  );
}
