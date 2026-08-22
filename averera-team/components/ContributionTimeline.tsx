import type { TimelineEntry } from "@/data/team";

export default function ContributionTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative ml-2 space-y-5 border-l border-white/10 pl-6">
      {entries.map((entry, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-copper-400 ring-4 ring-graphite-900" />
          <div className="font-mono text-[11px] uppercase tracking-wide text-signal-400">
            {entry.year}
          </div>
          <div className="text-sm text-paper">{entry.label}</div>
        </li>
      ))}
    </ol>
  );
}
