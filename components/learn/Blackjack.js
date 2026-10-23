"use client";

import { useEffect, useRef, useState } from "react";
import PlayingCard from "../PlayingCard";
import { bookMove, cardValue, handValue, isBlackjack, needsShuffle, newShoe, settle } from "../../lib/blackjack";

const HANDS = 10;
const START = 1000;
const BETS = [25, 50, 100];
export const BJ_MAX_PIPS = 100;
// Pips reward good decisions, not lucky cards: 20 for finishing plus 5 per textbook move, up to 100.
export const bjPips = (good) => Math.min(BJ_MAX_PIPS, 20 + good * 5);

const MOVE = { hit: "hit", stand: "stand", double: "double" };
const RESULT = {
  blackjack: ["Blackjack. Paid 3 to 2.", "ok"],
  "dealer-bust": ["Dealer busts. You win the hand.", "ok"],
  win: ["You win the hand.", "ok"],
  push: ["Push. Your bet comes back.", "mid"],
  lose: ["Dealer wins the hand.", "no"],
  bust: ["Bust. You went over 21.", "no"],
  "dealer-bj": ["Dealer has blackjack.", "no"],
};

const total = (cards) => {
  const v = handValue(cards);
  return v.soft && v.total < 21 ? `Soft ${v.total}` : String(v.total);
};
const upName = (c) => (c.r === "A" ? "an ace" : cardValue(c) === 10 ? "a 10" : `a ${c.r}`);
const fmt = (n) => n.toLocaleString("en-GB");

