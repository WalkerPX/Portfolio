import PageShell from "@/components/PageShell";
import CategoryGalleryGrid from "@/components/CategoryGalleryGrid";
import { GalleryPhoto } from "@/components/PhotoLightbox";
import purdueBallState from "@/assets/photography/purdue-vs-ball-state.jpg";

// ── ADD YOUR PHOTOS HERE ──────────────────────────────────────────────────────
// To add a photo: import it at the top (like purdueBallState above),
// then add an entry to this array.
const PHOTOS: GalleryPhoto[] = [
  {
    src: purdueBallState,
    title: "Purdue vs. Ball State Football",
    client: "Ross-Ade Brigade",
    date: "August 30th, 2025",
    description: "Game day photography for the Ross-Ade Brigade student section.",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const Photography = () => (
  <PageShell backTo="/gallery" showHome>
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Photography</h1>
      <p className="text-muted-foreground text-sm mb-8">
        A collection of my photography work. Click any photo to view it fullscreen.
      </p>
      <CategoryGalleryGrid photos={PHOTOS} emptyMessage="Photography coming soon!" />
    </div>
  </PageShell>
);

export default Photography;
