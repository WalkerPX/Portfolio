import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface AppContextType {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  isMuted: boolean;
  setIsMuted: (v: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync dark class on html element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Handle mute toggling audio
  useEffect(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.pause();
    } else if (isPlaying) {
      audioRef.current.play().catch(console.log);
    }
  }, [isMuted]);

  return (
    <AppContext.Provider value={{ isDark, setIsDark, isMuted, setIsMuted, isPlaying, setIsPlaying, audioRef }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
