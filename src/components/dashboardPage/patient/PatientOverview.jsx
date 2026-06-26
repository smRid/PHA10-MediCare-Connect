"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarClock, CreditCard, Heart, History } from "lucide-react";
import { motion } from "framer-motion";
import { getAppointments, getPayments } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import StatCard from "@/components/dashboardPage/StatCard";
import StatusPill from "@/components/shared/StatusPill";
import { currency, formatDate } from "@/lib/utils";

export default function PatientOverview() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!token) return;
    getAppointments(token)
      .then(setAppointments)
      .catch(() => setAppointments([]));
    getPayments(token).then(setPayments).catch(() => setPayments([]));
  }, [token]);

  const upcoming = appointments.filter((item) =>
    ["requested", "accepted", "rescheduled"].includes(item.appointmentStatus),
  );
  const paidTotal = useMemo(
    () =>
      payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0) ||
      appointments
        .filter((item) => item.paymentStatus === "paid")
        .reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [appointments, payments],
  );

  return (
    <div className="grid gap-8">
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: CalendarClock, label: "Upcoming Appointments", value: upcoming.length, helper: "Confirmed or waiting" },
          { icon: History, label: "Appointment History", value: appointments.length, helper: "All records" },
          { icon: CreditCard, label: "Total Payments", value: currency(paidTotal), helper: "Paid consultations" },
          { icon: Heart, label: "Favorite Doctors", value: 0, helper: "Tracked favorites" },
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
        transition={{ delay: 0.4, duration: 0.6 }}
        className="rounded-3xl border border-border/50 glass-card p-6 sm:p-8 shadow-sm overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20 shadow-inner">
            <CalendarClock className="size-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Next care steps
            </p>
            <h2 className="mt-1 font-heading text-xl font-extrabold text-foreground sm:text-2xl">
              Upcoming appointments
            </h2>
          </div>
        </div>
        
        <div className="mt-6 overflow-x-auto relative z-10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="pb-4 pr-4 font-bold uppercase tracking-wider text-[10px]">Doctor</th>
                <th className="pb-4 pr-4 font-bold uppercase tracking-wider text-[10px]">Date</th>
                <th className="pb-4 pr-4 font-bold uppercase tracking-wider text-[10px]">Time</th>
                <th className="pb-4 pr-4 font-bold uppercase tracking-wider text-[10px]">Payment</th>
                <th className="pb-4 pr-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {upcoming.map((item, i) => (
                <motion.tr 
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="group transition-colors hover:bg-muted/30"
                >
                  <td className="py-4 pr-4">
                    <div className="font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.doctorName}</div>
                  </td>
                  <td className="py-4 pr-4 font-medium text-muted-foreground">{formatDate(item.appointmentDate)}</td>
                  <td className="py-4 pr-4 font-medium text-muted-foreground">{item.appointmentTime}</td>
                  <td className="py-4 pr-4">
                    <StatusPill status={item.paymentStatus} />
                  </td>
                  <td className="py-4 pr-4">
                    <StatusPill status={item.appointmentStatus} />
                  </td>
                </motion.tr>
              ))}
              {upcoming.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="inline-flex items-center justify-center rounded-2xl border border-dashed border-border/50 px-8 py-6 text-sm font-medium text-muted-foreground">
                      No upcoming appointments.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
