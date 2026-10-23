"use client";

import { useId } from "react";
import { CARD_H, CARD_W, FOIL, RED, SUIT_PATHS } from "../lib/cards";

// A full playing card in SVG, matching the falling cards in the background:
// black lacquer, gold foil for spades and clubs, ember red for hearts and diamonds.
// faceDown shows the crest back; changing it turns the card over.

const W = CARD_W, H = CARD_H;
const L = 88, C = 120, R = 152;
const PIPS = {
  2: [[C, 78], [C, 258]],
  3: [[C, 78], [C, 168], [C, 258]],
  4: [[L, 78], [R, 78], [L, 258], [R, 258]],
  5: [[L, 78], [R, 78], [C, 168], [L, 258], [R, 258]],
  6: [[L, 78], [R, 78], [L, 168], [R, 168], [L, 258], [R, 258]],
  7: [[L, 78], [R, 78], [C, 123], [L, 168], [R, 168], [L, 258], [R, 258]],
  8: [[L, 78], [R, 78], [C, 123], [L, 168], [R, 168], [C, 213], [L, 258], [R, 258]],
  9: [[L, 78], [R, 78], [L, 138], [R, 138], [C, 168], [L, 198], [R, 198], [L, 258], [R, 258]],
  10: [[L, 78], [R, 78], [C, 108], [L, 138], [R, 138], [L, 198], [R, 198], [C, 228], [L, 258], [R, 258]],
};

function Suit({ suit, x, y, size, fill, flip }) {
  const k = size / 100;
  return (
    <g transform={`translate(${x} ${y})${flip ? " rotate(180)" : ""} translate(${-size / 2} ${-size / 2}) scale(${k})`} fill={fill}>
      {SUIT_PATHS[suit].map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

function Shell({ uid }) {
  return (
    <>
      <rect x="1.5" y="1.5" width={W - 3} height={H - 3} rx="18" fill={`url(#bg${uid})`} stroke="rgba(240,210,130,.95)" strokeWidth="3" />
      <rect x="13" y="13" width={W - 26} height={H - 26} rx="10" fill="none" stroke="rgba(230,195,106,.4)" strokeWidth="1.5" />
    </>
  );
}

function Defs({ uid, red }) {
  const c = red ? FOIL.red : FOIL.gold;
  return (
    <defs>
      <linearGradient id={`f${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={c[0]} />
        <stop offset=".45" stopColor={c[1]} />
        <stop offset="1" stopColor={c[2]} />
      </linearGradient>
      <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1a160f" />
        <stop offset="1" stopColor="#0a0907" />
      </linearGradient>
      <pattern id={`lat${uid}`} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0H20M0 0V20" stroke="rgba(230,195,106,.28)" strokeWidth="1.5" />
      </pattern>
      <clipPath id={`med${uid}`}>
        <circle cx={W / 2} cy={H / 2} r="60" />
      </clipPath>
    </defs>
  );
}

function Face({ rank, suit, uid }) {
  const fill = `url(#f${uid})`;
  const corner = (
    <>
      <text x="36" y="66" textAnchor="middle" fill={fill} className="pcard-rank" style={rank === "10" ? { fontSize: 38, letterSpacing: -2 } : undefined}>
        {rank}
      </text>
      <Suit suit={suit} x={36} y={90} size={28} fill={fill} />
    </>
  );
  let middle;
  if (rank === "A") {
    middle = (
      <>
        <Suit suit={suit} x={W / 2} y={H / 2 - 4} size={118} fill={fill} />
        {suit === "s" && (
          <text x={W / 2} y={H / 2 + 82} textAnchor="middle" fill="rgba(230,195,106,.7)" className="pcard-mark">
            WINNERS CIRCLE
          </text>
        )}
      </>
    );
  } else if (rank === "J" || rank === "Q" || rank === "K") {
    middle = (
      <>
        <rect x="62" y="66" width={W - 124} height={H - 132} rx="6" fill="none" stroke="rgba(230,195,106,.45)" strokeWidth="1.5" />
        <text x={W / 2} y={H / 2 + 4} textAnchor="middle" dominantBaseline="middle" fill={fill} className="pcard-court">
          {rank}
        </text>
        <Suit suit={suit} x={W / 2} y={92} size={24} fill={fill} />
        <Suit suit={suit} x={W / 2} y={H - 92} size={24} fill={fill} flip />
      </>
    );
  } else {
    middle = PIPS[rank].map(([x, y], i) => <Suit key={i} suit={suit} x={x} y={y} size={36} fill={fill} flip={y > H / 2} />);
  }
  return (
    <>
      <Shell uid={uid} />
      {corner}
      <g transform={`rotate(180 ${W / 2} ${H / 2})`}>{corner}</g>
      {middle}
    </>
  );
}

function Back({ uid }) {
  return (
    <>
      <Shell uid={uid} />
      <rect x="14" y="14" width={W - 28} height={H - 28} rx="10" fill={`url(#lat${uid})`} />
      <circle cx={W / 2} cy={H / 2} r="68" fill="#0d0b08" stroke="rgba(230,195,106,.8)" strokeWidth="2" />
      <image href="/emblem.jpg" x={W / 2 - 60} y={H / 2 - 60} width="120" height="120" clipPath={`url(#med${uid})`} preserveAspectRatio="xMidYMid slice" />
    </>
  );
}

export default function PlayingCard({ rank, suit, faceDown = false, className = "", style }) {
  const uid = useId().replace(/:/g, "");
  const red = !!RED[suit];
  const label = faceDown ? "Face-down card" : `${rank === "A" ? "Ace" : rank === "K" ? "King" : rank === "Q" ? "Queen" : rank === "J" ? "Jack" : rank} of ${{ s: "spades", h: "hearts", d: "diamonds", c: "clubs" }[suit]}`;
  return (
    <div className={`pcard ${faceDown ? "down" : ""} ${className}`} style={style} role="img" aria-label={label}>
      <div className="pcard-in">
        <svg className="pcard-face" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <Defs uid={`a${uid}`} red={red} />
          <Face rank={rank} suit={suit} uid={`a${uid}`} />
        </svg>
        <svg className="pcard-back" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <Defs uid={`b${uid}`} red={false} />
          <Back uid={`b${uid}`} />
        </svg>
      </div>
    </div>
  );
}
