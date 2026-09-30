"use client";

import { useEffect, useRef, useState } from "react";

// Site-wide futuristic layer: live gold background, cursor glow, scroll bar,
// 3D tilt on .fx-tilt cards, magnetic .fx-mag buttons and a Motion switch.
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
    let pts = [], candles = [], ripples = [];
    const mouse = { x: -9999, y: -9999, tx: 0, ty: 0, px: 0, py: 0 };

    const newCandle = (y) => ({
      x: Math.random() * W, y: y ?? H + 40, h: 14 + Math.random() * 46, w: 4 + Math.random() * 4,
      up: Math.random() < 0.62, s: 0.15 + Math.random() * 0.35, a: 0.05 + Math.random() * 0.09,
    });

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(110, Math.round((W * H) / 14000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H, z: 0.35 + Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      }));
      candles = Array.from({ length: Math.round(W / 90) }, () => newCandle(Math.random() * H));
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

    const drawCandles = (move) => {
      for (const c of candles) {
        if (move) { c.y -= c.s; if (c.y < -80) Object.assign(c, newCandle()); }
        const col = c.up ? `rgba(230,195,106,${c.a})` : `rgba(239,232,216,${c.a * 0.6})`;
        ctx.fillStyle = col; ctx.strokeStyle = col;
        ctx.beginPath(); ctx.moveTo(c.x + c.w / 2, c.y - 8); ctx.lineTo(c.x + c.w / 2, c.y + c.h + 8); ctx.stroke();
        ctx.fillRect(c.x, c.y, c.w, c.h);
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
            ctx.strokeStyle = `rgba(230,195,106,${(1 - d / LINK) * 0.22 * Math.min(a.z, b.z)})`;
            ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
          }
        }
        const md = Math.hypot(a.sx - mouse.x, a.sy - mouse.y);
        if (md < ML) {
          ctx.strokeStyle = `rgba(243,220,155,${(1 - md / ML) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(230,195,106,${0.35 + a.z * 0.5})`;
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
      grid(); drawCandles(move); drawPts(move); drawRipples();
      if (move) { t += 0.016; raf = requestAnimationFrame(frame); }
    }
    startRef.current = () => { if (!raf) frame(); };

    const onMove = (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.tx = e.clientX / W - 0.5; mouse.ty = e.clientY / H - 0.5;
      const r = document.documentElement.style;
      r.setProperty("--mx", e.clientX + "px"); r.setProperty("--my", e.clientY + "px");
    };
    const onDown = (e) => { if (fxRef.current) ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 }); };
    const onVis = () => { if (!document.hidden && fxRef.current && !raf) frame(); };
    const onLeave = () => { mouse.x = mouse.y = -9999; };

    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    document.addEventListener("pointerleave", onLeave);
    size();
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

    const fine = window.matchMedia("(pointer: fine)").matches;
    const onPoint = (e) => {
      if (!fxRef.current || !fine || !e.target.closest) return;
      const el = e.target.closest(".fx-tilt");
      if (el) {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        const k = Number(el.dataset.tilt || 7);
        el.style.setProperty("--rx", ((0.5 - y) * k).toFixed(2) + "deg");
        el.style.setProperty("--ry", ((x - 0.5) * k).toFixed(2) + "deg");
        el.style.setProperty("--sx", x * 100 + "%"); el.style.setProperty("--sy", y * 100 + "%");
      }
      const m = e.target.closest(".fx-mag");
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.setProperty("--tx", ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + "px");
        m.style.setProperty("--ty", ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + "px");
      }
    };
    const onOut = (e) => {
      const el = e.target.closest && e.target.closest(".fx-tilt, .fx-mag");
      if (!el || el.contains(e.relatedTarget)) return;
      ["--rx", "--ry", "--tx", "--ty"].forEach((p) => el.style.removeProperty(p));
    };
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
