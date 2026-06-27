"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Users,
  Stethoscope,
  MessageSquareHeart,
} from "lucide-react";
import { getStats } from "@/lib/api/healthcare";

function AnimatedCounter({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

const cards = [
  { key: "totalDoctors", label: "Verified Doctors", icon: Stethoscope, value: 340 },
  { key: "totalPatients", label: "Happy Patients", icon: Users, value: 2500 },
  { key: "totalReviews", label: "Patient Reviews", icon: MessageSquareHeart, value: 1250 },
];

export default function StatsRow() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ key, label, icon: Icon, value }, index) => (
          <motion.article
            key={key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-3xl glass-card border border-border/50 p-8 shadow-xl shadow-primary/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40"
          >
            {/* Decorative Hover Glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-sky-500/10 shadow-inner ring-1 ring-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Icon className="size-7 text-primary transition-colors duration-500 group-hover:text-primary-foreground mix-blend-color-burn dark:mix-blend-normal" />
              </div>
              <p className="font-heading text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70">
                <AnimatedCounter value={value} />+
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
