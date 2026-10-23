"use client";

import { useEffect, useRef, useState } from "react";
import { CARD_W, PAD, drawBack, drawFace } from "../lib/cards";

// Site-wide futuristic layer: live gold background with falling playing cards, cursor glow,
// scroll bar, a cursor-following glow on .fx-tilt cards and a Motion switch.
export default function FxLayer() {
  const canvasRef = useRef(null);
  const barRef = useRef(null);
  const fxRef = useRef(true);
  const startRef = useRef(null);
  const [fxOn, setFxOn] = useState(true);

  useEffect(() => {
    let on = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      const s = localStorage.getItem("wcu-fx");
      if (s !== null) on = s === "1";
    } catch {}
    setFxOn(on);
  }, []);

  useEffect(() => {
    fxRef.current = fxOn;
    document.documentElement.classList.toggle("no-fx", !fxOn);
    try { localStorage.setItem("wcu-fx", fxOn ? "1" : "0"); } catch {}
    if (fxOn && startRef.current) startRef.current();
  }, [fxOn]);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, raf = 0, t = 0;
    let pts = [], ripples = [];
    const mouse = { x: -9999, y: -9999, tx: 0, ty: 0, px: 0, py: 0 };

    // Falling cards: mostly aces, plus kings, queens and jacks. Each one drifts down,
    // sways, and slowly turns over to show the crest on its back.
    const SUITS = ["s", "h", "d", "c"];
    const sprites = {};
    const emblem = new Image();
    let cards = [], cardsW = 0;
    const sprite = (rank, suit) => (sprites[rank + suit] ||= drawFace(rank, suit));
    const rebuild = () => {
      for (const k of Object.keys(sprites)) delete sprites[k];
      sprites.back = drawBack(emblem);
      if (!raf) frame();
    };
    const newCard = (y) => {
      const z = 0.3 + Math.random() * 0.7;
      return {
        x: Math.random() * W, y: y ?? -120 - Math.random() * H * 0.35, z, vx: 0,
        rank: Math.random() < 0.45 ? "A" : ["K", "Q", "J"][Math.floor(Math.random() * 3)],
        suit: SUITS[Math.floor(Math.random() * 4)],
        rot: (Math.random() - 0.5) * 0.9, vr: (Math.random() - 0.5) * 0.006,
        flip: Math.random() * 6.28, vf: (0.008 + Math.random() * 0.012) * (Math.random() < 0.5 ? -1 : 1), kick: 0,
        ph: Math.random() * 6.28, sf: 0.4 + Math.random() * 0.6,
      };
    };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(110, Math.round((W * H) / 14000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H, z: 0.35 + Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      }));
      // Rebuild cards only when the width changes, so a phone's address bar showing or hiding doesn't reset them
      if (!cards.length || Math.abs(W - cardsW) > 60) {
        cardsW = W;
        const n = Math.max(6, Math.min(15, Math.round(W / 105)));
        cards = Array.from({ length: n }, () => newCard(Math.random() * (H + 200) - 120)).sort((a, b) => a.z - b.z);
      }
      if (!raf) frame();
    };

    const grid = () => {
      const hz = H * 0.64, vx = W / 2 + mouse.px * 40, rows = 14, off = (t * 0.35) % 1;
      const g = ctx.createLinearGradient(0, hz, 0, H);
      g.addColorStop(0, "rgba(230,195,106,0)"); g.addColorStop(1, "rgba(230,195,106,.2)");
      ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.beginPath();
      for (let i = -14; i <= 14; i++) { ctx.moveTo(vx + i * 14, hz); ctx.lineTo(W / 2 + i * (W / 9), H); }
      for (let r = 0; r < rows; r++) { const p = (r + off) / rows, y = hz + (H - hz) * p * p; ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();
      const glow = ctx.createRadialGradient(vx, hz, 0, vx, hz, W * 0.45);
      glow.addColorStop(0, "rgba(230,195,106,.14)"); glow.addColorStop(1, "rgba(230,195,106,0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    };

    const drawCards = (move) => {
      if (!sprites.back) return;
      const scale = W < 700 ? 0.8 : 1;
      for (const c of cards) {
        const cw = (38 + c.z * 84) * scale, ch = cw * 1.4;
        if (move) {
          c.y += 0.25 + c.z * 0.65;
          c.x += Math.sin(t * c.sf + c.ph) * 0.25 * c.z + c.vx;
          c.vx *= 0.94;
          c.rot += c.vr;
          c.flip += c.vf + c.kick;
          c.kick *= 0.96;
          if (c.y - ch > H + 20) Object.assign(c, newCard(), { z: c.z });
        }
        const sx = Math.cos(c.flip), sxa = Math.max(0.05, Math.abs(sx));
        ctx.save();
        ctx.globalAlpha = (0.32 + c.z * 0.5) * (0.6 + 0.4 * sxa);
        ctx.translate(c.x + mouse.px * 34 * c.z, c.y + mouse.py * 22 * c.z);
        ctx.rotate(c.rot);
        ctx.scale(sxa, 1);
        const pad = (PAD / CARD_W) * cw;
        ctx.drawImage(sx >= 0 ? sprite(c.rank, c.suit) : sprites.back, -cw / 2 - pad, -ch / 2 - pad, cw + pad * 2, ch + pad * 2);
        ctx.restore();
      }
    };

    const drawPts = (move) => {
      const LINK = 130, ML = 190;
      for (const p of pts) {
        if (move) {
          p.x += p.vx * p.z; p.y += p.vy * p.z;
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
          if (d < ML && d > 0) { const f = ((ML - d) / ML) * 0.6; p.x += (dx / d) * f; p.y += (dy / d) * f; }
          for (const r of ripples) {
            const rx = p.x - r.x, ry = p.y - r.y, rd = Math.hypot(rx, ry);
            if (Math.abs(rd - r.r) < 30 && rd > 0) { p.x += (rx / rd) * 3 * r.life; p.y += (ry / rd) * 3 * r.life; }
          }
          if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
        }
        p.sx = p.x + mouse.px * 30 * p.z; p.sy = p.y + mouse.py * 30 * p.z;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(230,195,106,${(1 - d / LINK) * 0.15 * Math.min(a.z, b.z)})`;
            ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
          }
        }
        const md = Math.hypot(a.sx - mouse.x, a.sy - mouse.y);
        if (md < ML) {
          ctx.strokeStyle = `rgba(243,220,155,${(1 - md / ML) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(230,195,106,${0.25 + a.z * 0.4})`;
        ctx.beginPath(); ctx.arc(a.sx, a.sy, a.z * 1.9, 0, 7); ctx.fill();
      }
    };

    const drawRipples = () => {
      ripples = ripples.filter((r) => r.life > 0);
      for (const r of ripples) {
        r.r += 6; r.life -= 0.018;
        ctx.strokeStyle = `rgba(230,195,106,${r.life * 0.6})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 7); ctx.stroke();
      }
    };

    function frame() {
      raf = 0;
      const move = fxRef.current && !document.hidden;
      mouse.px += (mouse.tx - mouse.px) * 0.05; mouse.py += (mouse.ty - mouse.py) * 0.05;
      ctx.clearRect(0, 0, W, H);
      grid(); drawCards(move); drawPts(move); drawRipples();
      if (move) { t += 0.016; raf = requestAnimationFrame(frame); }
    }
    startRef.current = () => { if (!raf) frame(); };

    const onMove = (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.tx = e.clientX / W - 0.5; mouse.ty = e.clientY / H - 0.5;
      const r = document.documentElement.style;
      r.setProperty("--mx", e.clientX + "px"); r.setProperty("--my", e.clientY + "px");
    };
    const onDown = (e) => {
      if (!fxRef.current) return;
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
      // Cards near a click get flicked: they spin over and slide away from the pointer
      for (const c of cards) {
        const dx = c.x - e.clientX, dy = c.y - e.clientY, d = Math.hypot(dx, dy);
        if (d < 260 && d > 0) {
          const f = 1 - d / 260;
          c.kick += 0.16 * f * Math.sign(c.vf);
          c.vx += (dx / d) * 5 * f;
        }
      }
    };
    const onVis = () => { if (!document.hidden && fxRef.current && !raf) frame(); };
    const onLeave = () => { mouse.x = mouse.y = -9999; };

    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    document.addEventListener("pointerleave", onLeave);
    size();
    emblem.onload = rebuild;
    emblem.src = "/emblem.jpg";
    rebuild();
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('700 46px "Saira"'), document.fonts.load('italic 600 118px "Saira"')])
        .then(rebuild)
        .catch(() => {});
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    const prog = () => {
      const m = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${m > 0 ? window.scrollY / m : 0})`;
    };
    window.addEventListener("scroll", prog, { passive: true });
    prog();

    // Hover glow on .fx-tilt cards: a soft light follows the cursor. Nothing moves, so the
    // card's position never changes under the pointer (moving cards caused a jitter loop).
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onPoint = (e) => {
      if (!fxRef.current || !fine || !e.target.closest) return;
      const el = e.target.closest(".fx-tilt");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
      el.style.setProperty("--sy", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
    };
    const onOut = () => {};
    document.addEventListener("pointermove", onPoint, { passive: true });
    document.addEventListener("pointerout", onOut);
    return () => {
      window.removeEventListener("scroll", prog);
      document.removeEventListener("pointermove", onPoint);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fx-bg" aria-hidden="true" />
      <div className="fx-spot" aria-hidden="true" />
      <div ref={barRef} className="fx-bar" aria-hidden="true" />
      <button type="button" className="fx-toggle" aria-pressed={fxOn} onClick={() => setFxOn((v) => !v)}>
        <i />
        Motion
      </button>
    </>
  );
}
