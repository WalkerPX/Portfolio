import { useCallback, useRef, useState, ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  defaultPosition?: { x: number; y: number };
  zIndex: number;
  onFocus: () => void;
  glowing?: boolean;
  initialSize?: { width: number; height: number } | null;
}

type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

const CURSOR_MAP: Record<NonNullable<ResizeEdge>, string> = {
  n: "ns-resize", s: "ns-resize",
  e: "ew-resize", w: "ew-resize",
  ne: "nesw-resize", sw: "nesw-resize",
  nw: "nwse-resize", se: "nwse-resize",
};

const MIN_W = 280;
const MIN_H = 180;

const DraggableWindow = ({
  title,
  children,
  onClose,
  defaultPosition,
  zIndex,
  onFocus,
  glowing = false,
  initialSize = null,
}: DraggableWindowProps) => {
  const [pos, setPos] = useState(defaultPosition ?? { x: 200, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 320 });
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<{ active: boolean; startX: number; startY: number; startPosX: number; startPosY: number }>({
    active: false, startX: 0, startY: 0, startPosX: 0, startPosY: 0,
  });

  const resizeRef = useRef<{
    active: boolean; edge: ResizeEdge;
    startX: number; startY: number;
    startW: number; startH: number;
    startPosX: number; startPosY: number;
  }>({ active: false, edge: null, startX: 0, startY: 0, startW: 0, startH: 0, startPosX: 0, startPosY: 0 });

  useEffect(() => { requestAnimationFrame(() => setIsOpen(true)); }, []);

  // apply initial size if provided (only on mount)
  useEffect(() => {
    if ((initialSize as any) && initialSize.width && initialSize.height) {
      const w = Math.max(MIN_W, Math.min(initialSize.width, window.innerWidth * 0.9));
      const h = Math.max(MIN_H, Math.min(initialSize.height, window.innerHeight * 0.85));
      setSize({ width: w, height: h });
      // ensure position remains on-screen
      setPos((p) => ({
        x: Math.max(0, Math.min(p.x, window.innerWidth - w)),
        y: Math.max(0, Math.min(p.y, window.innerHeight - h)),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setPos((p) => ({
        x: Math.max(0, Math.min(p.x, window.innerWidth - rect.width)),
        y: Math.max(0, Math.min(p.y, window.innerHeight - rect.height)),
      }));
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 250);
  }, [onClose]);

  const handleTitlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    onFocus();
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, startPosX: pos.x, startPosY: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos, onFocus]);

  const handleResizePointerDown = useCallback((e: React.PointerEvent, edge: ResizeEdge) => {
    e.stopPropagation();
    e.preventDefault();
    onFocus();
    resizeRef.current = {
      active: true, edge,
      startX: e.clientX, startY: e.clientY,
      startW: size.width, startH: size.height,
      startPosX: pos.x, startPosY: pos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [size, pos, onFocus]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragRef.current.active) {
      setPos({
        x: dragRef.current.startPosX + (e.clientX - dragRef.current.startX),
        y: dragRef.current.startPosY + (e.clientY - dragRef.current.startY),
      });
      return;
    }
    if (resizeRef.current.active && resizeRef.current.edge) {
      const { edge, startX, startY, startW, startH, startPosX, startPosY } = resizeRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let newW = startW, newH = startH, newX = startPosX, newY = startPosY;
      if (edge.includes("e")) newW = Math.max(MIN_W, startW + dx);
      if (edge.includes("s")) newH = Math.max(MIN_H, startH + dy);
      if (edge.includes("w")) { newW = Math.max(MIN_W, startW - dx); newX = startPosX + (startW - newW); }
      if (edge.includes("n")) { newH = Math.max(MIN_H, startH - dy); newY = startPosY + (startH - newH); }
      setSize({ width: newW, height: newH });
      setPos({ x: newX, y: newY });
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current.active = false;
    resizeRef.current.active = false;
  }, []);

  const animClass = isClosing ? "opacity-0 scale-90" : isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90";
  const H = 6;

  return (
    <div
      ref={windowRef}
      className={`fixed rounded-2xl overflow-hidden shadow-2xl border transition-[opacity,transform] duration-250 ease-out ${animClass} ${
        glowing ? "border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.5)]" : "border-border"
      }`}
      style={{ left: pos.x, top: pos.y, width: size.width, height: size.height, zIndex, maxWidth: "90vw", maxHeight: "85vh" }}
      onPointerDown={onFocus}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* 8 resize handles */}
      {(["n","s","e","w","ne","nw","se","sw"] as NonNullable<ResizeEdge>[]).map((edge) => (
        <div
          key={edge}
          style={{
            position: "absolute", cursor: CURSOR_MAP[edge], zIndex: 10,
            ...(edge === "n"  && { top: 0, left: H, right: H, height: H }),
            ...(edge === "s"  && { bottom: 0, left: H, right: H, height: H }),
            ...(edge === "e"  && { right: 0, top: H, bottom: H, width: H }),
            ...(edge === "w"  && { left: 0, top: H, bottom: H, width: H }),
            ...(edge === "ne" && { top: 0, right: 0, width: H*2, height: H*2 }),
            ...(edge === "nw" && { top: 0, left: 0, width: H*2, height: H*2 }),
            ...(edge === "se" && { bottom: 0, right: 0, width: H*2, height: H*2 }),
            ...(edge === "sw" && { bottom: 0, left: 0, width: H*2, height: H*2 }),
          }}
          onPointerDown={(e) => handleResizePointerDown(e, edge)}
        />
      ))}

      {/* Title bar */}
      <div
        className={`px-4 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing select-none ${
          glowing ? "bg-yellow-500/90" : "bg-titlebar"
        }`}
        style={{ height: 40 }}
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <span className={`font-nunito font-semibold text-sm ${glowing ? "text-yellow-950" : "text-titlebar-foreground"}`}>
          {title}
        </span>
        <button
          onClick={handleClose}
          onPointerDown={(e) => e.stopPropagation()}
          className={`transition-colors ${
            glowing ? "text-yellow-950/70 hover:text-yellow-950" : "text-titlebar-foreground/70 hover:text-titlebar-foreground"
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="bg-card p-6 overflow-y-auto" style={{ height: "calc(100% - 40px)" }}>
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
