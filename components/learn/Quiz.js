"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    q: "You buy EUR/USD at 1.1000 and it rises to 1.1025. How many pips is that?",
    o: ["2.5 pips", "25 pips", "250 pips"],
    a: 1,
    e: "On EUR/USD a pip is 0.0001. The move is 0.0025, which is 25 pips.",
  },
  {
    q: "You buy 0.01 lot of gold and the price rises $5 per ounce. What’s your profit?",
    o: ["$0.50", "$5", "$50"],
    a: 1,
    e: "0.01 lot of gold is 1 ounce on most brokers, so a $5 move is $5.",
  },
  {
    q: "What does higher leverage actually change?",
    o: ["The margin needed to open a trade", "How much you make per pip on the same lot size", "Which way the market moves"],
    a: 0,
    e: "Leverage lowers the margin needed. Money per pip depends on lot size. Leverage just makes it easier to open oversized trades.",
  },
  {
    q: "With a 2:1 reward-to-risk, roughly what win rate do you need to break even?",
    o: ["25%", "33%", "50%"],
    a: 1,
    e: "Break-even win rate = 1 ÷ (1 + 2) ≈ 33%, before costs like spread.",
  },
  {
    q: "Your account falls 50%. What gain do you need to get back to where you started?",
    o: ["50%", "75%", "100%"],
    a: 2,
    e: "From half your money you need to double it, a 100% gain. That’s why protecting capital comes first.",
  },
  {
    q: "Someone promises 10% a week and asks for your MT5 password to trade for you. What is this?",
    o: ["A VIP opportunity", "Normal practice for copy trading", "A red flag. Walk away."],
    a: 2,
    e: "Real copy trading never needs your password, and nobody can promise fixed returns. Winners Circle will never ask for either.",
  },
];

export default function Quiz({ onComplete }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[i];

  const choose = (k) => {
    if (picked !== null) return;
    setPicked(k);
    if (k === q.a) setScore((s) => s + 1);
  };
  const next = () => {
    if (i < QUESTIONS.length - 1) {
      setI(i + 1);
      setPicked(null);
    } else {
      setDone(true);
      onComplete && onComplete();
    }
  };
  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pass = score >= 5;
    return (
      <div className="qz done">
        <span className="fx-eyebrow">Result</span>
        <div className="qz-score fx-gradient-text">{score}/{QUESTIONS.length}</div>
        <p>{pass ? "Strong foundations. You understand the basics that most new traders skip." : "Good start. Revisit the chapters for the ones you missed, then try again."}</p>
        <div className="btn-row center">
          <button type="button" className="btn-ghost" onClick={restart}>Retake quiz</button>
          <a className="btn" href="/copy-trading">See how copying works</a>
        </div>
      </div>
    );
  }

  return (
    <div className="qz">
      <div className="qz-top">
        <span className="fx-eyebrow">Question {i + 1} of {QUESTIONS.length}</span>
        <span className="qz-dots" aria-hidden="true">
          {QUESTIONS.map((_, k) => <i key={k} className={k < i ? "past" : k === i ? "now" : ""} />)}
        </span>
      </div>
      <h3 className="qz-q">{q.q}</h3>
      <div className="qz-opts">
        {q.o.map((o, k) => {
          const state = picked === null ? "" : k === q.a ? "right" : k === picked ? "wrong" : "dim";
          return (
            <button key={o} type="button" className={`qz-opt ${state}`} onClick={() => choose(k)} disabled={picked !== null && state === "dim"}>
              <span className="qz-l">{String.fromCharCode(65 + k)}</span>
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="qz-exp" role="status">
          <b>{picked === q.a ? "Correct." : "Not quite."}</b> {q.e}
        </div>
      )}
      <div className="qz-ctrl">
        <button type="button" className="btn" onClick={next} disabled={picked === null}>
          {i < QUESTIONS.length - 1 ? "Next question" : "See result"}
        </button>
      </div>
    </div>
  );
}
