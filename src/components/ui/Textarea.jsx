"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

export default function Textarea({ className, label, error, success, id, ...props }) {
  const textareaRef = useRef(null);
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

  const handleInput = (e) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (props.onInput) props.onInput(e);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [props.value, props.defaultValue]);

  return (
    <div className="relative grid gap-1 text-left">
      <div className="relative">
        <textarea
          ref={textareaRef}
          id={inputId}
          placeholder={label ? " " : props.placeholder}
          onInput={handleInput}
          className={cn(
            "peer min-h-[120px] w-full resize-none rounded-lg border border-input bg-card px-4 py-3 text-sm font-medium outline-none transition-all placeholder:text-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background scrollbar-soft overflow-hidden",
            error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "",
            success ? "border-accent focus:border-accent focus:ring-accent/20" : "",
            className,
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className="absolute left-3 top-0 -translate-y-1/2 scale-[0.85] text-xs font-semibold text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-[0.85] peer-focus:font-semibold peer-focus:text-primary origin-left cursor-text bg-card px-1 rounded-sm"
          >
            {label}
          </label>
        )}
        {error && (
          <div className="absolute right-3 top-3.5 text-destructive pointer-events-none">
            <AlertCircle className="size-4" />
          </div>
        )}
        {success && !error && (
          <div className="absolute right-3 top-3.5 text-accent pointer-events-none">
            <CheckCircle2 className="size-4" />
          </div>
        )}
      </div>
      {error && <span className="text-xs font-medium text-destructive px-1">{error}</span>}
    </div>
  );
}
