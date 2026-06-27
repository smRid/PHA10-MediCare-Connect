"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, FileText, User, Users, ChevronDown } from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import { getAppointments, normalizeAppointment } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import StatusPill from "@/components/shared/StatusPill";
import { formatDate } from "@/lib/utils";

const toneByStatus = {
  verified: "green",
  accepted: "green",
  paid: "green",
  completed: "green",
  active: "green",
  requested: "amber",
  pending: "amber",
  rescheduled: "blue",
  unpaid: "red",
  rejected: "red",
  cancelled: "red",
  suspended: "red",
};

const toneMap = {
  teal: "bg-primary/10 text-primary border-primary/20",
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  blue: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  amber: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  red: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  gray: "bg-muted/50 text-muted-foreground border-border",
};

function ActionDropdown({ status, onSelect }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const tone = toneByStatus[status] || "gray";
  const label = String(status || "unknown").replaceAll("_", " ");

  return (
    <div ref={menuRef} className="relative w-36 z-20">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center justify-between gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-md outline-none focus:ring-2 focus:ring-primary/20 ${toneMap[tone]}`}
      >
        <span className="truncate">{label}</span>
        <ChevronDown
          className={`size-3.5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            className="specialization-scrollbar absolute left-auto right-0 top-[calc(100%+0.5rem)] z-40 w-48 overflow-hidden rounded-xl border border-border/50 bg-card/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            {[
              { label: "Accept Request", value: "accepted" },
              { label: "Mark Completed", value: "completed" },
              { label: "Reject", value: "rejected" }
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                role="option"
                onClick={() => {
                  onSelect(item.value);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors text-foreground hover:bg-teal-500/10 hover:text-teal-600"
              >
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
      className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm relative"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-teal-500/5 blur-[80px]" />
      </div>

      <div className="mb-8 relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          Appointment Requests
        </p>
        <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Update Appointment Status
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
                  <ActionDropdown status={item.appointmentStatus} onSelect={(status) => setStatus(item._id, status)} />
                  <StatusPill status={item.paymentStatus} />
                </div>
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
