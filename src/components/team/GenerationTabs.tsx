"use client";

export default function GenerationTabs({
  generations,
  active,
  onChange,
}: {
  generations: string[];
  active: string;
  onChange: (gen: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px' }}>
      {generations.map((gen) => {
        const isActive = gen === active;
        return (
          <button
            key={gen}
            onClick={() => onChange(gen)}
            className={`filter-chip ${isActive ? "active" : ""}`}
            style={{ padding: '8px 24px', fontSize: '11.5px' }}
          >
            GEN {gen}
          </button>
        );
      })}
    </div>
  );
}
