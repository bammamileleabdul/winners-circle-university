"use client";

import { useEffect, useState } from "react";
import { XP_MISSION, XP_CORRECT } from "./missions";
import PipCalculator from "./PipCalculator";
import LeverageLab from "./LeverageLab";
import RiskRewardLab from "./RiskRewardLab";
import SessionClock from "./SessionClock";
import CandleAnatomy from "./CandleAnatomy";

export const TOOLS = {
  pips: { name: "Money math calculator", C: PipCalculator },
  leverage: { name: "Leverage lab", C: LeverageLab },
  rr: { name: "Win rate vs reward:risk", C: RiskRewardLab },
  clock: { name: "Live market clock", C: SessionClock },
  candle: { name: "Candle anatomy", C: CandleAnatomy },
};

function Slide({ s, n }) {
  if (s.kind === "split") {
    return (
      <div className="sl sl-split">
        {[s.left, s.right].map((side, k) => (
          <div key={k} className={`side ${k ? "neg" : "pos"}`}>
            <span className="tag">{side.tag}</span>
            <b>{side.head}</b>
            <p>{side.text}</p>
          </div>
        ))}
      </div>
    );
  }
  if (s.kind === "stat") {
    return (
      <div className="sl sl-stat">
        <span className="fx-eyebrow">{s.kicker}</span>
        <div className="stat fx-gradient-text">{s.stat}</div>
        <p>{s.text}</p>
      </div>
    );
  }
  if (s.kind === "list") {
    return (
      <div className="sl sl-list">
        <h3>{s.head}</h3>
        <ol>
          {s.items.map((it, k) => (
            <li key={it} style={{ animationDelay: `${0.1 + k * 0.12}s` }}>
              <span>{String(k + 1).padStart(2, "0")}</span>
              {it}
            </li>
          ))}
        </ol>
      </div>
    );
  }
  if (s.kind === "candles") {
    return (
      <div className="sl sl-candles">
        {[
          { cls: "bull", name: "Bullish", note: "Closed higher than it opened" },
          { cls: "bear", name: "Bearish", note: "Closed lower than it opened" },
        ].map((c) => (
          <div key={c.cls} className={`cnd ${c.cls}`}>
            <div className="cnd-fig" aria-hidden="true">
              <i className="wick" />
              <i className="body" />
              <span className="lbl hi">High</span>
              <span className="lbl op">{c.cls === "bull" ? "Open" : "Close"}</span>
              <span className="lbl cl">{c.cls === "bull" ? "Close" : "Open"}</span>
              <span className="lbl lo">Low</span>
            </div>
            <b>{c.name}</b>
            <p>{c.note}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="sl sl-big">
      <span className="ghost" aria-hidden="true">{String(n).padStart(2, "0")}</span>
      <h3>{s.big}</h3>
      {s.text && <p>{s.text}</p>}
    </div>
  );
}

// Story-style mission: tap through cards, answer the challenge, claim XP.
export default function MissionPlayer({ mission, number, total, alreadyDone: doneAtStart, onFinish, onNext }) {
  const steps = mission.slides.length;
  const [alreadyDone] = useState(doneAtStart);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const [showTool, setShowTool] = useState(false);
  const [newRank, setNewRank] = useState(null);

  const onChallenge = step === steps;
  const onDone = step === steps + 1;
  const correct = picked === mission.q.a;
  const gained = alreadyDone ? 0 : XP_MISSION + (correct ? XP_CORRECT : 0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" && step < steps) setStep((s) => s + 1);
      if (e.key === "ArrowLeft" && step > 0 && !onDone) setStep((s) => s - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, steps, onDone]);

  const claim = () => {
    setStep(steps + 1);
    if (!claimed) {
      setClaimed(true);
      const rank = onFinish(gained);
      if (rank) setNewRank(rank);
    }
  };

  const Tool = mission.tool ? TOOLS[mission.tool].C : null;

  return (
    <div className="mp">
      <div className="mp-top">
        <div className="mp-meta">
          <span className="fx-eyebrow">Mission {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <span className="mp-code">{mission.code}</span>
        </div>
        <div className="mp-bars" aria-hidden="true">
          {Array.from({ length: steps + 1 }).map((_, k) => (
            <i key={k} className={k < step || onDone ? "full" : k === step ? "now" : ""} />
          ))}
        </div>
      </div>

      {!onChallenge && !onDone && (
        <div className="mp-stage" key={step}>
          <button type="button" className="tap prev" aria-label="Previous card" onClick={() => step > 0 && setStep(step - 1)} />
          <button type="button" className="tap next" aria-label="Next card" onClick={() => setStep(step + 1)} />
          <Slide s={mission.slides[step]} n={step + 1} />
        </div>
      )}

      {onChallenge && (
        <div className="mp-stage ch" key="ch">
          <span className="fx-eyebrow">Challenge · +{XP_CORRECT} XP bonus</span>
          <h3 className="ch-q">{mission.q.q}</h3>
          <div className="ch-opts">
            {mission.q.o.map((o, k) => {
              const st = picked === null ? "" : k === mission.q.a ? "right" : k === picked ? "wrong" : "dim";
              return (
                <button key={o} type="button" className={`ch-opt ${st}`} onClick={() => picked === null && setPicked(k)}>
                  <span>{String.fromCharCode(65 + k)}</span>
                  {o}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <p className="ch-exp" role="status">
              <b>{correct ? "Correct." : "Not quite."}</b> {mission.q.e}
            </p>
          )}
        </div>
      )}

      {onDone && (
        <div className="mp-stage done" key="done">
          <span className="fx-eyebrow">Mission complete</span>
          <div className="xp-wrap">
            <div className="burst" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, k) => (
                <i key={k} style={{ "--a": `${k * (360 / 14)}deg` }} />
              ))}
            </div>
            <div className="xp fx-gradient-text">{gained ? `+${gained} XP` : "Replayed"}</div>
          </div>
          {newRank && (
            <div className="rank-up">
              <svg viewBox="0 0 100 110" aria-hidden="true">
                <polygon points="50,4 95,29 95,81 50,106 5,81 5,29" />
              </svg>
              <span>
                <i>Rank up</i>
                <b>{newRank}</b>
              </span>
            </div>
          )}
          <p>{gained ? (correct ? "Clean run: mission and challenge bonus." : "Mission XP banked. Nail the challenge next time for the bonus.") : "You’d already completed this one. No extra XP, but the reps count."}</p>
          {Tool && !showTool && (
            <button type="button" className="btn-ghost" onClick={() => setShowTool(true)}>
              Practise: {TOOLS[mission.tool].name}
            </button>
          )}
          {Tool && showTool && (
            <div className="tool-wrap">
              <Tool />
            </div>
          )}
        </div>
      )}

      <div className="mp-ctrl">
        {!onDone ? (
          <>
            <button type="button" className="btn-ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              Back
            </button>
            {!onChallenge ? (
              <button type="button" className="btn" onClick={() => setStep(step + 1)}>
                {step === steps - 1 ? "To the challenge" : "Next"}
              </button>
            ) : (
              <button type="button" className="btn" onClick={claim} disabled={picked === null}>
                Claim XP
              </button>
            )}
          </>
        ) : (
          <>
            <span />
            {onNext ? (
              <button type="button" className="btn" onClick={onNext}>
                Next mission
              </button>
            ) : (
              <a className="btn" href="/copy-trading">
                See how copying works
              </a>
            )}
          </>
        )}
      </div>

      <style jsx global>{`
        .mp {
          display: grid;
          grid-template-rows: auto 1fr auto;
          min-height: min(640px, calc(100vh - 32px));
        }
        .mp-top {
          display: grid;
          gap: 12px;
          padding: 20px 64px 0 24px;
        }
        .mp-meta {
          display: flex;
          gap: 14px;
          align-items: baseline;
          flex-wrap: wrap;
        }
        .mp-code {
          font: 600 15px/1 var(--display);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .mp-bars {
          display: flex;
          gap: 5px;
        }
        .mp-bars i {
          flex: 1;
          height: 3px;
          background: var(--line);
          border-radius: 2px;
          transition: background 0.3s;
        }
        .mp-bars i.full {
          background: var(--gold);
        }
        .mp-bars i.now {
          background: linear-gradient(90deg, var(--gold) 50%, var(--line) 50%);
          background-size: 200% 100%;
          animation: mp-fill 1.2s ease-out forwards;
        }
        @keyframes mp-fill {
          from {
            background-position: 100% 0;
          }
          to {
            background-position: 0 0;
          }
        }
        .mp-stage {
          position: relative;
          display: grid;
          align-content: center;
          padding: 28px 28px;
          min-height: 360px;
          animation: fx-rise 0.4s ease-out;
        }
        .tap {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 1;
          width: 35%;
          padding: 0;
          background: transparent;
          border: 0;
          cursor: pointer;
        }
        .tap:hover {
          box-shadow: none;
        }
        .tap.prev {
          left: 0;
          cursor: w-resize;
        }
        .tap.next {
          right: 0;
          width: 65%;
          cursor: e-resize;
        }
        .sl {
          position: relative;
          display: grid;
          gap: 16px;
        }
        .sl-big h3 {
          margin: 0;
          font: 700 clamp(32px, 6vw, 58px) / 1.04 var(--display);
          letter-spacing: -0.01em;
          max-width: 16ch;
        }
        .sl-big p,
        .sl-stat p {
          margin: 0;
          font-size: 19px;
          line-height: 1.55;
          color: #cfc6b1;
          max-width: 44ch;
        }
        .ghost {
          position: absolute;
          right: -4px;
          bottom: -40px;
          font: 700 200px/1 var(--display);
          color: rgba(230, 195, 106, 0.06);
          pointer-events: none;
        }
        .sl-split {
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .side {
          display: grid;
          gap: 8px;
          padding: 26px 22px;
          border: 1px solid var(--line-strong);
          background: rgba(230, 195, 106, 0.08);
        }
        .side.neg {
          border-color: rgba(224, 138, 111, 0.5);
          background: rgba(224, 138, 111, 0.08);
        }
        .side .tag {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .side.neg .tag {
          color: var(--loss);
        }
        .side b {
          font: 700 clamp(30px, 5vw, 46px) / 1 var(--display);
        }
        .side p {
          margin: 0;
          color: #cfc6b1;
          font-size: 17px;
          line-height: 1.45;
        }
        .sl-stat .stat {
          font: 700 clamp(56px, 12vw, 120px) / 1 var(--display);
          letter-spacing: -0.02em;
        }
        .sl-list h3 {
          margin: 0;
          font: 700 clamp(28px, 4.5vw, 42px) / 1.1 var(--display);
        }
        .sl-list ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 10px;
        }
        .sl-list li {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 18px;
          border: 1px solid var(--line);
          background: rgba(8, 7, 5, 0.7);
          font: 600 clamp(18px, 2.6vw, 22px) / 1.3 var(--display);
          animation: fx-rise 0.45s ease-out both;
        }
        .sl-list li span {
          font: 500 12px/1 var(--mono);
          color: var(--gold);
        }
        .sl-candles {
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          justify-items: center;
          text-align: center;
        }
        .cnd {
          display: grid;
          gap: 8px;
          justify-items: center;
        }
        .cnd-fig {
          position: relative;
          width: 160px;
          height: 200px;
        }
        .cnd .wick {
          position: absolute;
          left: 50%;
          top: 10px;
          bottom: 10px;
          width: 3px;
          transform: translateX(-50%);
          background: var(--gold);
        }
        .cnd .body {
          position: absolute;
          left: 50%;
          top: 50px;
          bottom: 50px;
          width: 40px;
          transform: translateX(-50%);
          background: var(--gold);
          border-radius: 3px;
          box-shadow: 0 0 24px rgba(230, 195, 106, 0.4);
        }
        .cnd.bear .wick,
        .cnd.bear .body {
          background: var(--loss);
          box-shadow: none;
        }
        .cnd .lbl {
          position: absolute;
          left: calc(50% + 28px);
          font: 400 12px/1 var(--mono);
          color: var(--muted);
          white-space: nowrap;
        }
        .cnd .lbl.hi {
          top: 4px;
        }
        .cnd .lbl.cl {
          top: 44px;
        }
        .cnd .lbl.op {
          bottom: 44px;
        }
        .cnd .lbl.lo {
          bottom: 4px;
        }
        .cnd b {
          font: 700 26px/1 var(--display);
        }
        .cnd p {
          margin: 0;
          color: var(--muted);
        }
        .ch {
          gap: 16px;
          align-content: start;
        }
        .ch-q {
          margin: 0;
          font: 700 clamp(24px, 4vw, 34px) / 1.2 var(--display);
        }
        .ch-opts {
          display: grid;
          gap: 10px;
        }
        .ch-opt {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          min-height: 58px;
          padding: 10px 16px;
          text-align: left;
          background: rgba(8, 7, 5, 0.7);
          color: var(--fg);
          border: 1px solid var(--line);
          font: 600 17px/1.3 var(--body);
          letter-spacing: 0;
        }
        .ch-opt:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .ch-opt span {
          flex: none;
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          font: 500 12px/1 var(--mono);
          color: var(--gold);
        }
        .ch-opt.right {
          border-color: var(--gold);
          background: rgba(230, 195, 106, 0.16);
        }
        .ch-opt.wrong {
          border-color: var(--loss);
          background: rgba(224, 138, 111, 0.12);
        }
        .ch-opt.dim {
          opacity: 0.4;
        }
        .ch-exp {
          margin: 0;
          padding: 14px 16px;
          border-left: 2px solid var(--gold);
          background: rgba(230, 195, 106, 0.06);
          line-height: 1.55;
        }
        .ch-exp b {
          color: var(--gold);
        }
        .done {
          justify-items: center;
          text-align: center;
          gap: 14px;
          overflow: hidden;
        }
        .done .xp {
          font: 700 clamp(64px, 12vw, 110px) / 1 var(--display);
        }
        .done p {
          margin: 0;
          max-width: 44ch;
          color: #cfc6b1;
          line-height: 1.55;
        }
        .tool-wrap {
          width: 100%;
          text-align: left;
        }
        .xp-wrap {
          position: relative;
          display: grid;
          place-items: center;
          padding: 18px 0;
        }
        .burst {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
        }
        .rank-up {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 18px 10px 12px;
          border: 1px solid var(--gold);
          background: rgba(230, 195, 106, 0.12);
        }
        .rank-up svg {
          width: 34px;
          height: 38px;
          fill: rgba(230, 195, 106, 0.2);
          stroke: var(--gold);
          stroke-width: 4;
        }
        .rank-up span {
          display: grid;
          gap: 4px;
          text-align: left;
        }
        .rank-up i {
          font: 500 10px/1 var(--mono);
          font-style: normal;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .rank-up b {
          font: 700 24px/1 var(--display);
          color: var(--gold);
        }
        .burst i {
          position: absolute;
          width: 4px;
          height: 18px;
          background: var(--gold);
          border-radius: 2px;
          transform: rotate(var(--a)) translateY(-40px);
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .burst i {
            animation: burst 0.9s ease-out forwards;
          }
          .rank-up {
            animation: fx-rise 0.5s 0.5s ease-out both;
          }
          .done .xp {
            animation: xp-pop 0.6s cubic-bezier(0.2, 1.4, 0.4, 1);
          }
        }
        @keyframes burst {
          0% {
            opacity: 1;
            transform: rotate(var(--a)) translateY(-30px);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--a)) translateY(-150px);
          }
        }
        @keyframes xp-pop {
          from {
            transform: scale(0.4);
          }
          to {
            transform: scale(1);
          }
        }
        .mp-ctrl {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 0 24px 24px;
        }
        @media (max-width: 560px) {
          .mp {
            min-height: 100vh;
          }
          .mp-stage {
            padding: 22px 18px;
          }
          .mp-top {
            padding: 18px 60px 0 18px;
          }
          .mp-ctrl {
            padding: 0 18px calc(18px + env(safe-area-inset-bottom, 0px));
          }
          .sl-split,
          .sl-candles {
            grid-template-columns: 1fr;
          }
          .ghost {
            font-size: 140px;
          }
        }
        .no-fx .mp-stage,
        .no-fx .sl-list li,
        .no-fx .mp-bars i.now {
          animation: none !important;
        }
      `}</style>
    </div>
  );
}
