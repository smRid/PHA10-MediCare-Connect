import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-lg scale-100 transform overflow-hidden rounded-3xl border border-border/50 bg-background/95 p-6 shadow-2xl transition-all glass-card">
        <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
          <h3 className="font-heading text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
