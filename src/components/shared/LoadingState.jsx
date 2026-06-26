"use client";

import { motion } from "framer-motion";
import { Activity, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoadingState({
  label = "Loading care data...",
  fullScreen = false,
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-4 py-16 relative overflow-hidden",
        fullScreen ? "min-h-screen bg-background" : "min-h-[400px]",
      )}
    >
      {/* Ambient Glow for FullScreen */}
      {fullScreen && (
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px] animate-pulse pointer-events-none" />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card relative z-10 grid w-full max-w-sm gap-6 rounded-3xl border border-border/50 p-8 text-center shadow-2xl shadow-primary/10 backdrop-blur-xl bg-card/60"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none rounded-3xl" />
        
        <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-inner relative z-10">
          <HeartPulse className="size-10 animate-pulse" />
        </div>
        
        <div className="relative z-10">
          <p className="font-heading text-xl font-bold text-foreground">{label}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Syncing appointments, records, and secure routes to your workspace.
          </p>
        </div>
        
        <div className="mx-auto flex w-full max-w-[200px] items-center gap-3 relative z-10">
          <Activity className="size-5 text-primary animate-pulse shrink-0" />
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50 border border-border/50 shadow-inner">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-sky-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
