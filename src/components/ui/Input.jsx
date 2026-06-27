import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Input({ className, label, error, success, icon: Icon, id, ...props }) {
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

  return (
    <div className="relative grid gap-1 text-left group">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none transition-colors duration-300 group-focus-within:text-primary">
            <Icon className="size-4" />
          </div>
        )}
        <input
          id={inputId}
          placeholder={label ? " " : props.placeholder}
          className={cn(
            "peer h-12 w-full rounded-xl border border-input/60 bg-card/50 text-sm font-medium outline-none transition-all duration-300 hover:border-primary/40 focus:border-primary focus:bg-background focus:ring-[4px] focus:ring-primary/15 focus:shadow-md",
            label ? "placeholder:text-transparent" : "placeholder:text-muted-foreground/70",
            Icon ? "pl-10" : "pl-4",
            error ? "border-destructive/60 hover:border-destructive focus:border-destructive focus:ring-destructive/20" : "",
            success ? "border-accent/60 hover:border-accent focus:border-accent focus:ring-accent/20" : "",
            className,
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute top-0 -translate-y-1/2 scale-[0.85] text-xs font-semibold text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:scale-[0.85] peer-focus:font-semibold peer-focus:text-primary origin-left cursor-text bg-card px-1.5 rounded-md pointer-events-none",
              Icon ? "peer-placeholder-shown:left-10 left-3" : "left-3",
              error && "peer-focus:text-destructive",
              success && "peer-focus:text-accent"
            )}
          >
            {label}
          </label>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive pointer-events-none animate-in fade-in zoom-in duration-300">
            <AlertCircle className="size-4" />
          </div>
        )}
        {success && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="size-4" />
          </div>
        )}
      </div>
      {error && <span className="text-xs font-medium text-destructive px-1 animate-in slide-in-from-top-1 opacity-100 duration-300">{error}</span>}
    </div>
  );
}
