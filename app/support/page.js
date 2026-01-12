export default function SupportPage() {
  return (
    <div className="legalWrap">
      <header className="legalHeader">
        <a href="/" className="legalBack">
          <img src="/emblem.jpg" alt="Winners Circle University" className="legalLogo" />
          <span>Back to main site</span>
        </a>
      </header>

      <main className="legalMain">
        <h1>Support &amp; FAQ</h1>

        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:support@winners-circle-university.com">support@winners-circle-university.com</a>
        </p>

        <h2>Crypto payments</h2>
        <ul>
          <li><b>USDT is TRC20 only.</b> Do not send on ERC20/BEP20.</li>
          <li>Send the exact amount shown on your dashboard.</li>
          <li>After sending, paste your <b>TXID</b> and click Verify.</li>
        </ul>

        <h2>Stripe payments</h2>
        <ul>
          <li>If Stripe checkout fails, try a different card or bank, or contact support.</li>
        </ul>

        <h2>Common issues</h2>
        <ul>
          <li>“Not confirmed yet” usually means the blockchain needs more confirmations.</li>
          <li>If you sent the wrong network, contact support (recovery is not guaranteed).</li>
        </ul>
      </main>
    </div>
  );
}
