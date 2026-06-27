"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FilePlus, FileText, Pill } from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import {
  getAppointments,
  getPrescriptions,
  normalizePrescription,
} from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import CustomDropdown from "@/components/ui/CustomDropdown";
import { formatDate } from "@/lib/utils";

export default function DoctorPrescriptions() {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  useEffect(() => {
    if (!token || !user) return;
    getAppointments(token, { doctorId: user?._id, status: "accepted" })
      .then((data) => setAppointments(data || []))
      .catch(() => setAppointments([]));
    getPrescriptions(token).then(setPrescriptions).catch(() => setPrescriptions([]));
  }, [token, user]);

  const submit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = Object.fromEntries(new FormData(formElement));
    try {
      const prescription = await apiFetch("/prescriptions", {
        method: "POST",
        token,
        body: {
          appointmentId: form.appointmentId,
          diagnosis: form.diagnosis,
          notes: form.notes,
          medications: [
            {
              name: form.medicationName,
              dosage: form.dosage,
              duration: form.duration,
            },
          ],
        },
      });
      setPrescriptions((items) => [normalizePrescription(prescription), ...items]);
      formElement.reset();
      setSelectedAppointment("");
      toast.success("Prescription created");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <motion.section 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm relative overflow-hidden h-fit"
      >
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />
        
        <form onSubmit={submit} className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 ring-1 ring-teal-500/20 shadow-inner">
              <FilePlus className="size-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                Create Prescription
              </p>
              <h2 className="mt-1 font-heading text-xl font-extrabold text-foreground sm:text-2xl">
                Attach to consultation
              </h2>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="relative pt-2">
              <input type="hidden" name="appointmentId" value={selectedAppointment} required />
              <CustomDropdown
                label="Consultation / Appointment"
                placeholder="Select an appointment..."
                value={selectedAppointment}
                onChange={setSelectedAppointment}
                options={appointments.map(item => ({
                  value: item._id,
                  label: `${item.patientName} - ${formatDate(item.appointmentDate)}`
                }))}
              />
            </div>

            <div className="rounded-2xl border border-border/50 bg-muted/20 p-5 grid gap-4">
              <Input name="diagnosis" label="Diagnosis" required placeholder="e.g. Acute Bronchitis" />
              
              <div className="border-t border-border/50 pt-4 mt-2">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Primary Medication</p>
                <Input
                  name="medicationName"
                  label="Medication Name"
                  placeholder="e.g. Amoxicillin"
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <Input name="dosage" label="Dosage" placeholder="e.g. 500mg, twice daily" />
                  <Input name="duration" label="Duration" placeholder="e.g. 7 days" />
                </div>
              </div>
            </div>

            <Textarea name="notes" label="Additional Notes" placeholder="Rest, drink plenty of fluids, follow-up in 1 week..." />
            
            <Button type="submit" className="mt-2 h-12 w-full bg-teal-600 hover:bg-teal-700 text-white shadow-xl shadow-teal-500/20 text-base">
              Issue Prescription
            </Button>
          </div>
        </form>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
      >
        <div className="mb-8 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Prescription Records
          </p>
          <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Recent history
          </h2>
        </div>

        <div className="grid gap-4 relative z-10">
          <AnimatePresence mode="popLayout">
            {prescriptions.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-background/50 p-6 transition-all hover:bg-muted/30 hover:shadow-md hover:border-teal-500/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {item.diagnosis}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.notes}
                    </p>
                  </div>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-500/5 text-teal-500 border border-teal-500/10">
                    <FileText className="size-4" />
                  </div>
                </div>
                
                <div className="mt-2 grid gap-2">
                  {(item.medications || []).map((medication, mIndex) => (
                    <div key={mIndex} className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 p-3 transition-colors group-hover:border-teal-500/20 group-hover:bg-teal-500/5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-teal-600 shadow-sm">
                        <Pill className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-foreground">{medication.name}</p>
                        <p className="truncate text-xs font-medium text-muted-foreground">
                          {medication.dosage} <span className="mx-1 opacity-50">•</span> {medication.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
          
          {prescriptions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/50 bg-background/30 p-12 text-center"
            >
              <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 ring-1 ring-teal-500/20">
                <FileText className="size-8" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">No records found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
                You haven't issued any prescriptions yet. When you do, they will appear here.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