export default function Blackjack({ onFinish, onClose, alreadyPlayed }) {
  const shoe = useRef(null);
  const timers = useRef([]);
  const awarded = useRef(false);
  const [phase, setPhase] = useState("bet"); // bet | play | dealer | result | done
  const [chips, setChips] = useState(START);
  const [bet, setBet] = useState(50);
  const [stake, setStake] = useState(0);
  const [hand, setHand] = useState(0); // hands finished
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [hole, setHole] = useState(true);
  const [coach, setCoach] = useState(null);
  const [good, setGood] = useState(0);
  const [moves, setMoves] = useState(0);
  const [tally, setTally] = useState({ win: 0, lose: 0, push: 0 });
  const [outcome, setOutcome] = useState(null);
  const [shuffled, setShuffled] = useState(false);
  const [earned, setEarned] = useState(0);
  // Remember whether pips were already collected when the table opened (the parent updates after the award)
  const [wasPlayed] = useState(!!alreadyPlayed);
  const [round, setRound] = useState(0);
  const [dealNo, setDealNo] = useState(0); // keys cards to the deal, so finishing a hand doesn't re-deal them

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const draw = () => shoe.current.pop();

  const finishHand = (p, d, st) => {
    const { net, res } = settle(p, d, st);
    const k = net > 0 ? "win" : net < 0 ? "lose" : "push";
    setHole(false);
    setChips((c) => c + net);
    setTally((t) => ({ ...t, [k]: t[k] + 1 }));
    setOutcome({ res, net });
    setHand((h) => h + 1);
    setPhase("result");
  };

  const dealerTurn = (p, st) => {
    setPhase("dealer");
    setHole(false);
    let d = [...dealer];
    const step = () => {
      if (handValue(d).total < 17) {
        d = [...d, draw()];
        setDealer(d);
        later(step, 650);
      } else finishHand(p, d, st);
    };
    later(step, 700);
  };

  const deal = () => {
    if (!shoe.current || needsShuffle(shoe.current)) {
      setShuffled(!!shoe.current);
      shoe.current = newShoe();
    } else setShuffled(false);
    const b = Math.min(bet, chips);
    const p = [draw()], d = [draw()];
    p.push(draw());
    d.push(draw());
    setDealNo((n) => n + 1);
    setPlayer(p);
    setDealer(d);
    setHole(true);
    setStake(b);
    setCoach(null);
    setOutcome(null);
    // The dealer checks for blackjack straight away, like a real table
    if (isBlackjack(p) || isBlackjack(d)) {
      setPhase("dealer");
      later(() => finishHand(p, d, b), 1300);
      return;
    }
    setPhase("play");
  };

  const act = (move) => {
    if (phase !== "play") return;
    const book = bookMove(player, dealer[0]);
    const ok = move === book;
    const v = handValue(player);
    setMoves((m) => m + 1);
    if (ok) setGood((g) => g + 1);
    setCoach(
      ok
        ? { ok: true, text: "Textbook move." }
        : { ok: false, text: `The book says ${MOVE[book]} on ${v.soft ? "soft " : ""}${v.total} against ${upName(dealer[0])}.` }
    );
    if (move === "stand") return dealerTurn(player, stake);
    const p = [...player, draw()];
    const st = move === "double" ? stake * 2 : stake;
    setPlayer(p);
    setStake(st);
    const t = handValue(p).total;
    if (t > 21) {
      setPhase("dealer");
      later(() => finishHand(p, dealer, st), 700);
      return;
    }
    if (move === "double" || t === 21) dealerTurn(p, st);
  };

  const endSession = () => {
    setPhase("done");
    if (!awarded.current) {
      awarded.current = true;
      const pips = bjPips(good);
      setEarned(pips);
      onFinish && onFinish(pips);
    }
  };

  const next = () => {
    if (hand >= HANDS || chips < BETS[0]) return endSession();
    if (bet > chips) setBet([...BETS].reverse().find((b) => b <= chips) || BETS[0]);
    setPlayer([]);
    setDealer([]);
    setCoach(null);
    setOutcome(null);
    setPhase("bet");
  };

  const restart = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setChips(START);
    setBet(50);
    setHand(0);
    setPlayer([]);
    setDealer([]);
    setCoach(null);
    setOutcome(null);
    setGood(0);
    setMoves(0);
    setTally({ win: 0, lose: 0, push: 0 });
    setRound((r) => r + 1);
    setPhase("bet");
  };

  if (phase === "done") {
    const diff = chips - START;
    return (
      <div className="game done-g bj-done">
        <BjStyles />
        <span className="fx-eyebrow">Table closed</span>
        <h3>The house always wins. Here’s why.</h3>
        <div className="bj-stats">
          <div><b>{hand}</b><span>Hands</span></div>
          <div><b>{tally.win}–{tally.lose}–{tally.push}</b><span>Won, lost, push</span></div>
          <div><b className={diff >= 0 ? "up" : "down"}>{diff >= 0 ? "+" : "−"}{fmt(Math.abs(diff))}</b><span>Chips</span></div>
          <div><b>{good}/{moves}</b><span>Textbook moves</span></div>
        </div>
        {wasPlayed || round > 0 ? (
          <p className="bj-pips">You’ve already collected your blackjack pips. Play again any time for practice.</p>
        ) : (
          <p className="bj-pips"><b className="fx-gradient-text">+{earned} pips</b> for playing by the book.</p>
        )}
        <p>
          Ten hands can go either way. Thousands can’t. At this table, even perfect textbook play loses about 1% of every
          bet over time, and copying the dealer (hit until 17) loses about 5.6%. The rules give the casino the edge, so the
          more you play, the more it takes.
        </p>
        <p>
          Trading only makes sense the other way round: the edge has to be on your side, and every trade has to be small
          enough to survive a losing streak. Don’t take our word for it. Check it against 75 real signals.
        </p>
        <div className="btn-row center">
          <button type="button" className="btn-ghost" onClick={restart}>Play again</button>
          <a className="btn-ghost" href="/simulator">Open the Simulator</a>
          <button type="button" className="btn" onClick={onClose}>Back to the Academy</button>
        </div>
      </div>
    );
  }

  const up = dealer[0];
  const canDouble = phase === "play" && player.length === 2 && chips >= stake * 2;
  const last = hand >= HANDS || (phase === "result" && chips < BETS[0]);
  const dealerShows = dealer.length ? (hole ? (up.r === "A" ? "Shows A" : `Shows ${cardValue(up)}`) : total(dealer)) : "";

  return (
    <div className="game bj">
      <div className="g-top">
        <span className="fx-eyebrow">Hand {Math.min(hand + (phase === "result" ? 0 : 1), HANDS)} / {HANDS}</span>
        <span className="g-score">
          Chips <b>{fmt(chips)}</b>
          <span className="bj-sep" />
          Textbook <b>{good}/{moves}</b>
        </span>
      </div>

      <div className="bj-table">
        <div className="bj-zone">
          <div className="bj-who">
            <span>Dealer</span>
            {dealerShows && <b>{dealerShows}</b>}
          </div>
          <div className="bj-hand">
            {dealer.length ? (
              dealer.map((c, i) => (
                <PlayingCard
                  key={`${dealNo}-d${i}`}
                  rank={c.r}
                  suit={c.s}
                  faceDown={i === 1 && hole}
                  className="bj-card"
                  style={i < 2 ? { animationDelay: `${0.15 + i * 0.3}s` } : undefined}
                />
              ))
            ) : (
              <>
                <i className="bj-spot" />
                <i className="bj-spot" />
              </>
            )}
          </div>
        </div>

        <svg className="bj-arc" viewBox="0 0 600 90" aria-hidden="true">
          <defs>
            <path id="bj-arc-a" d="M40 20 Q300 110 560 20" />
            <path id="bj-arc-b" d="M90 52 Q300 132 510 52" />
          </defs>
          <use href="#bj-arc-a" fill="none" stroke="rgba(230,195,106,.35)" strokeWidth="1" />
          <text className="bj-arc-t1">
            <textPath href="#bj-arc-a" startOffset="50%" textAnchor="middle" dy="-8">Blackjack pays 3 to 2</textPath>
          </text>
          <text className="bj-arc-t2">
            <textPath href="#bj-arc-b" startOffset="50%" textAnchor="middle">Dealer stands on soft 17 · Play chips only</textPath>
          </text>
        </svg>

        <div className="bj-zone">
          <div className="bj-hand">
            {player.length ? (
              player.map((c, i) => (
                <PlayingCard
                  key={`${dealNo}-p${i}`}
                  rank={c.r}
                  suit={c.s}
                  className="bj-card"
                  style={i < 2 ? { animationDelay: `${i * 0.3}s` } : undefined}
                />
              ))
            ) : (
              <>
                <i className="bj-spot" />
                <i className="bj-spot" />
              </>
            )}
          </div>
          <div className="bj-who">
            <span>You</span>
            {player.length > 0 && <b>{total(player)}</b>}
            {player.length > 0 && <em className="bj-stake">Bet {fmt(stake)}</em>}
          </div>
        </div>
      </div>

      <div className="bj-msg" aria-live="polite">
        {phase === "bet" && hand === 0 && (
          <p>Ten hands, 1,000 play chips. Pips come from good decisions, not lucky cards: every textbook move earns them.</p>
        )}
        {phase === "bet" && shuffled && <p>Fresh shoe. The dealer reshuffled six decks.</p>}
        {coach && <p className={coach.ok ? "ok" : "no"}>{coach.text}</p>}
        {phase === "dealer" && !outcome && <p className="mid">Dealer plays…</p>}
        {outcome && (
          <p className={`res ${RESULT[outcome.res][1]}`}>
            {RESULT[outcome.res][0]}{" "}
            {outcome.net !== 0 && <span>{outcome.net > 0 ? "+" : "−"}{fmt(Math.abs(outcome.net))} chips</span>}
          </p>
        )}
      </div>

      {phase === "bet" && (
        <div className="bj-bet">
          <div className="bj-chips" role="radiogroup" aria-label="Bet size">
            {BETS.map((b) => (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={bet === b}
                className={`bj-chip c${b}`}
                disabled={b > chips}
                onClick={() => setBet(b)}
              >
                {b}
              </button>
            ))}
          </div>
          <button type="button" className="btn bj-deal" onClick={deal}>Deal · bet {bet}</button>
        </div>
      )}

      {(phase === "play" || phase === "dealer") && (
        <div className="bj-acts">
          <button type="button" className="g-btn up" disabled={phase !== "play"} onClick={() => act("hit")}>Hit</button>
          <button type="button" className="g-btn bj-stand" disabled={phase !== "play"} onClick={() => act("stand")}>Stand</button>
          <button type="button" className="g-btn bj-double" disabled={!canDouble} onClick={() => act("double")}>Double</button>
        </div>
      )}

      {phase === "result" && (
        <div className="g-btns one">
          <button type="button" className="btn" onClick={next}>{last ? "See your results" : "Next hand"}</button>
        </div>
      )}

      <BjStyles />
    </div>
  );
}

