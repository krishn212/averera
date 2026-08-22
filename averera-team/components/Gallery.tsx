import Image from "next/image";

export default function Gallery({ photos }: { photos: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((src, i) => (
        <div key={i} className="relative aspect-square overflow-hidden rounded-lg ring-1 ring-white/10">
          <Image src={src} alt="" fill sizes="120px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
