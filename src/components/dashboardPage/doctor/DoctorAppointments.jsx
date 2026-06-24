"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api/base";
import { getAppointments, normalizeAppointment } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import StatusPill from "@/components/shared/StatusPill";
import { formatDate } from "@/lib/utils";
import { fallbackDoctorAppointments } from "./doctor-utils";

export default function DoctorAppointments() {
  const router = useRouter();
  const { token } = useAuth();
  const [appointments, setAppointments] = useState(fallbackDoctorAppointments);

  useEffect(() => {
    if (!token) return;
    getAppointments(token)
      .then(setAppointments)
      .catch(() => setAppointments(fallbackDoctorAppointments));
  }, [token]);

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
    <section className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        Appointment Requests
      </p>
      <h2 className="mt-2 font-heading text-3xl font-extrabold">
        Accept, reject, or complete consultations
      </h2>

      <div className="mt-6 grid gap-4">
        {appointments.map((item) => (
          <article
            key={item._id}
            className="rounded-lg border border-border bg-background p-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold">
                  {item.patientName}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(item.appointmentDate)} at {item.appointmentTime}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.symptoms}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusPill status={item.appointmentStatus} />
                <StatusPill status={item.paymentStatus} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setStatus(item._id, "accepted")}>
                Accept
              </Button>
              <Button variant="danger" onClick={() => setStatus(item._id, "rejected")}>
                Reject
              </Button>
              <Button onClick={() => setStatus(item._id, "completed")}>
                Mark Completed
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
