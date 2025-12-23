"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseBrowser";

function makeCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12)
    .toUpperCase();
}

export default function PairEA() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [pairingCode, setPairingCode] = useState("");
  const [status, setStatus] = useState("pending");
  const [mt5Login, setMt5Login] = useState("");
  const [lastSeenAt, setLastSeenAt] = useState("");

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const apiUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/api/mt5/report`;
  }, []);

  const load = async () => {
    setMsg("");
    const { data } = await supabase.auth.getSession();
    const u = data?.session?.user;

    if (!u) {
      router.push("/login");
      return;
    }

    const { data: row, error } = await supabase
      .from("mt5_connections")
      .select("pairing_code,status,mt5_login,last_seen_at")
      .eq("user_id", u.id)
      .maybeSingle();

    if (error) {
      setMsg(error.message);
      setChecking(false);
      return;
    }

    if (!row) {
      const code = makeCode();
      const { error: insErr } = await supabase.from("mt5_connections").insert({
        user_id: u.id,
        pairing_code: code,
        status: "pending",
      });

      if (insErr) setMsg(insErr.message);

      setPairingCode(code);
      setStatus("pending");
      setMt5Login("");
      setLastSeenAt("");
      setChecking(false);
      return;
    }

    setPairingCode(row.pairing_code);
    setStatus(row.status || "pending");
    setMt5Login(row.mt5_login || "");
    setLastSeenAt(row.last_seen_at || "");

    setChecking(false);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pairingCode);
      setMsg("Copied ✅");
    } catch {
      setMsg("Copy failed (your browser blocked it).");
    }
  };

  const regenerate = async () => {
    setBusy(true);
    setMsg("");
    try {
      const { data } = await supabase.auth.getSession();
      const u = data?.session?.user;
      if (!u) return router.push("/login");

      const code = makeCode();
      const { error } = await supabase
        .from("mt5_connections")
        .update({
          pairing_code: code,
          status: "pending",
          mt5_login: null,
          last_seen_at: null,
        })
        .eq("user_id", u.id);

      if (error) throw error;

      setPairingCode(code);
      setStatus("pending");
      setMt5Login("");
      setLastSeenAt("");
      setMsg("New pairing code generated ✅");
    } catch (e) {
      setMsg(e?.message || "Failed to regenerate.");
    } finally {
      setBusy(false);
    }
  };

  const testPing = async () => {
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/mt5/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          pairing_code: pairingCode,
          type: "heartbeat",
          mt5_login: "TEST_LOGIN",
        }),
      });

      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Ping failed");

      setMsg("Ping sent ✅ (status should turn connected)");
      await load();
    } catch (e) {
      setMsg(e?.message || "Ping failed.");
    } finally {
      setBusy(false);
    }
  };

  if (checking) {
    return (
      <div className="wrap">
        <div className="card">
          <div className="title">Loading…</div>
        </div>

        <style jsx>{`
          .wrap {
            min-height: 100vh;
            background: radial-gradient(circle at top, #2a1f0f, #000);
            display: grid;
            place-items: center;
            padding: 18px 14px 40px;
            color: #f7f0da;
          }
          .card {
            width: 100%;
            max-width: 900px;
            border-radius: 26px;
            border: 1px solid rgba(230, 195, 106, 0.35);
            background: radial-gradient(circle at top left, rgba(230, 195, 106, 0.12), rgba(0, 0, 0, 0.92));
            padding: 22px 18px 20px;
            box-shadow: 0 0 70px rgba(0, 0, 0, 0.6);
            text-align: center;
          }
          .title {
            font-weight: 900;
            color: #f5e1a4;
            font-size: 22px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="wrap">
      <header className="topBar">
        <a href="/client-portal" className="backLink">
          ← Back to Client Portal
        </a>
        <a href="/" className="backLink">
          Home
        </a>
      </header>

      <main className="card">
        <h1 className="title">Pair Your MT5 EA</h1>
        <p className="lead">
          This code links the EA to your Winners Circle account. The EA will send verified results to your portal (no
          manual cheating).
        </p>

        <div className="codeRow">
          <div className="codeBox">{pairingCode || "—"}</div>

          <button className="btn" type="button" onClick={copy}>
            Copy
          </button>

          <button className="btnOutline" type="button" disabled={busy} onClick={regenerate}>
            {busy ? "…" : "Regenerate"}
          </button>

          <button className="btnOutline" type="button" disabled={busy} onClick={testPing}>
            {busy ? "…" : "Test Ping"}
          </button>
        </div>

        <div className="statusGrid">
          <div className="sBox">
            <div className="k">Status</div>
            <div className={`v ${status === "connected" ? "pos" : ""}`}>{status}</div>
          </div>
          <div className="sBox">
            <div className="k">MT5 Login</div>
            <div className="v">{mt5Login || "—"}</div>
          </div>
          <div className="sBox">
            <div className="k">Last Seen</div>
            <div className="v">
              {lastSeenAt ? new Date(lastSeenAt).toLocaleString() : "—"}
            </div>
          </div>
        </div>

        <div className="how">
          <div className="howTitle">EA settings</div>
          <ul>
            <li>
              <b>Pairing code:</b> {pairingCode}
            </li>
            <li>
              <b>Report URL:</b> {apiUrl}
            </li>
          </ul>
          <div className="note">
            When the EA is running, status will turn <b>connected</b> and last seen will update.
          </div>
        </div>

        {msg && <div className="msg">{msg}</div>}
      </main>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #2a1f0f, #000);
          color: #f7f0da;
          padding: 18px 14px 40px;
        }

        .topBar {
          max-width: 900px;
          margin: 0 auto 14px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .backLink {
          color: #e6c36a;
          text-decoration: none;
          font-weight: 900;
        }

        .card {
          max-width: 900px;
          margin: 0 auto;
          border-radius: 26px;
          border: 1px solid rgba(230, 195, 106, 0.35);
          background: radial-gradient(circle at top left, rgba(230, 195, 106, 0.12), rgba(0, 0, 0, 0.92));
          padding: 18px 16px;
          box-shadow: 0 0 70px rgba(0, 0, 0, 0.6);
        }

        .title {
          margin: 0 0 8px;
          color: #f5e1a4;
          font-size: 24px;
        }

        .lead {
          margin: 0 0 14px;
          color: #e0d6ba;
          line-height: 1.7;
          font-size: 14px;
        }

        .codeRow {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 14px;
        }

        .codeBox {
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.28);
          background: rgba(0, 0, 0, 0.55);
          color: #ffe29b;
          font-weight: 900;
          letter-spacing: 0.12em;
          word-break: break-word;
        }

        .btn {
          border: none;
          border-radius: 999px;
          padding: 12px 16px;
          font-weight: 900;
          cursor: pointer;
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          color: #000;
        }

        .btnOutline {
          background: transparent;
          border: 1px solid rgba(230, 195, 106, 0.45);
          color: #f7e1aa;
          border-radius: 999px;
          padding: 12px 16px;
          font-weight: 900;
          cursor: pointer;
        }
        .btnOutline:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .statusGrid {
          display: grid;
          gap: 10px;
          margin: 14px 0;
        }
        @media (min-width: 820px) {
          .statusGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .sBox {
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
          font-size: 16px;
          font-weight: 900;
          color: #ffe29b;
          word-break: break-word;
        }

        .pos {
          color: #7bff9a;
        }

        .how {
          margin-top: 10px;
          border-top: 1px solid rgba(230, 195, 106, 0.18);
          padding-top: 14px;
          color: #d8d2b6;
          line-height: 1.7;
          font-size: 14px;
        }

        .howTitle {
          color: #e6c36a;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .note {
          margin-top: 10px;
          font-size: 12px;
          color: #cbbfa5;
        }

        .msg {
          margin-top: 12px;
          padding: 12px 14px;
          border-radius: 16px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: rgba(0, 0, 0, 0.55);
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
