"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Plus, X, ChevronDown, Check } from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import { normalizeDoctor } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";

function CustomSelect({ options, placeholder, selectedOptions, value, onChange }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const availableOptions = options.filter(opt => !selectedOptions.includes(opt));
  const selectedLabel = value || placeholder;

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div ref={menuRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-left text-sm font-medium outline-none transition-all focus:border-teal-500/50 focus:bg-background focus:ring-4 focus:ring-teal-500/10 hover:bg-background"
      >
        <span className={`truncate ${!value ? "text-muted-foreground" : "text-foreground"}`}>{selectedLabel}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
            className="specialization-scrollbar absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-64 overflow-y-auto rounded-xl border border-border/50 bg-card/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            {availableOptions.length === 0 ? (
              <div className="px-3 py-2.5 text-center text-sm text-muted-foreground">No options left</div>
            ) : (
              availableOptions.map((item) => {
                const selected = item === value;
                return (
                  <button
                    key={item}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(item);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      selected
                        ? "bg-teal-500 text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="truncate">{item}</span>
                    {selected && <Check className="size-4 shrink-0" />}
                  </button>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DoctorSchedule() {
  const { token, user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [days, setDays] = useState([]);
  const [slots, setSlots] = useState([]);
  
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const allSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

  useEffect(() => {
    if (!token || !user) return;
    apiFetch(`/doctors/me`, { token })
      .then((data) => {
        const normalized = normalizeDoctor(data);
        setDoctor(normalized);
        setDays(normalized.availableDays || []);
        setSlots(normalized.availableSlots || []);
      })
      .catch(() => setDoctor(null));
  }, [token, user]);

  const addDay = (event) => {
    event.preventDefault();
    if (selectedDay && !days.includes(selectedDay)) {
      setDays([...days, selectedDay]);
      setSelectedDay("");
    }
  };

  const addSlot = (event) => {
    event.preventDefault();
    if (selectedSlot && !slots.includes(selectedSlot)) {
      setSlots([...slots, selectedSlot]);
      setSelectedSlot("");
    }
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
      className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm relative"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-teal-500/5 blur-[80px]" />
      </div>

      <div className="mb-8 relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          Manage Schedule
        </p>
        <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Available times & days
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 relative z-20">
        <div className="rounded-2xl border border-border/50 bg-background/50 p-6 transition-all hover:bg-muted/30 hover:shadow-md hover:border-teal-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Calendar className="size-5" />
            </div>
            <h3 className="font-heading text-xl font-bold">Working Days</h3>
          </div>
          <form onSubmit={addDay} className="flex gap-2">
            <div className="flex-1">
              <CustomSelect
                options={allDays}
                placeholder="Select a day..."
                selectedOptions={days}
                value={selectedDay}
                onChange={setSelectedDay}
              />
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
          <form onSubmit={addSlot} className="flex gap-2">
            <div className="flex-1">
              <CustomSelect
                options={allSlots}
                placeholder="Select a time slot..."
                selectedOptions={slots}
                value={selectedSlot}
                onChange={setSelectedSlot}
              />
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
