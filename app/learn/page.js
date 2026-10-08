"use client";

import { useEffect, useState } from "react";
import SiteHeader from "../../components/SiteHeader";
import Scramble from "../../components/Scramble";
import Overlay from "../../components/learn/Overlay";
import MissionPlayer, { TOOLS } from "../../components/learn/MissionPlayer";
import CallIt from "../../components/learn/CallIt";
import ScamOrLegit from "../../components/learn/ScamOrLegit";
import Glossary from "../../components/learn/Glossary";
import ToolStyles from "../../components/learn/ToolStyles";
import { MISSIONS, RANKS, XP_MISSION, XP_CORRECT, rankOf } from "../../components/learn/missions";

const KEY = "wcu-academy";
const TABS = [
  { k: "missions", t: "Missions", d: "8 missions" },
  { k: "arena", t: "Arena", d: "2 games" },
  { k: "toolkit", t: "Toolkit", d: "5 tools" },
  { k: "decoder", t: "Decoder", d: "Trading words" },
];
const GAMES = [
  { k: "callit", t: "Call It", d: "10 rounds. Up or down? Find out if you can really predict the market.", xp: "+50 XP" },
  { k: "scam", t: "Scam or Legit", d: "Swipe through 8 offers. Spot the scams before they spot you.", xp: "Up to +80 XP" },
];

