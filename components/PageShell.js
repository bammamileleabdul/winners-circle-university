import Scramble from "./Scramble";

// Shared page frame for inner pages: back-to-hub bar, eyebrow, title, intro.
export default function PageShell({ eyebrow, title, intro, children, wide = false }) {
  return (
    <div className="shell">
      <div className={`shell-in ${wide ? "wide" : ""}`}>
        <a href="/" className="shell-back">
          <img src="/emblem.jpg" alt="" />
          <span>Hub</span>
        </a>
        {eyebrow && <span className="fx-eyebrow">{eyebrow}</span>}
        {title && <Scramble as="h1" className="shell-title" text={title} />}
        {intro && <p className="shell-intro">{intro}</p>}
        {children}
      </div>
    </div>
  );
}
