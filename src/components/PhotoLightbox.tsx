import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryPhoto {
  src: string;
  title: string;
  client: string;
  date: string;
  description?: string;
}

interface PhotoLightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const PhotoLightbox = ({ photos, index, onClose, onNext, onPrev }: PhotoLightboxProps) => {
  const photo = photos[index];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") onNext();
    else if (e.key === "ArrowLeft") onPrev();
    else if (e.key === "Escape") onClose();
  }, [onNext, onPrev, onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image + info */}
      <div
        className="flex flex-col items-center gap-4 max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="max-w-[80vw] max-h-[70vh] object-contain rounded-xl shadow-2xl"
        />
        <div className="text-center text-white space-y-1">
          <p className="font-bold text-lg">{photo.title}</p>
          {photo.client && <p className="text-white/70 text-sm">Client: {photo.client}</p>}
          {photo.date && <p className="text-white/60 text-sm">{photo.date}</p>}
          {photo.description && <p className="text-white/60 text-sm max-w-lg">{photo.description}</p>}
        </div>
        <p className="text-white/40 text-xs">
          {index + 1} / {photos.length} · ← → arrow keys to navigate · Esc to close
        </p>
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default PhotoLightbox;
