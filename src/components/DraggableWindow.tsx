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
}

const DraggableWindow = ({
  title,
  children,
  onClose,
  defaultPosition,
  zIndex,
  onFocus,
  glowing = false,
}: DraggableWindowProps) => {
  const [position, setPosition] = useState(
    defaultPosition ?? { x: 200, y: 100 }
  );
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dragRef = useRef<{
    isDragging: boolean;
    offsetX: number;
    offsetY: number;
  }>({ isDragging: false, offsetX: 0, offsetY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Trigger open animation on mount
  useEffect(() => {
    requestAnimationFrame(() => setIsOpen(true));
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 250);
  }, [onClose]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      onFocus();
      dragRef.current = {
        isDragging: true,
        offsetX: e.clientX - position.x,
        offsetY: e.clientY - position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position, onFocus]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    setPosition({
      x: e.clientX - dragRef.current.offsetX,
      y: e.clientY - dragRef.current.offsetY,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current.isDragging = false;
  }, []);

  // Clamp position into viewport on mount
  useEffect(() => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      setPosition((p) => ({
        x: Math.max(0, Math.min(p.x, maxX)),
        y: Math.max(0, Math.min(p.y, maxY)),
      }));
    }
  }, []);

  const animClass = isClosing
    ? "opacity-0 scale-90"
    : isOpen
    ? "opacity-100 scale-100"
    : "opacity-0 scale-90";

  return (
    <div
      ref={windowRef}
      className={`fixed rounded-2xl overflow-hidden shadow-2xl border resize transition-all duration-250 ease-out ${animClass} ${
        glowing ? "border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.5)]" : "border-border"
      }`}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        minWidth: 280,
        minHeight: 180,
        maxWidth: "90vw",
        maxHeight: "80vh",
        width: 400,
      }}
      onPointerDown={onFocus}
    >
      {/* Title bar — draggable */}
      <div
        className={`px-4 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing select-none ${
          glowing ? "bg-yellow-500/90" : "bg-titlebar"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <span className={`font-nunito font-semibold text-sm ${
          glowing ? "text-yellow-950" : "text-titlebar-foreground"
        }`}>
          {title}
        </span>
        <button
          onClick={handleClose}
          className={`transition-colors ${
            glowing
              ? "text-yellow-950/70 hover:text-yellow-950"
              : "text-titlebar-foreground/70 hover:text-titlebar-foreground"
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
