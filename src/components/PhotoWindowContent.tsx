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
      <div className="space-y-1 text-sm pt-1">
        <p className="font-bold text-primary">{photo.title}</p>
        <p className="text-muted-foreground">{photo.client}</p>
        <p className="text-muted-foreground">{photo.category} · {photo.date}</p>
      </div>
    </div>
  );
};

export default PhotoWindowContent;
