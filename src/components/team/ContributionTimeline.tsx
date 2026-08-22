import type { TimelineEntry } from "../../data/team";

export default function ContributionTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol style={{ 
      position: 'relative', 
      marginLeft: '8px', 
      listStyle: 'none', 
      paddingLeft: '24px', 
      borderLeft: '1px solid var(--border-color)', 
      margin: '0 0 0 8px',
      boxSizing: 'border-box'
    }}>
      {entries.map((entry, i) => (
        <li key={i} style={{ position: 'relative', marginBottom: '20px' }}>
          <span 
            style={{
              position: 'absolute',
              left: '-29.5px',
              top: '4px',
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              background: 'var(--accent-cyan)',
              border: '2px solid var(--bg-color)',
            }}
          />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', tracking: '0.05em', color: 'var(--accent-cyan)' }}>
            {entry.year}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px' }}>{entry.label}</div>
        </li>
      ))}
    </ol>
  );
}
