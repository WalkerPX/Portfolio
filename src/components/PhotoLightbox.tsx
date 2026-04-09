import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
    // Prevent body scroll while lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const content = (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{ position: "absolute", top: 16, right: 16, zIndex: 1000000 }}
        className="text-white/70 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1000000 }}
          className="text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image + info */}
      <div
        className="flex flex-col items-center gap-4"
        style={{ maxWidth: "85vw", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          style={{ maxWidth: "80vw", maxHeight: "68vh", objectFit: "contain" }}
          className="rounded-xl shadow-2xl"
        />
        <div className="text-center text-white space-y-1">
          <p className="font-bold text-lg">{photo.title}</p>
          {photo.client && <p className="text-white/70 text-sm">{photo.client}</p>}
          {photo.date && <p className="text-white/60 text-sm">{photo.date}</p>}
          {photo.description && <p className="text-white/60 text-sm max-w-lg">{photo.description}</p>}
        </div>
        <p className="text-white/40 text-xs">
          {index + 1} / {photos.length} · ← → arrow keys · Esc to close
        </p>
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1000000 }}
          className="text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );

  // Render into document.body via portal — escapes all parent transforms/stacking contexts
  return createPortal(content, document.body);
};

export default PhotoLightbox;
