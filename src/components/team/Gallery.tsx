export default function Gallery({ photos }: { photos: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%' }}>
      {photos.map((src, i) => (
        <div 
          key={i} 
          style={{ 
            position: 'relative', 
            aspectRatio: '1/1', 
            overflow: 'hidden', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)', 
            boxSizing: 'border-box' 
          }}
        >
          <img src={src} alt="" style={{ position: 'absolute', inset: 0, height: '100%', width: '100%', objectFit: 'cover' }} />
        </div>
      ))}
    </div>
  );
}
