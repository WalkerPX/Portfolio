import { useState, useCallback, useEffect } from "react";
import { Info, Link, Briefcase, HelpCircle, Mail } from "lucide-react";
import DesktopWindow from "@/components/DesktopWindow";
import DraggableWindow from "@/components/DraggableWindow";
import NavIcon from "@/components/NavIcon";
import Toolbar from "@/components/Toolbar";
import starCharacter from "@/assets/star-character.png";
import frogCharacter from "@/assets/frog-character.png";

type WindowId = "about" | "links" | "work" | "faq" | "contact";

interface WindowState {
  id: WindowId;
  title: string;
  defaultPos: { x: number; y: number };
}

const WINDOW_CONFIGS: WindowState[] = [
  { id: "about", title: "about", defaultPos: { x: 120, y: 80 } },
  { id: "links", title: "links", defaultPos: { x: 200, y: 120 } },
  { id: "work", title: "work", defaultPos: { x: 280, y: 90 } },
  { id: "faq", title: "faq", defaultPos: { x: 160, y: 160 } },
  { id: "contact", title: "contact", defaultPos: { x: 240, y: 140 } },
];

const WINDOW_CONTENT: Record<WindowId, React.ReactNode> = {
  about: (
    <div className="space-y-3 text-card-foreground">
      <h2 className="text-xl font-bold text-primary">about me</h2>
      <p>
        hey there! i'm shar — an illustrator, animator, and developer. i love
        creating cute characters and building fun interactive experiences.
      </p>
      <p>
        this is where you can learn more about me and what i do. feel free to
        explore!
      </p>
    </div>
  ),
  links: (
    <div className="space-y-3 text-card-foreground">
      <h2 className="text-xl font-bold text-primary">links</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-primary hover:underline">🐦 twitter</a>
        </li>
        <li>
          <a href="#" className="text-primary hover:underline">📺 youtube</a>
        </li>
        <li>
          <a href="#" className="text-primary hover:underline">📸 instagram</a>
        </li>
        <li>
          <a href="#" className="text-primary hover:underline">🛒 shop</a>
        </li>
      </ul>
    </div>
  ),
  work: (
    <div className="space-y-3 text-card-foreground">
      <h2 className="text-xl font-bold text-primary">work</h2>
      <p>here's a selection of my recent projects and commissions.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground text-sm">
          project 1
        </div>
        <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground text-sm">
          project 2
        </div>
        <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground text-sm">
          project 3
        </div>
        <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground text-sm">
          project 4
        </div>
      </div>
    </div>
  ),
  faq: (
    <div className="space-y-3 text-card-foreground">
      <h2 className="text-xl font-bold text-primary">faq</h2>
      <div className="space-y-4">
        <div>
          <p className="font-bold">q: are your commissions open?</p>
          <p className="text-muted-foreground">a: check my social media for the latest updates!</p>
        </div>
        <div>
          <p className="font-bold">q: what tools do you use?</p>
          <p className="text-muted-foreground">a: clip studio paint, after effects, and vs code!</p>
        </div>
        <div>
          <p className="font-bold">q: can i use your art?</p>
          <p className="text-muted-foreground">a: please don't repost or use my art without permission.</p>
        </div>
      </div>
    </div>
  ),
  contact: (
    <div className="space-y-3 text-card-foreground">
      <h2 className="text-xl font-bold text-primary">contact</h2>
      <p>want to get in touch? here's how you can reach me:</p>
      <div className="space-y-2">
        <p>📧 <span className="text-primary">hello@sharyap.com</span></p>
        <p>💼 for business inquiries, please email me directly.</p>
      </div>
    </div>
  ),
};

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [windowOrder, setWindowOrder] = useState<WindowId[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const openWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setWindowOrder((prev) => prev.filter((w) => w !== id));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden font-nunito">
      {/* Toolbar */}
      <Toolbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        {/* Star character */}
        <div className="relative w-full max-w-3xl mb-[-20px] ml-[-20px]">
          <img
            src={starCharacter}
            alt="Star mascot"
            width={80}
            height={80}
            className="absolute left-4 bottom-0 z-20 animate-bounce"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Desktop Window */}
        <DesktopWindow title="home">
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-nunito">
                Hi!{" "}
                <span className="font-extrabold italic text-primary">
                  I'm Walker
                </span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground font-semibold">
              student &amp; creative director
            </p>

            {/* Navigation Icons */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4">
              <NavIcon icon={Info} label="about" onClick={() => openWindow("about")} />
              <NavIcon icon={Link} label="links" onClick={() => openWindow("links")} />
              <NavIcon icon={Briefcase} label="work" onClick={() => openWindow("work")} />
              <NavIcon icon={HelpCircle} label="faq" onClick={() => openWindow("faq")} />
              <NavIcon icon={Mail} label="contact" onClick={() => openWindow("contact")} />
            </div>
          </div>
        </DesktopWindow>
      </div>

      {/* Draggable windows */}
      {openWindows.map((id) => {
        const config = WINDOW_CONFIGS.find((c) => c.id === id)!;
        return (
          <DraggableWindow
            key={id}
            title={config.title}
            defaultPosition={config.defaultPos}
            zIndex={100 + windowOrder.indexOf(id)}
            onClose={() => closeWindow(id)}
            onFocus={() => focusWindow(id)}
          >
            {WINDOW_CONTENT[id]}
          </DraggableWindow>
        );
      })}

      {/* Footer */}
      <footer className="relative z-10 pb-6 pt-4 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="LinkedIn">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a href="mailto:" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Gmail">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 5.46v13.08c0 .85-.69 1.54-1.54 1.54H21V7.85l-9 5.77-9-5.77v12.23H1.54C.69 20.08 0 19.39 0 18.54V5.46C0 4.17 1.04 3.08 2.32 3.08h.38L12 9.85l9.3-6.77h.38C22.96 3.08 24 4.17 24 5.46z" />
            </svg>
          </a>
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.25 2.43.41.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.17.46.36 1.26.41 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.97-.41 2.43-.24.61-.52 1.05-.98 1.51-.46.46-.9.74-1.51.98-.46.17-1.26.36-2.43.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.25-2.43-.41a4.1 4.1 0 0 1-1.51-.98 4.1 4.1 0 0 1-.98-1.51c-.17-.46-.36-1.26-.41-2.43C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.97.41-2.43.24-.61.52-1.05.98-1.51.46-.46.9-.74 1.51-.98.46-.17 1.26-.36 2.43-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.77 5.77 0 0 0-2.09 1.36A5.77 5.77 0 0 0 .69 4.08C.39 4.84.19 5.72.13 6.99.07 8.27.06 8.68.06 11.94s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.36 2.09.62.64 1.29 1.05 2.09 1.36.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.77 5.77 0 0 0 2.09-1.36 5.77 5.77 0 0 0 1.36-2.09c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.77 5.77 0 0 0-1.36-2.09A5.77 5.77 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">© 2025 Walker</p>
      </footer>

      {/* Frog character */}
      <img
        src={frogCharacter}
        alt="Frog mascot"
        width={100}
        height={100}
        loading="lazy"
        className="absolute bottom-4 right-4 z-20"
      />
    </div>
  );
};

export default Index;
