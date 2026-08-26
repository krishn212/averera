"use client";

import type { LegacyGeneration, Member } from "../../data/team";
import SectionHeading from "./SectionHeading";
import Timeline from "./Timeline";

export default function LegacySection({
  generations,
  onSelect,
}: {
  generations: LegacyGeneration[];
  onSelect: (m: Member) => void;
}) {
  return (
    <section id="legacy" className="relative" style={{ padding: '100px 24px 80px 24px', boxSizing: 'border-box' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Since 2013"
          title="Our Legacy"
          subtitle="Founded in 2013 in a hostel common room, with a vision to build a greener future and transform electric mobility in India."
        />
        <Timeline generations={generations} onSelect={onSelect} />
      </div>
    </section>
  );
}
