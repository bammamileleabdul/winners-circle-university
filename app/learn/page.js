"use client";

import { useEffect, useRef, useState } from "react";
import PageShell from "../../components/PageShell";
import Scramble from "../../components/Scramble";
import PipCalculator from "../../components/learn/PipCalculator";
import LeverageLab from "../../components/learn/LeverageLab";
import RiskRewardLab from "../../components/learn/RiskRewardLab";
import SessionClock from "../../components/learn/SessionClock";
import CandleAnatomy from "../../components/learn/CandleAnatomy";
import Glossary from "../../components/learn/Glossary";
import Quiz from "../../components/learn/Quiz";

const CHAPTERS = [
  {
    id: "ch-1",
    title: "What trading actually is",
    mins: 3,
    body: () => (
      <>
        <p>
          Trading means buying and selling to profit from price changes. In forex you trade one currency against another.
          With gold, you trade the price of gold in US dollars.
        </p>
        <h3>Two directions</h3>
        <ul>
          <li><b>Buy (go long)</b> if you think the price will rise.</li>
          <li><b>Sell (go short)</b> if you think it will fall.</li>
        </ul>
        <p>You can make or lose money either way. Being right about direction is only part of it; how much you risk matters more.</p>
        <h3>Who’s involved</h3>
        <p>
          A <b>broker</b> such as Exness gives you access to the market, holds your money and runs the platform (MT5 or
          the Exness app). Most people trade <b>CFDs</b>: you don’t own any gold, you trade the change in its price.
        </p>
      </>
    ),
    takeaways: ["You can profit from prices rising or falling.", "Your broker holds your money, so use a regulated one.", "Trading is not a salary. Losing weeks are normal."],
  },
  {
    id: "ch-2",
    title: "Forex and gold",
    mins: 4,
    body: () => (
      <>
        <p>
          Currencies trade in <b>pairs</b>. EUR/USD at 1.1000 means one euro buys 1.10 US dollars. The first currency is the
          <b> base</b>, the second the <b>quote</b>. If EUR/USD rises, the euro has strengthened against the dollar.
        </p>
        <p>
          The most traded pairs, like EUR/USD, GBP/USD and USD/JPY, are called <b>majors</b>. They usually have the lowest
          costs.
        </p>
        <h3>Gold: XAU/USD</h3>
        <p>
          XAU is the code for gold. XAU/USD is the price of one ounce of gold in US dollars. Gold tends to react to:
        </p>
        <ul>
          <li>US interest rate expectations and the strength of the dollar</li>
          <li>Inflation data</li>
          <li>Fear in markets, when investors look for safety</li>
          <li>Central banks buying or selling gold</li>
        </ul>
        <p>These are tendencies, not rules. Gold can and does move against all of them.</p>
        <h3>When it trades</h3>
        <p>Forex and gold trade around the clock from Sunday evening to Friday evening, and close at the weekend.</p>
      </>
    ),
    takeaways: ["EUR/USD = how many dollars one euro buys.", "XAU/USD = the dollar price of one ounce of gold.", "Gold reacts to rates, the dollar and fear, but nothing is guaranteed."],
  },
  {
    id: "ch-3",
    title: "Pips, lots and money",
    mins: 5,
    body: () => (
      <>
        <p>
          A <b>pip</b> is the standard unit of price movement. On most pairs it’s the fourth decimal: EUR/USD moving from
          1.1000 to 1.1010 is 10 pips. On yen pairs it’s the second decimal. Gold is easiest to think about in dollars per
          ounce.
        </p>
        <p>
          A <b>lot</b> is your trade size. One standard lot is 100,000 units of currency. A mini lot is 0.1 and a micro lot
          is 0.01. For gold, one lot is 100 ounces on most brokers.
        </p>
        <h3>Turning it into money</h3>
        <ul>
          <li>EUR/USD: 1 lot ≈ $10 per pip. 0.01 lot ≈ $0.10 per pip.</li>
          <li>Gold: 1 lot = $100 per $1 move. 0.01 lot = $1 per $1 move.</li>
        </ul>
        <p>
          Every trade also has a <b>spread</b>: the small gap between the buy and sell price. It’s a cost you pay the moment
          you enter.
        </p>
      </>
    ),
    tool: PipCalculator,
    takeaways: ["Lot size decides how much each move is worth.", "0.01 lot of gold = $1 per $1 move.", "The spread is a cost on every trade."],
  },
  {
    id: "ch-4",
    title: "Leverage and margin",
    mins: 5,
    body: () => (
      <>
        <p>
          <b>Leverage</b> lets you open a position bigger than your deposit. At 1:100, $1,000 of your money can hold a
          position worth $100,000.
        </p>
        <p>
          The money set aside to hold the trade is called <b>margin</b>. What’s left over is <b>free margin</b>. If losses
          eat through it, the broker sends a <b>margin call</b> and then closes your trades automatically, called a{" "}
          <b>stop out</b>.
        </p>
        <h3>The part most beginners miss</h3>
        <p>
          Leverage doesn’t change how much you make or lose per pip. Lot size does. High leverage simply lets you open
          much bigger lots with little money, which is how accounts get wiped out fast.
        </p>
      </>
    ),
    tool: LeverageLab,
    takeaways: ["Leverage changes margin, not money per move.", "Oversized lots, not leverage itself, are what blow accounts.", "If free margin runs out, the broker closes your trades."],
  },
  {
    id: "ch-5",
    title: "Risk management",
    mins: 6,
    body: () => (
      <>
        <p>Before any trade, decide three things: where you get in, where you’re wrong, and where you take profit.</p>
        <ul>
          <li><b>Stop loss</b>: closes the trade automatically at a set loss.</li>
          <li><b>Take profit</b>: closes it automatically at a set profit.</li>
          <li><b>Position size</b>: worked out so that if the stop loss is hit, you lose a fixed, planned amount.</li>
        </ul>
        <p>
          Many professionals risk 1–2% of their account per trade. Winners Circle uses a fixed unit of capital ÷ 14 per
          trade, and never adds to a losing position.
        </p>
        <h3>Why protecting capital comes first</h3>
        <div className="dd">
          {[10, 20, 30, 50, 75].map((l) => (
            <div key={l}>
              <span>Lose {l}%</span>
              <b>Need +{((1 / (1 - l / 100) - 1) * 100).toFixed(0)}%</b>
            </div>
          ))}
        </div>
        <p>The deeper the loss, the harder the climb back. That’s why risk is planned before reward.</p>
      </>
    ),
    tool: RiskRewardLab,
    takeaways: ["Set the stop loss before you enter, every time.", "Size the trade so a loss is a planned, fixed amount.", "A 50% loss needs a 100% gain to recover."],
  },
  {
    id: "ch-6",
    title: "When markets move",
    mins: 4,
    body: () => (
      <>
        <p>
          The market runs in sessions as financial centres open and close: <b>Sydney</b>, <b>Tokyo</b>, <b>London</b> and{" "}
          <b>New York</b>. When London and New York overlap, volume and volatility are usually at their highest. Gold
          often makes its biggest moves then.
        </p>
        <h3>News that moves prices</h3>
        <ul>
          <li>US jobs data (Non-Farm Payrolls), usually the first Friday of the month</li>
          <li>Inflation figures (CPI)</li>
          <li>Interest rate decisions from central banks like the US Federal Reserve</li>
        </ul>
        <p>
          Around big news, prices can jump and spreads can widen. Orders may fill at a worse price than expected, called{" "}
          <b>slippage</b>. Many disciplined traders stay out during the release.
        </p>
      </>
    ),
    tool: SessionClock,
    takeaways: ["The London–New York overlap is usually the busiest time.", "Big news can cause jumps, wide spreads and slippage.", "Markets close at the weekend and can gap on reopen."],
  },
  {
    id: "ch-7",
    title: "Reading the chart",
    mins: 6,
    body: () => (
      <>
        <p>
          Most traders use <b>candlestick charts</b>. Each candle shows four prices for a period of time (one minute, one
          hour, one day): open, high, low and close.
        </p>
        <h3>Market structure</h3>
        <p>
          A run of <b>higher highs and higher lows</b> is an uptrend. <b>Lower highs and lower lows</b> is a downtrend. When
          that pattern breaks, the trend may be changing.
        </p>
        <h3>Liquidity</h3>
        <p>
          Lots of stop losses sit just above old highs and just below old lows. Price often reaches into those areas before
          turning. Traders call this a liquidity sweep.
        </p>
        <h3>Imbalances</h3>
        <p>
          A very fast move can leave a gap between candle wicks, often called a <b>fair value gap</b>. Price frequently
          comes back to fill part of it.
        </p>
        <p>
          A common approach is to use a higher timeframe for direction and a lower one for timing. None of these are
          rules the market must follow. They are probabilities you combine with strict risk.
        </p>
      </>
    ),
    tool: CandleAnatomy,
    takeaways: ["Each candle shows open, high, low and close.", "Higher highs and higher lows = uptrend.", "Liquidity and imbalances are tendencies, never certainties."],
  },
  {
    id: "ch-8",
    title: "Copy trading and staying safe",
    mins: 5,
    body: () => (
      <>
        <p>
          Copy trading lets you follow another trader’s strategy automatically. With Exness Social Trading, you invest an
          amount in a strategy, and every trade is copied to your account in proportion to it. You can stop copying or
          withdraw at any time, and the performance fee is only taken from profit.
        </p>
        <h3>The honest numbers</h3>
        <p>
          In the UK and EU, brokers must publish the share of retail accounts that lose money on CFDs. It’s typically
          between 60% and 80%. Copying an experienced trader can still lose money, because you copy their losses too.
        </p>
        <h3>Red flags: walk away if someone</h3>
        <ul>
          <li>Asks for your trading or broker password</li>
          <li>Promises fixed or guaranteed returns, like “10% a week”</li>
          <li>Asks you to send money to their personal bank account or wallet</li>
          <li>Shows screenshots instead of a verified track record</li>
          <li>Pushes you to recruit friends to earn</li>
        </ul>
        <p>Winners Circle will never do any of these.</p>
      </>
    ),
    takeaways: ["Copying copies losses as well as gains.", "Never share your password. Real copy trading doesn’t need it.", "Only invest what you can afford to lose."],
  },
];

