"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";

export default function ClientPortal() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [deposit, setDeposit] = useState("");
  const [balance, setBalance] = useState("");

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Motivational quote rotation
  const quotes = useMemo(
    () => [
      "Discipline pays what motivation never can.",
      "One clean setup beats ten emotional trades.",
      "Protect capital first. Profits follow.",
      "Consistency is a flex no one sees… until they do.",
      "Slow money is strong money.",
      "Execute the plan. Ignore the noise.",
      "You don’t need more trades. You need better trades.",
      "Patience is the edge.",
    ],
    []
  );
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 9000);
    return () => clearInterval(t);
  }, [quotes.length]);

  // Load session + stats
  useEffect(() => {
    const run = async () => {
      setMsg("");
      const { data } = await supabase.auth.getSession();
      const u = data?.session?.user;

      if (!u) {
        router.push("/login");
        return;
      }

      setUserEmail(u.email || "");
      setUserId(u.id);

      // Fetch existing stats
      const { data: row, error } = await supabase
        .from("client_stats")
        .select("deposit,current_balance,updated_at")
        .eq("user_id", u.id)
        .maybeSingle();

      if (error) {
        setMsg(error.message);
      } else if (row) {
        setDeposit(String(row.deposit ?? 0));
        setBalance(String(row.current_balance ?? 0));
      } else {
        // no row yet: keep empty and let user save first time
        setDeposit("");
        setBalance("");
      }

      setChecking(false);
    };

    run();
  }, [router]);

  const d = Number(deposit || 0);
  const b = Number(balance || 0);
  const pnl = b - d;

  const commission = pnl > 0 ? pnl * 0.3 : 0;
  const clientShare = pnl > 0 ? pnl * 0.7 : pnl; // if losing, user holds the loss

  const fmt = (n) =>
    (Number.isFinite(n) ? n : 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const save = async () => {
    setMsg("");
    setSaving(true);

    try {
      if (!userId) throw new Error("Missing user ID.");

      const dep = Number(deposit || 0);
      const bal = Number(balance || 0);

      if (!Number.isFinite(dep) || !Number.isFinite(bal)) {
        throw new Error("Please enter valid numbers.");
      }
      if (dep < 0 || bal < 0) {
        throw new Error("Deposit and balance cannot be negative.");
      }

      const { error } = await supabase.from("client_stats").upsert(
        {
          user_id: userId,
          deposit: dep,
          current_balance: bal,
        },
        { onConflict: "user_id" }
      );

      if (error) throw error;

      setMsg("Saved ✅");
    } catch (e) {
      setMsg(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "radial-gradient(circle at top, #2a1f0f, #000)",
          color: "#f7f0da",
          fontWeight: 800,
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <div className="wrap">
      <header className="topBar">
        <a href="/" className="backLink">
          <img src="/emblem.jpg" alt="Winners Circle University" className="logoImg" />
          <span>Back to main site</span>
        </a>

        <div className="rightSide">
          <div className="userTag" title={userEmail}>{userEmail}</div>
          <button className="logoutBtn" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="main">
        <section className="card">
          <div className="cardTop">
            <h1 className="title">Client Portal</h1>
            <div className="quote">“{quotes[quoteIndex]}”</div>
          </div>

          <p className="lead">
            For now, this dashboard is <b>manual</b>. You enter your deposit + current balance,
            and we calculate P/L and the 30% split. EA automation comes next.
          </p>

          <div className="formGrid">
            <div className="field">
              <label>Deposit (£)</label>
              <input
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                inputMode="decimal"
                placeholder="e.g. 500"
              />
            </div>

            <div className="field">
              <label>Current Balance (£)</label>
              <input
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                inputMode="decimal"
                placeholder="e.g. 642"
              />
            </div>

            <button className="saveBtn" type="button" onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>

          {msg && <div className="msg">{msg}</div>}
        </section>

        <section className="card">
          <h2 className="sectionTitle">Performance</h2>

          <div className="grid3">
            <div className="stat">
              <div className="k">Deposit</div>
              <div className="v">£{fmt(d)}</div>
            </div>

            <div className="stat">
              <div className="k">Current Balance</div>
              <div className="v">£{fmt(b)}</div>
            </div>

            <div className="stat">
              <div className="k">P/L</div>
              <div className={`v ${pnl >= 0 ? "pos" : "neg"}`}>
                {pnl >= 0 ? "+" : "-"}£{fmt(Math.abs(pnl))}
              </div>
            </div>
          </div>

          <div className="splitCard">
            <div className="splitHead">Profit Split (70/30)</div>

            <div className="splitGrid">
              <div className="splitBox">
                <div className="k">Your share</div>
                <div className={`v ${clientShare >= 0 ? "pos" : "neg"}`}>
                  {clientShare >= 0 ? "+" : "-"}£{fmt(Math.abs(clientShare))}
                </div>
              </div>

              <div className="splitBox">
                <div className="k">Winners Circle 30%</div>
                <div className="v">£{fmt(commission)}</div>
                <div className="note">
                  {pnl > 0
                    ? "Only charged on profit."
                    : "No commission on losses."}
                </div>
              </div>
            </div>
          </div>
        </section>

        <p className="disclaimer">
          Not financial advice. This is a tracking dashboard. Final settlement is confirmed per cycle.
        </p>
      </main>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #2a1f0f, #000);
          color: #f7f0da;
          padding: 18px 14px 40px;
        }
        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .backLink {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #f7f0da;
          font-size: 14px;
        }
        .logoImg {
          height: 36px;
          width: 36px;
          border-radius: 12px;
          box-shadow: 0 0 22px rgba(230, 195, 106, 0.35);
        }
        .rightSide {
          display: inline-flex;
          gap: 10px;
          align-items: center;
        }
        .userTag {
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.28);
          background: rgba(0, 0, 0, 0.55);
          color: #ffe29b;
          font-weight: 900;
          font-size: 12px;
          max-width: 260px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .logoutBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.35);
          color: #e6c36a;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 900;
          cursor: pointer;
        }

        .main {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          gap: 16px;
        }
        .card {
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.28);
          background: radial-gradient(circle at top left, rgba(230, 195, 106, 0.12), rgba(0, 0, 0, 0.92));
          padding: 18px 16px;
          box-shadow: 0 0 70px rgba(0, 0, 0, 0.6);
        }
        .cardTop {
          display: grid;
          gap: 6px;
        }
        .title {
          margin: 0;
          color: #e6c36a;
          font-size: 26px;
        }
        .quote {
          color: #d8d2b6;
          font-size: 13px;
          line-height: 1.6;
          opacity: 0.95;
        }
        .lead {
          margin: 10px 0 0;
          color: #d8d2b6;
          font-size: 13px;
          line-height: 1.7;
        }

        .formGrid {
          margin-top: 14px;
          display: grid;
          gap: 10px;
        }
        @media (min-width: 820px) {
          .formGrid {
            grid-template-columns: 1fr 1fr auto;
            align-items: end;
          }
        }
        .field label {
          display: block;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #cbb68a;
          margin-bottom: 6px;
        }
        .field input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid rgba(230, 195, 106, 0.25);
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          outline: none;
          font-size: 14px;
        }
        .field input:focus {
          border-color: rgba(230, 195, 106, 0.55);
          box-shadow: 0 0 0 3px rgba(230, 195, 106, 0.14);
        }
        .saveBtn {
          border: none;
          border-radius: 999px;
          padding: 12px 18px;
          font-weight: 900;
          cursor: pointer;
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #000;
          white-space: nowrap;
        }
        .saveBtn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .msg {
          margin-top: 10px;
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.55);
          color: #f7f0da;
          font-size: 13px;
          line-height: 1.6;
        }

        .sectionTitle {
          margin: 0 0 12px;
          color: #e6c36a;
          font-size: 18px;
        }
        .grid3 {
          display: grid;
          gap: 10px;
        }
        @media (min-width: 860px) {
          .grid3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .stat {
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.18);
          background: rgba(230, 195, 106, 0.06);
          padding: 14px;
        }
        .k {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #cbb68a;
        }
        .v {
          margin-top: 8px;
          font-size: 22px;
          font-weight: 900;
          color: #ffe29b;
        }
        .pos { color: #7bff9a; }
        .neg { color: #ff8d8d; }

        .splitCard {
          margin-top: 14px;
          border-radius: 20px;
          border: 1px solid rgba(230, 195, 106, 0.2);
          background: rgba(0,0,0,0.45);
          padding: 14px;
        }
        .splitHead {
          color: #ffe29b;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 12px;
          margin-bottom: 10px;
        }
        .splitGrid {
          display: grid;
          gap: 10px;
        }
        @media (min-width: 740px) {
          .splitGrid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .splitBox {
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.16);
          background: rgba(230, 195, 106, 0.05);
          padding: 14px;
        }
        .note {
          margin-top: 6px;
          font-size: 12px;
          color: #cbbfa5;
          line-height: 1.6;
        }

        .disclaimer {
          margin: 8px 0 0;
          color: #a99b7c;
          font-size: 11px;
          line-height: 1.7;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
