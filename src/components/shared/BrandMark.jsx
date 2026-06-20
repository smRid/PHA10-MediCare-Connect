import { HeartPulse } from "lucide-react";

export default function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/25">
        <span className="absolute inset-0 rounded-lg animate-pulse-ring" />
        <HeartPulse className="relative size-5" />
      </span>
      {!compact && (
        <span className="font-heading text-xl font-extrabold tracking-tight">
          MediCare<span className="text-primary">Connect</span>
        </span>
      )}
    </div>
  );
}
