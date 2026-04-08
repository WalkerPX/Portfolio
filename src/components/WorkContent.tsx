import { FileText, Download } from "lucide-react";

interface WorkContentProps {
  onOpenResume: () => void;
  onOpenWritingSample: () => void;
}

const WorkContent = ({ onOpenResume, onOpenWritingSample }: WorkContentProps) => {
  return (
    <div className="space-y-4 text-card-foreground">
      <h2 className="text-xl font-bold text-primary">Work</h2>
      <p className="text-sm text-muted-foreground">
        A selection of my professional documents and writing.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Resume */}
        <div className="group relative rounded-xl overflow-hidden border border-border hover:border-primary transition-colors bg-muted/40">
          <button
            onClick={onOpenResume}
            className="w-full text-left p-4 flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-primary">
              <FileText className="w-6 h-6 flex-shrink-0" />
              <span className="font-bold text-sm">Resume</span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">
              Walker Birchfield — History/Law student, creative director &amp; digital media specialist.
            </p>
            <span className="text-xs text-primary group-hover:underline mt-1">Click to view →</span>
          </button>
          <a
            href="/resume.pdf"
            download="Walker_Birchfield_Resume.pdf"
            className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
            title="Download resume"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="w-4 h-4" />
          </a>
        </div>

        {/* Writing Sample */}
        <div className="group relative rounded-xl overflow-hidden border border-border hover:border-primary transition-colors bg-muted/40">
          <button
            onClick={onOpenWritingSample}
            className="w-full text-left p-4 flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-primary">
              <FileText className="w-6 h-6 flex-shrink-0" />
              <span className="font-bold text-sm">Writing Sample</span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">
              Academic paper — a 16-page research paper demonstrating analytical and written communication skills.
            </p>
            <span className="text-xs text-primary group-hover:underline mt-1">Click to view →</span>
          </button>
          <a
            href="/writing-sample.pdf"
            download="Walker_Birchfield_Writing_Sample.pdf"
            className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
            title="Download writing sample"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      <p className="text-xs text-muted-foreground pt-2">
        📎 Use the <Download className="w-3 h-3 inline" /> icon on each card to download directly.
      </p>
    </div>
  );
};

export default WorkContent;
