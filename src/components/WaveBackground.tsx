import { useEffect, useRef } from "react";

interface WaveBackgroundProps {
  isDark: boolean;
}

const WaveBackground = ({ isDark }: WaveBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      timeRef.current = ts * 0.0008;
      const t = timeRef.current;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const thirdY = H * 0.67;

      // Colors shift with dark mode
      const topColor = isDark
        ? `hsla(220, 40%, 22%, 0.95)`
        : `hsla(200, 60%, 78%, 0.95)`;
      const midColor = isDark
        ? `hsla(215, 50%, 30%, 0.9)`
        : `hsla(205, 65%, 72%, 0.9)`;
      const bottomColor = isDark
        ? `hsla(210, 55%, 38%, 0.85)`
        : `hsla(210, 70%, 65%, 0.85)`;

      // Wave 1 — slow, large
      ctx.beginPath();
      ctx.moveTo(0, thirdY);
      for (let x = 0; x <= W; x += 4) {
        const y =
          thirdY +
          Math.sin(x * 0.008 + t * 1.1) * 18 +
          Math.sin(x * 0.015 + t * 0.7) * 10 +
          Math.sin(x * 0.003 + t * 0.4) * 22;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      const grad1 = ctx.createLinearGradient(0, thirdY, 0, H);
      grad1.addColorStop(0, midColor);
      grad1.addColorStop(1, bottomColor);
      ctx.fillStyle = grad1;
      ctx.fill();

      // Wave 2 — faster, smaller, lighter on top
      ctx.beginPath();
      ctx.moveTo(0, thirdY + 15);
      for (let x = 0; x <= W; x += 4) {
        const y =
          thirdY +
          15 +
          Math.sin(x * 0.012 + t * 1.6 + 1.2) * 12 +
          Math.sin(x * 0.006 + t * 0.9 + 2.5) * 16;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      const grad2 = ctx.createLinearGradient(0, thirdY, 0, H);
      grad2.addColorStop(0, isDark ? `hsla(210,50%,42%,0.5)` : `hsla(205,70%,68%,0.5)`);
      grad2.addColorStop(1, isDark ? `hsla(210,50%,35%,0.2)` : `hsla(210,70%,62%,0.2)`);
      ctx.fillStyle = grad2;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default WaveBackground;
