import { LucideIcon } from "lucide-react";

interface NavIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const NavIcon = ({ icon: Icon, label, onClick }: NavIconProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110 active:scale-95"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-foreground/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-colors">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-foreground/70 group-hover:text-primary transition-colors" strokeWidth={1.5} />
      </div>
      <span className="text-sm font-semibold text-foreground/70 group-hover:text-primary transition-colors">
        {label}
      </span>
    </button>
  );
};

export default NavIcon;
