"use client";

import { useEffect, useRef, useState } from "react";

export default function AiPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I am mini lelefx.\n\nI operate on discipline, risk structure, and probability — not prediction.\n\nAsk one clean question.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading, minimized]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mini-lelefx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // /ai uses full history
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data?.reply ||
            "I didn’t receive a reply. Re-center and ask again.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection issue. Refresh and ask again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      {/* Background emblem watermark */}
      <img className="bgEmblem" src="/emblem.jpg" alt="" />

      {/* Floating Chat Panel */}
      <section className={`panel ${minimized ? "min" : ""}`}>
        <header className="panelHeader">
          <div className="left">
            <div className="badge">
              <img src="/emblem.jpg" alt="Winners Circle" />
            </div>
            <div className="titles">
              <div className="title">mini lelefx</div>
              <div className="sub">Demo mode • luxury execution</div>
            </div>
          </div>

          <div className="actions">
            <button
              className="iconBtn"
              onClick={() => setMinimized((v) => !v)}
              aria-label={minimized ? "Expand" : "Minimize"}
              title={minimized ? "Expand" : "Minimize"}
            >
              {minimized ? "▢" : "—"}
            </button>

            <a className="iconBtn linkBtn" href="/" aria-label="Back to home" title="Back to home">
              ←
            </a>
          </div>
        </header>

        {!minimized && (
          <>
            <div className="panelBody" ref={bodyRef}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`msg ${m.role === "user" ? "user" : "bot"}`}
                >
                  {m.content}
                </div>
              ))}
              {loading && <div className="msg bot">Thinking…</div>}
            </div>

            <form className="panelFooter" onSubmit={send}>
              <input
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask mini lelefx…"
                required
              />
              <button className="send" type="submit" disabled={loading}>
                Send
              </button>
            </form>

            <div className="note">
              Not financial advice. Framework + risk discipline only.
            </div>
          </>
        )}
      </section>

      {/* Small floating “bot” dot (aesthetic) */}
      <div className="glowDot" aria-hidden="true" />

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #1a1408, #000);
          position: relative;
          overflow: hidden;
        }

        .bgEmblem {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 520px;
          max-width: 92vw;
          opacity: 0.06;
          filter: drop-shadow(0 0 90px rgba(230, 195, 106, 0.22));
          pointer-events: none;
          z-index: 0;
        }

        .panel {
          position: fixed;
          right: 16px;
          bottom: 16px;
          width: min(520px, calc(100vw - 32px));
          height: min(72vh, 640px);
          border-radius: 22px;
          border: 1px solid rgba(230, 195, 106, 0.22);
          background: radial-gradient(circle at top, rgba(26, 20, 8, 0.95), rgba(0, 0, 0, 0.94));
          box-shadow: 0 0 140px rgba(230, 195, 106, 0.14);
          overflow: hidden;
          z-index: 10;
          backdrop-filter: blur(10px);
        }

        .panel.min {
          height: 78px;
        }

        .panelHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 14px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.16);
        }

        .left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .badge {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          border: 1px solid rgba(230, 195, 106, 0.25);
          background: rgba(255, 255, 255, 0.04);
          overflow: hidden;
          display: grid;
          place-items: center;
        }

        .badge img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.95;
        }

        .titles .title {
          color: #e6c36a;
          font-weight: 900;
          letter-spacing: 0.02em;
          line-height: 1.1;
        }

        .titles .sub {
          margin-top: 3px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.62);
        }

        .actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .iconBtn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          color: #e6c36a;
          height: 36px;
          min-width: 36px;
          padding: 0 10px;
          border-radius: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        .iconBtn:hover {
          border-color: rgba(230, 195, 106, 0.26);
        }

        .linkBtn {
          display: grid;
          place-items: center;
          text-decoration: none;
        }

        .panelBody {
          padding: 14px 14px;
          height: calc(100% - 64px - 66px - 34px); /* header + footer + note */
          overflow-y: auto;
        }

        .msg {
          white-space: pre-line;
          line-height: 1.65;
          font-size: 14px;
          padding: 10px 12px;
          border-radius: 14px;
          margin-bottom: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .msg.user {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
        }

        .msg.bot {
          background: rgba(230, 195, 106, 0.06);
          color: rgba(255, 255, 255, 0.82);
          border-color: rgba(230, 195, 106, 0.16);
        }

        .panelFooter {
          display: flex;
          gap: 10px;
          padding: 12px 14px 12px;
          border-top: 1px solid rgba(230, 195, 106, 0.14);
        }

        .input {
          flex: 1;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(230, 195, 106, 0.18);
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
          outline: none;
        }

        .send {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 12px 16px;
          border-radius: 14px;
          font-weight: 900;
          color: #000;
          cursor: pointer;
        }

        .send:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .note {
          padding: 0 14px 14px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 12px;
        }

        .glowDot {
          position: fixed;
          right: 22px;
          bottom: 22px;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(230, 195, 106, 0.9);
          box-shadow: 0 0 40px rgba(230, 195, 106, 0.35);
          z-index: 9;
          pointer-events: none;
          opacity: 0.25;
        }

        /* Mobile: make it feel like a “floating bottom sheet” */
        @media (max-width: 520px) {
          .panel {
            right: 10px;
            left: 10px;
            width: auto;
            bottom: 10px;
            height: 78vh;
            border-radius: 20px;
          }
          .panel.min {
            height: 74px;
          }
        }
      `}</style>
    </main>
  );
}