const EXTRA = [
  { id: "glossary", title: "Glossary", k: "Reference" },
  { id: "quiz", title: "Quick quiz", k: "Check yourself" },
];

const KEY = "wcu-learn";

export default function LearnPage() {
  const [current, setCurrent] = useState("ch-1");
  const [read, setRead] = useState([]);
  const [quizDone, setQuizDone] = useState(false);
  const articleRef = useRef(null);
  const first = useRef(true);

  // Restore progress and any #chapter link
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (Array.isArray(s.read)) setRead(s.read);
      if (s.quizDone) setQuizDone(true);
    } catch {}
    const h = window.location.hash.slice(1);
    if ([...CHAPTERS, ...EXTRA].some((c) => c.id === h)) setCurrent(h);
  }, []);

  // Mark chapters read, remember progress, keep the URL shareable
  useEffect(() => {
    if (current.startsWith("ch-")) setRead((r) => (r.includes(current) ? r : [...r, current]));
    try {
      window.history.replaceState(null, "", `#${current}`);
    } catch {}
    if (first.current) {
      first.current = false;
      return;
    }
    const el = articleRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [current]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ read, quizDone }));
    } catch {}
  }, [read, quizDone]);

  const idx = CHAPTERS.findIndex((c) => c.id === current);
  const ch = CHAPTERS[idx];
  const extra = EXTRA.find((e) => e.id === current);
  const order = [...CHAPTERS.map((c) => c.id), ...EXTRA.map((e) => e.id)];
  const pos = order.indexOf(current);
  const prevId = order[pos - 1];
  const nextId = order[pos + 1];
  const titleOf = (id) => CHAPTERS.find((c) => c.id === id)?.title || EXTRA.find((e) => e.id === id)?.title;
  const pct = Math.round((read.length / CHAPTERS.length) * 100);
  const Tool = ch?.tool;

  return (
    <PageShell
      wide
      eyebrow="Foundations"
      title="Trading, from zero"
      intro="New to trading? Start here. Eight short chapters take you from what a pip is to how copy trading works, with tools you can play with along the way."
    >
      <div className="prog fx-glass">
        <div className="prog-text">
          <b>{read.length} of {CHAPTERS.length}</b> chapters read
          {quizDone && <span className="badge">Quiz complete</span>}
        </div>
        <div className="prog-bar" aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="learn">
        <nav className="toc" aria-label="Chapters">
          <span className="toc-k">Chapters</span>
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`toc-item ${current === c.id ? "on" : ""} ${read.includes(c.id) ? "read" : ""}`}
              aria-current={current === c.id ? "true" : undefined}
              onClick={() => setCurrent(c.id)}
            >
              <span className="toc-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="toc-t">{c.title}</span>
              <span className="toc-tick" aria-label={read.includes(c.id) ? "Read" : undefined}>{read.includes(c.id) ? "✓" : ""}</span>
            </button>
          ))}
          <span className="toc-k">More</span>
          {EXTRA.map((e) => (
            <button key={e.id} type="button" className={`toc-item ${current === e.id ? "on" : ""}`} onClick={() => setCurrent(e.id)}>
              <span className="toc-n">{e.id === "quiz" ? "?" : "Aa"}</span>
              <span className="toc-t">{e.title}</span>
              <span className="toc-tick">{e.id === "quiz" && quizDone ? "✓" : ""}</span>
            </button>
          ))}
        </nav>

        <article className="art fx-glass fx-hud" ref={articleRef} key={current}>
          {ch ? (
            <>
              <div className="art-meta">
                <span className="fx-eyebrow">Chapter {idx + 1} of {CHAPTERS.length}</span>
                <span className="mins">{ch.mins} min read</span>
              </div>
              <Scramble as="h2" text={ch.title} className="art-title" />
              <div className="art-body">{ch.body()}</div>
              {Tool && <Tool />}
              <div className="take">
                <span className="fx-eyebrow">Key takeaways</span>
                <ul>
                  {ch.takeaways.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="art-meta">
                <span className="fx-eyebrow">{extra.k}</span>
              </div>
              <Scramble as="h2" text={extra.title} className="art-title" />
              {current === "glossary" ? <Glossary /> : <Quiz onComplete={() => setQuizDone(true)} />}
            </>
          )}

          <div className="art-nav">
            {prevId ? (
              <button type="button" className="nav-btn" onClick={() => setCurrent(prevId)}>
                <span>Previous</span>
                <b>{titleOf(prevId)}</b>
              </button>
            ) : (
              <span />
            )}
            {nextId ? (
              <button type="button" className="nav-btn next" onClick={() => setCurrent(nextId)}>
                <span>Next</span>
                <b>{titleOf(nextId)}</b>
              </button>
            ) : (
              <a className="nav-btn next" href="/copy-trading">
                <span>Ready?</span>
                <b>How copying works</b>
              </a>
            )}
          </div>
        </article>
      </div>

      <p className="fx-notice">
        <b>Note</b>
        <span>
          This guide is education, not financial advice. Trading is high risk and you can lose the money you invest.
        </span>
      </p>

      <style jsx>{`
        .prog {
          display: grid;
          gap: 10px;
          padding: 16px 18px;
        }
        .prog-text {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 15px;
          color: var(--muted);
        }
        .prog-text b {
          color: var(--fg);
        }
        .badge {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          border: 1px solid var(--gold-deep);
          padding: 6px 8px;
        }
        .prog-bar {
          height: 4px;
          background: var(--line);
        }
        .prog-bar i {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--gold-deep), var(--gold), var(--gold-hi));
          box-shadow: 0 0 10px var(--gold);
          transition: width 0.5s ease;
        }
        .learn {
          display: grid;
          grid-template-columns: 290px minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }
        .toc {
          position: sticky;
          top: 20px;
          display: grid;
          gap: 6px;
        }
        .toc-k {
          margin: 8px 0 2px;
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .toc-item {
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr) 16px;
          align-items: center;
          gap: 8px;
          width: 100%;
          min-height: 48px;
          padding: 8px 12px;
          text-align: left;
          background: rgba(15, 13, 10, 0.62);
          color: var(--fg);
          border: 1px solid var(--line);
          font: 600 15px/1.25 var(--display);
          letter-spacing: 0.01em;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .toc-item:hover {
          box-shadow: none;
          border-color: var(--line-strong);
        }
        .toc-item.on {
          border-color: var(--gold);
          background: rgba(230, 195, 106, 0.14);
          color: var(--gold);
        }
        .toc-n {
          font: 500 12px/1 var(--mono);
          color: var(--gold);
        }
        .toc-tick {
          color: var(--gold);
          font-size: 13px;
        }
        @media (max-width: 900px) {
          .learn {
            grid-template-columns: 1fr;
          }
          .toc {
            position: static;
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 6px;
            scroll-snap-type: x mandatory;
          }
          .toc-k {
            display: none;
          }
          .toc-item {
            flex: none;
            width: auto;
            max-width: 240px;
            scroll-snap-align: start;
          }
        }
        .art {
          display: grid;
          gap: 18px;
          padding: 28px;
          min-width: 0;
          scroll-margin-top: 80px;
          animation: fx-rise 0.4s ease-out;
        }
        .art-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .mins {
          font: 400 12px/1 var(--mono);
          color: var(--muted);
        }
        .art :global(.art-title) {
          display: block;
          margin: 0;
          font-size: clamp(30px, 4.5vw, 44px);
          line-height: 1.08;
        }
        .take {
          display: grid;
          gap: 10px;
          padding: 18px 20px;
          border-left: 2px solid var(--gold);
          background: rgba(230, 195, 106, 0.06);
        }
        .take ul {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 6px;
          line-height: 1.5;
        }
        .take li::marker {
          color: var(--gold);
        }
        .art-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding-top: 6px;
        }
        .nav-btn {
          display: grid;
          gap: 6px;
          padding: 14px 16px;
          text-align: left;
          background: rgba(8, 7, 5, 0.6);
          color: var(--fg);
          border: 1px solid var(--line);
          border-radius: var(--radius);
        }
        .nav-btn:hover {
          box-shadow: none;
          border-color: var(--gold);
        }
        .nav-btn.next {
          text-align: right;
          grid-column: 2;
        }
        .nav-btn span {
          font: 500 11px/1 var(--mono);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .nav-btn b {
          font: 600 17px/1.2 var(--display);
        }
        @media (max-width: 560px) {
          .art {
            padding: 20px 18px;
          }
          .nav-btn b {
            font-size: 15px;
          }
        }
      `}</style>

      <style jsx global>{`
        .art-body {
          display: grid;
          gap: 14px;
        }
        .art-body p {
          margin: 0;
          font-size: 17px;
          line-height: 1.75;
          color: #ddd4bf;
          max-width: 68ch;
        }
        .art-body h3 {
          margin: 8px 0 0;
          font-size: 22px;
          color: var(--gold);
        }
        .art-body ul {
          margin: 0;
          padding-left: 20px;
          display: grid;
          gap: 6px;
          font-size: 17px;
          line-height: 1.6;
          color: #ddd4bf;
        }
        .art-body li::marker {
          color: var(--gold);
        }
        .art-body b {
          color: var(--fg);
        }
        .dd {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          border: 1px solid var(--line);
        }
        .dd div {
          display: grid;
          gap: 6px;
          padding: 12px;
          background: rgba(8, 7, 5, 0.55);
          border-right: 1px solid var(--line);
        }
        .dd div:last-child {
          border-right: 0;
        }
        .dd span {
          font: 500 11px/1 var(--mono);
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .dd b {
          font: 600 18px/1 var(--display);
          color: var(--loss) !important;
        }
        @media (max-width: 620px) {
          .dd {
            grid-template-columns: 1fr 1fr;
          }
          .dd div {
            border-bottom: 1px solid var(--line);
          }
        }

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
    </PageShell>
  );
}
