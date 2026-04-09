import { useState } from "react";
import PhotoLightbox, { GalleryPhoto } from "@/components/PhotoLightbox";

interface CategoryGalleryGridProps {
  photos: GalleryPhoto[];
  emptyMessage?: string;
}

const CategoryGalleryGrid = ({ photos, emptyMessage = "Photos coming soon!" }: CategoryGalleryGridProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground text-sm border border-dashed border-border rounded-2xl">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {photos.map((photo, i) => (
          <button
            key={i}
            className="break-inside-avoid w-full group relative rounded-xl overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer block"
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
              <p className="text-white text-xs font-semibold truncate">{photo.title}</p>
              {photo.client && <p className="text-white/70 text-xs truncate">{photo.client}</p>}
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)}
        />
      )}
    </>
  );
};

export default CategoryGalleryGrid;
