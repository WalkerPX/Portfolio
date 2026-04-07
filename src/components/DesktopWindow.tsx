import { ReactNode } from "react";

interface DesktopWindowProps {
  title: string;
  children: ReactNode;
}

const DesktopWindow = ({ title, children }: DesktopWindowProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-border">
      {/* Title Bar */}
      <div className="bg-titlebar px-5 py-2.5 flex items-center">
        <span className="text-titlebar-foreground font-nunito font-semibold text-sm tracking-wide">
          {title}
        </span>
      </div>
      {/* Content */}
      <div className="bg-card p-8 md:p-12">{children}</div>
    </div>
  );
};

export default DesktopWindow;
