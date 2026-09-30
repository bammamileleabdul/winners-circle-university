"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789$%#";

// Text that briefly decodes from random characters when it scrolls into view or is hovered.
// Screen readers always get the real text.
export default function Scramble({ text, as: Tag = "span", className, delay = 0 }) {
  const [shown, setShown] = useState(text);
  const ref = useRef(null);
  const running = useRef(false);

  const run = () => {
    if (running.current || document.documentElement.classList.contains("no-fx")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;
    let f = 0;
    const total = text.length * 1.6 + 10;
    const step = () => {
      setShown(text.split("").map((c, i) => (c === " " || f > i * 1.6 + 8 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(""));
      if (++f < total) requestAnimationFrame(step);
      else { setShown(text); running.current = false; }
    };
    step();
  };

  useEffect(() => {
    setShown(text);
    const el = ref.current;
    if (!el) return;
    let timer;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { timer = setTimeout(run, delay); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text} onPointerEnter={run}>
      <span aria-hidden="true">{shown}</span>
    </Tag>
  );
}
