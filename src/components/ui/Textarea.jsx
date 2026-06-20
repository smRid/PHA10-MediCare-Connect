import { cn } from "@/lib/utils";

export default function Textarea({ className, label, ...props }) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-foreground">
      {label && <span>{label}</span>}
      <textarea
        className={cn(
          "min-h-28 rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
          className,
        )}
        {...props}
      />
    </label>
  );
}
