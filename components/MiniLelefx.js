"use client";

import { useEffect, useRef, useState } from "react";

// Floating "mini lelefx" assistant: a button in the corner that opens a chat panel.
export default function MiniLelefx({ inline = false }) {
  const [open, setOpen] = useState(inline);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I am mini lelefx.\n\nI operate on discipline, risk structure and probability, not prediction.\n\nAsk how copying through Exness works, how the fee works, or about our principles.",
    },
  ]);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open || inline) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (preset) => {
    const text = (preset ?? input).trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/mini-lelefx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => ({}));
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "Connection issue. Try again in a moment." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Connection issue. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const chips = ["How does copying work?", "How is the 30% fee charged?", "Explain the principles", "What is VVIP?"];

  const panel = (
          <div className={`ml-panel fx-hud ${inline ? "inline" : ""}`} role={inline ? "region" : "dialog"} aria-label="mini lelefx" onClick={(e) => e.stopPropagation()}>
            <div className="ml-head">
              <span className="ml-core small" aria-hidden="true">
                <i className="ml-eye" />
                <i className="ml-eye" />
              </span>
              <div>
                <div className="ml-title">mini lelefx</div>
                <div className="ml-sub">Calm. Precise. Rules-based.</div>
              </div>
              {!inline && (
                <button type="button" className="ml-close" aria-label="Close" onClick={() => setOpen(false)}>
                  ×
                </button>
              )}
            </div>

            <div className="ml-chat" ref={chatRef}>
              {messages.map((m, i) => (
                <div key={i} className={`ml-msg ${m.role === "user" ? "user" : "bot"}`}>
                  {m.content}
                </div>
              ))}
              {loading && <div className="ml-msg bot ml-typing">Thinking</div>}
            </div>

            <div className="ml-chips">
              {chips.map((c) => (
                <button key={c} type="button" className="ml-chip" onClick={() => send(c)}>
                  {c}
                </button>
              ))}
            </div>

            <form
              className="ml-input-row"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                id="ml-input"
                className="fx-input"
                placeholder="Ask a question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="btn">
                Send
              </button>
            </form>
            <div className="ml-note">Rules-based assistant. Not financial advice.</div>
          </div>
  );

  return (
    <>
      {inline ? (
        panel
      ) : (
        <>
          <button type="button" className="ml-fab" aria-label="Open mini lelefx assistant" onClick={() => setOpen(true)}>
            <span className="ml-core" aria-hidden="true">
              <i className="ml-eye" />
              <i className="ml-eye" />
            </span>
            <span className="ml-orbit" aria-hidden="true" />
          </button>
          {open && (
            <div className="ml-overlay" onClick={() => setOpen(false)}>
              {panel}
            </div>
          )}
        </>
      )}

      <style jsx global>{`
        .ml-fab {
          position: fixed;
          right: 16px;
          bottom: calc(16px + env(safe-area-inset-bottom, 0px));
          z-index: 70;
          width: 62px;
          height: 62px;
          padding: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: radial-gradient(circle at 35% 30%, #2a2214, #0a0907 70%);
          border: 1px solid var(--line-strong);
          box-shadow: 0 0 30px rgba(230, 195, 106, 0.25);
        }
        .ml-fab:hover {
          box-shadow: 0 0 40px rgba(230, 195, 106, 0.5);
        }
        .ml-orbit {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px dashed rgba(230, 195, 106, 0.45);
        }
        .ml-core {
          width: 32px;
          height: 24px;
          border-radius: 8px;
          background: linear-gradient(160deg, var(--gold-hi), var(--gold-deep));
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          box-shadow: 0 0 14px rgba(230, 195, 106, 0.6);
        }
        .ml-core.small {
          width: 28px;
          height: 21px;
          flex: none;
        }
        .ml-eye {
          width: 5px;
          height: 7px;
          border-radius: 3px;
          background: #0a0907;
        }
        .ml-overlay {
          position: fixed;
          inset: 0;
          z-index: 10001;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 16px;
          background: rgba(3, 3, 2, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .ml-panel {
          width: min(420px, 100%);
          max-height: min(680px, calc(100vh - 32px));
          display: flex;
          flex-direction: column;
          background: rgba(12, 11, 8, 0.92);
          border: 1px solid var(--line-strong);
          border-radius: var(--radius);
          box-shadow: 0 0 60px rgba(230, 195, 106, 0.18);
          overflow: hidden;
        }
        .ml-panel.inline {
          width: 100%;
          height: min(640px, calc(100vh - 220px));
          max-height: none;
        }
        .ml-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--line);
        }
        .ml-title {
          font: 600 18px/1.1 var(--display);
          color: var(--gold);
        }
        .ml-sub {
          font: 400 11px/1.4 var(--mono);
          color: var(--muted);
          letter-spacing: 0.08em;
        }
        .ml-close {
          margin-left: auto;
          width: 36px;
          height: 36px;
          padding: 0;
          background: transparent;
          color: var(--muted);
          border: 1px solid var(--line);
          font-size: 20px;
          line-height: 1;
        }
        .ml-close:hover {
          color: var(--gold);
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .ml-chat {
          flex: 1;
          overflow-y: auto;
          display: grid;
          align-content: start;
          gap: 10px;
          padding: 16px;
        }
        .ml-msg {
          padding: 12px 14px;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          max-width: 92%;
        }
        .ml-msg.bot {
          background: rgba(230, 195, 106, 0.06);
          justify-self: start;
        }
        .ml-msg.user {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
          justify-self: end;
        }
        .ml-typing::after {
          content: "…";
          animation: fx-pulse 1s infinite;
        }
        .ml-chips {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0 16px 12px;
        }
        .ml-chip {
          flex: none;
          padding: 8px 12px;
          font: 500 12px/1 var(--body);
          letter-spacing: 0.02em;
          background: transparent;
          color: var(--gold);
          border: 1px solid var(--line-strong);
          white-space: nowrap;
        }
        .ml-chip:hover {
          background: var(--gold-soft);
          box-shadow: none;
        }
        .ml-input-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 10px;
          padding: 0 16px;
        }
        .ml-note {
          padding: 10px 16px 14px;
          font: 400 11px/1.4 var(--mono);
          color: var(--muted);
        }
        @media (prefers-reduced-motion: no-preference) {
          .ml-orbit {
            animation: fx-spin 14s linear infinite;
          }
          .ml-panel {
            animation: fx-rise 0.35s ease-out;
          }
        }
        .no-fx .ml-orbit,
        .no-fx .ml-panel {
          animation: none !important;
        }
      `}</style>
    </>
  );
}
