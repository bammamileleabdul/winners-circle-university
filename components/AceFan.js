"use client";

import PlayingCard from "./PlayingCard";

const HAND = ["s", "h", "c", "d"];

// Four aces fanned out behind the emblem: dealt in once on load, spreading wider on hover.
export default function AceFan() {
  return (
    <div className="ace-fan" aria-hidden="true">
      {HAND.map((s, i) => (
        <div key={s} className="pc" style={{ "--i": i, "--a": `${(i - 1.5) * 22}deg` }}>
          <PlayingCard rank="A" suit={s} />
        </div>
      ))}
    </div>
  );
}
