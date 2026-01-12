export default function TermsPage() {
  return (
    <div className="legalWrap">
      <header className="legalHeader">
        <a href="/" className="legalBack">
          <img src="/emblem.jpg" alt="Winners Circle University" className="legalLogo" />
          <span>Back to main site</span>
        </a>
      </header>

      <main className="legalMain">
        <h1>Terms &amp; Conditions</h1>
        <p>
          By accessing Winners Circle University (“WCU”), you agree to these Terms.
          WCU provides educational content and trading-related tools. Nothing on this
          site is financial advice.
        </p>

        <h2>Eligibility</h2>
        <ul>
          <li>You must be legally allowed to use our services in your jurisdiction.</li>
          <li>You are responsible for understanding local rules and tax obligations.</li>
        </ul>

        <h2>Payments</h2>
        <ul>
          <li>Stripe payments are processed by Stripe. Your bank/Stripe may apply fees.</li>
          <li>Crypto payments are final once confirmed on-chain.</li>
          <li>Access may be paused if payment is overdue or disputed.</li>
        </ul>

        <h2>Risk</h2>
        <ul>
          <li>Trading involves risk and you can lose money.</li>
          <li>Past performance does not guarantee future results.</li>
          <li>You remain responsible for your trading account and decisions.</li>
        </ul>

        <h2>Support</h2>
        <p>
          For questions, contact <a href="mailto:support@winners-circle-university.com">support@winners-circle-university.com</a>.
        </p>

        <p className="legalNote">Last updated: January 12, 2026</p>
      </main>
    </div>
  );
}
