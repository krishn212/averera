export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-64 animate-pulse rounded-xl2 border border-white/5 bg-white/[0.02]"
        />
      ))}
    </div>
  );
}
