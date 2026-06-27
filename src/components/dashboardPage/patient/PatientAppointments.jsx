"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarClock, CalendarDays, Clock, User, FileText, X } from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import { getAppointments, getPrescriptions, normalizeAppointment } from "@/lib/api/healthcare";
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
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      getAppointments(token),
      getPrescriptions(token)
    ])
      .then(([appts, rx]) => {
        setAppointments(appts || []);
        setPrescriptions(rx || []);
      })
      .catch((err) => {
        toast.error("Failed to fetch data: " + err.message);
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
      className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm relative"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-[80px]" />
      </div>

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
                      <span className="inline-flex items-center justify-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary border border-primary/20">{currency(item.amount)}</span>
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
                  {item.appointmentStatus === "completed" ? (
                    (() => {
                      const rx = prescriptions.find(p => p.appointmentId === item._id || p.appointmentId?._id === item._id);
                      return rx ? (
                        <Button variant="outline" className="h-9 px-4 text-xs border-teal-500/30 text-teal-600 hover:bg-teal-500/10 dark:text-teal-400" onClick={() => setSelectedPrescription(rx)}>
                          <FileText className="size-3.5 mr-1.5" />
                          View Prescription
                        </Button>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">No prescription attached yet</p>
                      );
                    })()
                  ) : (
                    <>
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
                    </>
                  )}
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
            <CalendarClock className="mb-4 size-12 text-muted-foreground/50" />
            <h3 className="font-heading text-xl font-bold text-foreground">No appointments found</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              You haven't booked any appointments yet. Head over to the Find Doctors page to schedule your first consultation.
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedPrescription && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPrescription(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border/50 bg-card p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPrescription(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
              
              <div className="mb-6 pr-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">Prescription Details</h2>
                <p className="text-sm text-muted-foreground mt-1">Prescribed by {selectedPrescription.doctorName}</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Diagnosis</h3>
                  <p className="rounded-xl border border-border/50 bg-muted/30 p-4 text-sm text-foreground">
                    {selectedPrescription.diagnosis || "No diagnosis provided"}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Medications</h3>
                  <div className="grid gap-3">
                    {selectedPrescription.medications?.length > 0 ? (
                      selectedPrescription.medications.map((med, i) => (
                        <div key={i} className="rounded-xl border border-border/50 bg-background p-4 shadow-sm">
                          <p className="font-semibold text-foreground text-sm">{med.name}</p>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                            <span><strong className="text-foreground">Dosage:</strong> {med.dosage}</span>
                            <span><strong className="text-foreground">Duration:</strong> {med.duration}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No medications listed</p>
                    )}
                  </div>
                </div>
                
                {selectedPrescription.notes && (
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Additional Notes</h3>
                    <p className="rounded-xl border border-border/50 bg-muted/30 p-4 text-sm text-foreground whitespace-pre-wrap">
                      {selectedPrescription.notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
