// Academy missions: short story cards ending in one challenge question.
// Slide kinds: big (statement), split (two sides), stat (huge number), list (3 points), candles (diagram).
export const MISSIONS = [
  {
    id: "m1",
    code: "Ground Zero",
    title: "What trading is",
    icon: "M16 4v24M4 16h24M9 9l14 14M23 9 9 23",
    slides: [
      { kind: "big", big: "Price goes up or down. You pick a side.", text: "That’s trading at its simplest: buy if you think price will rise, sell if you think it will fall." },
      { kind: "split", left: { tag: "Long", head: "Buy", text: "You win if price rises." }, right: { tag: "Short", head: "Sell", text: "You win if price falls." } },
      { kind: "big", big: "Your broker is the gatekeeper.", text: "A broker like Exness holds your money and connects you to the market. Always use a regulated one." },
      { kind: "stat", stat: "0 oz", kicker: "Gold you actually own", text: "Most people trade CFDs: you trade the price move without owning any gold." },
      { kind: "big", big: "This isn’t a salary.", text: "Some weeks lose. Anyone who says every week wins is selling you something." },
    ],
    q: { q: "You think gold is about to drop. Which button do you press?", o: ["Buy", "Sell", "Neither, wait for it to rise"], a: 1, e: "Selling (going short) makes money when price falls." },
  },
  {
    id: "m2",
    code: "The Battlefield",
    title: "Forex and gold",
    icon: "M6 26 16 6l10 20M10 18h12",
    slides: [
      { kind: "big", big: "Currencies fight in pairs.", text: "EUR/USD at 1.1000 means one euro buys 1.10 dollars." },
      { kind: "split", left: { tag: "Pair rises", head: "Euro wins", text: "EUR/USD up = euro got stronger." }, right: { tag: "Pair falls", head: "Dollar wins", text: "EUR/USD down = dollar got stronger." } },
      { kind: "big", big: "XAU/USD = gold, priced in dollars.", text: "XAU is gold’s code. The price is dollars per ounce." },
      { kind: "list", head: "What moves gold", items: ["Interest rates and the dollar", "Inflation news", "Fear in the markets"] },
      { kind: "stat", stat: "24/5", kicker: "Market hours", text: "Opens Sunday evening, closes Friday evening. Weekends off." },
    ],
    q: { q: "EUR/USD drops from 1.1000 to 1.0900. Which currency got stronger?", o: ["The euro", "The US dollar", "Neither"], a: 1, e: "The pair fell, so one euro buys fewer dollars: the dollar strengthened." },
  },
  {
    id: "m3",
    code: "Money Math",
    title: "Pips, lots and money",
    icon: "M8 24V12M16 24V6M24 24v-8",
    slides: [
      { kind: "big", big: "A pip is one tiny step.", text: "EUR/USD moving from 1.1000 to 1.1010 is 10 pips." },
      { kind: "stat", stat: "100 oz", kicker: "One lot of gold", text: "So 0.01 lot = 1 ounce. That’s where most beginners start." },
      { kind: "split", left: { tag: "0.01 lot", head: "$1", text: "per $1 gold move" }, right: { tag: "1 lot", head: "$100", text: "per $1 gold move" } },
      { kind: "big", big: "The spread is your entry fee.", text: "The gap between the buy and sell price. You pay it on every single trade." },
    ],
    q: { q: "You buy 0.01 lot of gold and it rises $5. What did you make?", o: ["$0.50", "$5", "$50"], a: 1, e: "0.01 lot = 1 ounce, so a $5 move = $5." },
    tool: "pips",
  },
  {
    id: "m4",
    code: "Double-Edged",
    title: "Leverage and margin",
    icon: "M6 26 26 6M20 6h6v6M6 20v6h6",
    slides: [
      { kind: "big", big: "Leverage is borrowed muscle.", text: "At 1:100, $1,000 can hold a $100,000 position." },
      { kind: "big", big: "Margin is the deposit.", text: "The broker locks part of your money while a trade is open." },
      { kind: "split", left: { tag: "Leverage changes", head: "Margin", text: "How much is locked up." }, right: { tag: "Lot size changes", head: "Your P/L", text: "How much each move is worth." } },
      { kind: "big", big: "Run out of margin and it’s game over.", text: "The broker closes your trades automatically. That’s called a stop out." },
    ],
    q: { q: "What does higher leverage actually change?", o: ["Margin needed to open a trade", "Profit per pip on the same lot", "Which way price moves"], a: 0, e: "Leverage only lowers the margin needed. Lot size decides profit per pip." },
    tool: "leverage",
  },
  {
    id: "m5",
    code: "Survival Mode",
    title: "Risk management",
    icon: "M16 4 27 8v8c0 6-5 10-11 12C10 26 5 22 5 16V8Z",
    slides: [
      { kind: "big", big: "Rule one: don’t blow the account.", text: "Profit is optional. Survival isn’t." },
      { kind: "list", head: "Before every trade, decide", items: ["Where you get in", "Where you’re wrong (stop loss)", "Where you take profit"] },
      { kind: "stat", stat: "−50% → +100%", kicker: "The climb back", text: "Lose half and you must double what’s left just to break even." },
      { kind: "big", big: "Small, fixed risk. Every time.", text: "Many pros risk 1–2% per trade. Winners Circle uses a fixed unit: capital ÷ 14." },
      { kind: "stat", stat: "33%", kicker: "Break-even win rate at 2:1", text: "Aim for twice what you risk and you can lose 2 out of 3 trades and still break even, before costs." },
    ],
    q: { q: "Your account drops 50%. What gain gets you back to where you started?", o: ["50%", "75%", "100%"], a: 2, e: "From half your money you need to double it: +100%." },
    tool: "rr",
  },
  {
    id: "m6",
    code: "Market Clock",
    title: "When markets move",
    icon: "M16 5a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm0 5v6l4 3",
    slides: [
      { kind: "list", head: "Four sessions run the day", items: ["Sydney", "Tokyo", "London", "New York"] },
      { kind: "big", big: "London + New York = rush hour.", text: "When both are open, volume and volatility are usually highest. Gold loves this window." },
      { kind: "list", head: "News that shakes prices", items: ["US jobs report (NFP)", "Inflation data (CPI)", "Interest rate decisions"] },
      { kind: "big", big: "Big news? Expect chaos.", text: "Prices jump, spreads widen and orders can fill worse than planned (slippage)." },
    ],
    q: { q: "When is gold usually most active?", o: ["Tokyo lunchtime", "The London–New York overlap", "Saturday"], a: 1, e: "The overlap brings the most volume. Saturday the market is closed." },
    tool: "clock",
  },
  {
    id: "m7",
    code: "Read the Map",
    title: "Reading the chart",
    icon: "M4 26h24M8 20V10M14 22V6M20 18v-6M26 16V8",
    slides: [
      { kind: "big", big: "Every candle tells a story.", text: "Open, high, low, close: four prices for one slice of time." },
      { kind: "candles" },
      { kind: "big", big: "Higher highs + higher lows = uptrend.", text: "Lower highs and lower lows = downtrend. When the pattern breaks, watch out." },
      { kind: "big", big: "Stops cluster above highs and below lows.", text: "Price often grabs that liquidity before turning. Traders call it a sweep." },
      { kind: "big", big: "Patterns are odds, not promises.", text: "Combine them with strict risk, every time." },
    ],
    q: { q: "Higher highs and higher lows means…", o: ["Uptrend", "Downtrend", "No trend"], a: 0, e: "Each swing pushes higher: that’s an uptrend." },
    tool: "candle",
  },
  {
    id: "m8",
    code: "Shield Up",
    title: "Copy trading and staying safe",
    icon: "M16 4 27 8v8c0 6-5 10-11 12C10 26 5 22 5 16V8Zm-4 12 3 3 6-6",
    slides: [
      { kind: "big", big: "Copy trading = follow a strategy automatically.", text: "Every trade is copied to your account in proportion to what you invest." },
      { kind: "list", head: "With Exness", items: ["Invest from $50", "Stop copying any time", "Fee only taken from profit"] },
      { kind: "stat", stat: "60–80%", kicker: "Retail CFD accounts that lose money", text: "Brokers in the UK and EU must publish this. Copying doesn’t make you immune." },
      { kind: "list", head: "Red flags. Walk away if they", items: ["Ask for your password", "Promise fixed returns", "Want money sent to them personally"] },
      { kind: "big", big: "Winners Circle will never do any of that.", text: "No passwords. No promises. Your money stays with Exness." },
    ],
    q: { q: "Someone promises 10% a week and asks for your MT5 password. This is…", o: ["A VIP opportunity", "Normal copy trading", "A scam. Walk away."], a: 2, e: "Real copy trading never needs your password, and no one can promise fixed returns." },
  },
];

export const XP_MISSION = 100;
export const XP_CORRECT = 20;

export const RANKS = [
  { name: "Rookie", xp: 0 },
  { name: "Apprentice", xp: 200 },
  { name: "Operator", xp: 450 },
  { name: "Elite", xp: 750 },
  { name: "Winner", xp: 1000 },
];

export function rankOf(xp) {
  let i = 0;
  RANKS.forEach((r, k) => {
    if (xp >= r.xp) i = k;
  });
  const cur = RANKS[i];
  const next = RANKS[i + 1];
  const pct = next ? ((xp - cur.xp) / (next.xp - cur.xp)) * 100 : 100;
  return { i, cur, next, pct };
}
