"use client";

import { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PasswordInput({ className, label, error, success, showStrength = false, id, ...props }) {
  const [visible, setVisible] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

  // Simple strength check just for visual effect
  const val = props.value || props.defaultValue || "";
  let strength = 0;
  if (val.length > 5) strength += 1;
  if (/[A-Z]/.test(val)) strength += 1;
  if (/[0-9]/.test(val)) strength += 1;
  if (/[^A-Za-z0-9]/.test(val)) strength += 1;

  const strengthColors = ["bg-muted", "bg-destructive", "bg-warning", "bg-primary", "bg-accent"];

  return (
    <div className="relative grid gap-1 text-left">
      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          placeholder={label ? " " : props.placeholder}
          className={cn(
            "peer h-12 w-full rounded-lg border border-input bg-card pl-4 pr-11 text-sm font-medium outline-none transition-all placeholder:text-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background",
            error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "",
            success ? "border-accent focus:border-accent focus:ring-accent/20" : "",
            className,
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className="absolute left-3 top-0 -translate-y-1/2 scale-[0.85] text-xs font-semibold text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:scale-[0.85] peer-focus:font-semibold peer-focus:text-primary origin-left cursor-text bg-card px-1 rounded-sm"
          >
            {label}
          </label>
        )}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {error && <AlertCircle className="size-4 text-destructive" />}
          {success && !error && <CheckCircle2 className="size-4 text-accent" />}
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            className="flex size-10 items-center justify-center rounded-md text-muted-foreground transition hover:text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff className="size-4 animate-scale-in" /> : <Eye className="size-4 animate-scale-in" />}
          </button>
        </div>
      </div>
      {showStrength && (
        <div className="mt-1 flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-muted/40">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "h-full flex-1 transition-all duration-300",
                strength >= i ? strengthColors[strength] : "bg-transparent"
              )}
            />
          ))}
        </div>
      )}
      {error && <span className="text-xs font-medium text-destructive px-1">{error}</span>}
    </div>
  );
}
