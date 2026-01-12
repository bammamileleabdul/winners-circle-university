"use client";

export default function GetStartedPage() {
  return (
    <main className="gsWrap">
      <section className="gsHero">
        <div className="pill">GET STARTED · 3 STEPS</div>
        <h1>Get started in 3 steps</h1>
        <p className="gsSub">
          Create your account, connect MT5, and track performance in your Client Portal. 
          You only pay the weekly fee when you’re in profit.
        </p>

        <div className="gsCtas">
          <a className="gsPrimary" href="/signup">Create account</a>
          <a className="gsGhost" href="/login">Log in</a>
        </div>

        <div className="gsMini">
          Need help? <a href="/support">Support</a> · <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a>
        </div>
      </section>

      <section className="gsGrid">
        <div className="gsCard">
          <div className="gsStep">Step 1</div>
          <h2>Create your account</h2>
          <p>Sign up and open your client portal. This takes under 1 minute.</p>
        </div>

        <div className="gsCard">
          <div className="gsStep">Step 2</div>
          <h2>Connect your MT5</h2>
          <p>
            In your portal you’ll see your connection setup (pairing code / instructions). 
            Once connected, your dashboard updates automatically.
          </p>
        </div>

        <div className="gsCard">
          <div className="gsStep">Step 3</div>
          <h2>Pay only when profit exists</h2>
          <p>
            Your weekly profit is calculated from account snapshots. If profit is positive, you can pay by
            Stripe or Crypto (BTC / USDT TRC20). No profit = no weekly fee.
          </p>
        </div>
      </section>

      <section className="gsPricing">
        <div className="gsPricingCard">
          <h3>Weekly performance fee</h3>
          <div className="gsBig">30%</div>
          <p>Charged on weekly profit only. Your portal shows the fee due and payment options.</p>
        </div>

        <div className="gsPricingCard">
          <h3>What you get</h3>
          <ul>
            <li>Client portal dashboard + reporting</li>
            <li>Weekly profit / fee calculation</li>
            <li>Stripe + Crypto payment options</li>
            <li>Support & onboarding guidance</li>
          </ul>
        </div>
      </section>

      <section className="gsRisk">
        <h3>Risk notice</h3>
        <p>
          Trading involves risk and you may lose money. WCU is not financial advice. Past performance does not
          guarantee future results.
        </p>
      </section>

      <style jsx>{`
        .gsWrap{min-height:100vh;padding:22px 14px 50px;max-width:1100px;margin:0 auto}
        .pill{display:inline-block;font-weight:900;font-size:12px;border:1px solid rgba(255,255,255,.14);padding:6px 12px;border-radius:999px;opacity:.9;margin-bottom:12px}
        .gsHero{text-align:center;padding:18px 12px 8px}
        .gsHero h1{font-size:40px;margin:0 0 10px}
        .gsSub{opacity:.82;max-width:760px;margin:0 auto 16px;line-height:1.6}
        .gsCtas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:14px 0 10px}
        .gsPrimary{border-radius:14px;padding:12px 18px;font-weight:900;background:linear-gradient(135deg,#c9a24d,#f3d27a);color:#0b0b0b;text-decoration:none}
        .gsGhost{border-radius:14px;padding:12px 18px;font-weight:800;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.2);color:#f7f0d0;text-decoration:none}
        .gsMini{opacity:.75;font-size:13px}
        .gsMini a{color:#f3d27a;text-decoration:none}
        .gsMini a:hover{text-decoration:underline}

        .gsGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:18px}
        @media (max-width:900px){.gsGrid{grid-template-columns:1fr}}
        .gsCard{border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.25);border-radius:16px;padding:16px}
        .gsStep{display:inline-block;font-weight:900;font-size:12px;border:1px solid rgba(255,255,255,.14);padding:4px 10px;border-radius:999px;opacity:.85;margin-bottom:10px}
        .gsCard h2{margin:0 0 8px}
        .gsCard p{opacity:.84;line-height:1.6;margin:0}

        .gsPricing{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:14px}
        @media (max-width:900px){.gsPricing{grid-template-columns:1fr}}
        .gsPricingCard{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);border-radius:16px;padding:16px}
        .gsPricingCard h3{margin:0 0 8px}
        .gsBig{font-size:46px;font-weight:950;background:linear-gradient(135deg,#f6e2a5,#c6a858);-webkit-background-clip:text;background-clip:text;color:transparent;margin:6px 0 10px}
        .gsPricingCard p{opacity:.84;line-height:1.6;margin:0}
        .gsPricingCard ul{margin:8px 0 0;padding-left:18px;opacity:.86;line-height:1.7}

        .gsRisk{margin-top:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);border-radius:16px;padding:16px}
        .gsRisk h3{margin:0 0 6px}
        .gsRisk p{margin:0;opacity:.82;line-height:1.6}
      `}</style>
    </main>
  );
}
