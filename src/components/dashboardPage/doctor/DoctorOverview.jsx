"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, MessageSquareHeart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { getAppointments, getDoctorById } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import StatCard from "@/components/dashboardPage/StatCard";
import StatusPill from "@/components/shared/StatusPill";
import { formatDate } from "@/lib/utils";

export default function DoctorOverview() {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (!token) return;
    getAppointments(token, { doctorId: user?._id })
      .then(setAppointments)
      .catch(() => setAppointments([]));

    getDoctorById(user?._id)
      .then((data) => setDoctor(data || null))
      .catch(() => setDoctor(null));
  }, [token, user]);

  const todays = appointments.filter((item) => {
    const today = new Date().toISOString().slice(0, 10);
    return item.appointmentDate === today;
  });
  const uniquePatients = new Set(
    appointments.map((item) => item.patientId || item.patientName),
  );

  return (
    <div className="grid gap-8">
      <section className="grid gap-6 md:grid-cols-3">
        {[
          { icon: Users, label: "Total Patients", value: uniquePatients.size || appointments.length, helper: "Patients in records" },
          { icon: CalendarCheck, label: "Today's Appointments", value: todays.length, helper: "Scheduled today" },
          { icon: MessageSquareHeart, label: "Reviews Received", value: doctor?.reviewCount || 0, helper: `Average rating ${doctor?.ratingAverage || 0}` },
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <StatCard {...metric} />
          </motion.div>
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="rounded-3xl border border-border/50 glass-card p-6 sm:p-8 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 ring-1 ring-teal-500/20 shadow-inner">
            <CalendarCheck className="size-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Appointment queue
            </p>
            <h2 className="mt-1 font-heading text-xl font-extrabold text-foreground sm:text-2xl">
              Requests needing attention
            </h2>
          </div>
        </div>
        
        <div className="grid gap-3 relative z-10">
          {appointments.slice(0, 5).map((item, i) => (
            <motion.article
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-background/50 p-5 transition-all hover:bg-muted/50 hover:shadow-md hover:border-teal-500/30 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-500/5 text-teal-600 dark:text-teal-400 border border-teal-500/10 transition-colors group-hover:bg-teal-500/10">
                  <Users className="size-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">{item.patientName}</p>
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">
                    {formatDate(item.appointmentDate)} <span className="mx-1 text-border/50">•</span> {item.appointmentTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={item.appointmentStatus} />
                <StatusPill status={item.paymentStatus} />
              </div>
            </motion.article>
          ))}
          {appointments.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/50 p-8 text-center">
              <p className="text-sm font-medium text-muted-foreground">No appointments in the queue.</p>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
