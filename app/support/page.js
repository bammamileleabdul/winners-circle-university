export default function SupportPage() {
  return (
    <div className="legalWrap">
      <header className="legalHeader">
        <a href="/" className="legalBack">
          <img src="/emblem.jpg" alt="" className="legalLogo" />
          <span>← Hub</span>
        </a>
      </header>
      <main className="legalMain">
        <h1>Support &amp; FAQ</h1>

        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:support@winners-circle-university.com">support@winners-circle-university.com</a>
        </p>

        <h2>Copying the strategy</h2>
        <ul>
          <li>Open and verify an Exness account, then find the Winners Circle strategy in Exness Social Trading.</li>
          <li>Press Invest and choose your amount. Trades then copy automatically.</li>
          <li>We will never ask for your password. Anyone who does is not us.</li>
        </ul>

        <h2>Fees</h2>
        <ul>
          <li>The performance fee is taken by Exness from profit only, at the end of each monthly period.</li>
          <li>No profit means no fee. You never pay Winners Circle directly.</li>
          <li>Use the fee calculator in the members area to check the maths.</li>
        </ul>

        <h2>Common issues</h2>
        <ul>
          <li>Can’t find Social Trading? It isn’t available in every country. Check with Exness support.</li>
          <li>Deposit or withdrawal questions go to Exness, since they hold your funds.</li>
          <li>Members area login problems: use the same email you signed up with, or contact us.</li>
        </ul>
      </main>
    </div>
  );
}
