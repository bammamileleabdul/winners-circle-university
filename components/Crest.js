// The emblem inside animated orbit rings.
export default function Crest({ size = 300, className = "" }) {
  return (
    <div className={`fx-crest ${className}`} style={{ "--crest": `${size}px` }}>
      <div className="ring r3" />
      <div className="ticks" />
      <div className="ring r2" />
      <div className="ring r1" />
      <img src="/emblem.jpg" alt="Winners Circle University emblem" className="fx-crest-img" />
    </div>
  );
}
