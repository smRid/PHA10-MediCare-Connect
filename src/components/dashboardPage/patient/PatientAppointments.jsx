"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarClock, CalendarDays, Clock, User, FileText } from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import { getAppointments, normalizeAppointment } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StatusPill from "@/components/shared/StatusPill";
import CustomDropdown from "@/components/ui/CustomDropdown";
import { currency, formatDate } from "@/lib/utils";

const generateDates = (days) => {
  const dates = [];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const validDays = days?.length > 0 ? days.map(d => dayNames.indexOf(d)) : [0, 1, 2, 3, 4, 5, 6];
  
  let current = new Date();
  current.setDate(current.getDate() + 1);

  while (dates.length < 14) {
    if (validDays.includes(current.getDay())) {
      const dateString = current.toISOString().split("T")[0];
      const label = current.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      dates.push({ value: dateString, label });
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

function RescheduleForm({ item, onSave, onCancel }) {
  const availableDatesOptions = generateDates(item.doctor?.availableDays || []);
  
  // If the currently booked date isn't in the options (e.g., today), add it so the dropdown doesn't appear empty
  if (item.appointmentDate && !availableDatesOptions.find(opt => opt.value === item.appointmentDate)) {
    const d = new Date(item.appointmentDate);
    if (!isNaN(d.getTime())) {
      availableDatesOptions.unshift({
        value: item.appointmentDate,
        label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
  }

  const availableTimeOptions = (item.doctor?.availableSlots || []).map(slot => ({ value: slot, label: slot }));
  if (item.appointmentTime && !availableTimeOptions.find(opt => opt.value === item.appointmentTime)) {
    availableTimeOptions.unshift({ value: item.appointmentTime, label: item.appointmentTime });
  }

  const [selectedDate, setSelectedDate] = useState(item.appointmentDate || (availableDatesOptions[0]?.value || ""));
  const [selectedTime, setSelectedTime] = useState(item.appointmentTime || (availableTimeOptions[0]?.value || ""));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSave({ date: selectedDate, time: selectedTime });
      }}
      className="mt-2 grid gap-3 rounded-xl border border-border/50 bg-muted/40 p-4 sm:grid-cols-[1fr_1fr_auto]"
    >
      <CustomDropdown
        label="Date"
        placeholder="Select a date"
        icon={CalendarDays}
        value={selectedDate}
        onChange={setSelectedDate}
        options={availableDatesOptions}
      />
      <CustomDropdown
        label="Time"
        placeholder="Select time"
        icon={Clock}
        value={selectedTime}
        onChange={setSelectedTime}
        options={availableTimeOptions}
      />
      <div className="flex gap-2">
        <Button type="button" variant="outline" className="h-12 w-full sm:w-auto" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="h-12 w-full sm:w-auto">Save</Button>
      </div>
    </form>
  );
}

export default function PatientAppointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getAppointments(token)
      .then(setAppointments)
      .catch((err) => {
        toast.error("Failed to fetch appointments: " + err.message);
        setAppointments([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const updateAppointment = async (id, updates) => {
    try {
      const updated = await apiFetch(`/appointments/${id}`, {
        method: "PATCH",
        token,
        body: updates,
      });
      setAppointments((items) =>
        items.map((item) =>
          item._id === id ? normalizeAppointment(updated) : item,
        ),
      );
      setEditingId(null);
      toast.success("Appointment updated");
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
      <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

      <div className="mb-8 relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          My Appointments
        </p>
        <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Manage Your Appointments
        </h2>
      </div>

      <div className="grid gap-4 relative z-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex flex-col gap-5 rounded-2xl border border-border/50 bg-background/50 p-5 animate-pulse"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:block size-12 shrink-0 rounded-full bg-muted/40"></div>
                    <div className="flex flex-col gap-3 w-full sm:w-auto mt-1">
                      <div className="h-6 w-48 rounded bg-muted/40"></div>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <div className="h-4 w-24 rounded bg-muted/40"></div>
                        <div className="h-4 w-20 rounded bg-muted/40"></div>
                        <div className="h-6 w-12 rounded bg-muted/40"></div>
                      </div>
                      <div className="h-10 w-[80%] sm:w-64 rounded-xl bg-muted/40 mt-1"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end mt-1">
                    <div className="h-6 w-20 rounded-full bg-muted/40"></div>
                    <div className="h-6 w-16 rounded-full bg-muted/40"></div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 border-t border-border/50 pt-4 mt-1">
                  <div className="h-9 w-28 rounded bg-muted/40"></div>
                  <div className="h-9 w-36 rounded bg-muted/40"></div>
                </div>
              </motion.div>
            ))
          ) : (
            appointments.map((item, index) => (
            <motion.article
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="flex flex-col gap-5 rounded-2xl border border-border/50 bg-background/50 p-5 transition-all duration-300"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary border border-primary/10 transition-colors">
                    <User className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground transition-colors">
                      {item.doctorName}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" />{formatDate(item.appointmentDate)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="size-3.5" />{item.appointmentTime}</span>
                      <span className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-1 text-xs font-bold text-foreground border border-border/50">{currency(item.amount)}</span>
                    </div>
                    {item.symptoms && (
                      <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-xl border border-border/50">
                        <FileText className="size-4 shrink-0 text-primary/60 mt-0.5" />
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

              {editingId === item._id ? (
                <RescheduleForm
                  item={item}
                  onSave={(updates) => updateAppointment(item._id, updates)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex flex-wrap items-center gap-3 border-t border-border/50 pt-4 mt-1">
                  <Button variant="outline" className="h-9 px-4 text-xs" onClick={() => setEditingId(item._id)}>
                    Reschedule
                  </Button>
                  <Button
                    variant="danger"
                    className="h-9 px-4 text-xs"
                    onClick={() => updateAppointment(item._id, { status: "cancelled" })}
                  >
                    Cancel Appointment
                  </Button>
                </div>
              )}
            </motion.article>
          )))}
        </AnimatePresence>
        
        {!loading && appointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/50 bg-background/30 p-12 text-center"
          >
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <CalendarClock className="size-8" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">No appointments yet</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
              You haven't booked any appointments. Search for a doctor to get started with your care journey.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
