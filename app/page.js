"use client";

import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import Crest from "../components/Crest";
import Scramble from "../components/Scramble";
import MiniLelefx from "../components/MiniLelefx";
import { SITE } from "../lib/site";

const PRINCIPLES = [
  { t: "Discipline Over Dopamine", d: "We remove impulse from execution. Calm is an edge." },
  { t: "Risk Before Reward", d: "If protection isn’t clear, the trade doesn’t exist." },
  { t: "Process Over Outcomes", d: "We judge decisions, not single results. Mastery compounds." },
  { t: "Patience Compounds", d: "Waiting is a skill. Quality beats activity." },
  { t: "Consistency Creates Inevitability", d: "Repeat what works. Remove what doesn’t. Stay aligned." },
];

const HUB = [
  { href: "/get-started", k: "Start", t: "Get Started", d: "Open your Exness account and start copying in 3 steps.", icon: "M5 25h6v-6h6v-6h6V7h4" },
  { href: "/copy-trading", k: "Copy", t: "Copy Trading", d: "How copying through Exness works. No passwords, ever.", icon: "M9 9h12v12H9zM13 5h14v14" },
  { href: "/how", k: "Method", t: "How It Works", d: "The risk framework behind every trade.", icon: "M16 5a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm0 5v6l4 3" },
  { href: "/simulator", k: "Replay", t: "Simulator", d: "Replay 75 real signals from our Telegram, wins and losses.", icon: "M4 26h24M7 21l6-7 5 4 8-11M22 7h4v4" },
  { href: "/client-portal", k: "Members", t: "Members Area", d: "Track the strategy, your fee maths and lessons.", icon: "M5 7h22v18H5zM5 12h22M10 20h4M18 20h4" },
  { href: "/waitlist", k: "Access", t: "Join the Waitlist", d: "Founding members hear first when we open.", icon: "M16 5a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm0 6v10m-5-5h10", cta: true },
];

