"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";

export default function ClientPortal() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState("");

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
      "Patience is the edge.",
      "Consistency compounds.",
      "Execute the plan. Ignore the noise.",
      "Quality beats activity.",
      "Slow money is strong money.",
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

  // Auth check + load saved stats
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

      const { data: row, error } = await supabase
        .from("client_stats")
        .select("deposit,current_balance")
        .eq("user_id", u.id)
        .maybeSingle();

      if (error) setMsg(error.message);

      if (row) {
        setDeposit(String(row.deposit ?? ""));
        setBalance(String(row.current_balance ?? ""));
      }

      setChecking(false);
    };

    run();
  }, [router]);

  const d = Number(deposit || 0);
  const b = Number(balance || 0);
  const pnl = b - d;

  const riskPerTrade = d > 0 ? d / 14 : 0;
  const wcu30 = pnl > 0 ? pnl * 0.3 : 0;
  const client70 = pnl > 0 ? pnl * 0.7 : pnl;

  const fmt = (n) =>
    (Number.isFinite(n) ? n : 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const save = async () => {
    setSaving(true);
    setMsg("");

    try {
      const { data } = await supabase.auth.getSession();
      const u = data?.session?.user;
      if (!u) return router.push("/login");

      const dep = Number(deposit || 0);
      const bal = Number(balance || 0);

      if (!Number.isFinite(dep) || !Number.isFinite(bal)) {
        throw new Error("Enter valid numbers for deposit and balance.");
      }
      if (dep < 0 || bal < 0) {
        throw new Error("Deposit and balance can’t be negative.");
      }

      const { error } = await supabase.from("client_stats").upsert(
        {
          user_id: u.id,
          deposit: dep,
          current_balance: bal,
        },
        { onConflict: "user_id" }
      );

      if (error) throw error;

      setMsg("Saved ✅");
    } catch (e) {
      setMsg(e?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (checking) {
    return (
      <div className="wrap">
        <div className="card">
          <div className="cardTitle">Loading…</div>
        </div>

        <style jsx>{`
          .wrap {
            min-height: 100vh;
            background: radial-gradient(circle at top, #2a1f0f, #000);
            color: #f7f0da;
            padding: 18px 14px 40px;
            display: grid;
            place-items: center;
          }
          .card {
            width: 100%;
            max-width: 520px;
            border-radius: 26px;
            border: 1px solid rgba(230, 195, 106, 0.35);
            background: radial-gradient(
              circle at top left,
              rgba(230, 195, 106, 0.12),
              rgba(0, 0, 0, 0.92)
            );
            padding: 22px 18px 20px;
            box-shadow: 0 0 70px rgba(0, 0, 0, 0.6);
            text-align: center;
          }
          .cardTitle {
            font-size: 22px;
            font-weight: 900;
            color: #f5e1a4;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="wrap">
      {/* TOP BAR */}
      <header className="topBar">
        <a href="/" className="backLink">
          <img src="/emblem.jpg" alt="Winners Circle University" className="logoImg" />
          <span>Back to main site</span>
        </a>

        <div className="rightTop">
          <div className="liveBadge">
            <span>LIVE CLIENT PORTAL · 70/30 SPLIT</span>
          </div>

          <a className="pairBtn" href="/pair">
            Pair EA
          </a>

          <button className="logoutBtn" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main">
        {/* OVERVIEW CARD */}
        <section className="card heroCard">
          <h1 className="cardTitle">Client Performance Overview</h1>

          <div className="quoteBox">“{quotes[quoteIndex]}”</div>

          <p className="cardLead">
            Welcome{userEmail ? `, ${userEmail}` : ""}. Enter your <b>deposit</b> and your{" "}
            <b>current balance</b> and we’ll calculate your profit/loss and the 30% split.
            (EA automation later.)
          </p>

          {/* QUICK INPUTS */}
          <div className="quickGrid">
            <div className="field">
              <div className="fieldLabel">Deposit (£)</div>
              <input
                className="fieldInput"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                inputMode="decimal"
                placeholder="e.g. 500"
              />
            </div>

            <div className="field">
              <div className="fieldLabel">Current balance (£)</div>
              <input
                className="fieldInput"
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

          <div className="statsGrid">
            {/* CAPITAL */}
            <div className="statBox">
              <div className="statLabel">Deposit</div>
              <div className="statValue">£{fmt(d)}</div>
              <p className="statText">
                You keep capital in your own account. We work on profit share only.
              </p>
            </div>

            {/* FRAMEWORK RISK */}
            <div className="statBox">
              <div className="statLabel">Risk per trade</div>
              <div className="statValue">{d > 0 ? `£${fmt(riskPerTrade)}` : "Capital ÷ 14"}</div>
              <p className="statText">Framework risk target (deposit ÷ 14).</p>
            </div>

            {/* TARGET SPLIT */}
            <div className="statBox">
              <div className="statLabel">P/L + split</div>
              <div className={`statValue ${pnl >= 0 ? "pos" : "neg"}`}>
                {pnl >= 0 ? "+" : "-"}£{fmt(Math.abs(pnl))}
              </div>
              <p className="statText">
                {pnl > 0 ? `WCU 30%: £${fmt(wcu30)} · Your 70%: £${fmt(client70)}` : "No commission on losses."}
              </p>
            </div>
          </div>
        </section>

        {/* PAYOUT + SPLIT SECTION */}
        <section className="card payoutCard">
          <h2 className="sectionTitle">30% Commission</h2>
          <p className="sectionText">
            Commission is only due when you are in profit. Your current 30% estimate:
          </p>

          <div className="dueBox">
            <div className="dueLabel">Estimated commission due</div>
            <div className="dueValue">£{fmt(wcu30)}</div>
            <div className="dueNote">{pnl > 0 ? "Charged on profit only." : "£0 while in loss."}</div>
          </div>

          <div className="btnGroup">
            <button className="primaryBtn" type="button" onClick={() => alert("Card payments are handled manually for now.")}>
              Pay 30% via Card
            </button>
            <button className="secondaryBtn" type="button" onClick={() => alert("Crypto payments are handled manually for now.")}>
              Pay 30% via Crypto
            </button>
          </div>

          <p className="finePrint">
            Payments are confirmed manually. This portal doesn’t move money or connect directly to your broker yet.
            It is for structure and tracking.
          </p>
        </section>

        <p className="disclaimer">
          None of this is financial advice. It simply shows how our framework, risk and split are structured.
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
          margin-bottom: 26px;
          flex-wrap: wrap;
        }

        .rightTop {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
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
          width: 40px;
          height: 40px;
          border-radius: 12px;
          box-shadow: 0 0 24px rgba(230, 195, 106, 0.35);
        }

        .liveBadge {
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(230, 195, 106, 0.45);
          background: radial-gradient(circle at top, rgba(230, 195, 106, 0.25), rgba(0, 0, 0, 0.9));
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .liveBadge span {
          color: #f7e3a5;
        }

        .pairBtn {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.45);
          color: #f7e1aa;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 900;
          cursor: pointer;
          white-space: nowrap;
        }
        .pairBtn:hover {
          background: rgba(230, 195, 106, 0.08);
          border-color: rgba(230, 195, 106, 0.65);
        }

        .logoutBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.45);
          color: #f7e1aa;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 900;
          cursor: pointer;
          white-space: nowrap;
        }
        .logoutBtn:hover {
          background: rgba(230, 195, 106, 0.08);
          border-color: rgba(230, 195, 106, 0.65);
        }

        .main {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 22px;
        }

        .card {
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: radial-gradient(circle at top left, rgba(230, 195, 106, 0.12), rgba(0, 0, 0, 0.92));
          padding: 22px 18px 20px;
          box-shadow: 0 0 70px rgba(0, 0, 0, 0.6);
        }

        .heroCard {
          margin-top: 8px;
        }

        .cardTitle {
          font-size: 24px;
          margin: 0 0 10px;
          color: #f5e1a4;
        }

        .quoteBox {
          display: inline-block;
          margin: 0 0 12px;
          padding: 10px 14px;
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.25);
          background: rgba(0, 0, 0, 0.55);
          color: #e0d6ba;
          font-size: 13px;
          line-height: 1.6;
        }

        .cardLead {
          margin: 0 0 16px;
          font-size: 14px;
          line-height: 1.7;
          color: #e0d6ba;
        }

        .quickGrid {
          display: grid;
          gap: 10px;
          margin: 12px 0 18px;
        }

        @media (min-width: 720px) {
          .quickGrid {
            grid-template-columns: 1fr 1fr auto;
            align-items: end;
          }
        }

        .fieldLabel {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #cbb68a;
          margin-bottom: 6px;
        }

        .fieldInput {
          width: 100%;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid rgba(230, 195, 106, 0.25);
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          outline: none;
          font-size: 14px;
        }

        .fieldInput:focus {
          border-color: rgba(230, 195, 106, 0.55);
          box-shadow: 0 0 0 3px rgba(230, 195, 106, 0.14);
        }

        .saveBtn {
          border-radius: 999px;
          padding: 14px 18px;
          border: none;
          font-weight: 900;
          font-size: 14px;
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
          margin: 0 0 14px;
          padding: 12px 14px;
          border-radius: 18px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.55);
          color: #f7f0da;
          font-size: 13px;
          line-height: 1.6;
        }

        .statsGrid {
          display: grid;
          gap: 14px;
        }

        @media (min-width: 720px) {
          .statsGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .statBox {
          border-radius: 20px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.85), rgba(230, 195, 106, 0.04));
          padding: 16px 16px 14px;
        }

        .statLabel {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #cbb68a;
          margin-bottom: 6px;
        }

        .statValue {
          font-size: 22px;
          font-weight: 800;
          color: #ffe29b;
          margin-bottom: 6px;
        }

        .statText {
          font-size: 13px;
          line-height: 1.7;
          color: #ddd0b1;
          margin: 0;
        }

        .pos {
          color: #7bff9a;
          font-weight: 800;
        }
        .neg {
          color: #ff8d8d;
          font-weight: 800;
        }

        .sectionTitle {
          font-size: 18px;
          margin: 0 0 8px;
          color: #f5e1a4;
        }

        .sectionText {
          font-size: 14px;
          color: #e0d6ba;
          margin: 0 0 16px;
        }

        .dueBox {
          border-radius: 20px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: rgba(0, 0, 0, 0.55);
          padding: 16px;
        }

        .dueLabel {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #cbb68a;
          margin-bottom: 6px;
        }

        .dueValue {
          font-size: 26px;
          font-weight: 900;
          color: #ffe29b;
        }

        .dueNote {
          margin-top: 6px;
          font-size: 12px;
          color: #cbbfa5;
          line-height: 1.6;
        }

        .btnGroup {
          display: grid;
          gap: 10px;
          margin: 14px 0 10px;
        }

        @media (min-width: 640px) {
          .btnGroup {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .primaryBtn,
        .secondaryBtn {
          border-radius: 999px;
          padding: 14px 18px;
          border: none;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
        }

        .primaryBtn {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #000;
        }

        .secondaryBtn {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.45);
          color: #f7e1aa;
        }

        .finePrint {
          margin-top: 8px;
          font-size: 12px;
          color: #cbbfa5;
          line-height: 1.7;
        }

        .disclaimer {
          margin-top: 10px;
          font-size: 11px;
          line-height: 1.7;
          color: #a99b7c;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

