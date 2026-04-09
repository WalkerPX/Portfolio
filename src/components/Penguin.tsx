import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";

interface PenguinProps {
  onHover?: () => void;
}

const NOTE_POSITIONS = [
  { x: -18, delay: "0s",   dur: "1.8s" },
  { x:   8, delay: "0.6s", dur: "2.1s" },
  { x:  28, delay: "1.2s", dur: "1.9s" },
];

const Penguin = ({ onHover }: PenguinProps) => {
  const { isDark, isMuted, isPlaying, setIsPlaying, audioRef } = useAppContext();
  const [hovered, setHovered] = useState(false);
  const [bobY, setBobY] = useState(0);

  useEffect(() => {
    let t = 0;
    let frameId: number;
    const tick = () => {
      t += 0.018;
      setBobY(Math.sin(t) * 5 + Math.sin(t * 1.7) * 2.5);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleClick = () => {
    if (isMuted) return;

    if (!audioRef.current) {
      const audio = new Audio(import.meta.env.BASE_URL + "relaxing.mp3");
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.log);
    }
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-20 select-none cursor-pointer"
      style={{ transform: `translateY(${bobY}px)`, transition: "transform 0.05s linear" }}
      onClick={handleClick}
      onMouseEnter={() => { setHovered(true); onHover?.(); }}
      onMouseLeave={() => setHovered(false)}
    >
      {isPlaying && NOTE_POSITIONS.map((n, i) => (
        <div key={i} className="absolute text-primary font-bold text-lg pointer-events-none"
          style={{ left: `calc(50% + ${n.x}px)`, bottom: "90px",
            animation: `floatNote ${n.dur} ${n.delay} infinite ease-in-out`, opacity: 0 }}>
          ♪
        </div>
      ))}

      <div className="relative flex flex-col items-center">
        <div style={{
          animation: isPlaying ? "penguinSway 1.2s ease-in-out infinite alternate" : "none",
          transformOrigin: "bottom center",
          filter: hovered ? "drop-shadow(0 0 8px hsl(var(--primary)))" : "none",
          transition: "filter 0.3s ease",
        }}>
          <svg width="64" height="80" viewBox="0 0 64 80">
            <ellipse cx="32" cy="52" rx="22" ry="26" fill={isDark ? "#1e293b" : "#1a1a2e"} />
            <ellipse cx="32" cy="56" rx="13" ry="18" fill="white" />
            <ellipse cx="32" cy="28" rx="18" ry="18" fill={isDark ? "#1e293b" : "#1a1a2e"} />
            <ellipse cx="32" cy="31" rx="10" ry="11" fill="white" />
            <circle cx="27" cy="26" r="3.5" fill="white" />
            <circle cx="37" cy="26" r="3.5" fill="white" />
            <circle cx="28" cy="26" r="2" fill="#111" />
            <circle cx="38" cy="26" r="2" fill="#111" />
            <ellipse cx="32" cy="34" rx="4" ry="2.5" fill="#f97316" />
            <ellipse cx="10" cy="54" rx="7" ry="14" fill={isDark ? "#1e293b" : "#1a1a2e"} />
            <ellipse cx="54" cy="54" rx="7" ry="14" fill={isDark ? "#1e293b" : "#1a1a2e"} />
            <ellipse cx="25" cy="76" rx="7" ry="3" fill="#f97316" />
            <ellipse cx="39" cy="76" rx="7" ry="3" fill="#f97316" />
          </svg>
        </div>
        <svg width="100" height="28" viewBox="0 0 100 28" style={{ marginTop: -4 }}>
          <ellipse cx="50" cy="16" rx="46" ry="12"
            fill={isDark ? "hsl(210,60%,70%)" : "hsl(200,80%,88%)"} />
        </svg>
      </div>

      <style>{`
        @keyframes floatNote {
          0%   { opacity: 0; transform: translateY(0) scale(0.8); }
          20%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-40px) scale(1.2); }
        }
        @keyframes penguinSway {
          from { transform: rotate(-8deg); }
          to   { transform: rotate(8deg); }
        }
      `}</style>
    </div>
  );
};

export default Penguin;
