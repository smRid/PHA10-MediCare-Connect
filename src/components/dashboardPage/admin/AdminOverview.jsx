"use client";

import { useEffect, useState } from "react";
import { Activity, Users, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
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
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <RechartsTooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)" }} itemStyle={{ color: "#0ea5e9" }} />
            <Area type="monotone" dataKey="value" name="Appointments" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
          </AreaChart>
        </ResponsiveContainer>
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
