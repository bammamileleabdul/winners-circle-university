"use client";

import { useState } from "react";

const PARTS = {
  high: "High: the highest price reached during this candle’s time period.",
  low: "Low: the lowest price reached during the period.",
  open: "Open: the price when the period started.",
  close: "Close: the price when the period ended.",
  body: "Body: the range between open and close. A big body means a strong move in one direction.",
  wick: "Wick: the thin lines. They show where price went but couldn’t stay. Long wicks often mean rejection.",
};

// Interactive candlestick diagram: tap a part to learn what it means.
export default function CandleAnatomy() {
  const [bull, setBull] = useState(true);
  const [part, setPart] = useState("body");

  // Bullish: open at bottom of body, close at top. Bearish: the reverse.
  const top = 70, bottom = 170;
  const openY = bull ? bottom : top;
  const closeY = bull ? top : bottom;
  const col = bull ? "#e6c36a" : "#e08a6f";
  const sel = (p) => (part === p ? 1 : 0.35);

  const Label = ({ p, y, text, side = "right" }) => (
    <g className="ca-label" onClick={() => setPart(p)} onPointerEnter={() => setPart(p)} style={{ cursor: "pointer" }}>
      <line x1={side === "right" ? 150 : 90} x2={side === "right" ? 200 : 40} y1={y} y2={y} stroke={part === p ? "#e6c36a" : "rgba(230,195,106,.35)"} strokeDasharray="3 3" />
      <text x={side === "right" ? 206 : 34} y={y + 4} textAnchor={side === "right" ? "start" : "end"} fontSize="13" fontFamily="JetBrains Mono, monospace" fill={part === p ? "#e6c36a" : "#a79e89"}>
        {text}
      </text>
    </g>
  );

  return (
    <div className="lab">
      <div className="lab-head">
        <span className="fx-eyebrow">Try it</span>
        <h3>Anatomy of a candle</h3>
      </div>
      <div className="lab-grid">
        <div className="ca-fig">
          <svg viewBox="0 0 300 240" role="img" aria-label={`${bull ? "Bullish" : "Bearish"} candlestick with labelled parts`}>
            <rect x="0" y="0" width="300" height="240" fill="transparent" />
            <line x1="120" x2="120" y1="30" y2={top} stroke={col} strokeWidth="3" opacity={Math.max(sel("wick"), sel("high"))} onClick={() => setPart("wick")} style={{ cursor: "pointer" }} />
            <line x1="120" x2="120" y1={bottom} y2="210" stroke={col} strokeWidth="3" opacity={Math.max(sel("wick"), sel("low"))} onClick={() => setPart("wick")} style={{ cursor: "pointer" }} />
            <rect x="100" y={top} width="40" height={bottom - top} rx="3" fill={col} opacity={Math.max(sel("body"), sel("open"), sel("close"), 0.55)} onClick={() => setPart("body")} style={{ cursor: "pointer" }} />
            <Label p="high" y={30} text="High" />
            <Label p={bull ? "close" : "open"} y={top} text={bull ? "Close" : "Open"} />
            <Label p={bull ? "open" : "close"} y={bottom} text={bull ? "Open" : "Close"} />
            <Label p="low" y={210} text="Low" />
            <Label p="body" y={(top + bottom) / 2} text="Body" side="left" />
            <Label p="wick" y={50} text="Wick" side="left" />
          </svg>
          <div className="chips center">
            <button type="button" className="chip" aria-pressed={bull} onClick={() => setBull(true)}>Bullish (price rose)</button>
            <button type="button" className="chip" aria-pressed={!bull} onClick={() => setBull(false)}>Bearish (price fell)</button>
          </div>
        </div>
        <div className="lab-out">
          <div className="hl col"><span>{part}</span><p className="ca-text">{PARTS[part]}</p></div>
          <div className="parts">
            {Object.keys(PARTS).map((k) => (
              <button key={k} type="button" className="chip" aria-pressed={part === k} onClick={() => setPart(k)}>{k}</button>
            ))}
          </div>
          <p className="lab-note">
            {bull
              ? "On a bullish candle the close is above the open, so the body runs from open (bottom) up to close (top)."
              : "On a bearish candle the close is below the open, so the body runs from open (top) down to close (bottom)."}
          </p>
        </div>
      </div>
    </div>
  );
}
