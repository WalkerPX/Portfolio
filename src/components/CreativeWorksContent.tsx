import { useNavigate } from "react-router-dom";
import purdueBallState from "@/assets/photography/purdue-vs-ball-state.jpg";

export interface PhotoWork {
  id: string;
  src: string;
  client: string;
  category: string;
  title: string;
  date: string;
}

export const PHOTO_WORKS: PhotoWork[] = [
  {
    id: "purdue-ball-state",
    src: purdueBallState,
    client: "Ross-Ade Brigade",
    category: "Photography",
    title: "Purdue vs. Ball State Football",
    date: "August 30th, 2025",
  },
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
