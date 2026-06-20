import { Activity, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoadingState({
  label = "Loading care data",
  fullScreen = false,
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-4 py-16",
        fullScreen && "min-h-screen",
      )}
    >
      <div className="glass grid w-full max-w-sm gap-5 rounded-lg border border-border p-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <HeartPulse className="size-8 animate-pulse" />
        </div>
        <div>
          <p className="font-heading text-lg font-bold">{label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Syncing appointments, records, and secure routes.
          </p>
        </div>
        <div className="mx-auto flex w-52 items-center gap-2">
          <Activity className="size-4 text-primary" />
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
