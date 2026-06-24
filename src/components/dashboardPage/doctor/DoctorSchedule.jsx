"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api/base";
import { normalizeDoctor } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { fallbackDoctorProfile } from "./doctor-utils";

export default function DoctorSchedule() {
  const { token } = useAuth();
  const [doctor, setDoctor] = useState(fallbackDoctorProfile);
  const [days, setDays] = useState(fallbackDoctorProfile.availableDays);
  const [slots, setSlots] = useState(fallbackDoctorProfile.availableSlots);

  useEffect(() => {
    if (!token) return;
    apiFetch("/doctors/me", { token })
      .then((profile) => {
        setDoctor(normalizeDoctor(profile));
        setDays(normalizeDoctor(profile).availableDays || []);
        setSlots(normalizeDoctor(profile).availableSlots || []);
      })
      .catch(() => {});
  }, [token]);

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

  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        Manage Schedule
      </p>
      <h2 className="mt-2 font-heading text-3xl font-extrabold">
        Add, update, or remove available times
      </h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <h3 className="font-heading text-xl font-bold">Available days</h3>
          <form
            onSubmit={(event) => addValue(event, setDays, days)}
            className="mt-4 flex gap-2"
          >
            <Input name="value" placeholder="Monday" />
            <Button type="submit">Add</Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setDays(days.filter((item) => item !== day))}
              >
                <Badge>{day} x</Badge>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <h3 className="font-heading text-xl font-bold">Available slots</h3>
          <form
            onSubmit={(event) => addValue(event, setSlots, slots)}
            className="mt-4 flex gap-2"
          >
            <Input name="value" placeholder="03:00 PM" />
            <Button type="submit">Add</Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSlots(slots.filter((item) => item !== slot))}
              >
                <Badge tone="blue">{slot} x</Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button className="mt-6" size="lg" onClick={save}>
        Save Schedule
      </Button>
    </section>
  );
}
