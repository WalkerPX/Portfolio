import { Info, Link, Briefcase, HelpCircle, Mail } from "lucide-react";
import DesktopWindow from "@/components/DesktopWindow";
import NavIcon from "@/components/NavIcon";
import starCharacter from "@/assets/star-character.png";
import frogCharacter from "@/assets/frog-character.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden font-nunito">
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
                hi!{" "}
                <span className="font-extrabold italic text-primary">
                  i'm shar
                </span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground font-semibold">
              illustrator, animator, and developer
            </p>

            {/* Navigation Icons */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4">
              <NavIcon icon={Info} label="about" />
              <NavIcon icon={Link} label="links" />
              <NavIcon icon={Briefcase} label="work" />
              <NavIcon icon={HelpCircle} label="faq" />
              <NavIcon icon={Mail} label="contact" />
            </div>
          </div>
        </DesktopWindow>
      </div>

      {/* Footer */}
      <footer className="relative z-10 pb-6 pt-4 flex flex-col items-center gap-3">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-foreground/60 hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.46 6c-.85.38-1.78.64-2.73.76 1-.6 1.76-1.54 2.12-2.67-.93.55-1.96.95-3.06 1.17a4.77 4.77 0 0 0-8.13 4.35C7.69 9.4 4.07 7.59 1.64 4.85a4.77 4.77 0 0 0 1.47 6.37A4.72 4.72 0 0 1 .96 10.7v.06a4.77 4.77 0 0 0 3.82 4.68 4.7 4.7 0 0 1-2.15.08 4.77 4.77 0 0 0 4.46 3.31A9.56 9.56 0 0 1 0 21.54a13.48 13.48 0 0 0 7.29 2.14c8.75 0 13.53-7.25 13.53-13.54 0-.21 0-.42-.01-.63A9.68 9.68 0 0 0 24 6.59a9.5 9.5 0 0 1-2.73.75l-1.27-1.34z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-foreground/60 hover:text-primary transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.66 31.66 0 0 0 0 12a31.66 31.66 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.66 31.66 0 0 0 24 12a31.66 31.66 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-foreground/60 hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.25 2.43.41.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.17.46.36 1.26.41 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.97-.41 2.43-.24.61-.52 1.05-.98 1.51-.46.46-.9.74-1.51.98-.46.17-1.26.36-2.43.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.25-2.43-.41a4.1 4.1 0 0 1-1.51-.98 4.1 4.1 0 0 1-.98-1.51c-.17-.46-.36-1.26-.41-2.43C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.97.41-2.43.24-.61.52-1.05.98-1.51.46-.46.9-.74 1.51-.98.46-.17 1.26-.36 2.43-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.77 5.77 0 0 0-2.09 1.36A5.77 5.77 0 0 0 .69 4.08C.39 4.84.19 5.72.13 6.99.07 8.27.06 8.68.06 11.94s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.36 2.09.62.64 1.29 1.05 2.09 1.36.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.77 5.77 0 0 0 2.09-1.36 5.77 5.77 0 0 0 1.36-2.09c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.77 5.77 0 0 0-1.36-2.09A5.77 5.77 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">© 2025 Sharlene Yap</p>
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
