"use client";

import { useEffect, useState } from "react";

// Each session in its own city's local time, so daylight saving is handled automatically.
const SESSIONS = [
  { name: "Sydney", tz: "Australia/Sydney", open: 7, close: 16 },
  { name: "Tokyo", tz: "Asia/Tokyo", open: 9, close: 18 },
  { name: "London", tz: "Europe/London", open: 8, close: 17 },
  { name: "New York", tz: "America/New_York", open: 8, close: 17 },
];

function local(tz, d) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", weekday: "short", hourCycle: "h23" }).formatToParts(d);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return { h: +get("hour"), m: +get("minute"), wd: get("weekday"), label: `${get("hour")}:${get("minute")}` };
}

// Forex closes from Friday 17:00 to Sunday 17:00 New York time.
function weekendClosed(d) {
  const ny = local("America/New_York", d);
  return (ny.wd === "Fri" && ny.h >= 17) || ny.wd === "Sat" || (ny.wd === "Sun" && ny.h < 17);
}

export default function SessionClock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const closed = now ? weekendClosed(now) : false;
  const rows = SESSIONS.map((s) => {
    if (!now) return { ...s, open: false, time: "--:--", pct: 0 };
    const l = local(s.tz, now);
    const isWeekday = !["Sat", "Sun"].includes(l.wd);
    const mins = l.h * 60 + l.m;
    const isOpen = !closed && isWeekday && mins >= s.open * 60 && mins < s.close * 60;
    const pct = Math.min(100, Math.max(0, ((mins - s.open * 60) / ((s.close - s.open) * 60)) * 100));
    return { ...s, isOpen, time: l.label, pct };
  });
  const openNames = rows.filter((r) => r.isOpen).map((r) => r.name);

  return (
    <div className="lab">
      <div className="lab-head">
        <span className="fx-eyebrow">Live</span>
        <h3>Which markets are open right now</h3>
      </div>
      <div className="sc">
        {rows.map((r) => (
          <div key={r.name} className={`sc-row ${r.isOpen ? "on" : ""}`}>
            <span className="sc-dot" aria-hidden="true" />
            <b>{r.name}</b>
            <span className="sc-time">{r.time} local</span>
            <span className="sc-hours">
              {String(r.open).padStart(2, "0")}:00–{String(r.close).padStart(2, "0")}:00
            </span>
            <span className="sc-bar" aria-hidden="true">
              <i style={{ width: r.isOpen ? `${r.pct}%` : "0%" }} />
            </span>
            <span className="sc-state">{r.isOpen ? "Open" : "Closed"}</span>
          </div>
        ))}
      </div>
      <p className="lab-note">
        {!now
          ? "Loading the clock…"
          : closed
          ? "It’s the weekend: forex is closed from Friday 17:00 to Sunday 17:00 New York time. Prices can jump (gap) when it reopens."
          : openNames.length >= 2
          ? `${openNames.join(" and ")} are both open. Overlaps like this are usually the busiest, most volatile hours.`
          : openNames.length === 1
          ? `Only ${openNames[0]} is open right now.`
          : "Between main sessions. Markets are open but usually quieter, and spreads can be wider."}
      </p>
    </div>
  );
}
