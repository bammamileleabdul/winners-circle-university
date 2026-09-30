"use client";

import PageShell from "../../components/PageShell";
import MiniLelefx from "../../components/MiniLelefx";

export default function AiPage() {
  return (
    <PageShell
      eyebrow="Assistant"
      title="mini lelefx"
      intro="Ask how copying through Exness works, how the fee is charged, or about the principles we trade by."
    >
      <MiniLelefx inline />
    </PageShell>
  );
}
