// Shared shell used by Gallery, Photography, GraphicDesign, OtherProjects pages
// Provides wave background, toolbar, penguin, animated entrance, back + optional home buttons
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import WaveBackground from "@/components/WaveBackground";
import Toolbar from "@/components/Toolbar";
import Penguin from "@/components/Penguin";
import { useAppContext } from "@/context/AppContext";

interface PageShellProps {
  children: ReactNode;
  backTo: string;          // route to go back to
  showHome?: boolean;      // show a separate Home button?
}

const PageShell = ({ children, backTo, showHome = false }: PageShellProps) => {
  const navigate = useNavigate();
  const { isDark } = useAppContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleBack = () => {
    setVisible(false);
    setTimeout(() => navigate(backTo), 350);
  };

  const handleHome = () => {
    setVisible(false);
    setTimeout(() => navigate("/"), 350);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-nunito"
      style={{ background: "hsl(var(--background))" }}>
      <WaveBackground isDark={isDark} />

      <div className="pointer-events-none">
        <div className="pointer-events-auto">
          <Toolbar />
        </div>
      </div>

      {/* Top-right nav buttons */}
      <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2">
        {showHome && (
          <button onClick={handleHome}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary hover:text-primary text-foreground/70 transition-colors text-sm font-semibold shadow-md">
            <Home className="w-4 h-4" />
            Home
          </button>
        )}
        <button onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary hover:text-primary text-foreground/70 transition-colors text-sm font-semibold shadow-md">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Animated content */}
      <div className="flex-1 flex flex-col relative z-10 px-6 py-20"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "opacity 0.45s ease-out, transform 0.45s ease-out",
        }}>
        {children}
      </div>

      <Penguin />
    </div>
  );
};

export default PageShell;
