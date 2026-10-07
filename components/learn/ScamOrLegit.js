"use client";

import { useRef, useState } from "react";

const CARDS = [
  { t: "“Send me your MT5 password and I’ll trade your account for you.”", scam: true, e: "Never share your password. Real copy trading works through the broker’s own system." },
  { t: "“Guaranteed 10% profit every week. Zero risk.”", scam: true, e: "Nobody can guarantee returns. ‘Zero risk’ in trading is always a lie." },
  { t: "A strategy on Exness Social Trading showing its full live history, losing months included.", scam: false, e: "Verified, public history with the bad months shown is what honest looks like." },
  { t: "“Send USDT to my personal wallet and I’ll double it in 7 days.”", scam: true, e: "Classic doubling scam. Money sent to a person’s wallet is almost never coming back." },
  { t: "A performance fee that’s only charged on new profit, collected by the broker.", scam: false, e: "Fee only on profit, handled by the broker, means you never send money to anyone directly." },
  { t: "“Recruit 3 friends to unlock your withdrawals.”", scam: true, e: "Pay-to-withdraw and recruit-to-earn are pyramid scheme signs." },
  { t: "Screenshots of huge profits in a Telegram group, but no verified track record.", scam: true, e: "Screenshots are easy to fake. Ask for a verified, live record." },
  { t: "A risk warning that says you could lose all the money you invest.", scam: false, e: "Honest businesses tell you the risk up front. That’s a good sign, not a bad one." },
];

export default function ScamOrLegit({ onFinish, onClose }) {
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [drag, setDrag] = useState(0);
  const start = useRef(null);
  const done = i >= CARDS.length;
  const card = CARDS[i];

  const pick = (scam) => {
    if (answer !== null || done) return;
    const ok = scam === card.scam;
    setAnswer({ scam, ok });
    if (ok) setScore((s) => s + 1);
  };
  const next = () => {
    setAnswer(null);
    setDrag(0);
    if (i + 1 >= CARDS.length) onFinish && onFinish(score);
    setI(i + 1);
  };

  const onDown = (e) => {
    if (answer !== null) return;
    start.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (start.current === null) return;
    setDrag(e.clientX - start.current);
  };
  const onUp = () => {
    if (start.current === null) return;
    start.current = null;
    if (drag < -90) pick(true);
    else if (drag > 90) pick(false);
    setDrag(0);
  };

  if (done) {
    return (
      <div className="game done-g">
        <span className="fx-eyebrow">Shield rating</span>
        <div className="big-score fx-gradient-text">{score}/{CARDS.length}</div>
        <h3>{score >= 7 ? "Scammers will hate you." : score >= 5 ? "Solid. A few slipped past." : "Worth another run."}</h3>
        <p>The rule that catches almost all of them: never share your password, and never send money to a person instead of a regulated broker.</p>
        <div className="btn-row center">
          <button type="button" className="btn-ghost" onClick={() => { setI(0); setScore(0); setAnswer(null); }}>Play again</button>
          <button type="button" className="btn" onClick={onClose}>Back to the Academy</button>
        </div>
      </div>
    );
  }

  const tilt = Math.max(-12, Math.min(12, drag / 12));
  return (
    <div className="game">
      <div className="g-top">
        <span className="fx-eyebrow">Card {i + 1} / {CARDS.length}</span>
        <span className="g-score">Score <b>{score}</b></span>
      </div>
      <h3 className="g-q">Scam or legit?</h3>
      <div className="sw-zone">
        <span className={`sw-hint l ${drag < -40 ? "on" : ""}`}>Scam</span>
        <span className={`sw-hint r ${drag > 40 ? "on" : ""}`}>Legit</span>
        <div
          className={`sw-card ${answer ? (answer.ok ? "ok" : "no") : ""}`}
          style={{ transform: `translateX(${drag}px) rotate(${tilt}deg)` }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <p>{card.t}</p>
          {answer && (
            <div className="sw-verdict">
              <b>{answer.ok ? "Correct" : "Wrong"}: it’s {card.scam ? "a scam" : "legit"}.</b>
              <span>{card.e}</span>
            </div>
          )}
        </div>
      </div>
      {answer === null ? (
        <div className="g-btns">
          <button type="button" className="g-btn down" onClick={() => pick(true)}>✕ Scam</button>
          <button type="button" className="g-btn up" onClick={() => pick(false)}>✓ Legit</button>
        </div>
      ) : (
        <div className="g-btns one">
          <button type="button" className="btn" onClick={next}>{i + 1 >= CARDS.length ? "See rating" : "Next card"}</button>
        </div>
      )}
      <p className="sw-tip">Tip: swipe the card left for scam, right for legit.</p>
    </div>
  );
}
