import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotoLightbox, { GalleryPhoto } from "@/components/PhotoLightbox";

// All creative works as lightbox-ready thumbnails
const CREATIVE_PHOTOS: GalleryPhoto[] = [
  { src: import.meta.env.BASE_URL + "images/RyanBrownRunning.jpg",               title: "Ryan Browne Running vs Ball State",          client: "Ross-Ade Brigade",    date: "August 30, 2025" },
  { src: import.meta.env.BASE_URL + "images/RyanBrowneTouchdownCelebration.jpg", title: "Ryan Browne Celebrating Touchdown",          client: "Ross-Ade Brigade",    date: "October 4, 2025" },
  { src: import.meta.env.BASE_URL + "images/IllinoisGamedayGraphic.jpg",         title: "Purdue vs Illinois Gameday",                 client: "Ross-Ade Brigade",    date: "October 3, 2025" },
  { src: import.meta.env.BASE_URL + "images/NotreDameGraphic .jpg",              title: "Purdue vs Notre Dame Gameday",               client: "Ross-Ade Brigade",    date: "September 19, 2025" },
  { src: import.meta.env.BASE_URL + "images/OfficerApplication.jpg",             title: "Officer Application",                        client: "Ross-Ade Brigade",    date: "August 22, 2025" },
  { src: import.meta.env.BASE_URL + "images/SpringShowcaseGraphic.jpg",          title: "Spring Showcase",                            client: "Ross-Ade Brigade",    date: "April 12, 2025" },
  { src: import.meta.env.BASE_URL + "images/StudentsWantedGraphic.jpg",          title: "Student Recruitment",                        client: "Ross-Ade Brigade",    date: "April 3, 2025" },
  { src: import.meta.env.BASE_URL + "images/BrodyBatFlip.jpg",                   title: "Brody Chrisman Bat Flip",                    client: "Lafayette Aviators",  date: "July 12, 2025" },
  { src: import.meta.env.BASE_URL + "images/GavinSmithHit.jpg",                  title: "Gavin Smith Grand Slam",                     client: "Lafayette Aviators",  date: "June 17, 2025" },
  { src: import.meta.env.BASE_URL + "images/BrodyChrismanWalkoffCelebrate.jpg",  title: "Brody Chrisman Walk-Off Win Celebration",    client: "Lafayette Aviators",  date: "July 30, 2025" },
  { src: import.meta.env.BASE_URL + "images/200winsgraphic.jpg",                 title: "200 Career Wins",                            client: "Lafayette Aviators",  date: "July 22, 2025" },
  { src: import.meta.env.BASE_URL + "images/BrodyCardGraphic.jpg",               title: "Baseball Card",                              client: "Lafayette Aviators",  date: "August 5, 2025" },
  { src: import.meta.env.BASE_URL + "images/NationalMascotDayGraphics.jpg",      title: "National Mascot Day",                        client: "Lafayette Aviators",  date: "June 17, 2025" },
  { src: import.meta.env.BASE_URL + "images/ThankYouFansGraphic.jpg",            title: "Thank You Fans",                             client: "Lafayette Aviators",  date: "August 7, 2025" },
];

// Keep PhotoWork type for compatibility with Index.tsx openPhotoWindow
export interface PhotoWork {
  id: string;
  src: string;
  client: string;
  category: string;
  title: string;
  date: string;
}

export const PHOTO_WORKS: PhotoWork[] = [];

interface CreativeWorksContentProps {
  onPhotoClick: (photo: PhotoWork) => void;
}

const CreativeWorksContent = ({ onPhotoClick }: CreativeWorksContentProps) => {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 text-card-foreground">
      <h2 className="text-xl font-bold text-primary">Creative Works</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        During my collegiate years in West Lafayette, I have had the wonderful opportunity to work
        in creative director positions for the{" "}
        <span className="font-bold text-card-foreground">Ross-Ade Brigade</span>, the official
        football student section operating under Purdue Athletics &amp; Marketing, and for the{" "}
        <span className="font-bold text-card-foreground">Lafayette Aviators</span>, a collegiate
        summer baseball team. Below are some examples of the work I have had the incredible
        opportunity to produce. For a more traditional gallery-style portfolio experience, please
        click{" "}
        <button
          onClick={() => navigate("/gallery")}
          className="font-bold underline text-primary hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
        >
          Here
        </button>
        .
      </p>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CREATIVE_PHOTOS.map((photo, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer aspect-square"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-xs font-semibold truncate">{photo.title}</p>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={CREATIVE_PHOTOS}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % CREATIVE_PHOTOS.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + CREATIVE_PHOTOS.length) % CREATIVE_PHOTOS.length)}
        />
      )}
    </div>
  );
};

export default CreativeWorksContent;
