import { Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface ToolbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Toolbar = ({ isDark, onToggleTheme }: ToolbarProps) => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-3">
      <button
        onClick={onToggleTheme}
        className="text-foreground/70 hover:text-primary transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </button>
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="text-foreground/70 hover:text-primary transition-colors"
        aria-label="Toggle mute"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default Toolbar;
