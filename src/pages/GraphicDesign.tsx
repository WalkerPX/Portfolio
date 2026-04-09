import PageShell from "@/components/PageShell";
import CategoryGalleryGrid from "@/components/CategoryGalleryGrid";
import { GalleryPhoto } from "@/components/PhotoLightbox";

// ── ADD YOUR PHOTOS HERE ──────────────────────────────────────────────────────
const PHOTOS: GalleryPhoto[] = [
  // Example entry (remove this and add your real imports/entries):
  // { src: myDesign, title: "Ross-Ade Brigade Poster", client: "Ross-Ade Brigade", date: "Fall 2024" },
];
// ─────────────────────────────────────────────────────────────────────────────

const GraphicDesign = () => (
  <PageShell backTo="/gallery" showHome>
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Graphic Design</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Posters, social graphics, and visual design work. Click any image to view fullscreen.
      </p>
      <CategoryGalleryGrid photos={PHOTOS} emptyMessage="Graphic design work coming soon!" />
    </div>
  </PageShell>
);

export default GraphicDesign;
