import { useNavigate } from "react-router-dom";

export interface PhotoWork {
  id: string;
  src: string;
  client: string;
  category: string;
  title: string;
  date: string;
}

export const PHOTO_WORKS: PhotoWork[] = [
  { id: "ryan-brown-running",        src: import.meta.env.BASE_URL + "images/RyanBrownRunning.jpg",               title: "Ryan Browne Running vs Ball State",       client: "Ross-Ade Brigade",   category: "Photography",    date: "August 30, 2025" },
  { id: "ryan-browne-td",            src: import.meta.env.BASE_URL + "images/RyanBrowneTouchdownCelebration.jpg", title: "Ryan Browne Celebrating Touchdown",       client: "Ross-Ade Brigade",   category: "Photography",    date: "October 4, 2025" },
  { id: "illinois-gameday",          src: import.meta.env.BASE_URL + "images/IllinoisGamedayGraphic.jpg",         title: "Purdue vs Illinois Gameday",              client: "Ross-Ade Brigade",   category: "Graphic Design", date: "October 3, 2025" },
  { id: "notre-dame-gameday",        src: import.meta.env.BASE_URL + "images/NotreDameGraphic .jpg",              title: "Purdue vs Notre Dame Gameday",            client: "Ross-Ade Brigade",   category: "Graphic Design", date: "September 19, 2025" },
  { id: "officer-application",       src: import.meta.env.BASE_URL + "images/OfficerApplication.jpg",             title: "Officer Application",                    client: "Ross-Ade Brigade",   category: "Graphic Design", date: "August 22, 2025" },
  { id: "spring-showcase",           src: import.meta.env.BASE_URL + "images/SpringShowcaseGraphic.jpg",          title: "Spring Showcase",                        client: "Ross-Ade Brigade",   category: "Graphic Design", date: "April 12, 2025" },
  { id: "students-wanted",           src: import.meta.env.BASE_URL + "images/StudentsWantedGraphic.jpg",          title: "Student Recruitment",                    client: "Ross-Ade Brigade",   category: "Graphic Design", date: "April 3, 2025" },
  { id: "brody-bat-flip",            src: import.meta.env.BASE_URL + "images/BrodyBatFlip.jpg",                   title: "Brody Chrisman Bat Flip",                client: "Lafayette Aviators", category: "Photography",    date: "July 12, 2025" },
  { id: "gavin-smith-hit",           src: import.meta.env.BASE_URL + "images/GavinSmithHit.jpg",                  title: "Gavin Smith Grand Slam",                 client: "Lafayette Aviators", category: "Photography",    date: "June 17, 2025" },
  { id: "brody-walkoff",             src: import.meta.env.BASE_URL + "images/BrodyChrismanWalkoffCelebrate.jpg",  title: "Brody Chrisman Walk-Off Win Celebration",client: "Lafayette Aviators", category: "Photography",    date: "July 30, 2025" },
  { id: "200-wins",                  src: import.meta.env.BASE_URL + "images/200winsgraphic.jpg",                 title: "200 Career Wins",                        client: "Lafayette Aviators", category: "Graphic Design", date: "July 22, 2025" },
  { id: "brody-card",                src: import.meta.env.BASE_URL + "images/BrodyCardGraphic.jpg",               title: "Baseball Card",                          client: "Lafayette Aviators", category: "Graphic Design", date: "August 5, 2025" },
  { id: "national-mascot-day",       src: import.meta.env.BASE_URL + "images/NationalMascotDayGraphics.jpg",      title: "National Mascot Day",                    client: "Lafayette Aviators", category: "Graphic Design", date: "June 17, 2025" },
  { id: "thank-you-fans",            src: import.meta.env.BASE_URL + "images/ThankYouFansGraphic.jpg",            title: "Thank You Fans",                         client: "Lafayette Aviators", category: "Graphic Design", date: "August 7, 2025" },
];

interface CreativeWorksContentProps {
  onPhotoClick: (photo: PhotoWork) => void;
}

const CreativeWorksContent = ({ onPhotoClick }: CreativeWorksContentProps) => {
  const navigate = useNavigate();

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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PHOTO_WORKS.map((photo) => (
          <button
            key={photo.id}
            onClick={() => onPhotoClick(photo)}
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
    </div>
  );
};

export default CreativeWorksContent;
