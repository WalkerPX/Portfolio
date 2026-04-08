import type { PhotoWork } from "./CreativeWorksContent";

interface PhotoWindowContentProps {
  photo: PhotoWork;
}

const PhotoWindowContent = ({ photo }: PhotoWindowContentProps) => {
  return (
    <div className="space-y-3 text-card-foreground">
      <img
        src={photo.src}
        alt={photo.title}
        className="w-full rounded-lg object-contain"
      />
      <div className="space-y-1 text-sm">
        <p>
          <span className="font-bold text-primary">Client:</span>{" "}
          {photo.client}
        </p>
        <p>
          <span className="font-bold text-primary">Category:</span>{" "}
          {photo.category}
        </p>
        <p>
          <span className="font-bold text-primary">Subject:</span>{" "}
          {photo.title}
        </p>
        <p>
          <span className="font-bold text-primary">Date:</span> {photo.date}
        </p>
      </div>
    </div>
  );
};

export default PhotoWindowContent;
