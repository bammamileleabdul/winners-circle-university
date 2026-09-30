"use client";


export default function GetStartedPage() {
  return (
    <main className="gsWrap">
      <section className="gsHero">
        <div className="badge">Winners Circle University</div>
        <h1>Get started in 3 steps</h1>
        <p className="gsSub">
          Connect your trading account, track performance, and only pay a weekly fee when you’re in profit.
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
            In your portal you’ll see a simple connection guide (pairing code / EA). Once connected,
            your dashboard updates automatically.
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
        :global(body){
          --gold: rgba(243, 210, 122, 0.95);
          --gold2: rgba(201, 162, 77, 1);
          --muted: rgba(237, 237, 237, 0.78);
        }

        .gsWrap{min-height:100vh;padding:22px 14px 50px;max-width:1100px;margin:0 auto}
        .gsHero{text-align:center;padding:18px 12px 8px}
        .badge{display:inline-block;border:1px solid rgba(243,210,122,.25);background:rgba(243,210,122,.06);color:var(--gold);padding:6px 12px;border-radius:999px;font-weight:900;font-size:12px;margin-bottom:10px}
        .gsHero h1{font-size:40px;margin:0 0 10px;color:var(--gold)}
        .gsSub{color:var(--muted);max-width:720px;margin:0 auto 16px;line-height:1.6}
        .gsCtas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:14px 0 10px}
        .gsPrimary{border-radius:14px;padding:12px 18px;font-weight:900;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#0b0b0b;text-decoration:none}
        .gsGhost{border-radius:14px;padding:12px 18px;font-weight:800;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.2);color:var(--gold);text-decoration:none}
        .gsMini{opacity:.8;font-size:13px;color:var(--muted)}
        .gsMini a{color:var(--gold);text-decoration:none}
        .gsMini a:hover{text-decoration:underline}

        .gsGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:18px}
        @media (max-width:900px){.gsGrid{grid-template-columns:1fr}}
        .gsCard{border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.25);border-radius:16px;padding:16px}
        .gsStep{display:inline-block;font-weight:900;font-size:12px;border:1px solid rgba(243,210,122,.22);color:var(--gold);padding:4px 10px;border-radius:999px;margin-bottom:10px;background:rgba(243,210,122,.06)}
        .gsCard h2{margin:0 0 8px;color:var(--gold)}
        .gsCard p{color:var(--muted);line-height:1.6;margin:0}

        .gsPricing{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:14px}
        @media (max-width:900px){.gsPricing{grid-template-columns:1fr}}
        .gsPricingCard{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);border-radius:16px;padding:16px}
        .gsPricingCard h3{margin:0 0 8px;color:var(--gold)}
        .gsBig{font-size:46px;font-weight:950;background:linear-gradient(135deg,rgba(246,226,165,1),rgba(198,168,88,1));-webkit-background-clip:text;background-clip:text;color:transparent;margin:6px 0 10px}
        .gsPricingCard p{color:var(--muted);line-height:1.6;margin:0}
        .gsPricingCard ul{margin:8px 0 0;padding-left:18px;color:var(--muted);line-height:1.7}

        .gsRisk{margin-top:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);border-radius:16px;padding:16px}
        .gsRisk h3{margin:0 0 6px;color:var(--gold)}
        .gsRisk p{margin:0;color:var(--muted);line-height:1.6}
      `}</style>
    </main>
  );
}
