import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import WaveBackground from "@/components/WaveBackground";
import Penguin from "@/components/Penguin";
import Toolbar from "@/components/Toolbar";

const Gallery = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const [isMuted, setIsMuted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Sync dark mode with html class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleBack = () => {
    setVisible(false);
    setTimeout(() => navigate("/"), 350);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden font-nunito"
      style={{ background: "hsl(var(--background))" }}
    >
      <WaveBackground isDark={isDark} />

      {/* Toolbar (top left) */}
      <div className="pointer-events-none">
        <div className="pointer-events-auto">
          <Toolbar
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
          />
        </div>
      </div>

      {/* Back button (top right) */}
      <button
        onClick={handleBack}
        className="fixed top-4 right-4 z-[9999] flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary hover:text-primary text-foreground/70 transition-colors text-sm font-semibold shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Page content — animated entrance */}
      <div
        className="flex-1 flex flex-col items-center relative z-10 px-6 py-20"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "opacity 0.45s ease-out, transform 0.45s ease-out",
        }}
      >
        <div className="w-full max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
            Gallery
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            A full portfolio of my creative work — photography, videography, and design.
          </p>

          {/* Gallery grid — add photos here */}
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {/* Placeholder — replace with your actual photos */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-xl bg-muted/50 border border-border aspect-square flex items-center justify-center text-muted-foreground text-sm"
              >
                Photo {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Penguin isMuted={isMuted} isDark={isDark} />
    </div>
  );
};

export default Gallery;
