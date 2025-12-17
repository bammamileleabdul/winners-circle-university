"use client";

export default function HowPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "80px 18px 120px",
        background:
          "radial-gradient(circle at top, #2a1f0f, #000)",
        color: "#f5f1dd",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: "40px" }}>
        <p
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid rgba(230,195,106,0.35)",
            color: "#e6c36a",
            fontSize: 11,
            letterSpacing: "0.16em",
            marginBottom: 16,
          }}
        >
          HOW IT WORKS
        </p>

        <h1
          style={{
            fontSize: 28,
            marginBottom: 12,
            color: "#e6c36a",
          }}
        >
          How Winners Circle makes you money
        </h1>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: "#ddd3b4",
          }}
        >
          Simple split: <strong>you keep 70%</strong>,{" "}
          <strong>we take 30%</strong>. Our job is to protect capital,
          compound clean returns, and keep the whole process disciplined.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        <div
          style={{
            padding: 20,
            borderRadius: 18,
            border: "1px solid rgba(230,195,106,0.3)",
            background:
              "linear-gradient(180deg, rgba(230,195,106,0.08), rgba(0,0,0,0.9))",
          }}
        >
          <h2 style={{ color: "#e6c36a", fontSize: 18, marginBottom: 8 }}>
            1 · You fund the account
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#d8d2b6" }}>
            You bring the capital or pass a funded challenge. We treat that
            capital like a high–performance asset: protected first, then
            grown with structure.
          </p>
        </div>

        <div
          style={{
            padding: 20,
            borderRadius: 18,
            border: "1px solid rgba(230,195,106,0.3)",
            background:
              "linear-gradient(180deg, rgba(230,195,106,0.08), rgba(0,0,0,0.9))",
          }}
        >
          <h2 style={{ color: "#e6c36a", fontSize: 18, marginBottom: 8 }}>
            2 · We apply the risk engine
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#d8d2b6" }}>
            Every move respects the same logic:{" "}
            <strong>risk per trade ≈ capital ÷ 14</strong>. No random lot
            sizes. No gambling. Just repeatable structure on XAUUSD.
          </p>
        </div>

        <div
          style={{
            padding: 20,
            borderRadius: 18,
            border: "1px solid rgba(230,195,106,0.3)",
            background:
              "linear-gradient(180deg, rgba(230,195,106,0.08), rgba(0,0,0,0.9))",
          }}
        >
          <h2 style={{ color: "#e6c36a", fontSize: 18, marginBottom: 8 }}>
            3 · Profits are split 70 / 30
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#d8d2b6" }}>
            At the end of an agreed cycle (weekly / bi-weekly / monthly),
            we look at <strong>net profit</strong>:
          </p>
          <ul
            style={{
              marginTop: 8,
              paddingLeft: 18,
              fontSize: 14,
              color: "#d8d2b6",
              lineHeight: 1.7,
            }}
          >
            <li>
              <strong>70%</strong> goes to you – the capital owner.
            </li>
            <li>
              <strong>30%</strong> goes to Winners Circle – for strategy,
              execution and risk management.
            </li>
          </ul>
          <p
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#a99f80",
            }}
          >
            No profit = nothing to split. Our incentives stay aligned.
          </p>
        </div>

        <div
          style={{
            padding: 20,
            borderRadius: 18,
            border: "1px solid rgba(230,195,106,0.3)",
            background:
              "linear-gradient(180deg, rgba(230,195,106,0.08), rgba(0,0,0,0.9))",
          }}
        >
          <h2 style={{ color: "#e6c36a", fontSize: 18, marginBottom: 8 }}>
            4 · Where mini lelefx comes in
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#d8d2b6" }}>
            mini lelefx can simulate past TP / SL data, show what your
            capital could’ve done with our risk engine, and answer process
            questions – risk, compounding, discipline.
          </p>
          <p
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#a99f80",
            }}
          >
            Projections are examples, not guarantees. Process over prediction.
          </p>
        </div>
      </section>

      <section
        style={{
          marginTop: 40,
          textAlign: "center",
          fontSize: 14,
          color: "#c9c2a2",
        }}
      >
        <p>Ready to be considered for the Circle?</p>
        <a
          href="/#overview"
          style={{
            display: "inline-block",
            marginTop: 10,
            padding: "12px 20px",
            borderRadius: 999,
            background:
              "linear-gradient(135deg, #e6c36a, #b8963f)",
            color: "#000",
            fontWeight: 800,
            textDecoration: "none",
            boxShadow: "0 0 60px rgba(230,195,106,0.18)",
          }}
        >
          Go back & join the waitlist
        </a>
      </section>
    </main>
  );
}
