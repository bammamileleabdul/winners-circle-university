"use client";

import { useRef, useState } from "react";
import { money } from "../lib/replay";

// Single-series area chart with a crosshair tooltip. Optional marks = [{ index, text }] draws
// labelled diamonds on the line (used for the points where risk doubled).
export default function BalanceChart({ values, labels, height = 260, marks = [] }) {
  const W = 720, H = height, L = 64, R = 16, T = 16, B = 30;
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);
  if (!values || values.length < 2) return null;

  const min = Math.min(...values), max = Math.max(...values);
  const pad = (max - min) * 0.12 || 1;
  const y0 = min >= 0 ? Math.max(0, min - pad) : min - pad, y1 = max + pad;
  const last = values.length - 1;
  const x = (i) => L + ((W - L - R) * i) / last;
  const y = (v) => T + (H - T - B) * (1 - (v - y0) / (y1 - y0));
  const ticks = [0, 1, 2, 3].map((k) => y0 + ((y1 - y0) * k) / 3);
  const line = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");
  const area = `${line}L${x(last)} ${H - B}L${L} ${H - B}Z`;

  const onMove = (e) => {
    const svg = svgRef.current;
    const r = svg.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.max(0, Math.min(last, Math.round(((px - L) / (W - L - R)) * last)));
    setHover({ i, left: (x(i) / W) * 100, top: (y(values[i]) / H) * 100 });
  };

  return (
    <div className="bc">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Balance from ${money(values[0])} to ${money(values[last])}`}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="bc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c36a" stopOpacity=".3" />
            <stop offset="1" stopColor="#e6c36a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t, k) => (
          <g key={k}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="rgba(230,195,106,.14)" />
            <text x={L - 10} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#a79e89" fontFamily="JetBrains Mono, monospace">
              ${Math.round(t).toLocaleString("en-US")}
            </text>
          </g>
        ))}
        <text x={L} y={H - 8} fontSize="11" fill="#a79e89" fontFamily="JetBrains Mono, monospace">{labels[0]}</text>
        <text x={W - R} y={H - 8} textAnchor="end" fontSize="11" fill="#a79e89" fontFamily="JetBrains Mono, monospace">{labels[last]}</text>
        <path d={area} fill="url(#bc-fill)" />
        <path d={line} fill="none" stroke="#e6c36a" strokeWidth="2" strokeLinejoin="round" />
        <circle cx={x(last)} cy={y(values[last])} r="5" fill="#e6c36a" stroke="#0b0b0b" strokeWidth="2" />
        {marks.map((m, k) => (
          <g key={k}>
            <rect
              x={x(m.index) - 5}
              y={y(values[m.index]) - 5}
              width="10"
              height="10"
              transform={`rotate(45 ${x(m.index)} ${y(values[m.index])})`}
              fill="#0b0b0b"
              stroke="#f6dfa0"
              strokeWidth="2"
            />
            <text x={x(m.index)} y={y(values[m.index]) - 12} textAnchor="middle" fontSize="11" fill="#f6dfa0" fontFamily="JetBrains Mono, monospace">
              {m.text}
            </text>
          </g>
        ))}
        {hover && (
          <>
            <line x1={x(hover.i)} x2={x(hover.i)} y1={T} y2={H - B} stroke="#a79e89" strokeDasharray="3 3" />
            <circle cx={x(hover.i)} cy={y(values[hover.i])} r="5" fill="#e6c36a" stroke="#0b0b0b" strokeWidth="2" />
          </>
        )}
        <rect x={L} y={T} width={W - L - R} height={H - T - B} fill="transparent" />
      </svg>
      {hover && (
        <div className="bc-tip" style={{ left: `clamp(70px, ${hover.left}%, calc(100% - 70px))`, top: `${hover.top}%` }}>
          {labels[hover.i]}
          <br />
          <b>{money(values[hover.i])}</b>
        </div>
      )}
      <style jsx>{`
        .bc {
          position: relative;
          width: 100%;
        }
        svg {
          display: block;
          width: 100%;
          height: auto;
          touch-action: pan-y;
        }
        .bc-tip {
          position: absolute;
          transform: translate(-50%, -115%);
          pointer-events: none;
          padding: 8px 10px;
          background: #0b0a08;
          border: 1px solid var(--gold-deep);
          font: 400 12px/1.5 var(--mono);
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
        .bc-tip b {
          color: var(--gold);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
