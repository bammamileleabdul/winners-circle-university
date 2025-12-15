"use client";

import { useState } from "react";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showManifesto, setShowManifesto] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-yellow-500/20">
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-yellow-400 font-semibold">Winners Circle</span>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-yellow-400 text-2xl"
          >
            ☰
          </button>
        </div>
      </header>

      {/* SIDE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur">
          <div className="absolute right-0 top-0 h-full w-64 bg-black border-l border-yellow-500/20 p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-yellow-400 mb-6"
            >
              ✕ Close
            </button>
            <nav className="flex flex-col gap-4 text-yellow-300">
              <a href="#overview" onClick={() => setMenuOpen(false)}>Overview</a>
              <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
              <a href="#principles" onClick={() => setMenuOpen(false)}>Principles</a>
              <a href="#manifesto" onClick={() => setMenuOpen(false)}>Manifesto</a>
              <a href="#vvip" onClick={() => setMenuOpen(false)}>VVIP</a>
            </nav>
          </div>
        </div>
      )}

      {/* OVERVIEW */}
      <section id="overview" className="pt-32 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
          Winners Circle University
        </h1>
        <p className="mt-6 text-gray-300 max-w-xl mx-auto">
          A performance-based gold trading framework combining structured AI
          modelling with disciplined human execution.
        </p>

        <button className="mt-10 px-8 py-4 bg-yellow-500 text-black rounded-full font-semibold shadow-lg hover:scale-105 transition">
          Join the Waitlist
        </button>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mt-32 px-6">
        <h2 className="text-3xl text-center text-yellow-400 mb-12">
          How It Works
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-6">
          {[
            {
              title: "Read Structure",
              text: "We react to price, not predictions.",
            },
            {
              title: "Risk First",
              text: "Capital protection is non-negotiable.",
            },
            {
              title: "Execute Clean",
              text: "Precision beats frequency.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="min-w-[260px] bg-black border border-yellow-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,215,0,0.08)]"
            >
              <h3 className="text-yellow-400 font-semibold text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="mt-32 px-6 text-center">
        <h2 className="text-3xl text-yellow-400 mb-10">Our Principles</h2>

        <div className="grid gap-6 max-w-xl mx-auto">
          {[
            "Discipline over dopamine — consistency outlives motivation.",
            "Risk before reward — survival creates opportunity.",
            "Process over outcomes — mastery compounds quietly.",
            "Patience compounds — time is the real edge.",
            "Consistency creates inevitability — results follow alignment.",
          ].map((p, i) => (
            <div
              key={i}
              className="bg-black border border-yellow-500/30 rounded-2xl p-6 text-yellow-200 shadow-[0_0_30px_rgba(255,215,0,0.08)]"
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="mt-32 px-6 text-center">
        <button
          onClick={() => setShowManifesto(true)}
          className="text-yellow-400 text-xl underline underline-offset-8"
        >
          This was not written for everyone
        </button>

        {showManifesto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
            <div className="bg-black border border-yellow-500/40 rounded-3xl p-8 max-w-md text-center shadow-[0_0_60px_rgba(255,215,0,0.15)] animate-scaleIn">
              <h3 className="text-yellow-400 text-2xl mb-4">
                Founder’s Manifesto
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Winners Circle was not built for excitement.  
                It was built for longevity.
                <br /><br />
                I’ve seen impatience destroy talent.  
                I’ve seen discipline quietly outperform brilliance.
                <br /><br />
                This framework removes noise, emotion, and ego —
                replacing them with structure, risk awareness, and clarity.
                <br /><br />
                If you’re here to rush or gamble, this won’t work.
                If you’re here to compound patiently — you’re home.
              </p>

              <p className="mt-6 text-yellow-400">— Lelefx, Founder</p>

              <button
                onClick={() => setShowManifesto(false)}
                className="mt-8 px-6 py-3 bg-yellow-500 text-black rounded-full font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* VVIP */}
      <section id="vvip" className="mt-32 px-6 text-center pb-32">
        <h2 className="text-3xl text-yellow-400 mb-6">VVIP Access</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          VVIP is not purchased. It is earned through consistency, discipline,
          and long-term alignment.
        </p>

        <button className="mt-8 px-8 py-4 border border-yellow-500 text-yellow-400 rounded-full hover:bg-yellow-500 hover:text-black transition">
          Explore VVIP Access
        </button>
      </section>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </main>
  );
}
