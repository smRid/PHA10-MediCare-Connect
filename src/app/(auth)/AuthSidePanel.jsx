"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandMark from "@/components/shared/BrandMark";

export default function AuthSidePanel() {
  const pathname = usePathname();
  const isRegister = pathname === "/register";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    
    if (window.innerWidth >= 1024) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const content = isRegister
    ? {
        eyebrow: "Join the Network",
        title: "Start your healthcare journey with MediCare Connect.",
        description:
          "Create an account to easily book appointments, manage prescriptions, or join as a verified doctor.",
        image:
          "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=1200",
      }
    : {
        eyebrow: "Welcome Back",
        title: "Healthcare workflows that remember who you are.",
        description:
          "Access your dashboard to manage appointments, track medical records, and stay connected.",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
      };

  return (
    <section className="hidden gradient-mesh noise-overlay border-r border-border p-8 lg:flex lg:flex-col relative overflow-hidden">
      <div className="shrink-0">
        <Link
          href="/"
          aria-label="MediCare Connect home"
          className="relative z-10 transition-transform hover:scale-105 inline-block origin-left"
        >
          <BrandMark />
        </Link>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center gap-6"
          >
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 border border-border/50"
              animate={{ x: mousePosition.x, y: mousePosition.y }}
              transition={{ type: "spring", stiffness: 75, damping: 25, mass: 1 }}
            >
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none z-10" />
              <motion.img
                src={content.image}
                alt={content.title}
                className="aspect-video w-full max-h-56 object-cover"
                animate={{ scale: 1.05 + Math.abs(mousePosition.x) * 0.001 }}
                transition={{ type: "spring", stiffness: 75, damping: 25 }}
              />
            </motion.div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {content.eyebrow}
              </p>
              <h1 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-foreground bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/80 xl:text-4xl">
                {content.title}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground xl:text-base leading-relaxed">
                {content.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
