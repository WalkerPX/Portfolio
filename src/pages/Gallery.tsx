import { useNavigate } from "react-router-dom";
import { Camera, PenTool, Folders } from "lucide-react";
import PageShell from "@/components/PageShell";

const CATEGORIES = [
  {
    route: "/gallery/photography",
    icon: Camera,
    label: "Photography",
    description: "Game day, portrait, and event photography.",
    color: "from-blue-500/20 to-blue-600/10",
    border: "hover:border-blue-400",
  },
  {
    route: "/gallery/graphic-design",
    icon: PenTool,
    label: "Graphic Design",
    description: "Posters, social graphics, and visual branding.",
    color: "from-orange-500/20 to-orange-600/10",
    border: "hover:border-orange-400",
  },
  {
    route: "/gallery/other-projects",
    icon: Folders,
    label: "Other Projects",
    description: "Videography, campaigns, and more.",
    color: "from-purple-500/20 to-purple-600/10",
    border: "hover:border-purple-400",
  },
];

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <PageShell backTo="/">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Gallery</h1>
        <p className="text-muted-foreground text-sm mb-10">
          Browse my creative portfolio by category.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map(({ route, icon: Icon, label, description, color, border }) => (
            <button
              key={route}
              onClick={() => navigate(route)}
              className={`group flex flex-col items-center gap-4 p-8 rounded-2xl border border-border ${border} bg-gradient-to-br ${color} transition-all duration-200 hover:scale-[1.03] hover:shadow-xl cursor-pointer text-center`}
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                <Icon className="w-8 h-8 text-foreground/60 group-hover:text-primary transition-colors" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-extrabold text-lg text-foreground group-hover:text-primary transition-colors">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default Gallery;
