export default function TermsPage() {
  return (
    <div className="legalWrap">
      <header className="legalHeader">
        <a href="/" className="legalBack">
          <img src="/emblem.jpg" alt="" className="legalLogo" />
          <span>← Hub</span>
        </a>
      </header>
      <main className="legalMain">
        <h1>Terms &amp; Conditions</h1>
        <p>
          By accessing Winners Circle University (“WCU”), you agree to these Terms. WCU provides educational content
          and information about a trading strategy that can be copied through Exness Social Trading. Nothing on this
          site is financial advice.
        </p>

        <h2>Eligibility</h2>
        <ul>
          <li>You must be 18 or older.</li>
          <li>You must be legally allowed to use Exness and its Social Trading service in your country.</li>
          <li>You are responsible for understanding local rules and tax obligations.</li>
        </ul>

        <h2>Copy trading and fees</h2>
        <ul>
          <li>Copy trading takes place on Exness, under Exness’s own terms. Your account and funds are held by Exness, not WCU.</li>
          <li>WCU never asks for, stores or uses your broker passwords, and never holds client money.</li>
          <li>Any performance fee is set on the strategy and calculated, deducted and paid by Exness. WCU does not invoice you or take payments directly for copy trading.</li>
          <li>You can stop copying or withdraw at any time through Exness.</li>
        </ul>

        <h2>Risk</h2>
        <ul>
          <li>Trading forex and CFDs on margin involves high risk and you can lose all of the money you invest.</li>
          <li>Copying a strategy copies its losses as well as its gains.</li>
          <li>Past performance, including simulator results, does not guarantee future results.</li>
          <li>You remain responsible for your investment decisions.</li>
        </ul>

        <h2>Support</h2>
        <p>
          For questions, contact <a href="mailto:support@winners-circle-university.com">support@winners-circle-university.com</a>.
        </p>

        <p className="legalNote">Last updated: September 30, 2026</p>
      </main>
    </div>
  );
}
