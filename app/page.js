import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(201,162,77,0.15), #000 55%)",
        color: "#e5e5e5",
        paddingBottom: "120px",
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "90px 20px 60px",
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
            letterSpacing: "0.14em",
            marginBottom: "24px",
          }}
        >
          EARLY ACCESS · LIMITED ONBOARDING
        </div>

        <h1
          style={{
            fontSize: "46px",
            fontWeight: 900,
            color: "#c9a24d",
            lineHeight: 1.1,
            marginBottom: "22px",
          }}
        >
          Winners Circle
          <br />
          University
        </h1>

        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#d0d0d0",
            marginBottom: "16px",
          }}
        >
          A performance-based gold trading framework combining advanced AI
          modelling with disciplined human market execution.
        </p>

        <p
          style={{
            fontSize: "15px",
            color: "#9a9a9a",
            marginBottom: "36px",
          }}
        >
          No subscriptions. No upfront fees. We only earn when you earn — a simple
          30% performance share.
        </p>

        <Link
          href="/waitlist"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #e3c87a, #c9a24d)",
            color: "#0b0b0b",
            padding: "16px 28px",
            fontSize: "16px",
            fontWeight: 900,
            borderRadius: "16px",
            textDecoration: "none",
            minWidth: "260px",
          }}
        >
          Join the Waitlist
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ marginTop: "80px", padding: "0 20px" }}>
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
            gap: "16px",
            overflowX: "auto",
            paddingBottom: "10px",
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
                "Capital protection is non-negotiable. Risk is defined before entry.",
            },
            {
              title: "Execution",
              text:
                "Only high-probability setups aligned with higher-timeframe bias.",
            },
            {
              title: "Review",
              text:
                "Every trade is reviewed. Process is refined. Emotions are removed.",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                minWidth: "260px",
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(201,162,77,0.35)",
                borderRadius: "22px",
                padding: "26px",
                boxShadow: "0 0 60px rgba(201,162,77,0.12)",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#c9a24d",
                  marginBottom: "10px",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#cfcfcf",
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
            fontSize: "13px",
            color: "#777",
            marginTop: "14px",
          }}
        >
          Swipe to explore →
        </p>
      </section>

      {/* OUR PRINCIPLES */}
      <section
        style={{
          marginTop: "100px",
          padding: "0 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            background: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(201,162,77,0.35)",
            borderRadius: "28px",
            padding: "50px 28px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 900,
              color: "#c9a24d",
              marginBottom: "16px",
            }}
          >
            Our Principles
          </h2>

          <div
            style={{
              width: "60px",
              height: "2px",
              background: "#c9a24d",
              margin: "0 auto 26px",
            }}
          />

          {[
            "Discipline over dopamine.",
            "Risk before reward.",
            "Process over outcomes.",
            "Patience compounds.",
            "Consistency creates inevitability.",
          ].map((line) => (
            <p
              key={line}
              style={{
                fontSize: "16px",
                margin: "10px 0",
                color: "#dcdcdc",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* THE PATH */}
      <section
        style={{
          marginTop: "110px",
          padding: "0 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(12,10,5,0.95))",
            border: "1px solid rgba(201,162,77,0.35)",
            borderRadius: "28px",
            padding: "60px 28px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "34px",
              fontWeight: 900,
              color: "#c9a24d",
              marginBottom: "10px",
            }}
          >
            The Path
          </h2>

          <p
            style={{
              textAlign: "center",
              fontSize: "15px",
              color: "#bdbdbd",
              marginBottom: "40px",
            }}
          >
            A system built for longevity — not lucky streaks.
          </p>

          {[
            ["01", "Observe", "We study structure. We wait. No impulse."],
            [
              "02",
              "Prepare",
              "Risk is defined first. Capital is protected.",
            ],
            [
              "03",
              "Execute",
              "Only high-probability setups aligned with bias.",
            ],
            ["04", "Review", "Process audited. Emotion removed."],
            ["05", "Compound", "Consistency creates inevitability."],
          ].map(([num, title, text]) => (
            <div
              key={num}
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "18px",
                background: "rgba(0,0,0,0.55)",
                padding: "18px 20px",
                borderRadius: "18px",
                border: "1px solid rgba(201,162,77,0.25)",
              }}
            >
              <div
                style={{
                  minWidth: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #e3c87a, #c9a24d)",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                }}
              >
                {num}
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#e5e5e5",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "14px",
                    color: "#bdbdbd",
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          ))}

          <p
            style={{
              marginTop: "30px",
              textAlign: "center",
              fontSize: "14px",
              color: "#9a9a9a",
            }}
          >
            This path rewards patience — not urgency.
          </p>
        </div>
      </section>
    </main>
  );
}
