import { useCallback, useRef, useState, ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  defaultPosition?: { x: number; y: number };
  zIndex: number;
  onFocus: () => void;
}

const DraggableWindow = ({
  title,
  children,
  onClose,
  defaultPosition,
  zIndex,
  onFocus,
}: DraggableWindowProps) => {
  const [position, setPosition] = useState(
    defaultPosition ?? { x: 200, y: 100 }
  );
  const dragRef = useRef<{
    isDragging: boolean;
    offsetX: number;
    offsetY: number;
  }>({ isDragging: false, offsetX: 0, offsetY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={windowRef}
      className="fixed rounded-2xl overflow-hidden shadow-2xl border border-border resize"
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
        className="bg-titlebar px-4 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <span className="text-titlebar-foreground font-nunito font-semibold text-sm">
          {title}
        </span>
        <button
          onClick={onClose}
          className="text-titlebar-foreground/70 hover:text-titlebar-foreground transition-colors"
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
