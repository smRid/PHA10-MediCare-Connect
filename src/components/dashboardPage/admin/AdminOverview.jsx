"use client";

import { useEffect, useState } from "react";
import { Activity, Users, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import StatCard from "@/components/dashboardPage/StatCard";
import { getStats } from "@/lib/api/healthcare";

function AnimatedChart({ activity }) {
  const data = activity?.length ? activity : [
    { label: "Mon", value: 0 },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 0 },
    { label: "Thu", value: 0 },
    { label: "Fri", value: 0 },
    { label: "Sat", value: 0 },
    { label: "Sun", value: 0 },
  ];

  const maxCount = Math.max(...data.map(d => d.value), 5); // Ensure scale has a reasonable minimum ceiling

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-8 rounded-3xl glass-card border border-border/50 p-8 shadow-sm transition-all hover:shadow-lg"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-xl font-extrabold text-foreground">Platform Activity</h3>
          <p className="text-sm font-medium text-muted-foreground mt-1">Appointments booked this week</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary ring-1 ring-primary/20">
          <Activity className="size-3.5 animate-pulse" />
          <span>Live</span>
        </div>
      </div>
      
      <div className="flex h-56 items-end justify-between gap-3 sm:gap-6 border-b border-border/50 pb-2">
        {data.map((item, i) => (
          <div key={item.label} className="group relative flex flex-1 flex-col items-center gap-3">
            {/* Tooltip for the value */}
            <div className="absolute -top-10 scale-0 rounded-md bg-foreground px-2 py-1 text-xs font-bold text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
              {item.value} {item.value === 1 ? "Appt" : "Appts"}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
            
            <div className="relative w-full max-w-[48px] flex-1 rounded-t-xl bg-muted/40 overflow-hidden ring-1 ring-border/50 transition-colors group-hover:bg-muted/60">
              <motion.div
                initial={{ height: "2%" }}
                animate={{ height: `${Math.max((item.value / maxCount) * 100, 2)}%` }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.1, type: "spring", bounce: 0.3 }}
                className="absolute bottom-0 w-full rounded-t-xl bg-gradient-to-t from-primary to-sky-400 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats).catch(console.error);
  }, []);

  const metrics = [
    { label: "Total Patients", value: stats?.totalPatients || stats?.patients || "...", icon: Users, helper: "+12% this week" },
    { label: "Verified Doctors", value: stats?.totalDoctors || stats?.doctors || "...", icon: ShieldCheck, helper: "Status: Active" },
    { label: "Appointments", value: stats?.totalAppointments || stats?.appointments || "...", icon: Activity, helper: "+45% growth" },
    { label: "Total Reviews", value: stats?.totalReviews || stats?.reviews || "...", icon: Star, helper: "Average 4.8" },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading
          align="left"
          eyebrow="Admin Dashboard"
          title="Platform Overview"
          description="Monitor healthcare ecosystem statistics, user activity, and platform health."
        />
      </motion.div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <StatCard
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
              helper={metric.helper}
            />
          </motion.div>
        ))}
      </div>
      
      <AnimatedChart activity={stats?.activity} />
    </div>
  );
}
