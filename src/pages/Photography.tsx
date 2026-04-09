import PageShell from "@/components/PageShell";
import CategoryGalleryGrid from "@/components/CategoryGalleryGrid";
import { GalleryPhoto } from "@/components/PhotoLightbox";

const PHOTOS: GalleryPhoto[] = [
  {
    src: import.meta.env.BASE_URL + "images/BrodyBatFlip.jpg",
    title: "Brody Chrisman Bat Flip",
    client: "Lafayette Aviators",
    date: "July 12, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/EvadeTag.jpg",
    title: "Evading Tag at Home",
    client: "Lafayette Aviators",
    date: "June 12, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/GavinSmithHit.jpg",
    title: "Gavin Smith Grand Slam",
    client: "Lafayette Aviators",
    date: "June 17, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/ChaseCartronPostPitch.jpg",
    title: "Chase Cartron Ending Inning",
    client: "Lafayette Aviators",
    date: "June 17, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/HunterSnowCelebrate.jpg",
    title: "Hunter Snow Home Run Celebration",
    client: "Lafayette Aviators",
    date: "June 23, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/GavinSmithHitting.jpg",
    title: "Gavin Smith Hits a Line Drive",
    client: "Lafayette Aviators",
    date: "June 23, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/FourthOfJulyPitching.jpg",
    title: "Fourth of July Pitching Appearance",
    client: "Lafayette Aviators",
    date: "July 4, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/GavinCollinsSwinging.jpg",
    title: "Gavin Collins Swinging",
    client: "Lafayette Aviators",
    date: "July 6, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/KeiferWilsonWalkingToDugout.jpg",
    title: "Keifer Wilson Walking to Dugout",
    client: "Lafayette Aviators",
    date: "July 6, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/GavinSmithThrowdown.jpg",
    title: "Gavin Smith Throwdown to 2nd",
    client: "Lafayette Aviators",
    date: "July 12, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/TrippJohnsHitting.jpg",
    title: "Tripp Johns Hitting",
    client: "Lafayette Aviators",
    date: "July 12, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/BrodyChrismanonthird.jpg",
    title: "Brody Chrisman on Third",
    client: "Lafayette Aviators",
    date: "July 24, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/GarrettRaineyCatch.jpg",
    title: "Garrett Rainey Catching a Line Drive",
    client: "Lafayette Aviators",
    date: "July 24, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/BrodyChrismanWalkoffCelebrate.jpg",
    title: "Brody Chrisman Walk-Off Win Celebration",
    client: "Lafayette Aviators",
    date: "July 30, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/RyanBrownRunning.jpg",
    title: "Ryan Browne Running vs Ball State",
    client: "Ross-Ade Brigade",
    date: "August 30, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/DaveWatchingCrowd.jpg",
    title: "Dave Shondell Looking out at Crowd",
    client: "Purdue Volleyball",
    date: "September 25, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/VolleyballIntro.jpg",
    title: "Purdue Volleyball During Introductions",
    client: "Purdue Volleyball",
    date: "September 25, 2025",
  },
  {
    src: import.meta.env.BASE_URL + "images/RyanBrowneTouchdownCelebration.jpg",
    title: "Ryan Browne Celebrating Touchdown",
    client: "Ross-Ade Brigade",
    date: "October 4, 2025",
  },
];

const Photography = () => (
  <PageShell backTo="/gallery" showHome>
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Photography</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Sports and event photography shot for the Lafayette Aviators, Ross-Ade Brigade, and Purdue Volleyball.
        Click any photo to view fullscreen — use arrow keys or buttons to navigate.
      </p>
      <CategoryGalleryGrid photos={PHOTOS} />
    </div>
  </PageShell>
);

export default Photography;