export default function Home() {
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [vvipOpen, setVvipOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [wlState, setWlState] = useState("idle");

  const submitWaitlist = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setWlState("invalid");
      return;
    }
    setWlState("sending");
    try {
      const r = await fetch(SITE.formspree, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Winners Circle Landing Page" }),
      });
      if (!r.ok) throw new Error();
      form.reset();
      setWlState("done");
    } catch {
      setWlState("error");
    }
  };

  return (
    <>
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-in">
            <div className="hero-copy">
              <span className="fx-eyebrow">Early access · Limited onboarding</span>
              <h1 className="hero-title">
                <Scramble text="Winners Circle" className="fx-gradient-text hero-l1" />
                <Scramble text="University" className="hero-l2" delay={250} />
              </h1>
              <p className="hero-p">
                A disciplined gold trading strategy you can copy through Exness Social Trading. Your money stays in your
                own Exness account, and a performance fee is only taken when your account is in profit.
              </p>

              <form className="wl" onSubmit={submitWaitlist} noValidate>
                <label className="fx-label" htmlFor="hero-email">
                  Join the waitlist
                </label>
                <div className="wl-row">
                  <input id="hero-email" name="email" type="email" className="fx-input" placeholder="Enter your email" autoComplete="email" />
                  <button type="submit" className="btn fx-mag" disabled={wlState === "sending"}>
                    {wlState === "sending" ? "Joining…" : "Join the Waitlist"}
                  </button>
                </div>
                <p className={`wl-msg ${wlState}`} role="status" aria-live="polite">
                  {wlState === "invalid" && "Enter a valid email address."}
                  {wlState === "error" && "That didn’t go through. Check your connection and try again."}
                  {wlState === "done" && "You’re on the list. Watch your inbox for launch news."}
                </p>
              </form>

              <dl className="terms">
                <div><dt>Copy from</dt><dd>${SITE.minInvestmentUsd}</dd></div>
                <div><dt>Performance fee</dt><dd>{SITE.performanceFeePct}% of profit</dd></div>
                <div><dt>Losing month</dt><dd>$0 fee</dd></div>
                <div><dt>Stop copying</dt><dd>Any time</dd></div>
              </dl>
            </div>
            <div className="hero-crest">
              <Crest size={340} />
            </div>
          </div>
        </section>

        <div className="fx-marquee" aria-label="Our principles">
          <div className="fx-marquee-track">
            {[0, 1].map((n) =>
              PRINCIPLES.map((p) => (
                <span key={`${n}-${p.t}`} aria-hidden={n === 1 ? "true" : undefined}>
                  {p.t}
                </span>
              ))
            )}
          </div>
        </div>

        {/* HUB */}
        <section className="sec">
          <div className="sec-in">
            <div className="sec-head row">
              <div>
                <span className="fx-eyebrow">Command hub</span>
                <Scramble as="h2" text="Choose where to go" className="sec-title" />
              </div>
              <span className="hint">Select a module_</span>
            </div>
            <div className="hub">
              {HUB.map((h) => (
                <a key={h.href} href={h.href} className={`tile fx-tilt ${h.cta ? "cta" : ""}`}>
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path d={h.icon} />
                  </svg>
                  <span className="t-k">{h.k}</span>
                  <h3>{h.t}</h3>
                  <p>{h.d}</p>
                  <span className="t-go">Open</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="sec" id="principles">
          <div className="sec-in">
            <div className="sec-head">
              <span className="fx-eyebrow">The code</span>
              <Scramble as="h2" text="Our Principles" className="sec-title" />
            </div>
            <div className="pr">
              <div className="pr-list" role="tablist" aria-label="Principles">
                {PRINCIPLES.map((p, i) => (
                  <button
                    key={p.t}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    className="pr-tab"
                    onClick={() => setActive(i)}
                    onPointerEnter={() => setActive(i)}
                  >
                    <span className="pr-n">{String(i + 1).padStart(2, "0")}</span>
                    {p.t}
                  </button>
                ))}
              </div>
              <div className="pr-panel fx-glass fx-hud" role="tabpanel">
                <span className="pr-big">{String(active + 1).padStart(2, "0")}</span>
                <Scramble key={active} as="h3" text={PRINCIPLES[active].t} className="pr-title" />
                <p>{PRINCIPLES[active].d}</p>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="sec" id="manifesto">
          <div className="sec-in narrow">
            <div className="sec-head center">
              <span className="fx-eyebrow">Founder</span>
              <Scramble as="h2" text="Manifesto" className="sec-title" />
            </div>
            {!manifestoOpen ? (
              <button type="button" className="seal" onClick={() => setManifestoOpen(true)}>
                <span className="seal-ring" aria-hidden="true" />
                <span className="seal-text">This was not written for everyone</span>
                <span className="seal-hint">Tap to unseal</span>
              </button>
            ) : (
              <div className="manifesto fx-glass fx-hud">
                <span className="fx-eyebrow">Founder’s Manifesto</span>
                <p>Winners Circle was not built for excitement. It was built for longevity.</p>
                <p>I’ve seen what impatience does to talented people. I’ve seen discipline quietly outperform brilliance.</p>
                <p>This framework exists to remove noise, emotion, and ego, replacing them with structure, risk awareness, and clarity.</p>
                <p>If you’re here to rush, impress, or gamble, this won’t work. If you’re here to compound patiently, you’re in the right place.</p>
                <div className="sig">— Lelefx, Founder</div>
                <button type="button" className="btn-ghost" onClick={() => setManifestoOpen(false)}>
                  Seal it again
                </button>
              </div>
            )}
          </div>
        </section>

        {/* PRICING */}
        <section className="sec" id="pricing">
          <div className="sec-in">
            <div className="sec-head">
              <span className="fx-eyebrow">Pricing</span>
              <Scramble as="h2" text="We only earn when you do" className="sec-title" />
              <p className="sec-p">
                No subscriptions and no upfront fees. Exness calculates and collects the performance fee for us, so you
                never send money to Winners Circle directly.
              </p>
            </div>
            <div className="price">
              <div className="p-card fx-tilt fx-glass fx-hud">
                <span className="t-k">Performance fee</span>
                <div className="p-big fx-gradient-text">{SITE.performanceFeePct}%</div>
                <p>Of new profit only. Charged by Exness at the end of each monthly period. A high-water mark means you never pay twice on the same gains.</p>
              </div>
              <div className="p-card fx-tilt fx-glass">
                <span className="t-k">Your money</span>
                <div className="p-mid">Stays with Exness</div>
                <p>Funds sit in your own Exness account. Deposit, withdraw or stop copying whenever you choose from the Exness app.</p>
              </div>
              <div className="p-card fx-tilt fx-glass">
                <span className="t-k">Support</span>
                <div className="p-mid">Real people</div>
                <p>
                  Questions about setup or fees? Visit <a href="/support">Support</a> or email {SITE.supportEmail}.
                </p>
              </div>
            </div>
            <div className="btn-row center">
              <a className="btn fx-mag" href="/get-started">Get Started</a>
              <a className="btn-ghost fx-mag" href="/simulator">Try the Simulator</a>
            </div>
          </div>
        </section>

        {/* VVIP */}
        <section className="sec last" id="vvip">
          <div className="sec-in narrow">
            <div className="sec-head center">
              <span className="fx-eyebrow">Invitation only</span>
              <Scramble as="h2" text="VVIP Access" className="sec-title" />
            </div>
            {!vvipOpen ? (
              <button type="button" className="vault" onClick={() => setVvipOpen(true)}>
                <span className="vault-dial" aria-hidden="true" />
                <span>Explore VVIP Access</span>
              </button>
            ) : (
              <div className="manifesto fx-glass fx-hud center-text">
                <span className="fx-eyebrow">Private · Invitation only</span>
                <p className="vv-big">VVIP is not purchased. It is earned through consistency, discipline, and alignment over time.</p>
                <p className="muted">Some members may be contacted discreetly.</p>
                <button type="button" className="btn-ghost" onClick={() => setVvipOpen(false)}>
                  Close
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <MiniLelefx />

      <style jsx>{`
        .hero {
          padding: 64px 16px 56px;
        }
        .hero-in {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 40px;
          align-items: center;
        }
        .hero-copy {
          display: grid;
          gap: 22px;
          min-width: 0;
        }
        .hero-title {
          margin: 0;
          display: grid;
          font-size: clamp(46px, 8.5vw, 100px);
          line-height: 0.95;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .hero-p {
          margin: 0;
          max-width: 56ch;
          color: #cfc6b1;
          font-size: 18px;
          line-height: 1.65;
        }
        .wl {
          max-width: 560px;
        }
        .wl-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 10px;
        }
        .wl-msg {
          margin: 8px 0 0;
          min-height: 1.4em;
          font-size: 14px;
        }
        .wl-msg.done {
          color: var(--gold);
        }
        .wl-msg.invalid,
        .wl-msg.error {
          color: var(--loss);
        }
        .terms {
          margin: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid var(--line);
          background: rgba(8, 7, 5, 0.55);
          max-width: 640px;
        }
        .terms div {
          padding: 12px 14px;
          border-right: 1px solid var(--line);
        }
        .terms div:last-child {
          border-right: 0;
        }
        .terms dt {
          font: 500 10px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .terms dd {
          margin: 0;
          font: 600 17px/1.1 var(--display);
          color: var(--gold);
        }
        .hero-crest {
          display: grid;
          place-items: center;
        }
        @media (max-width: 860px) {
          .hero {
            padding-top: 32px;
          }
          .hero-in {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .hero-crest {
            grid-row: 1;
          }
          .hero-crest :global(.fx-crest) {
            --crest: 200px !important;
          }
        }
        @media (max-width: 560px) {
          .wl-row {
            grid-template-columns: 1fr;
          }
          .terms {
            grid-template-columns: 1fr 1fr;
          }
          .terms div:nth-child(2) {
            border-right: 0;
          }
          .terms div:nth-child(-n + 2) {
            border-bottom: 1px solid var(--line);
          }
        }

        .sec {
          padding: 72px 16px;
        }
        .sec.last {
          padding-bottom: 110px;
        }
        .sec-in {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          gap: 28px;
        }
        .sec-in.narrow {
          max-width: 760px;
        }
        .sec-head {
          display: grid;
          gap: 12px;
        }
        .sec-head.row {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 16px;
          flex-wrap: wrap;
        }
        .sec-head.center {
          justify-items: center;
          text-align: center;
        }
        .sec-head :global(.sec-title) {
          display: block;
          margin: 10px 0 0;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 600;
          line-height: 1.05;
        }
        .sec-p {
          margin: 0;
          max-width: 62ch;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.6;
        }
        .hint {
          font: 400 12px/1 var(--mono);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .hub {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        @media (max-width: 900px) {
          .hub {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 520px) {
          .hub {
            grid-template-columns: 1fr;
          }
        }
        .tile {
          display: grid;
          gap: 8px;
          align-content: start;
          min-height: 210px;
          padding: 24px 22px 22px;
          border: 1px solid var(--line);
          border-radius: var(--radius);
          background: rgba(15, 13, 10, 0.62);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          overflow: hidden;
        }
        .tile:hover,
        .tile:focus-visible {
          border-color: var(--gold);
          background: rgba(28, 24, 15, 0.72);
        }
        .tile svg {
          width: 34px;
          height: 34px;
          fill: none;
          stroke: var(--gold);
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          margin-bottom: 6px;
          transition: transform 0.3s, filter 0.3s;
        }
        .tile:hover svg {
          transform: scale(1.12);
          filter: drop-shadow(0 0 6px rgba(230, 195, 106, 0.6));
        }
        .t-k {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .tile h3 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .tile p {
          margin: 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.5;
        }
        .t-go {
          margin-top: auto;
          padding-top: 12px;
          font: 600 12px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .t-go::after {
          content: " →";
          display: inline-block;
          transition: transform 0.25s;
        }
        .tile:hover .t-go::after {
          transform: translateX(5px);
        }
        .tile.cta {
          border-color: var(--gold-deep);
          background: linear-gradient(160deg, rgba(230, 195, 106, 0.2), rgba(15, 13, 10, 0.72) 70%);
        }

        .pr {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 800px) {
          .pr {
            grid-template-columns: 1fr;
          }
        }
        .pr-list {
          display: grid;
          gap: 8px;
        }
        .pr-tab {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          min-height: 58px;
          padding: 0 18px;
          text-align: left;
          background: rgba(15, 13, 10, 0.62);
          color: var(--fg);
          border: 1px solid var(--line);
          font: 600 17px/1.2 var(--display);
          letter-spacing: 0.02em;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .pr-tab:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .pr-tab[aria-selected="true"] {
          border-color: var(--gold);
          background: rgba(230, 195, 106, 0.14);
          color: var(--gold);
        }
        .pr-n {
          font: 500 12px/1 var(--mono);
          color: var(--gold);
        }
        .pr-panel {
          position: relative;
          display: grid;
          align-content: center;
          gap: 14px;
          min-height: 320px;
          padding: 36px 32px;
          overflow: hidden;
        }
        .pr-big {
          position: absolute;
          right: 18px;
          bottom: -24px;
          font: 700 180px/1 var(--display);
          color: rgba(230, 195, 106, 0.07);
          pointer-events: none;
        }
        .pr-panel :global(.pr-title) {
          margin: 0;
          font-size: clamp(28px, 4vw, 40px);
          color: var(--gold);
        }
        .pr-panel p {
          margin: 0;
          font-size: 20px;
          line-height: 1.55;
          max-width: 36ch;
        }

        .seal {
          position: relative;
          justify-self: center;
          display: grid;
          justify-items: center;
          gap: 10px;
          width: min(460px, 100%);
          padding: 44px 24px;
          background: rgba(12, 11, 8, 0.7);
          color: var(--fg);
          border: 1px solid var(--line-strong);
          overflow: hidden;
        }
        .seal:hover {
          box-shadow: 0 0 40px rgba(230, 195, 106, 0.25);
        }
        .seal-ring {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1px dashed var(--gold);
          box-shadow: inset 0 0 18px rgba(230, 195, 106, 0.35);
        }
        .seal-text {
          font: 600 20px/1.2 var(--display);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .seal-hint {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .manifesto {
          display: grid;
          gap: 16px;
          padding: 32px 28px;
          justify-items: start;
        }
        .manifesto p {
          margin: 0;
          font-size: 18px;
          line-height: 1.7;
          color: #ddd4bf;
        }
        .sig {
          font: 600 italic 18px/1 var(--display);
          color: var(--gold);
        }
        .center-text {
          justify-items: center;
          text-align: center;
        }
        .vv-big {
          font: 600 22px/1.4 var(--display) !important;
          color: var(--fg) !important;
        }
        .muted {
          color: var(--muted) !important;
        }

        .price {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 860px) {
          .price {
            grid-template-columns: 1fr;
          }
        }
        .p-card {
          display: grid;
          gap: 12px;
          align-content: start;
          padding: 26px 24px;
        }
        .p-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }
        .p-card a {
          color: var(--gold);
        }
        .p-big {
          font: 700 72px/1 var(--display);
        }
        .p-mid {
          font: 600 30px/1.1 var(--display);
          min-height: 72px;
          display: flex;
          align-items: center;
        }
        .btn-row.center {
          justify-content: center;
        }

        .vault {
          justify-self: center;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 16px 26px 16px 16px;
          font-size: 16px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .vault-dial {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid #0b0b0b;
          background: repeating-conic-gradient(#0b0b0b 0 4deg, transparent 4deg 30deg);
        }
        @media (prefers-reduced-motion: no-preference) {
          .seal-ring {
            animation: fx-spin 12s linear infinite;
          }
          .vault:hover .vault-dial {
            animation: fx-spin 1.2s ease-in-out;
          }
        }
      `}</style>
    </>
  );
}
