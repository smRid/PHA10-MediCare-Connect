import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Input({ className, label, error, success, icon: Icon, id, ...props }) {
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

  return (
    <div className="relative grid gap-1 text-left">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <Icon className="size-4" />
          </div>
        )}
        <input
          id={inputId}
          placeholder={label ? " " : props.placeholder}
          className={cn(
            "peer h-12 w-full rounded-lg border border-input bg-card text-sm font-medium outline-none transition-all placeholder:text-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background",
            Icon ? "pl-10" : "pl-4",
            error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "",
            success ? "border-accent focus:border-accent focus:ring-accent/20" : "",
            className,
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute top-0 -translate-y-1/2 scale-[0.85] text-xs font-semibold text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:scale-[0.85] peer-focus:font-semibold peer-focus:text-primary origin-left cursor-text bg-card px-1 rounded-sm",
              Icon ? "peer-placeholder-shown:left-10 left-3" : "left-3"
            )}
          >
            {label}
          </label>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive pointer-events-none">
            <AlertCircle className="size-4" />
          </div>
        )}
        {success && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none">
            <CheckCircle2 className="size-4" />
          </div>
        )}
      </div>
      {error && <span className="text-xs font-medium text-destructive px-1">{error}</span>}
    </div>
  );
}