export default function AcademyPage() {
  const [p, setP] = useState({ done: [], xp: 0, games: {} });
  const [tab, setTab] = useState("missions");
  const [open, setOpen] = useState(null); // { type: "mission"|"game"|"tool", id }
  const [toast, setToast] = useState(null);
  const [rankUp, setRankUp] = useState(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s && Array.isArray(s.done)) setP({ done: s.done, xp: s.xp || 0, games: s.games || {} });
    } catch {}
  }, []);

  const save = (next) => {
    setP(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  // Add XP, apply a progress change, and celebrate (toast, rank-up).
  const award = (xp, patch, quiet = false) => {
    const before = rankOf(p.xp).i;
    const next = { ...p, ...patch(p), xp: p.xp + xp };
    save(next);
    if (xp > 0) {
      if (!quiet) setToast({ xp, id: Date.now() });
      const after = rankOf(next.xp).i;
      if (after > before) setTimeout(() => setRankUp(RANKS[after].name), 900);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const r = rankOf(p.xp);
  const doneCount = p.done.length;
  const nextIdx = MISSIONS.findIndex((m) => !p.done.includes(m.id));
  const unlocked = (i) => i === 0 || p.done.includes(MISSIONS[i - 1].id) || p.done.includes(MISSIONS[i].id);
  const gamesDone = GAMES.filter((g) => p.games[g.k]).length;

  const startMission = (i) => {
    if (!unlocked(i)) {
      setToast({ msg: `Complete Mission ${String(i).padStart(2, "0")} to unlock this one.`, id: Date.now() });
      return;
    }
    setOpen({ type: "mission", id: i });
  };

  const missionIdx = open?.type === "mission" ? open.id : null;
  const mission = missionIdx !== null ? MISSIONS[missionIdx] : null;

  return (
    <>
      <SiteHeader />
      <ToolStyles />

      <main className="ac">
        {/* HUD */}
        <section className="hud">
          <div className="hud-copy">
            <span className="fx-eyebrow">Winners Circle Academy</span>
            <h1 className="hud-title">
              <Scramble text="From Rookie" className="l1" />
              <Scramble text="to Winner." className="l2 fx-gradient-text" delay={250} />
            </h1>
            <p className="hud-p">
              No boring lectures. Short missions, mini-games and real tools. Learn how the market actually works, earn XP
              and rank up.
            </p>
            <div className="btn-row">
              <button type="button" className="btn fx-mag big" onClick={() => startMission(nextIdx === -1 ? 0 : nextIdx)}>
                {doneCount === 0 ? "Start Mission 01" : nextIdx === -1 ? "Replay missions" : `Continue: Mission ${String(nextIdx + 1).padStart(2, "0")}`}
              </button>
              <button type="button" className="btn-ghost fx-mag big" onClick={() => setTab("arena")}>
                Play the Arena
              </button>
            </div>
          </div>

          <div className="card-rank fx-hud fx-tilt" data-tilt="5">
            <div className="badge" aria-hidden="true">
              <svg viewBox="0 0 100 110">
                <polygon points="50,4 95,29 95,81 50,106 5,81 5,29" className="hex-o" />
                <polygon points="50,16 84,35 84,75 50,94 16,75 16,35" className="hex-i" />
              </svg>
              <span className="badge-n">{r.i + 1}</span>
            </div>
            <div className="rk">
              <span className="fx-eyebrow">Your rank</span>
              <b className="rk-name">{r.cur.name}</b>
              <span className="rk-xp">{p.xp} XP</span>
            </div>
            <div className="xpbar" aria-label={r.next ? `${r.next.xp - p.xp} XP to ${r.next.name}` : "Top rank reached"}>
              <i style={{ width: `${r.pct}%` }} />
            </div>
            <span className="rk-next">{r.next ? `${r.next.xp - p.xp} XP to ${r.next.name}` : "Top rank. You’re a Winner."}</span>
            <div className="rk-stats">
              <div><b>{doneCount}/8</b><span>Missions</span></div>
              <div><b>{gamesDone}/2</b><span>Games</span></div>
              <div><b>{p.xp}</b><span>XP</span></div>
            </div>
          </div>
        </section>

        {/* Rank ladder */}
        <div className="ladder" aria-label="Ranks">
          {RANKS.map((rk, k) => (
            <div key={rk.name} className={`rung ${k <= r.i ? "on" : ""} ${k === r.i ? "cur" : ""}`}>
              <i />
              <b>{rk.name}</b>
              <span>{rk.xp} XP</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs" role="tablist" aria-label="Academy sections" id="missions">
          {TABS.map((t) => (
            <button key={t.k} type="button" role="tab" aria-selected={tab === t.k} className="tab" onClick={() => setTab(t.k)}>
              <b>{t.t}</b>
              <span>{t.d}</span>
            </button>
          ))}
        </div>

        {tab === "missions" && (
          <section className="pane" key="missions">
            <div className="track" aria-hidden="true">
              {MISSIONS.map((m) => (
                <i key={m.id} className={p.done.includes(m.id) ? "on" : ""} />
              ))}
            </div>
            <div className="mgrid">
              {MISSIONS.map((m, i) => {
                const isDone = p.done.includes(m.id);
                const isOpen = unlocked(i);
                const isNext = i === nextIdx;
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`mcard fx-tilt ${isDone ? "done" : ""} ${isOpen ? "" : "locked"} ${isNext ? "next" : ""}`}
                    onClick={() => startMission(i)}
                  >
                    <span className="m-n">{String(i + 1).padStart(2, "0")}</span>
                    <svg viewBox="0 0 32 32" aria-hidden="true">
                      <path d={isOpen ? m.icon : "M9 14V10a7 7 0 0 1 14 0v4M7 14h18v13H7z"} />
                    </svg>
                    <span className="m-code">{m.code}</span>
                    <b className="m-title">{m.title}</b>
                    <span className="m-foot">
                      <span>+{XP_MISSION + XP_CORRECT} XP</span>
                      <span className="m-state">{isDone ? "Complete ✓" : isOpen ? (isNext ? "Play now" : "Ready") : "Locked"}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {tab === "arena" && (
          <section className="pane arena" key="arena">
            {GAMES.map((g) => (
              <button key={g.k} type="button" className={`gcard fx-tilt ${g.k}`} onClick={() => setOpen({ type: "game", id: g.k })}>
                <div className="g-art" aria-hidden="true">
                  {g.k === "callit" ? (
                    <svg viewBox="0 0 200 90">
                      {Array.from({ length: 14 }).map((_, k) => {
                        const up = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0][k];
                        const base = 60 - k * 2.2 + (up ? 0 : 6);
                        return (
                          <g key={k}>
                            <line x1={10 + k * 13} x2={10 + k * 13} y1={base - 18} y2={base + 10} stroke={up ? "#e6c36a" : "#e08a6f"} />
                            <rect x={6 + k * 13} y={base - 12} width="8" height="16" fill={up ? "#e6c36a" : "#e08a6f"} />
                          </g>
                        );
                      })}
                      <text x="190" y="40" textAnchor="end" fontSize="34" fill="#e6c36a" fontFamily="Saira, sans-serif">?</text>
                    </svg>
                  ) : (
                    <div className="stack">
                      <i />
                      <i />
                      <i>✕ / ✓</i>
                    </div>
                  )}
                </div>
                <span className="fx-eyebrow">{p.games[g.k] ? "Played ✓" : g.xp}</span>
                <b>{g.t}</b>
                <p>{g.d}</p>
                <span className="g-play">Play</span>
              </button>
            ))}
          </section>
        )}

        {tab === "toolkit" && (
          <section className="pane tools" key="toolkit">
            {Object.entries(TOOLS).map(([k, t]) => (
              <button key={k} type="button" className="tcard fx-tilt" onClick={() => setOpen({ type: "tool", id: k })}>
                <span className="fx-eyebrow">Tool</span>
                <b>{t.name}</b>
                <span className="g-play">Open</span>
              </button>
            ))}
          </section>
        )}

        {tab === "decoder" && (
          <section className="pane decoder fx-glass" key="decoder">
            <span className="fx-eyebrow">Decoder</span>
            <h2>Crack the trading lingo</h2>
            <Glossary />
          </section>
        )}

        <p className="fx-notice note">
          <b>Real talk</b>
          <span>This is education, not financial advice. Trading is high risk and you can lose the money you invest.</span>
        </p>
      </main>

      {mission && (
        <Overlay label={`Mission ${missionIdx + 1}`} onClose={() => setOpen(null)}>
          <MissionPlayer
            key={mission.id}
            mission={mission}
            number={missionIdx + 1}
            total={MISSIONS.length}
            alreadyDone={p.done.includes(mission.id)}
            onFinish={(xp) => award(xp, (prev) => ({ done: prev.done.includes(mission.id) ? prev.done : [...prev.done, mission.id] }), true)}
            onNext={missionIdx + 1 < MISSIONS.length ? () => setOpen({ type: "mission", id: missionIdx + 1 }) : null}
          />
        </Overlay>
      )}

      {open?.type === "game" && (
        <Overlay label={open.id === "callit" ? "Call It" : "Scam or Legit"} onClose={() => setOpen(null)} wide={open.id === "callit"}>
          {open.id === "callit" ? (
            <CallIt
              onClose={() => setOpen(null)}
              onFinish={() => !p.games.callit && award(50, (prev) => ({ games: { ...prev.games, callit: true } }))}
            />
          ) : (
            <ScamOrLegit
              onClose={() => setOpen(null)}
              onFinish={(score) => !p.games.scam && award(score * 10, (prev) => ({ games: { ...prev.games, scam: true } }))}
            />
          )}
        </Overlay>
      )}

      {open?.type === "tool" && (
        <Overlay label={TOOLS[open.id].name} onClose={() => setOpen(null)} wide>
          <div className="tool-ov">
            {(() => {
              const C = TOOLS[open.id].C;
              return <C />;
            })()}
          </div>
        </Overlay>
      )}

      {toast && (
        <div className="toast" key={toast.id} role="status">
          {toast.xp ? <b className="fx-gradient-text">+{toast.xp} XP</b> : <span>{toast.msg}</span>}
        </div>
      )}

      {rankUp && (
        <div className="rankup" role="dialog" aria-label="Rank up" onClick={() => setRankUp(null)}>
          <div className="ru-in">
            <span className="fx-eyebrow">Rank up</span>
            <b className="fx-gradient-text">{rankUp}</b>
            <button type="button" className="btn" onClick={() => setRankUp(null)}>Keep going</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .ac {
          max-width: 1180px;
          margin: 0 auto;
          padding: 40px 16px 100px;
          display: grid;
          gap: 26px;
        }
        .ac > * {
          min-width: 0;
        }

        /* HUD */
        .hud {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 880px) {
          .hud {
            grid-template-columns: 1fr;
          }
        }
        .hud-copy {
          display: grid;
          gap: 20px;
        }
        .hud-title {
          margin: 0;
          display: grid;
          font: 700 clamp(46px, 7vw, 84px) / 0.95 var(--display);
          letter-spacing: -0.01em;
        }
        .hud-p {
          margin: 0;
          max-width: 46ch;
          font-size: 19px;
          line-height: 1.55;
          color: #cfc6b1;
        }
        .btn.big,
        .btn-ghost.big {
          min-height: 56px;
          padding: 0 26px;
          font-size: 14px;
        }
        .card-rank {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 14px 18px;
          align-items: center;
          padding: 24px;
          border: 1px solid var(--line-strong);
          background: linear-gradient(160deg, rgba(230, 195, 106, 0.14), rgba(12, 11, 8, 0.8) 60%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .badge {
          position: relative;
          width: 92px;
          height: 100px;
          display: grid;
          place-items: center;
        }
        .badge svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .hex-o {
          fill: none;
          stroke: var(--gold);
          stroke-width: 2;
          filter: drop-shadow(0 0 8px rgba(230, 195, 106, 0.6));
        }
        .hex-i {
          fill: rgba(230, 195, 106, 0.14);
          stroke: rgba(230, 195, 106, 0.4);
          stroke-dasharray: 4 4;
        }
        .badge-n {
          position: relative;
          font: 700 40px/1 var(--display);
          color: var(--gold);
        }
        .rk {
          display: grid;
          gap: 6px;
        }
        .rk-name {
          font: 700 clamp(30px, 4vw, 40px) / 1 var(--display);
        }
        .rk-xp {
          font: 500 14px/1 var(--mono);
          color: var(--gold);
        }
        .xpbar {
          grid-column: 1 / -1;
          height: 10px;
          background: rgba(230, 195, 106, 0.12);
          border: 1px solid var(--line);
          overflow: hidden;
        }
        .xpbar i {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--gold-deep), var(--gold), var(--gold-hi));
          box-shadow: 0 0 14px var(--gold);
          transition: width 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .rk-next {
          grid-column: 1 / -1;
          font: 400 12px/1 var(--mono);
          color: var(--muted);
        }
        .rk-stats {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--line);
        }
        .rk-stats div {
          display: grid;
          gap: 6px;
          padding: 12px;
          border-right: 1px solid var(--line);
          background: rgba(8, 7, 5, 0.5);
        }
        .rk-stats div:last-child {
          border-right: 0;
        }
        .rk-stats b {
          font: 700 22px/1 var(--display);
        }
        .rk-stats span {
          font: 500 10px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Ladder */
        .ladder {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          position: relative;
        }
        .ladder::before {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          top: 7px;
          height: 2px;
          background: var(--line);
        }
        .rung {
          position: relative;
          display: grid;
          justify-items: center;
          gap: 6px;
          text-align: center;
        }
        .rung i {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #1a1610;
          border: 2px solid var(--line-strong);
        }
        .rung.on i {
          background: var(--gold);
          border-color: var(--gold);
        }
        .rung.cur i {
          box-shadow: 0 0 0 5px rgba(230, 195, 106, 0.18), 0 0 16px var(--gold);
          animation: fx-pulse 2s infinite;
        }
        .rung b {
          font: 600 15px/1 var(--display);
          color: var(--muted);
        }
        .rung.on b {
          color: var(--fg);
        }
        .rung span {
          font: 400 11px/1 var(--mono);
          color: var(--muted);
        }

        /* Tabs */
        .tabs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          scroll-margin-top: 90px;
        }
        @media (max-width: 640px) {
          .tabs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .tab {
          display: grid;
          gap: 6px;
          padding: 16px 18px;
          text-align: left;
          background: rgba(15, 13, 10, 0.66);
          color: var(--fg);
          border: 1px solid var(--line);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);
        }
        .tab:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .tab b {
          font: 700 22px/1 var(--display);
        }
        .tab span {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .tab[aria-selected="true"] {
          background: linear-gradient(135deg, var(--gold-deep), var(--gold) 60%, var(--gold-hi));
          border-color: var(--gold);
          color: #0b0b0b;
        }
        .tab[aria-selected="true"] span {
          color: rgba(11, 11, 11, 0.7);
        }
        .pane {
          animation: fx-rise 0.45s ease-out;
        }

        /* Missions */
        .track {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
        }
        .track i {
          flex: 1;
          height: 4px;
          background: var(--line);
        }
        .track i.on {
          background: var(--gold);
          box-shadow: 0 0 10px var(--gold);
        }
        .mgrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }
        @media (max-width: 980px) {
          .mgrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 480px) {
          .mgrid {
            grid-template-columns: 1fr;
          }
        }
        .mcard {
          position: relative;
          display: grid;
          gap: 8px;
          align-content: start;
          min-height: 230px;
          padding: 22px 20px 18px;
          text-align: left;
          background: rgba(15, 13, 10, 0.7);
          color: var(--fg);
          border: 1px solid var(--line);
          font-weight: 400;
          letter-spacing: 0;
          overflow: hidden;
          clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .mcard:hover {
          box-shadow: none;
          border-color: var(--gold);
          background: rgba(28, 24, 15, 0.8);
        }
        .m-n {
          position: absolute;
          right: 14px;
          top: 6px;
          font: 700 64px/1 var(--display);
          color: rgba(230, 195, 106, 0.1);
        }
        .mcard svg {
          width: 34px;
          height: 34px;
          fill: none;
          stroke: var(--gold);
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .m-code {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 6px;
        }
        .m-title {
          font: 700 22px/1.15 var(--display);
        }
        .m-foot {
          margin-top: auto;
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font: 500 12px/1 var(--mono);
          color: var(--muted);
        }
        .m-state {
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .mcard.locked {
          opacity: 0.5;
        }
        .mcard.locked svg {
          stroke: var(--muted);
        }
        .mcard.locked .m-state {
          color: var(--muted);
        }
        .mcard.done {
          border-color: var(--gold-deep);
          background: linear-gradient(160deg, rgba(230, 195, 106, 0.16), rgba(15, 13, 10, 0.75) 65%);
        }
        .mcard.next {
          border-color: var(--gold);
          box-shadow: inset 0 0 0 1px var(--gold), 0 0 30px rgba(230, 195, 106, 0.25);
        }
        .mcard.next::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 30%, rgba(246, 223, 160, 0.14) 50%, transparent 70%);
          transform: translateX(-100%);
          animation: sweep 2.6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes sweep {
          60%,
          100% {
            transform: translateX(100%);
          }
        }

        /* Arena */
        .arena {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 760px) {
          .arena {
            grid-template-columns: 1fr;
          }
        }
        .gcard,
        .tcard {
          display: grid;
          gap: 10px;
          align-content: start;
          padding: 22px;
          text-align: left;
          background: rgba(15, 13, 10, 0.7);
          color: var(--fg);
          border: 1px solid var(--line);
          font-weight: 400;
          letter-spacing: 0;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .gcard:hover,
        .tcard:hover {
          box-shadow: none;
          border-color: var(--gold);
        }
        .gcard b,
        .tcard b {
          font: 700 30px/1.1 var(--display);
        }
        .tcard b {
          font-size: 22px;
        }
        .gcard p {
          margin: 0;
          color: var(--muted);
          line-height: 1.55;
          font-size: 16px;
        }
        .g-art {
          height: 130px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          background: radial-gradient(circle at 50% 60%, rgba(230, 195, 106, 0.14), rgba(8, 7, 5, 0.6) 70%);
          margin-bottom: 6px;
        }
        .g-art svg {
          width: 80%;
          height: auto;
        }
        .stack {
          position: relative;
          width: 150px;
          height: 96px;
        }
        .stack i {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          background: #14110c;
          font: 700 22px/1 var(--display);
          font-style: normal;
          color: var(--gold);
        }
        .stack i:nth-child(1) {
          transform: rotate(-8deg) translateX(-14px);
          opacity: 0.5;
        }
        .stack i:nth-child(2) {
          transform: rotate(5deg) translateX(10px);
          opacity: 0.75;
        }
        .g-play {
          margin-top: 6px;
          font: 600 12px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .g-play::after {
          content: " →";
        }
        .tools {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }
        .tcard {
          min-height: 150px;
        }
        .tool-ov {
          padding: 56px 20px 20px;
        }
        .decoder {
          display: grid;
          gap: 12px;
          padding: 24px;
        }
        .decoder h2 {
          margin: 0 0 6px;
          font-size: clamp(28px, 4vw, 40px);
        }
        .note {
          margin: 0;
        }

        /* Games */
        .game {
          display: grid;
          gap: 16px;
          padding: 24px;
        }
        .g-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding-right: 48px;
        }
        .g-score {
          font: 500 13px/1 var(--mono);
          color: var(--muted);
        }
        .g-score b {
          color: var(--gold);
          font-size: 18px;
        }
        .g-q {
          margin: 0;
          font: 700 clamp(26px, 4vw, 38px) / 1.1 var(--display);
        }
        .g-chart {
          border: 1px solid var(--line);
          background: rgba(6, 5, 4, 0.7);
          padding: 8px;
        }
        .g-chart svg {
          display: block;
          width: 100%;
          height: auto;
        }
        .g-chart .rev {
          animation: fx-rise 0.4s ease-out both;
        }
        .g-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-items: center;
        }
        .g-btns.one {
          grid-template-columns: 1fr;
        }
        .g-btn {
          min-height: 64px;
          font: 700 20px/1 var(--display);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .g-btn.up {
          background: linear-gradient(135deg, var(--gold-deep), var(--gold));
          color: #0b0b0b;
        }
        .g-btn.down {
          background: linear-gradient(135deg, #7a3f2c, var(--loss));
          color: #0b0b0b;
        }
        .g-res {
          margin: 0;
          font: 600 17px/1.3 var(--display);
        }
        .g-res.ok {
          color: var(--gold);
        }
        .g-res.no {
          color: var(--loss);
        }
        .done-g {
          justify-items: center;
          text-align: center;
          padding: 48px 24px 32px;
        }
        .done-g h3 {
          margin: 0;
          font: 700 clamp(24px, 3.6vw, 32px) / 1.2 var(--display);
        }
        .done-g p {
          margin: 0;
          max-width: 52ch;
          color: #cfc6b1;
          line-height: 1.6;
        }
        .big-score {
          font: 700 clamp(70px, 14vw, 120px) / 1 var(--display);
        }
        .btn-row.center {
          justify-content: center;
        }
        .sw-zone {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 280px;
          overflow: hidden;
        }
        .sw-hint {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font: 700 22px/1 var(--display);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.25;
          transition: opacity 0.2s;
        }
        .sw-hint.l {
          left: 6px;
          color: var(--loss);
        }
        .sw-hint.r {
          right: 6px;
          color: var(--gold);
        }
        .sw-hint.on {
          opacity: 1;
        }
        .sw-card {
          width: min(440px, 76%);
          min-height: 240px;
          display: grid;
          align-content: center;
          gap: 14px;
          padding: 26px;
          border: 1px solid var(--line-strong);
          background: linear-gradient(160deg, #1c180f, #0d0b08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          touch-action: pan-y;
          cursor: grab;
          user-select: none;
          transition: transform 0.15s ease-out, border-color 0.2s;
        }
        .sw-card p {
          margin: 0;
          font: 600 clamp(19px, 2.6vw, 23px) / 1.4 var(--display);
        }
        .sw-card.ok {
          border-color: var(--gold);
        }
        .sw-card.no {
          border-color: var(--loss);
        }
        .sw-verdict {
          display: grid;
          gap: 6px;
          padding-top: 12px;
          border-top: 1px solid var(--line);
          font-size: 15px;
          line-height: 1.5;
          color: #cfc6b1;
        }
        .sw-card.ok .sw-verdict b {
          color: var(--gold);
        }
        .sw-card.no .sw-verdict b {
          color: var(--loss);
        }
        .sw-tip {
          margin: 0;
          text-align: center;
          font: 400 12px/1 var(--mono);
          color: var(--muted);
        }

        /* Toast + rank up */
        .toast {
          position: fixed;
          left: 50%;
          bottom: calc(90px + env(safe-area-inset-bottom, 0px));
          z-index: 10010;
          transform: translateX(-50%);
          padding: 14px 22px;
          background: rgba(12, 11, 8, 0.95);
          border: 1px solid var(--gold);
          box-shadow: 0 0 40px rgba(230, 195, 106, 0.35);
          font-size: 15px;
          max-width: calc(100vw - 32px);
          animation: toast 2.2s ease forwards;
        }
        .toast b {
          font: 700 30px/1 var(--display);
        }
        @keyframes toast {
          0% {
            transform: translate(-50%, 20px);
            opacity: 0;
          }
          12%,
          80% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -20px);
            opacity: 0;
          }
        }
        .rankup {
          position: fixed;
          inset: 0;
          z-index: 10020;
          display: grid;
          place-items: center;
          background: radial-gradient(circle, rgba(230, 195, 106, 0.25), rgba(3, 3, 2, 0.92) 60%);
          animation: fx-rise 0.4s ease-out;
        }
        .ru-in {
          display: grid;
          justify-items: center;
          gap: 18px;
          text-align: center;
        }
        .ru-in b {
          font: 700 clamp(64px, 14vw, 140px) / 1 var(--display);
          animation: xp-pop 0.7s cubic-bezier(0.2, 1.4, 0.4, 1);
        }
        @keyframes xp-pop {
          from {
            transform: scale(0.4);
          }
          to {
            transform: scale(1);
          }
        }
        .no-fx .pane,
        .no-fx .mcard.next::before,
        .no-fx .rung.cur i,
        .no-fx .toast,
        .no-fx .rankup,
        .no-fx .ru-in b {
          animation: none !important;
        }
      `}</style>
    </>
  );
}
