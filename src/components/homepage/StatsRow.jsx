"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Stethoscope,
  CalendarCheck,
  Star,
  ArrowUpRight,
  MessageSquareHeart,
} from "lucide-react";
import { getStats } from "@/lib/api/healthcare";

const cards = [
  { key: "totalDoctors", label: "Total Doctors", icon: Stethoscope },
  { key: "totalPatients", label: "Total Patients", icon: Users },
  { key: "totalReviews", label: "Total Reviews", icon: MessageSquareHeart },
];

export default function StatsRow() {
  const [stats, setStats] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0, totalReviews: 0 });

  useEffect(() => {
    getStats().then(setStats).catch(() => setStats({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0, totalReviews: 0 }));
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ key, label, icon: Icon }, index) => (
          <motion.article
            key={key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="rounded-lg border border-border bg-card p-5 shadow-lg shadow-primary/5"
          >
            <Icon className="mb-5 size-8 text-primary" />
            <p className="font-heading text-4xl font-extrabold">
              {Number(stats[key] || 0).toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{label}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
