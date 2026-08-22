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
    <section id="legacy" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Since 2020"
          title="Our Legacy"
          subtitle="Every generation has contributed to building Team Averera."
        />
        <Timeline generations={generations} onSelect={onSelect} />
      </div>
    </section>
  );
}
