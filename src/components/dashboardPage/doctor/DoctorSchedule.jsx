"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Plus, X } from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import { normalizeDoctor } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function DoctorSchedule() {
  const { token, user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [days, setDays] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!token || !user) return;
    apiFetch(`/doctors/${user._id}`, { token })
      .then((data) => {
        const normalized = normalizeDoctor(data);
        setDoctor(normalized);
        setDays(normalized.availableDays || []);
        setSlots(normalized.availableSlots || []);
      })
      .catch(() => setDoctor(null));
  }, [token, user]);

  const addValue = (event, setter, current) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("value");
    if (value && !current.includes(value)) setter([...current, value]);
    event.currentTarget.reset();
  };

  const save = async () => {
    try {
      const updated = await apiFetch(`/doctors/${doctor._id}`, {
        method: "PATCH",
        token,
        body: { days, slots },
      });
      setDoctor(normalizeDoctor(updated));
      toast.success("Schedule updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!doctor) return null;

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
          Manage Schedule
        </p>
        <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Available times & days
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 relative z-10">
        <div className="rounded-2xl border border-border/50 bg-background/50 p-6 transition-all hover:bg-muted/30 hover:shadow-md hover:border-teal-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Calendar className="size-5" />
            </div>
            <h3 className="font-heading text-xl font-bold">Working Days</h3>
          </div>
          <form onSubmit={(event) => addValue(event, setDays, days)} className="flex gap-2">
            <div className="flex-1">
              <Input name="value" placeholder="e.g. Monday" />
            </div>
            <Button type="submit" className="shrink-0 bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-lg shadow-teal-500/20">
              <Plus className="size-4 mr-1" /> Add
            </Button>
          </form>
          <div className="mt-6 flex flex-wrap gap-2">
            <AnimatePresence>
              {days.map((day) => (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={day}
                  type="button"
                  onClick={() => setDays(days.filter((item) => item !== day))}
                  className="group flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1.5 text-sm font-medium text-teal-700 dark:text-teal-300 transition-colors hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/20"
                >
                  {day} <X className="size-3.5 opacity-50 transition-transform group-hover:scale-110 group-hover:opacity-100" />
                </motion.button>
              ))}
            </AnimatePresence>
            {days.length === 0 && <p className="text-sm font-medium text-muted-foreground w-full text-center py-4 border border-dashed border-border/50 rounded-xl bg-background/50">No days added yet</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-background/50 p-6 transition-all hover:bg-muted/30 hover:shadow-md hover:border-teal-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Clock className="size-5" />
            </div>
            <h3 className="font-heading text-xl font-bold">Time Slots</h3>
          </div>
          <form onSubmit={(event) => addValue(event, setSlots, slots)} className="flex gap-2">
            <div className="flex-1">
              <Input name="value" placeholder="e.g. 09:00 AM" />
            </div>
            <Button type="submit" className="shrink-0 bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-lg shadow-teal-500/20">
              <Plus className="size-4 mr-1" /> Add
            </Button>
          </form>
          <div className="mt-6 flex flex-wrap gap-2">
            <AnimatePresence>
              {slots.map((slot) => (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={slot}
                  type="button"
                  onClick={() => setSlots(slots.filter((item) => item !== slot))}
                  className="group flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1.5 text-sm font-medium text-teal-700 dark:text-teal-300 transition-colors hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/20"
                >
                  {slot} <X className="size-3.5 opacity-50 transition-transform group-hover:scale-110 group-hover:opacity-100" />
                </motion.button>
              ))}
            </AnimatePresence>
            {slots.length === 0 && <p className="text-sm font-medium text-muted-foreground w-full text-center py-4 border border-dashed border-border/50 rounded-xl bg-background/50">No slots added yet</p>}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end relative z-10">
        <Button size="lg" onClick={save} className="px-8 shadow-xl shadow-primary/20">
          Save Schedule Changes
        </Button>
      </div>
    </motion.section>
  );
}
