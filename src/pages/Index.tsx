import { useState, useCallback, useEffect, useRef } from "react";
import { Info, Link, Briefcase, Camera, Mail } from "lucide-react";
import DesktopWindow from "@/components/DesktopWindow";
import DraggableWindow from "@/components/DraggableWindow";
import NavIcon from "@/components/NavIcon";
import Toolbar from "@/components/Toolbar";
import CreativeWorksContent, { PHOTO_WORKS, PhotoWork } from "@/components/CreativeWorksContent";
import PhotoWindowContent from "@/components/PhotoWindowContent";
import WorkContent from "@/components/WorkContent";
import PDFWindowContent from "@/components/PDFWindowContent";
import WalkerStatsContent from "@/components/WalkerStatsContent";
import WaveBackground from "@/components/WaveBackground";
import Penguin from "@/components/Penguin";
import starCharacter from "@/assets/star-character.png";

type WindowId =
  | "about" | "links" | "work" | "creative" | "contact" | "star" | "walker-stats"
  | "resume" | "writing-sample"
  | `photo-${string}`;

interface WindowState {
  id: WindowId;
  title: string;
  defaultPos: { x: number; y: number };
  size?: { width: number; height: number };
}

const WINDOW_CONFIGS: WindowState[] = [
  { id: "about",        title: "about",         defaultPos: { x: 120, y: 80 } },
  { id: "links",        title: "links",          defaultPos: { x: 200, y: 120 } },
  { id: "work",         title: "work",           defaultPos: { x: 280, y: 90 } },
  { id: "creative",     title: "creative works", defaultPos: { x: 160, y: 100 } },
  { id: "contact",      title: "contact",        defaultPos: { x: 240, y: 140 } },
  { id: "star",         title: "✨ Starry",   defaultPos: { x: 180, y: 100 } },
  { id: "walker-stats", title: "Walker Birchfield", defaultPos: { x: 160, y: 90 } },
];

// Sound helpers
const playSound = (freq: number, type: OscillatorType, duration: number, volume = 0.15) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
};

