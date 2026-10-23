// Blackjack rules for the Academy table: 6 decks, dealer stands on soft 17, blackjack pays 3 to 2,
// double on any first two cards, no splitting, dealer checks for blackjack first.
// Plain functions so the game and the house-edge simulation use exactly the same rules.

export const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export const SUITS = ["s", "h", "d", "c"];
export const DECKS = 6;

export function newShoe(rand = Math.random) {
  const shoe = [];
  for (let d = 0; d < DECKS; d++) for (const s of SUITS) for (const r of RANKS) shoe.push({ r, s });
  for (let i = shoe.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shoe[i], shoe[j]] = [shoe[j], shoe[i]];
  }
  return shoe;
}

// Reshuffle once three quarters of the shoe is used, like a real cut card
export const needsShuffle = (shoe) => shoe.length < DECKS * 52 * 0.25;

export const cardValue = (c) => (c.r === "A" ? 11 : ["J", "Q", "K"].includes(c.r) ? 10 : Number(c.r));

export function handValue(cards) {
  let total = 0, aces = 0;
  for (const c of cards) {
    total += cardValue(c);
    if (c.r === "A") aces++;
  }
  while (total > 21 && aces) {
    total -= 10;
    aces--;
  }
  return { total, soft: aces > 0 };
}

export const isBlackjack = (cards) => cards.length === 2 && handValue(cards).total === 21;

export function dealerPlay(cards, shoe) {
  const hand = [...cards];
  while (handValue(hand).total < 17) hand.push(shoe.pop());
  return hand;
}

// The "textbook" move (basic strategy) for these rules. Returns "hit", "stand" or "double".
export function bookMove(cards, up) {
  const { total, soft } = handValue(cards);
  const d = cardValue(up); // 2..11
  const canDouble = cards.length === 2;
  const dbl = (yes) => (yes ? (canDouble ? "double" : "hit") : "hit");

  if (soft && total <= 21) {
    if (total >= 19) return "stand";
    if (total === 18) {
      if (d >= 3 && d <= 6) return canDouble ? "double" : "stand";
      return d <= 8 ? "stand" : "hit";
    }
    if (total === 17) return dbl(d >= 3 && d <= 6);
    if (total === 15 || total === 16) return dbl(d >= 4 && d <= 6);
    if (total === 13 || total === 14) return dbl(d >= 5 && d <= 6);
    return "hit";
  }
  if (total >= 17) return "stand";
  if (total >= 13) return d <= 6 ? "stand" : "hit";
  if (total === 12) return d >= 4 && d <= 6 ? "stand" : "hit";
  if (total === 11) return dbl(d <= 10);
  if (total === 10) return dbl(d <= 9);
  if (total === 9) return dbl(d >= 3 && d <= 6);
  return "hit";
}

// Settle a finished hand. bet is the final stake (already doubled if the player doubled).
// Returns chips won (+) or lost (-) and a result label.
export function settle(player, dealer, bet) {
  const p = handValue(player).total, d = handValue(dealer).total;
  const pbj = isBlackjack(player), dbj = isBlackjack(dealer);
  if (pbj && dbj) return { net: 0, res: "push" };
  if (pbj) return { net: bet * 1.5, res: "blackjack" };
  if (dbj) return { net: -bet, res: "dealer-bj" };
  if (p > 21) return { net: -bet, res: "bust" };
  if (d > 21) return { net: bet, res: "dealer-bust" };
  if (p > d) return { net: bet, res: "win" };
  if (p < d) return { net: -bet, res: "lose" };
  return { net: 0, res: "push" };
}
