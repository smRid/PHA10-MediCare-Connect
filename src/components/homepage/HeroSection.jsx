"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { getStats } from "@/lib/api/healthcare";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function compactNumber(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}

const heroSlides = [
  {
    src: "/1.jpg",
    alt: "Doctor with patient",
  },
  {
    src: "/2.jpg",
    alt: "Hospital tech",
  },
  {
    src: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=1200",
    alt: "Healthcare pros",
  },
];

export default function HeroSection() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalDoctors: 0,
    totalPatients: 0,
  });
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    getStats()
      .then((data) =>
        setStats(
          data || { totalAppointments: 0, totalDoctors: 0, totalPatients: 0 },
        ),
      )
      .catch(() => {});

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: "Appointments booked",
        value: compactNumber(stats.totalAppointments),
      },
      {
        label: "Verified doctors",
        value: `${compactNumber(stats.totalDoctors)}+`,
      },
      {
        label: "Patients connected",
        value: compactNumber(stats.totalPatients),
      },
    ],
    [stats],
  );

  return (
    <section className="relative overflow-hidden border-b border-border px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      {/* Ambient Background Layers */}
      <div className="absolute inset-0 gradient-mesh opacity-80" />
      <div className="absolute inset-0 noise-overlay opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 medical-grid opacity-30 mix-blend-color-burn dark:mix-blend-color-dodge pointer-events-none" />
      
      {/* Glowing Orbs */}
      <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute top-[20%] -right-[10%] h-[40%] w-[40%] rounded-full bg-sky-500/10 blur-[100px] animate-pulse anim-delay-500 pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl gap-10 sm:gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs sm:text-sm font-semibold text-primary shadow-sm backdrop-blur-md">
            <HeartPulse className="size-4 animate-pulse" />
            Live hospital appointment ecosystem
          </div>
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Book trusted care before the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-500">waiting room fills up.</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            MediCare Connect helps patients find verified doctors, pay securely,
            track appointments, and keep prescriptions connected to one calm
            healthcare workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/find-doctors">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                Find Doctors
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-card/50 backdrop-blur-sm transition-transform hover:scale-105">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="mt-10 sm:mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {metrics.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass-card rounded-2xl border border-border/50 p-4 sm:p-5 shadow-lg shadow-primary/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary/10"
              >
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/60">
                  {item.value}
                </p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-muted-foreground leading-snug">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="relative lg:ml-auto w-full mt-6 lg:mt-0"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-2xl shadow-primary/20 ring-1 ring-white/5 h-[350px] sm:h-[450px] lg:h-[600px] bg-card/50">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out",
                  activeSlide === index ? "opacity-100 scale-100 blur-none z-10" : "opacity-0 scale-105 blur-sm z-0"
                )}
              />
            ))}
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent mix-blend-multiply pointer-events-none" />
            
            <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex items-center justify-center">
              <div className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card/30 px-4 py-2 sm:py-2.5 backdrop-blur-xl shadow-lg">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Show healthcare image ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                      activeSlide === index
                        ? "w-8 bg-primary shadow-[0_0_12px_rgba(var(--primary),0.6)]"
                        : "w-2.5 bg-foreground/30 hover:bg-foreground/50 hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
