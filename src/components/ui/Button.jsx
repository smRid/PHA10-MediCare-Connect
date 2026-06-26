"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-gradient-to-br from-primary to-sky-600 text-white shadow-lg shadow-primary/20 border border-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:border-primary/40",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "glass-card text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
  ghost: "text-muted-foreground hover:bg-muted/80 hover:text-foreground active:bg-muted",
  danger: "bg-gradient-to-br from-destructive to-red-600 text-white shadow-lg shadow-destructive/20 hover:shadow-xl hover:shadow-destructive/30",
};

const sizes = {
  xs: "h-7 px-2.5 text-xs",
  sm: "h-9 px-3.5 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-lg",
  icon: "size-11 p-0",
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled,
  children,
  onClick,
  ...props
}) {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      const timer = setTimeout(() => setIsRippling(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.96]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {/* Dynamic Hover Glow Layer (only for primary/danger) */}
      {(variant === "primary" || variant === "danger") && (
         <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none mix-blend-overlay" />
      )}
      
      {isRippling && (
        <span
          className="absolute block rounded-full bg-white opacity-40 animate-ripple pointer-events-none"
          style={{
            left: coords.x - 10,
            top: coords.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}
      {loading && <Loader2 className="size-4 animate-spin shrink-0" />}
      {children}
    </button>
  );
}