function BjStyles() {
  return (
    <style jsx global>{`
    .bj {
      gap: 14px;
    }
    .bj-sep {
      display: inline-block;
      width: 1px;
      height: 12px;
      margin: 0 12px;
      background: var(--line-strong);
      vertical-align: middle;
    }
    .bj-table {
      --cw: clamp(62px, 15vw, 104px);
      display: grid;
      gap: 4px;
      padding: 18px 14px 26px;
      border: 1px solid var(--gold-deep);
      border-radius: 14px 14px 50% 50% / 14px 14px 22% 22%;
      background:
        radial-gradient(ellipse 70% 60% at 50% 0%, rgba(230, 195, 106, 0.12), transparent 70%),
        radial-gradient(ellipse at 50% 120%, rgba(230, 195, 106, 0.08), transparent 60%),
        #0b0a07;
      box-shadow: inset 0 0 0 6px rgba(8, 7, 5, 0.9), inset 0 0 0 7px rgba(230, 195, 106, 0.25), 0 20px 50px rgba(0, 0, 0, 0.5);
    }
    .bj-zone {
      display: grid;
      justify-items: center;
      gap: 10px;
    }
    .bj-who {
      display: flex;
      align-items: baseline;
      gap: 10px;
      font: 500 12px/1 var(--mono);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .bj-who b {
      font: 700 20px/1 var(--display);
      letter-spacing: 0;
      text-transform: none;
      color: var(--fg);
    }
    .bj-stake {
      font-style: normal;
      color: var(--gold);
    }
    .bj-hand {
      display: flex;
      justify-content: center;
      min-height: calc(var(--cw) * 1.4);
    }
    .bj-hand > * + * {
      margin-left: calc(var(--cw) * -0.42);
    }
    .bj-card {
      width: var(--cw);
      filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.6));
      animation: bj-deal 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
    }
    @keyframes bj-deal {
      from {
        opacity: 0;
        transform: translate(160px, -120px) rotate(18deg);
      }
    }
    .bj-spot {
      display: block;
      width: var(--cw);
      aspect-ratio: 240 / 336;
      border: 1px dashed rgba(230, 195, 106, 0.3);
      border-radius: 8px;
    }
    .bj-spot + .bj-spot {
      margin-left: 10px;
    }
    .bj-arc {
      width: min(100%, 520px);
      justify-self: center;
      overflow: visible;
    }
    .bj-arc-t1 {
      font: 600 19px var(--display);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      fill: rgba(230, 195, 106, 0.75);
    }
    .bj-arc-t2 {
      font: 500 12px var(--mono);
      letter-spacing: 0.16em;
      text-transform: uppercase;
      fill: rgba(167, 158, 137, 0.75);
    }
    .bj-msg {
      min-height: 48px;
      display: grid;
      gap: 4px;
      align-content: center;
      text-align: center;
    }
    .bj-msg p {
      margin: 0;
      font: 500 16px/1.45 var(--body);
      color: #cfc6b1;
    }
    .bj-msg .ok {
      color: var(--gold);
    }
    .bj-msg .no {
      color: var(--loss);
    }
    .bj-msg .res {
      font: 700 20px/1.3 var(--display);
    }
    .bj-msg .res span {
      font: 500 14px/1 var(--mono);
      margin-left: 6px;
      white-space: nowrap;
    }
    .bj-bet {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }
    .bj-chips {
      display: flex;
      gap: 12px;
    }
    .bj-chip {
      width: 58px;
      height: 58px;
      padding: 0;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font: 700 15px/1 var(--display);
      letter-spacing: 0;
      color: var(--fg);
      border: 2px solid var(--gold-deep);
      background:
        radial-gradient(circle, #15120c 0 52%, transparent 53%),
        repeating-conic-gradient(var(--chip) 0 15deg, #0d0b08 15deg 30deg);
      transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    }
    .bj-chip.c25 {
      --chip: #a79e89;
    }
    .bj-chip.c50 {
      --chip: #e6c36a;
    }
    .bj-chip.c100 {
      --chip: #d9664a;
    }
    .bj-chip:hover {
      box-shadow: 0 0 16px rgba(230, 195, 106, 0.35);
    }
    .bj-chip[aria-checked="true"] {
      border-color: var(--gold-hi);
      transform: translateY(-4px);
      box-shadow: 0 0 0 3px var(--gold-soft), 0 0 22px rgba(230, 195, 106, 0.45);
    }
    .bj-chip:disabled {
      opacity: 0.35;
      transform: none;
      box-shadow: none;
    }
    .bj-deal {
      min-height: 58px;
      padding: 0 28px;
    }
    .bj-acts {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }
    .bj-acts .g-btn {
      min-height: 58px;
      font-size: 18px;
    }
    .g-btn.bj-stand {
      background: transparent;
      color: var(--gold);
      border: 1px solid var(--gold);
    }
    .g-btn.bj-double {
      background: linear-gradient(135deg, #7a3f2c, var(--loss));
      color: #0b0b0b;
    }
    .bj-acts .g-btn:disabled {
      opacity: 0.4;
    }
    .bj-done {
      gap: 16px;
    }
    .bj-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      width: 100%;
      max-width: 620px;
      border: 1px solid var(--line);
    }
    .bj-stats div {
      display: grid;
      gap: 6px;
      padding: 14px 10px;
      border-right: 1px solid var(--line);
    }
    .bj-stats div:last-child {
      border-right: 0;
    }
    .bj-stats b {
      font: 700 24px/1 var(--display);
      color: var(--fg);
    }
    .bj-stats b.up {
      color: var(--gold);
    }
    .bj-stats b.down {
      color: var(--loss);
    }
    .bj-stats span {
      font: 500 11px/1.3 var(--mono);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .bj-pips b {
      font: 700 26px/1 var(--display);
    }
    @media (max-width: 560px) {
      .bj-stats {
        grid-template-columns: 1fr 1fr;
      }
      .bj-stats div:nth-child(2) {
        border-right: 0;
      }
      .bj-stats div:nth-child(-n + 2) {
        border-bottom: 1px solid var(--line);
      }
      .bj-arc-t2 {
        display: none;
      }
      .bj .g-top {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .bj .g-score {
        font-size: 12px;
        white-space: nowrap;
      }
      .bj .g-score b {
        font-size: 16px;
      }
      .bj-sep {
        margin: 0 8px;
      }
    }
    .no-fx .bj-card {
      animation: none;
    }
  `}</style>
  );
}
