"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, FileText, User, Users } from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import { getAppointments, normalizeAppointment } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import StatusPill from "@/components/shared/StatusPill";
import { formatDate } from "@/lib/utils";

export default function DoctorAppointments() {
  const router = useRouter();
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!token) return;
    getAppointments(token, { doctorId: user?._id })
      .then(setAppointments)
      .catch(() => setAppointments([]));
  }, [token, user]);

  const setStatus = async (id, appointmentStatus) => {
    try {
      const updated = await apiFetch(`/appointments/${id}`, {
        method: "PATCH",
        token,
        body: { status: appointmentStatus },
      });
      setAppointments((items) =>
        items.map((item) =>
          item._id === id ? normalizeAppointment(updated) : item,
        ),
      );
      toast.success(`Appointment marked ${appointmentStatus}`);
      if (appointmentStatus === "completed") {
        router.push("/dashboard/doctor/prescriptions");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />

      <div className="mb-8 relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          Appointment Requests
        </p>
        <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Accept, reject, or complete
        </h2>
      </div>

      <div className="grid gap-4 relative z-10">
        <AnimatePresence mode="popLayout">
          {appointments.map((item, index) => (
            <motion.article
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group flex flex-col gap-5 rounded-2xl border border-border/50 bg-background/50 p-5 transition-all duration-300 hover:bg-muted/30 hover:shadow-md hover:border-teal-500/30"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-500/5 text-teal-600 dark:text-teal-400 border border-teal-500/10 transition-colors group-hover:bg-teal-500/10">
                    <User className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {item.patientName}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" />{formatDate(item.appointmentDate)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="size-3.5" />{item.appointmentTime}</span>
                    </div>
                    {item.symptoms && (
                      <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-xl border border-border/50">
                        <FileText className="size-4 shrink-0 text-teal-500/60 mt-0.5" />
                        {item.symptoms}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
                  <StatusPill status={item.appointmentStatus} />
                  <StatusPill status={item.paymentStatus} />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 border-t border-border/50 pt-4 mt-1">
                <Button className="h-9 px-4 text-xs" onClick={() => setStatus(item._id, "accepted")}>
                  Accept Request
                </Button>
                <Button variant="outline" className="h-9 px-4 text-xs" onClick={() => setStatus(item._id, "completed")}>
                  Mark Completed
                </Button>
                <Button variant="danger" className="h-9 px-4 text-xs" onClick={() => setStatus(item._id, "rejected")}>
                  Reject
                </Button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
        
        {appointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/50 bg-background/30 p-12 text-center"
          >
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 ring-1 ring-teal-500/20">
              <Users className="size-8" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">No appointment requests</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
              You're all caught up. New patient requests will appear here when they book a consultation with you.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
