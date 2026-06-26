"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, SearchX } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* Decorative medical grid */}
      <div className="absolute inset-0 medical-grid opacity-30 mix-blend-color-burn dark:mix-blend-color-dodge pointer-events-none" />
      
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card relative z-10 max-w-2xl rounded-[2.5rem] border border-border/50 bg-card/60 p-10 text-center shadow-2xl shadow-primary/10 backdrop-blur-2xl sm:p-14"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none rounded-[2.5rem]" />
        
        <div className="relative z-10 mx-auto mb-8 flex size-28 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 shadow-inner">
          <SearchX className="size-12" />
        </div>
        
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Error 404
          </p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
            This route needs a <br className="hidden sm:block" /> second opinion.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            The page you requested is not available. Return home and continue your journey from a healthy route.
          </p>
          
          <Link href="/" className="mt-10 inline-block">
            <Button size="lg" className="h-14 px-8 bg-gradient-to-r from-primary to-sky-600 text-lg font-bold shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-95 text-white">
              <ArrowLeft className="size-5 mr-2" />
              Back to Safety
            </Button>
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
