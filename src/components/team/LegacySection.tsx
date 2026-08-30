"use client";

import type { LegacyGeneration, Member } from "../../data/team";
import Timeline from "./Timeline";

export default function LegacySection({
  generations,
  onSelect,
}: {
  generations: LegacyGeneration[];
  onSelect: (m: Member) => void;
}) {
  return (
    <section id="legacy" className="relative" style={{ padding: '50px 24px 80px 24px', boxSizing: 'border-box' }}>
      <div className="mx-auto max-w-6xl">
        <Timeline generations={generations} onSelect={onSelect} />
      </div>
    </section>
  );
}
