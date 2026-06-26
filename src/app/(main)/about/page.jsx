"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  TimerReset,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const values = [
  {
    icon: TimerReset,
    title: "Less waiting",
    text: "Patients can compare doctors, pick available slots, and keep appointment status visible.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted care",
    text: "Doctor verification, secure APIs, and role-based access keep the platform accountable.",
  },
  {
    icon: Stethoscope,
    title: "Clinical flow",
    text: "Doctors manage schedules, appointment decisions, prescriptions, and profile updates.",
  },
  {
    icon: HeartHandshake,
    title: "Connected teams",
    text: "Admins can oversee users, payments, appointments, doctor performance, and reports.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 bg-background">
      <section className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Ambient Glows */}
        <div className="absolute -left-[10%] top-0 h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <SectionHeading
            align="left"
            eyebrow="About MediCare Connect"
            title="A calmer operating system for modern healthcare."
            description="MediCare Connect replaces fragmented paperwork with one coordinated journey for patients, doctors, and administrators."
          />
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            The platform is built around practical healthcare moments: finding a
            specialist, confirming a paid appointment, reviewing care, managing
            prescriptions, and helping hospital teams make better decisions from
            clean, modern dashboards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl shadow-primary/10 glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
              alt="Healthcare team reviewing patient care on tablets"
              className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
            
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-card/60 p-5 backdrop-blur-xl border border-border/50 shadow-lg">
              <p className="font-heading text-xl font-bold text-foreground">
                From appointment to aftercare, every step stays visible.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto mt-24 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 text-center"
        >
          <h2 className="font-heading text-3xl font-extrabold text-foreground">Core Values</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our platform is driven by the principles that make healthcare accessible, accountable, and highly efficient.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl glass-card border border-border/50 p-8 shadow-lg shadow-primary/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40"
            >
              {/* Decorative Glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
                  <Icon className="size-6 transition-transform duration-300 group-hover:-rotate-12" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
