"use client";

import { useMemo, useState } from "react";

const ROUNDS = 10;
const SHOW = 30;
const REVEAL = 6;

// A random-walk candle series. Random on purpose: the lesson is that guessing is a coin flip.
function makeSeries(seed) {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  let p = 100;
  const out = [];
  for (let i = 0; i < SHOW + REVEAL; i++) {
    const o = p;
    const c = o + (rnd() - 0.5) * 3.2;
    const h = Math.max(o, c) + rnd() * 1.4;
    const l = Math.min(o, c) - rnd() * 1.4;
    out.push({ o, c, h, l });
    p = c;
  }
  return out;
}

export default function CallIt({ onFinish, onClose }) {
  const [round, setRound] = useState(0);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [guess, setGuess] = useState(null);
  const [hits, setHits] = useState(0);
  const [done, setDone] = useState(false);

  const data = useMemo(() => makeSeries(seed), [seed]);
  const visible = guess === null ? data.slice(0, SHOW) : data;
  const lastShown = data[SHOW - 1].c;
  const finalP = data[SHOW + REVEAL - 1].c;
  const wentUp = finalP > lastShown;
  const right = guess !== null && (guess === "up") === wentUp;

  const W = 640, H = 240, pad = 12;
  const lo = Math.min(...data.map((d) => d.l)), hi = Math.max(...data.map((d) => d.h));
  const x = (i) => pad + ((W - pad * 2) * (i + 0.5)) / (SHOW + REVEAL);
  const y = (v) => pad + (H - pad * 2) * (1 - (v - lo) / (hi - lo));
  const cw = ((W - pad * 2) / (SHOW + REVEAL)) * 0.6;

  const call = (g) => {
    if (guess !== null) return;
    setGuess(g);
    if ((g === "up") === wentUp) setHits((h) => h + 1);
  };
  const next = () => {
    if (round + 1 >= ROUNDS) {
      setDone(true);
      onFinish && onFinish(hits);
      return;
    }
    setRound(round + 1);
    setSeed(Math.floor(Math.random() * 100000));
    setGuess(null);
  };
  const restart = () => {
    setRound(0);
    setHits(0);
    setGuess(null);
    setDone(false);
    setSeed(Math.floor(Math.random() * 100000));
  };

  if (done) {
    return (
      <div className="game done-g">
        <span className="fx-eyebrow">Final score</span>
        <div className="big-score fx-gradient-text">{hits}/{ROUNDS}</div>
        <h3>Here’s the twist: these charts were random.</h3>
        <p>
          Guessing direction is a coin flip, so most people land near 5 out of 10. Real traders don’t win by predicting
          every move. They win by risking small, cutting losers fast and letting a few good trades pay for the bad ones.
        </p>
        <div className="btn-row center">
          <button type="button" className="btn-ghost" onClick={restart}>Play again</button>
          <button type="button" className="btn" onClick={onClose}>Back to the Academy</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="g-top">
        <span className="fx-eyebrow">Round {round + 1} / {ROUNDS}</span>
        <span className="g-score">Score <b>{hits}</b></span>
      </div>
      <h3 className="g-q">{guess === null ? "Where does price go next?" : right ? "Called it." : "Missed."}</h3>
      <div className="g-chart">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Candlestick chart">
          <line x1={x(SHOW - 0.5)} x2={x(SHOW - 0.5)} y1="0" y2={H} stroke="rgba(230,195,106,.35)" strokeDasharray="4 4" />
          {visible.map((d, i) => {
            const up = d.c >= d.o;
            const col = up ? "#e6c36a" : "#e08a6f";
            const revealed = i >= SHOW;
            return (
              <g key={i} className={revealed ? "rev" : ""} style={revealed ? { animationDelay: `${(i - SHOW) * 0.12}s` } : undefined}>
                <line x1={x(i)} x2={x(i)} y1={y(d.h)} y2={y(d.l)} stroke={col} strokeWidth="1.5" />
                <rect x={x(i) - cw / 2} y={y(Math.max(d.o, d.c))} width={cw} height={Math.max(1.5, Math.abs(y(d.o) - y(d.c)))} fill={col} />
              </g>
            );
          })}
          {guess === null && (
            <text x={x(SHOW + REVEAL / 2 - 0.5)} y={H / 2} textAnchor="middle" fontSize="40" fill="rgba(230,195,106,.4)" fontFamily="Saira, sans-serif">?</text>
          )}
        </svg>
      </div>
      {guess === null ? (
        <div className="g-btns">
          <button type="button" className="g-btn up" onClick={() => call("up")}>▲ Up</button>
          <button type="button" className="g-btn down" onClick={() => call("down")}>▼ Down</button>
        </div>
      ) : (
        <div className="g-btns">
          <p className={`g-res ${right ? "ok" : "no"}`}>
            Price went {wentUp ? "up" : "down"}. You said {guess}.
          </p>
          <button type="button" className="btn" onClick={next}>{round + 1 >= ROUNDS ? "See score" : "Next round"}</button>
        </div>
      )}
    </div>
  );
}
