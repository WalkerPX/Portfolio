import { Download } from "lucide-react";

interface PDFWindowContentProps {
  src: string;
  downloadName: string;
  downloadHref: string;
}

const PDFWindowContent = ({ src, downloadName, downloadHref }: PDFWindowContentProps) => {
  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-xs text-muted-foreground">Scroll to read • Resize window to zoom</span>
        <a
          href={downloadHref}
          download={downloadName}
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <Download className="w-3 h-3" />
          Download
        </a>
      </div>
      <iframe
        src={`${src}#toolbar=0&navpanes=0&view=FitH`}
        className="w-full flex-1 rounded-lg border border-border"
        title={downloadName}
        style={{ minHeight: 0 }}
      />
    </div>
  );
};

export default PDFWindowContent;
