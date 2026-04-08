import { Sun, Moon, Volume2, VolumeX } from "lucide-react";

interface ToolbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const Toolbar = ({ isDark, onToggleTheme, isMuted, onToggleMute }: ToolbarProps) => {
  return (
    <div className="fixed top-4 left-4 z-[9999] flex items-center gap-3">
      <button
        onClick={onToggleTheme}
        className="text-foreground/70 hover:text-primary transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </button>
      <button
        onClick={onToggleMute}
        className="text-foreground/70 hover:text-primary transition-colors"
        aria-label="Toggle mute"
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Toolbar;
