// Playing-card artwork shared by the falling-card background (canvas) and the hero cards (SVG).
// Suits are drawn as vector paths in a 100×100 box so they look the same on every device
// (the ♠♥♦♣ characters render as emoji on some phones).

export const SUIT_PATHS = {
  s: [
    "M50 3C56 15 70 26 82 36C94 46 98 55 98 63C98 76 88 84 76 84C67 84 59 79 55 72C56 82 60 90 68 97L32 97C40 90 44 82 45 72C41 79 33 84 24 84C12 84 2 76 2 63C2 55 6 46 18 36C30 26 44 15 50 3Z",
  ],
  h: [
    "M50 93C47 87 34 75 20 62C7 50 2 41 2 29C2 15 13 5 26 5C36 5 45 11 50 21C55 11 64 5 74 5C87 5 98 15 98 29C98 41 93 50 80 62C66 75 53 87 50 93Z",
  ],
  d: ["M50 2C58 19 71 36 86 50C71 64 58 81 50 98C42 81 29 64 14 50C29 36 42 19 50 2Z"],
  c: [
    "M31 29a19 19 0 1 0 38 0a19 19 0 1 0 -38 0Z",
    "M8 60a19 19 0 1 0 38 0a19 19 0 1 0 -38 0Z",
    "M54 60a19 19 0 1 0 38 0a19 19 0 1 0 -38 0Z",
    "M38 51a12 12 0 1 0 24 0a12 12 0 1 0 -24 0Z",
    "M46 52C46 76 42 88 32 97L68 97C58 88 54 76 54 52Z",
  ],
};

export const RED = { h: true, d: true };

// Foil colours: gold for spades and clubs, a deep ember red for hearts and diamonds.
export const FOIL = {
  gold: ["#a8832f", "#f6dfa0", "#e6c36a"],
  red: ["#9e3b2c", "#f0a084", "#d9664a"],
};

export const CARD_W = 240;
export const CARD_H = 336;
// Canvas sprites get a margin so the gold glow around the edge isn't cut off
export const PAD = 22;

const DISPLAY = '"Saira", "Arial Narrow", system-ui, sans-serif';

let pathCache = null;
const paths = (suit) => {
  if (!pathCache) {
    pathCache = {};
    for (const k of Object.keys(SUIT_PATHS)) pathCache[k] = SUIT_PATHS[k].map((d) => new Path2D(d));
  }
  return pathCache[suit];
};

const rounded = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const foil = (ctx, x0, y0, x1, y1, red) => {
  const c = red ? FOIL.red : FOIL.gold;
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, c[0]);
  g.addColorStop(0.45, c[1]);
  g.addColorStop(1, c[2]);
  return g;
};

const suitAt = (ctx, suit, cx, cy, size, fill) => {
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  ctx.scale(size / 100, size / 100);
  ctx.fillStyle = fill;
  for (const p of paths(suit)) ctx.fill(p);
  ctx.restore();
};

const shell = (ctx, W, H) => {
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#1a160f");
  bg.addColorStop(1, "#0a0907");
  rounded(ctx, 1.5, 1.5, W - 3, H - 3, 18);
  ctx.save();
  ctx.shadowColor = "rgba(230,195,106,.55)";
  ctx.shadowBlur = 20;
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.restore();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(240,210,130,.95)";
  ctx.stroke();
  rounded(ctx, 13, 13, W - 26, H - 26, 10);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(230,195,106,.4)";
  ctx.stroke();
};

const sheet = () => {
  const cv = document.createElement("canvas");
  cv.width = CARD_W + PAD * 2;
  cv.height = CARD_H + PAD * 2;
  const ctx = cv.getContext("2d");
  ctx.translate(PAD, PAD);
  return [cv, ctx];
};

// A card face: rank and suit in two corners, a large suit for aces, a framed letter for court cards.
export function drawFace(rank, suit) {
  const [cv, ctx] = sheet();
  const W = CARD_W, H = CARD_H, red = !!RED[suit];
  shell(ctx, W, H);

  const corner = () => {
    ctx.fillStyle = foil(ctx, 14, 20, 50, 90, red);
    ctx.font = `700 46px ${DISPLAY}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(rank, 36, 66);
    suitAt(ctx, suit, 36, 90, 28, foil(ctx, 22, 76, 50, 104, red));
  };
  corner();
  ctx.save();
  ctx.translate(W, H);
  ctx.rotate(Math.PI);
  corner();
  ctx.restore();

  if (rank === "A") {
    ctx.save();
    ctx.shadowColor = red ? "rgba(217,102,74,.55)" : "rgba(230,195,106,.55)";
    ctx.shadowBlur = 26;
    suitAt(ctx, suit, W / 2, H / 2 - 4, 118, foil(ctx, W / 2 - 59, H / 2 - 63, W / 2 + 59, H / 2 + 55, red));
    ctx.restore();
    if (suit === "s") {
      ctx.fillStyle = "rgba(230,195,106,.7)";
      ctx.font = `600 13px ${DISPLAY}`;
      ctx.textAlign = "center";
      ctx.fillText("WINNERS CIRCLE", W / 2, H / 2 + 82);
    }
  } else {
    rounded(ctx, 62, 66, W - 124, H - 132, 6);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(230,195,106,.45)";
    ctx.stroke();
    ctx.fillStyle = foil(ctx, W / 2 - 40, H / 2 - 60, W / 2 + 40, H / 2 + 40, red);
    ctx.font = `italic 600 118px ${DISPLAY}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(rank, W / 2, H / 2 + 4);
    suitAt(ctx, suit, W / 2, 92, 24, foil(ctx, W / 2 - 12, 80, W / 2 + 12, 104, red));
    suitAt(ctx, suit, W / 2, H - 92, 24, foil(ctx, W / 2 - 12, H - 104, W / 2 + 12, H - 80, red));
  }
  return cv;
}

// The card back: a gold lattice with the emblem in a medallion.
export function drawBack(emblem) {
  const [cv, ctx] = sheet();
  const W = CARD_W, H = CARD_H;
  shell(ctx, W, H);

  ctx.save();
  rounded(ctx, 13, 13, W - 26, H - 26, 10);
  ctx.clip();
  ctx.strokeStyle = "rgba(230,195,106,.28)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = -H; i < W + H; i += 20) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i + H, H);
    ctx.moveTo(i, H);
    ctx.lineTo(i + H, 0);
  }
  ctx.stroke();
  ctx.restore();

  const cx = W / 2, cy = H / 2, r = 60;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
  ctx.fillStyle = "#0d0b08";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(230,195,106,.8)";
  ctx.stroke();
  if (emblem && emblem.complete && emblem.naturalWidth) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(emblem, cx - r, cy - r, r * 2, r * 2);
    ctx.restore();
  } else {
    suitAt(ctx, "s", cx, cy, 60, foil(ctx, cx - 30, cy - 30, cx + 30, cy + 30, false));
  }
  return cv;
}
