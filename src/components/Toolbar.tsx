import { Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const Toolbar = () => {
  const { isDark, setIsDark, isMuted, setIsMuted } = useAppContext();

  return (
    <div className="fixed top-4 left-4 z-[9999] flex items-center gap-3">
      <button onClick={() => setIsDark(!isDark)}
        className="text-foreground/70 hover:text-primary transition-colors" aria-label="Toggle theme">
        {isDark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </button>
      <button onClick={() => setIsMuted(!isMuted)}
        className="text-foreground/70 hover:text-primary transition-colors" aria-label="Toggle mute">
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Toolbar;