const STAR_WINDOW_ID: WindowId = "star";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [windowOrder, setWindowOrder] = useState<WindowId[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [photoWindows, setPhotoWindows] = useState<
    Map<string, { config: WindowState; photo: PhotoWork }>
  >(new Map());
  const isMutedRef = useRef(isMuted);

  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { document.documentElement.classList.toggle("dark", isDark); }, [isDark]);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  const sfx = useCallback((freq: number, type: OscillatorType = "sine", dur = 0.18) => {
    if (!isMutedRef.current) playSound(freq, type, dur);
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => {
      if (prev.includes(id)) return prev;
      sfx(520, "sine", 0.15);
      return [...prev, id];
    });
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, [sfx]);

  const closeWindow = useCallback((id: WindowId) => {
    sfx(300, "sine", 0.12);
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setWindowOrder((prev) => prev.filter((w) => w !== id));
  }, [sfx]);

  const focusWindow = useCallback((id: WindowId) => {
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const openPhotoWindow = useCallback((photo: PhotoWork) => {
    const windowId: WindowId = `photo-${photo.id}`;
    const img = new Image();
    img.src = photo.src;
    const doOpen = (naturalW = 800, naturalH = 600) => {
      const padX = 48, padY = 48, titleH = 40;
      const maxW = window.innerWidth * 0.9 - padX;
      const maxH = window.innerHeight * 0.85 - titleH - padY;
      const scale = Math.min(1, maxW / naturalW, maxH / naturalH);
      const totalW = Math.max(280, Math.round(naturalW * scale) + padX);
      const totalH = Math.max(180, Math.round(naturalH * scale) + titleH + padY);
      setPhotoWindows((prev) => {
        const next = new Map(prev);
        if (!next.has(photo.id)) {
          next.set(photo.id, {
            config: { id: windowId, title: photo.title, defaultPos: { x: 150 + Math.random() * 100, y: 60 + Math.random() * 80 }, size: { width: totalW, height: totalH } },
            photo,
          });
        }
        return next;
      });
      openWindow(windowId);
    };
    img.onload = () => doOpen(img.naturalWidth, img.naturalHeight);
    img.onerror = () => doOpen();
  }, [openWindow]);

  // PDF window opener — sized to be large and immediately readable
  const openPDFWindow = useCallback((id: WindowId, title: string, src: string, downloadHref: string, downloadName: string) => {
    const w = Math.min(Math.floor(window.innerWidth * 0.88), 960);
    const h = Math.min(Math.floor(window.innerHeight * 0.88), 860);
    setOpenWindows((prev) => {
      if (prev.includes(id)) return prev;
      sfx(520, "sine", 0.15);
      return [...prev, id];
    });
    setWindowOrder((prev) => [...prev.filter((ww) => ww !== id), id]);
    // Store config in photoWindows map reusing the pattern (using a separate map would be cleaner but this keeps diff small)
    setPhotoWindows((prev) => {
      const next = new Map(prev);
      if (!next.has(id)) {
        next.set(id, {
          config: {
            id,
            title,
            defaultPos: { x: Math.max(20, Math.floor((window.innerWidth - w) / 2)), y: Math.max(20, Math.floor((window.innerHeight - h) / 4)) },
            size: { width: w, height: h },
          },
          // hack: store as photo with src for retrieval
          photo: { id, src, client: "", category: "pdf", title, date: "" } as PhotoWork,
        });
      }
      return next;
    });
    // Override content rendering via extraContent map
    setExtraContent((prev) => {
      const next = new Map(prev);
      if (!next.has(id)) {
        next.set(id, <PDFWindowContent src={src} downloadName={downloadName} downloadHref={downloadHref} />);
      }
      return next;
    });
  }, [sfx]);

  const [extraContent, setExtraContent] = useState<Map<WindowId, React.ReactNode>>(new Map());

  const getWindowContent = (id: WindowId): React.ReactNode => {
    if (extraContent.has(id)) return extraContent.get(id);
    if (id === "creative") return <CreativeWorksContent onPhotoClick={openPhotoWindow} />;
    if (id === "work") return (
      <WorkContent
        onOpenResume={() => openPDFWindow("resume", "Resume — Walker Birchfield", import.meta.env.BASE_URL + "resume.pdf", import.meta.env.BASE_URL + "resume.pdf", "Walker_Birchfield_Resume.pdf")}
        onOpenWritingSample={() => openPDFWindow("writing-sample", "Writing Sample — Walker Birchfield", import.meta.env.BASE_URL + "writing-sample.pdf", import.meta.env.BASE_URL + "writing-sample.pdf", "Walker_Birchfield_Writing_Sample.pdf")}
      />
    );
    if (id === "walker-stats") return <WalkerStatsContent />;
    if (id === "star") return (
      <div className="space-y-4 text-card-foreground text-sm leading-relaxed">
        <h2 className="text-lg font-extrabold text-primary">✨ About This Site ✨</h2>
        <p>
          Welcome to my portfolio! This site is built as an interactive desktop-style experience
          using <span className="font-semibold text-primary">React</span>, <span className="font-semibold text-primary">TypeScript</span>, and <span className="font-semibold text-primary">Tailwind CSS</span>.
        </p>
        <p>All windows are draggable &amp; resizable from any edge or corner. Try it!</p>
        <div className="bg-muted/50 rounded-xl p-3 space-y-1">
          <p className="font-semibold">🐧 Tip:</p>
          <p className="text-muted-foreground">Click the penguin in the bottom right corner to play some  music while you browse.</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3 space-y-1">
          <p className="font-semibold">🌊 Waves:</p>
          <p className="text-muted-foreground">The animated background responds to light/dark mode. Try toggling the sun icon in the top left!</p>
        </div>
        <p className="text-muted-foreground text-xs">— Walker Birchfield, 2026</p>
      </div>
    );
    if (id === "contact") return (
      <div className="space-y-4 text-card-foreground">
        <h2 className="text-xl font-bold text-primary">Contact Me</h2>
        <p className="text-sm text-muted-foreground">
          I'm currently open to professional opportunities and collaborations. You can reach me via:
        </p>
        <div className="space-y-3">
          {[
            { icon: "📧", label: "Email",    value: "walker.birchfield@example.com", href: "mailto:walker.birchfield@example.com" },
            { icon: "📞", label: "Phone",    value: "(757) 802-0635",                href: "tel:+17578020635" },
            { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/walkerbirchfield", href: "https://www.linkedin.com/in/walker-birchfield-664659360" },
          ].map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary hover:shadow-sm transition-colors"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground">{value}</div>
              </div>
            </a>
          ))}
        </div>
        <p className="text-sm text-muted-foreground pt-1">I look forward to connecting!</p>
      </div>
    );
    if (id.startsWith("photo-")) {
      const photoId = id.replace("photo-", "");
      const entry = photoWindows.get(photoId);
      if (entry) return <PhotoWindowContent photo={entry.photo} />;
    }
    // fallback static content
    const STATIC: Record<string, React.ReactNode> = {
      about: (
        <div className="space-y-3 text-card-foreground">
          <h2 className="text-xl font-bold text-primary">About Me</h2>
          <p>My name is Walker Birchfield and I am a History major and IT minor at Purdue University. In addition to my studies I have a passion for digital media, creative content, and sports.</p>
          <p>During my time at Purdue I have utilized both my academic background and creative experience to create stories through photography, video production, social media management, and student engagement.</p>
          <p>I currently work for Purdue Athletics in the Ross-Ade Brigade, the official student section for Purdue Football, and previously served as a creative director for the Lafayette Aviators, a collegiate summer baseball team.</p>
          <p>I am in the process of applying to law school where I hope to continue my creative endeavors while also developing my skills in critical thinking and problem solving.</p>
        </div>
      ),
      links: (
        <div className="space-y-3 text-card-foreground">
          <h2 className="text-xl font-bold text-primary">Links</h2>
          <div className="grid grid-cols-1 gap-2">
            {[
              { href: "https://www.instagram.com/walkerbirchfield", icon: "📸", label: "Instagram (Personal)", sub: "@walkerbirchfield" },
              { href: "https://www.instagram.com/shotsbywalker", icon: "📸", label: "Instagram (Creative)", sub: "@shotsbywalker" },
              { href: "https://www.linkedin.com/in/walker-birchfield-664659360", icon: "💼", label: "LinkedIn", sub: "Walker Birchfield" },
              { href: "mailto:walker.birchfield03@gmail.com", icon: "📧", label: "Email", sub: "walker.birchfield03@gmail.com" },
            ].map(({ href, icon, label, sub }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:shadow-sm transition-colors">
                <span className="text-2xl">{icon}</span>
                <div><div className="font-semibold">{label}</div><div className="text-xs text-muted-foreground">{sub}</div></div>
              </a>
            ))}
          </div>
        </div>
      ),
    };
    return STATIC[id] || null;
  };

  const getWindowConfig = (id: WindowId): WindowState | undefined => {
    if (id.startsWith("photo-") || id === "resume" || id === "writing-sample") {
      const key = id.startsWith("photo-") ? id.replace("photo-", "") : id;
      const entry = photoWindows.get(key);
      if (entry) return entry.config;
    }
    return WINDOW_CONFIGS.find((c) => c.id === id);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-nunito" style={{ background: "hsl(var(--background))" }}>
      {/* Animated wave background */}
      <WaveBackground isDark={isDark} />

      {/* Toolbar */}
      <div className="transition-all duration-700 ease-out pointer-events-none"
        style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(-40px)" }}>
        <div className="pointer-events-auto">
          <Toolbar
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10 pointer-events-none">
        {/* Star mascot */}
        <div className="relative w-full max-w-3xl mb-[-20px] ml-[-20px] transition-all duration-700 ease-out pointer-events-auto"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(-60px)", transitionDelay: "100ms" }}>
          <button
            onClick={() => openWindow(STAR_WINDOW_ID)}
            className="absolute left-4 bottom-0 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform focus:outline-none"
            style={{ animationDuration: "3s" }}
            aria-label="Site info"
            onMouseEnter={() => sfx(660, "sine", 0.12)}
          >
            <img src={starCharacter} alt="Star mascot" width={80} height={80} />
          </button>
        </div>

        {/* Home window */}
        <div className="w-full transition-all duration-700 ease-out pointer-events-auto"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0) scale(1)" : "translateX(-80px) scale(0.95)", transitionDelay: "200ms" }}>
          <DesktopWindow title="home">
            <div className="text-center space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-nunito transition-colors duration-700 ease-in-out">
                  Hi!{" "}
                  <button
                    className="font-extrabold italic text-primary transition-all duration-300 ease-in-out cursor-pointer focus:outline-none"
                    style={{ textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.textShadow = "0 0 12px hsl(35 92% 55% / 0.9), 0 0 28px hsl(35 92% 55% / 0.5), 0 0 48px hsl(35 92% 55% / 0.3)")}
                    onMouseLeave={e => (e.currentTarget.style.textShadow = "none")}
                    onClick={() => openWindow("walker-stats")}
                    title="Click for stats"
                  >
                    I'm Walker Birchfield
                  </button>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground font-semibold">
                History/Law Student &amp; Creative Director
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4 transition-all duration-700 ease-out"
                style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(-60px)", transitionDelay: "400ms" }}>
                <NavIcon icon={Info}     label="about"         onClick={() => openWindow("about")} />
                <NavIcon icon={Link}     label="links"         onClick={() => openWindow("links")} />
                <NavIcon icon={Briefcase}label="work"          onClick={() => openWindow("work")} />
                <NavIcon icon={Camera}   label="creative works"onClick={() => openWindow("creative")} />
                <NavIcon icon={Mail}     label="contact"       onClick={() => openWindow("contact")} />
              </div>
            </div>
          </DesktopWindow>
        </div>
      </div>

      {/* Draggable windows */}
      {openWindows.map((id) => {
        const config = getWindowConfig(id);
        if (!config) return null;
        return (
          <DraggableWindow
            key={id}
            title={config.title}
            defaultPosition={config.defaultPos}
            initialSize={config.size ?? null}
            zIndex={100 + windowOrder.indexOf(id)}
            onClose={() => closeWindow(id)}
            onFocus={() => focusWindow(id)}
            glowing={id === STAR_WINDOW_ID}
          >
            {getWindowContent(id)}
          </DraggableWindow>
        );
      })}

      {/* Penguin */}
      <Penguin
        isMuted={isMuted}
        isDark={isDark}
        onHover={() => sfx(440, "sine", 0.1)}
      />

      {/* Footer */}
      <footer className="relative z-10 pb-6 pt-4 flex flex-col items-center gap-3 transition-all duration-700 ease-out"
        style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(-40px)", transitionDelay: "500ms" }}>
        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/in/walker-birchfield-664659360" target="_blank" rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors" aria-label="LinkedIn">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
            </svg>
          </a>
          <a href="mailto:walker.birchfield03@gmail.com" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Gmail">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 5.46v13.08c0 .85-.69 1.54-1.54 1.54H21V7.85l-9 5.77-9-5.77v12.23H1.54C.69 20.08 0 19.39 0 18.54V5.46C0 4.17 1.04 3.08 2.32 3.08h.38L12 9.85l9.3-6.77h.38C22.96 3.08 24 4.17 24 5.46z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/walkerbirchfield" target="_blank" rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.25 2.43.41.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.17.46.36 1.26.41 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.97-.41 2.43-.24.61-.52 1.05-.98 1.51-.46.46-.9.74-1.51.98-.46.17-1.26.36-2.43.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.25-2.43-.41a4.1 4.1 0 0 1-1.51-.98 4.1 4.1 0 0 1-.98-1.51c-.17-.46-.36-1.26-.41-2.43C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.97.41-2.43.24-.61.52-1.05.98-1.51.46-.46.9-.74 1.51-.98.46-.17 1.26-.36 2.43-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.77 5.77 0 0 0-2.09 1.36A5.77 5.77 0 0 0 .69 4.08C.39 4.84.19 5.72.13 6.99.07 8.27.06 8.68.06 11.94s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.36 2.09.62.64 1.29 1.05 2.09 1.36.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.77 5.77 0 0 0 2.09-1.36 5.77 5.77 0 0 0 1.36-2.09c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.77 5.77 0 0 0-1.36-2.09A5.77 5.77 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
            </svg>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Walker Birchfield</p>
      </footer>
    </div>
  );
};

export default Index;
