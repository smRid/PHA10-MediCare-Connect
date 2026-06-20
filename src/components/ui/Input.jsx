import { cn } from "@/lib/utils";

export default function Input({ className, label, error, ...props }) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-foreground">
      {label && <span>{label}</span>}
      <input
        className={cn(
          "h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}
