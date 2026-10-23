"use client";

import { useId } from "react";
import { CARD_H, CARD_W, FOIL, RED, SUIT_PATHS } from "../lib/cards";

function Suit({ suit, x, y, size, fill }) {
  const k = size / 100;
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${k})`} fill={fill}>
      {SUIT_PATHS[suit].map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

// One ace, drawn as SVG so it stays sharp at any size. Matches the falling cards in the background.
function Ace({ suit }) {
  const uid = useId().replace(/:/g, "");
  const red = !!RED[suit];
  const c = red ? FOIL.red : FOIL.gold;
  const g = `f${uid}`;
  const W = CARD_W, H = CARD_H;
  const corner = (
    <>
      <text x="36" y="66" textAnchor="middle" fill={`url(#${g})`} className="pc-rank">
        A
      </text>
      <Suit suit={suit} x={36} y={90} size={28} fill={`url(#${g})`} />
    </>
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c[0]} />
          <stop offset=".45" stopColor={c[1]} />
          <stop offset="1" stopColor={c[2]} />
        </linearGradient>
        <linearGradient id={`b${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a160f" />
          <stop offset="1" stopColor="#0a0907" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width={W - 3} height={H - 3} rx="18" fill={`url(#b${uid})`} stroke="rgba(230,195,106,.85)" strokeWidth="3" />
      <rect x="13" y="13" width={W - 26} height={H - 26} rx="10" fill="none" stroke="rgba(230,195,106,.32)" strokeWidth="1.5" />
      {corner}
      <g transform={`rotate(180 ${W / 2} ${H / 2})`}>{corner}</g>
      <Suit suit={suit} x={W / 2} y={H / 2 - 4} size={118} fill={`url(#${g})`} />
    </svg>
  );
}

const HAND = ["s", "h", "c", "d"];

// Four aces fanned out behind the emblem: dealt in once on load, spreading wider on hover.
export default function AceFan() {
  return (
    <div className="ace-fan" aria-hidden="true">
      {HAND.map((s, i) => (
        <div key={s} className="pc" style={{ "--i": i, "--a": `${(i - 1.5) * 22}deg` }}>
          <Ace suit={s} />
        </div>
      ))}
    </div>
  );
}
