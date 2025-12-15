"use client";

import { useState } from "react";

export default function MiniLelefx() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I am mini lelefx.\n\nI operate on discipline, risk structure, and probability — not prediction.\n\nAsk a question or run a capital simulation.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mini-lelefx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Connection issue. Pause, reassess, and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrap">
      <div className="panel">
        <div className="header">
          <span className="title">mini lelefx</span>
          <span className="subtitle">Private Analytical Interface</span>
        </div>

        <div className="chat">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`msg ${m.role === "user" ? "user" : "ai"}`}
            >
              {m.content}
            </div>
          ))}
          {loading && <div className="msg ai">Thinking…</div>}
        </div>

        <div className="inputRow">
          <input
            placeholder="Ask a question or enter capital…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: radial-gradient(circle at top, #1a1408, #000);
          display: flex;
          justify-content: center;
          padding: 40px 16px;
        }

        .panel {
          width: 100%;
          max-width: 720px;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(230, 195, 106, 0.35);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.12);
        }

        .header {
          padding: 20px;
          border-bottom: 1px solid rgba(230, 195, 106, 0.25);
        }

        .title {
          color: #e6c36a;
          font-weight: 900;
          font-size: 18px;
        }

        .subtitle {
          display: block;
          font-size: 12px;
          color: #bfae78;
          margin-top: 4px;
        }

        .chat {
          padding: 20px;
          flex: 1;
          overflow-y: auto;
        }

        .msg {
          margin-bottom: 16px;
          white-space: pre-line;
          line-height: 1.6;
          font-size: 14px;
        }

        .msg.user {
          color: #fff;
        }

        .msg.ai {
          color: #d8d2b6;
        }

        .inputRow {
          display: flex;
          border-top: 1px solid rgba(230, 195, 106, 0.25);
        }

        input {
          flex: 1;
          padding: 16px;
          background: transparent;
          border: none;
          color: #fff;
          outline: none;
        }

        button {
          background: linear-gradient(135deg, #e6c36a, #b8963f);
          border: none;
          padding: 0 22px;
          font-weight: 800;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
