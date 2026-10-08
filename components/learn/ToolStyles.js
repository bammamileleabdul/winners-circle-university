"use client";

// Shared styles for the interactive learning tools (calculators, clock, candle, glossary).
export default function ToolStyles() {
  return (
    <style jsx global>{`
/* Interactive tools */
        .lab {
          display: grid;
          gap: 18px;
          padding: 22px;
          border: 1px solid var(--line-strong);
          border-radius: var(--radius);
          background: rgba(6, 5, 4, 0.6);
        }
        .lab-head {
          display: grid;
          gap: 8px;
        }
        .lab-head h3 {
          margin: 0;
          font-size: 22px;
        }
        .lab-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 22px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .lab-grid {
            grid-template-columns: 1fr;
          }
        }
        .lab-ctrls {
          display: grid;
          gap: 18px;
        }
        .lab-ctrls output {
          float: right;
          color: var(--gold);
        }
        .lab input[type="range"] {
          width: 100%;
          accent-color: var(--gold);
        }
        .two-in {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chips.tight {
          margin-top: 10px;
        }
        .chips.center {
          justify-content: center;
        }
        .chip {
          padding: 10px 13px;
          background: transparent;
          color: var(--fg);
          border: 1px solid var(--line);
          font: 500 13px/1 var(--mono);
          letter-spacing: 0;
          text-transform: none;
        }
        .chip:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .chip[aria-pressed="true"] {
          border-color: var(--gold);
          color: var(--gold);
          background: var(--gold-soft);
        }
        .lab-out {
          display: grid;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }
        .lab-out > div {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          padding: 14px 16px;
          background: rgba(8, 7, 5, 0.8);
        }
        .lab-out > div.col {
          display: grid;
          gap: 8px;
        }
        .lab-out > div.hl {
          background: rgba(230, 195, 106, 0.1);
        }
        .lab-out span {
          font: 500 11px/1.3 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .lab-out b {
          font: 600 24px/1 var(--display);
          font-variant-numeric: tabular-nums;
        }
        .lab-out .up {
          color: var(--gold);
        }
        .lab-out .down {
          color: var(--loss);
        }
        .lab-out .parts {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 12px 16px;
          background: rgba(8, 7, 5, 0.8);
          justify-content: flex-start;
        }
        .lab-note {
          margin: 0;
          padding: 12px 16px;
          background: rgba(8, 7, 5, 0.8);
          font-size: 14px;
          line-height: 1.55;
          color: var(--muted);
        }
        .gl .lab-note,
        .sc + .lab-note {
          border: 1px solid var(--line);
        }
        .meter {
          position: relative;
          height: 14px;
          margin-top: 26px;
          background: var(--line);
        }
        .meter-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--gold-deep), var(--gold));
          transition: width 0.3s;
        }
        .meter-mark {
          position: absolute;
          top: -6px;
          bottom: -6px;
          width: 2px;
          background: var(--fg);
          transition: left 0.3s;
        }
        .meter-mark span {
          position: absolute;
          bottom: calc(100% + 4px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font: 500 11px/1 var(--mono);
          color: var(--fg);
        }

        /* Session clock */
        .sc {
          display: grid;
          gap: 8px;
        }
        .sc-row {
          display: grid;
          grid-template-columns: 12px 100px 100px 110px minmax(60px, 1fr) 70px;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border: 1px solid var(--line);
          background: rgba(8, 7, 5, 0.6);
          font-size: 14px;
        }
        .sc-row.on {
          border-color: var(--gold-deep);
          background: rgba(230, 195, 106, 0.08);
        }
        .sc-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #3a3325;
        }
        .sc-row.on .sc-dot {
          background: var(--gold);
          animation: fx-pulse 2s infinite;
        }
        .sc-row b {
          font: 600 16px/1 var(--display);
        }
        .sc-time,
        .sc-hours {
          font: 400 12px/1 var(--mono);
          color: var(--muted);
        }
        .sc-bar {
          height: 4px;
          background: var(--line);
        }
        .sc-bar i {
          display: block;
          height: 100%;
          background: var(--gold);
        }
        .sc-state {
          justify-self: end;
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .sc-row.on .sc-state {
          color: var(--gold);
        }
        @media (max-width: 620px) {
          .sc-row {
            grid-template-columns: 12px 1fr auto;
            row-gap: 6px;
          }
          .sc-hours,
          .sc-bar {
            display: none;
          }
          .sc-time {
            grid-column: 2;
            grid-row: 2;
          }
          .sc-state {
            grid-column: 3;
            grid-row: 1 / span 2;
          }
        }

        /* Candle diagram */
        .ca-fig {
          display: grid;
          gap: 12px;
        }
        .ca-fig svg {
          width: 100%;
          max-width: 360px;
          justify-self: center;
          height: auto;
          overflow: visible;
        }
        .ca-text {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: var(--fg);
        }

        /* Glossary */
        .gl {
          display: grid;
          gap: 8px;
        }
        .gl-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 10px;
        }
        @media (max-width: 700px) {
          .gl-grid {
            grid-template-columns: 1fr;
          }
        }
        .gl-item {
          display: grid;
          gap: 6px;
          padding: 14px 16px;
          text-align: left;
          background: rgba(8, 7, 5, 0.6);
          color: var(--fg);
          border: 1px solid var(--line);
          font-weight: 400;
          letter-spacing: 0;
        }
        .gl-item:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .gl-item b {
          font: 600 17px/1.2 var(--display);
          color: var(--gold);
        }
        .gl-item span {
          font-size: 14px;
          line-height: 1.55;
          color: var(--muted);
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gl-item.open {
          border-color: var(--gold);
        }
        .gl-item.open span {
          -webkit-line-clamp: unset;
          color: var(--fg);
        }

        /* Quiz */
        .qz {
          display: grid;
          gap: 16px;
        }
        .qz-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .qz-dots {
          display: flex;
          gap: 6px;
        }
        .qz-dots i {
          width: 22px;
          height: 3px;
          background: var(--line);
        }
        .qz-dots i.past {
          background: var(--gold-deep);
        }
        .qz-dots i.now {
          background: var(--gold);
          box-shadow: 0 0 8px var(--gold);
        }
        .qz-q {
          margin: 0;
          font-size: clamp(20px, 3vw, 26px);
          line-height: 1.3;
        }
        .qz-opts {
          display: grid;
          gap: 8px;
        }
        .qz-opt {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          min-height: 54px;
          padding: 10px 16px;
          text-align: left;
          background: rgba(8, 7, 5, 0.6);
          color: var(--fg);
          border: 1px solid var(--line);
          font: 500 16px/1.4 var(--body);
          letter-spacing: 0;
        }
        .qz-opt:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .qz-l {
          flex: none;
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line-strong);
          font: 500 12px/1 var(--mono);
          color: var(--gold);
        }
        .qz-opt.right {
          border-color: var(--gold);
          background: rgba(230, 195, 106, 0.14);
        }
        .qz-opt.wrong {
          border-color: var(--loss);
          background: rgba(224, 138, 111, 0.12);
        }
        .qz-opt.dim {
          opacity: 0.45;
        }
        .qz-exp {
          padding: 14px 16px;
          border-left: 2px solid var(--gold);
          background: rgba(230, 195, 106, 0.06);
          line-height: 1.6;
        }
        .qz-exp b {
          color: var(--gold);
        }
        .qz-ctrl {
          display: flex;
          justify-content: flex-end;
        }
        .qz.done {
          justify-items: center;
          text-align: center;
          padding: 10px 0;
        }
        .qz-score {
          font: 700 72px/1 var(--display);
        }
        .qz.done p {
          margin: 0;
          max-width: 46ch;
          color: #ddd4bf;
          line-height: 1.6;
        }
        .btn-row.center {
          justify-content: center;
        }
    `}</style>
  );
}
