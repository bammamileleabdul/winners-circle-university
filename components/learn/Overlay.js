"use client";

import { useEffect } from "react";

// Full-screen panel used for missions and tools. Closes on Escape or the X.
export default function Overlay({ onClose, label, children, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="ov" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <div className={`ov-panel fx-hud ${wide ? "wide" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ov-x" aria-label="Close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
      <style jsx global>{`
        .ov {
          position: fixed;
          inset: 0;
          z-index: 10002;
          display: grid;
          place-items: center;
          padding: 16px;
          background: rgba(3, 3, 2, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          overflow-y: auto;
        }
        .ov-panel {
          position: relative;
          width: min(760px, 100%);
          max-height: calc(100vh - 32px);
          overflow-y: auto;
          background: rgba(11, 10, 8, 0.96);
          border: 1px solid var(--line-strong);
          border-radius: var(--radius);
          box-shadow: 0 0 80px rgba(230, 195, 106, 0.18);
        }
        .ov-panel.wide {
          width: min(980px, 100%);
        }
        .ov-x {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 3;
          width: 40px;
          height: 40px;
          padding: 0;
          background: rgba(8, 7, 5, 0.8);
          color: var(--muted);
          border: 1px solid var(--line);
          font-size: 22px;
          line-height: 1;
        }
        .ov-x:hover {
          color: var(--gold);
          box-shadow: none;
          border-color: var(--line-strong);
        }
        @media (prefers-reduced-motion: no-preference) {
          .ov-panel {
            animation: ov-in 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
          }
        }
        @keyframes ov-in {
          from {
            transform: translateY(18px) scale(0.98);
            opacity: 0;
          }
          to {
            transform: none;
            opacity: 1;
          }
        }
        .no-fx .ov-panel {
          animation: none !important;
        }
        @media (max-width: 560px) {
          .ov {
            padding: 0;
            place-items: stretch;
          }
          .ov-panel {
            max-height: 100vh;
            min-height: 100vh;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}
