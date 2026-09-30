export default function PrivacyPage() {
  return (
    <div className="legalWrap">
      <header className="legalHeader">
        <a href="/" className="legalBack">
          <img src="/emblem.jpg" alt="" className="legalLogo" />
          <span>← Hub</span>
        </a>
      </header>
      <main className="legalMain">
        <h1>Privacy Policy</h1>
        <p>
          Winners Circle University (“WCU”) respects your privacy. We collect only what we need to run the website and
          members area.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>Account info (such as your email) needed to sign you in to the members area.</li>
          <li>Waitlist details you choose to give us (name, email, country).</li>
          <li>Usage and technical logs to prevent abuse and diagnose issues.</li>
        </ul>

        <h2>What we never collect</h2>
        <ul>
          <li>Your Exness or MT5 passwords.</li>
          <li>Your card or bank details. Deposits, withdrawals and fees happen inside Exness.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To operate the members area and send updates you signed up for.</li>
          <li>To maintain security and prevent fraud.</li>
        </ul>

        <h2>Sharing</h2>
        <ul>
          <li>We do not sell your personal data.</li>
          <li>We share it only with service providers that run the site (hosting, sign-in, forms) or when required by law.</li>
        </ul>

        <h2>Your choices</h2>
        <p>
          You can request access to or deletion of your data by emailing{" "}
          <a href="mailto:support@winners-circle-university.com">support@winners-circle-university.com</a>.
        </p>

        <p className="legalNote">Last updated: September 30, 2026</p>
      </main>
    </div>
  );
}
