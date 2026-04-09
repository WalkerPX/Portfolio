import PageShell from "@/components/PageShell";
import CategoryGalleryGrid from "@/components/CategoryGalleryGrid";
import { GalleryPhoto } from "@/components/PhotoLightbox";

const PHOTOS: GalleryPhoto[] = [
  {
    src: import.meta.env.BASE_URL + "images/200winsgraphic.jpg",
    title: "200 Career Wins",
    client: "Lafayette Aviators",
    date: "July 22, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/BrodyCardGraphic.jpg",
    title: "Baseball Card",
    client: "Lafayette Aviators",
    date: "August 5, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/ThankYouFansGraphic.jpg",
    title: "Thank You Fans",
    client: "Lafayette Aviators",
    date: "August 7, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/NationalMascotDayGraphics.jpg",
    title: "National Mascot Day",
    client: "Lafayette Aviators",
    date: "June 17, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/SpringShowcaseGraphic.jpg",
    title: "Spring Showcase",
    client: "Ross-Ade Brigade",
    date: "April 12, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/StudentsWantedGraphic.jpg",
    title: "Student Recruitment",
    client: "Ross-Ade Brigade",
    date: "April 3, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/OfficerApplication.jpg",
    title: "Officer Application",
    client: "Ross-Ade Brigade",
    date: "August 22, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/NotreDameGraphic .jpg",
    title: "Purdue vs Notre Dame Gameday",
    client: "Ross-Ade Brigade",
    date: "September 19, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/IllinoisGamedayGraphic.jpg",
    title: "Purdue vs Illinois Gameday",
    client: "Ross-Ade Brigade",
    date: "October 3, 2025",
  },
];

const GraphicDesign = () => (
  <PageShell backTo="/gallery" showHome>
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Graphic Design</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Social media graphics and promotional designs created for the Lafayette Aviators and Ross-Ade Brigade.
        Click any image to view fullscreen — use arrow keys or buttons to navigate.
      </p>
      <CategoryGalleryGrid photos={PHOTOS} />
    </div>
  </PageShell>
);

export default GraphicDesign;
