"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import { formatDate } from "@/lib/utils";
import { fallbackDoctorAppointments } from "./doctor-utils";

export default function DoctorPrescriptions() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState(fallbackDoctorAppointments);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    if (!token) return;
    getAppointments(token)
      .then(setAppointments)
      .catch(() => setAppointments(fallbackDoctorAppointments));
    getPrescriptions(token).then(setPrescriptions).catch(() => setPrescriptions([]));
  }, [token]);

  const submit = async (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
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
      event.currentTarget.reset();
      toast.success("Prescription created");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={submit} className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
          Create Prescription
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold">
          Attach after a completed consultation
        </h2>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-1.5 text-sm font-medium">
            Appointment
            <select
              name="appointmentId"
              className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none"
            >
              {appointments.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.patientName} - {formatDate(item.appointmentDate)}
                </option>
              ))}
            </select>
          </label>
          <Input name="diagnosis" label="Diagnosis" required />
          <Input
            name="medicationName"
            label="Medication"
            placeholder="Aspirin"
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="dosage" label="Dosage" placeholder="75mg" />
            <Input name="duration" label="Duration" placeholder="14 days" />
          </div>
          <Textarea name="notes" label="Notes" placeholder="Follow-up instructions" />
          <Button type="submit">Create Prescription</Button>
        </div>
      </form>

      <section className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
          Prescription Records
        </p>
        <div className="mt-5 grid gap-3">
          {prescriptions.map((item) => (
            <article
              key={item._id}
              className="rounded-lg border border-border bg-background p-4"
            >
              <h3 className="font-heading text-xl font-bold">{item.diagnosis}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.notes}</p>
              <div className="mt-3 grid gap-2">
                {(item.medications || []).map((medication, index) => (
                  <p key={index} className="rounded-lg bg-muted px-3 py-2 text-sm">
                    {medication.name} - {medication.dosage} -{" "}
                    {medication.duration}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
