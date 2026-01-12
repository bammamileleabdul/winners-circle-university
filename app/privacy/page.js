export default function PrivacyPage() {
  return (
    <div className="legalWrap">
      <header className="legalHeader">
        <a href="/" className="legalBack">
          <img src="/emblem.jpg" alt="Winners Circle University" className="legalLogo" />
          <span>Back to main site</span>
        </a>
      </header>

      <main className="legalMain">
        <h1>Privacy Policy</h1>
        <p>
          Winners Circle University (“WCU”) respects your privacy. We collect only what we need
          to provide the service, verify payments, and improve reliability.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>Account info (e.g., email) needed to authenticate and secure access.</li>
          <li>Usage and technical logs to prevent abuse and diagnose issues.</li>
          <li>Payment records: Stripe payment references or on-chain transaction hashes (TXIDs).</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To operate your dashboard and deliver features.</li>
          <li>To verify payments and prevent fraud.</li>
          <li>To maintain security, compliance, and platform integrity.</li>
        </ul>

        <h2>Sharing</h2>
        <ul>
          <li>We do not sell your personal data.</li>
          <li>We share only when required to provide services (e.g., payment processors) or by law.</li>
        </ul>

        <h2>Your choices</h2>
        <p>
          You can request access or deletion of your data by emailing 
          <a href="mailto:support@winners-circle-university.com">support@winners-circle-university.com</a>.
        </p>

        <p className="legalNote">Last updated: January 12, 2026</p>
      </main>
    </div>
  );
}
