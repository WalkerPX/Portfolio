import PageShell from "@/components/PageShell";
import CategoryGalleryGrid from "@/components/CategoryGalleryGrid";
import { GalleryPhoto } from "@/components/PhotoLightbox";

// ── ADD YOUR PHOTOS HERE ──────────────────────────────────────────────────────
const PHOTOS: GalleryPhoto[] = [];
// ─────────────────────────────────────────────────────────────────────────────

const OtherProjects = () => (
  <PageShell backTo="/gallery" showHome>
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Other Projects</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Videography, social media campaigns, and miscellaneous creative work.
      </p>
      <CategoryGalleryGrid photos={PHOTOS} emptyMessage="Other projects coming soon!" />
    </div>
  </PageShell>
);

export default OtherProjects;
