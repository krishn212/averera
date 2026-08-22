export default function SkillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span 
      className="badge-glass"
      style={{
        padding: '4px 12px',
        fontSize: '10px',
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
