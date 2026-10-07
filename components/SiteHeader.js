"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "/learn", label: "Academy" },
  { href: "/how", label: "How It Works" },
  { href: "/copy-trading", label: "Copy Trading" },
  { href: "/simulator", label: "Simulator" },
  { href: "/get-started", label: "Get Started" },
  { href: "/waitlist", label: "Waitlist" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sh">
        <a className="sh-logo" href="/" aria-label="Winners Circle University home">
          <img src="/emblem.jpg" alt="" />
          <span>
            Winners Circle
            <br />
            University
          </span>
        </a>

        <nav className="sh-nav" aria-label="Main navigation">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="sh-auth">
          <a className="btn-ghost sh-small" href="/login">
            Login
          </a>
          <a className="btn sh-small" href="/signup">
            Sign Up
          </a>
        </div>

        <button type="button" className="sh-menu" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <i />
          <i />
          <i />
        </button>
      </header>

      {open && (
        <div className="menuOverlay sh-overlay" role="dialog" aria-label="Menu">
          <button type="button" className="sh-close" onClick={() => setOpen(false)}>
            Close ×
          </button>
          <nav className="sh-mlinks">
            <a href="/" onClick={() => setOpen(false)}>
              Hub
            </a>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="/client-portal" onClick={() => setOpen(false)}>
              Members Area
            </a>
          </nav>
          <div className="sh-mauth">
            <a className="btn-ghost" href="/login">
              Login
            </a>
            <a className="btn" href="/signup">
              Sign Up
            </a>
          </div>
        </div>
      )}

      <style jsx global>{`
        .sh {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 12px max(16px, calc((100vw - 1120px) / 2));
          background: rgba(7, 6, 10, 0.62);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border-bottom: 1px solid var(--line);
        }
        .sh-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: none;
        }
        .sh-logo img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 0 1px var(--gold-deep), 0 0 18px rgba(230, 195, 106, 0.25);
        }
        .sh-logo span {
          font: 600 13px/1.1 var(--display);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .sh-nav {
          display: none;
          gap: 2px;
          margin-left: auto;
        }
        .sh-nav a {
          padding: 10px 9px;
          white-space: nowrap;
          font: 600 12px/1 var(--body);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          border: 1px solid transparent;
          border-radius: var(--radius);
          transition: color 0.2s, border-color 0.2s;
        }
        .sh-nav a:hover {
          color: var(--gold);
          border-color: var(--line);
        }
        .sh-auth {
          display: none;
          gap: 8px;
        }
        .sh-small {
          min-height: 38px;
          padding: 0 16px;
          font-size: 12px;
        }
        .sh-menu {
          margin-left: auto;
          width: 44px;
          height: 44px;
          padding: 0;
          display: grid;
          place-content: center;
          gap: 5px;
          background: rgba(8, 7, 5, 0.6);
          border: 1px solid var(--line-strong);
        }
        .sh-menu i {
          display: block;
          width: 18px;
          height: 1.5px;
          background: var(--gold);
        }
        .sh-menu:hover {
          box-shadow: none;
          background: var(--gold-soft);
        }
        @media (min-width: 1180px) {
          .sh-nav,
          .sh-auth {
            display: flex;
          }
          .sh-menu {
            display: none;
          }
        }
        .sh-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 20px 20px;
          background: rgba(5, 4, 3, 0.94);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow-y: auto;
        }
        .sh-close {
          align-self: flex-end;
          padding: 10px 14px;
          background: transparent;
          color: var(--gold);
          border: 1px solid var(--line-strong);
          font: 500 12px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .sh-mlinks {
          display: grid;
        }
        .sh-mlinks a {
          padding: 16px 4px;
          font: 600 24px/1.1 var(--display);
          border-bottom: 1px solid var(--line);
        }
        .sh-mlinks a:hover {
          color: var(--gold);
        }
        .sh-mauth {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
      `}</style>
    </>
  );
}
