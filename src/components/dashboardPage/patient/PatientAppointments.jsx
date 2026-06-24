"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api/base";
import { getAppointments, normalizeAppointment } from "@/lib/api/healthcare";
import { demoAppointments } from "@/lib/demo-data";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StatusPill from "@/components/shared/StatusPill";
import { currency, formatDate } from "@/lib/utils";

export default function PatientAppointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState(demoAppointments);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!token) return;
    getAppointments(token)
      .then(setAppointments)
      .catch(() => setAppointments(demoAppointments));
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
    <section className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        My Appointments
      </p>
      <h2 className="mt-2 font-heading text-3xl font-extrabold">
        View, reschedule, or cancel appointments
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
                  {item.doctorName}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(item.appointmentDate)} at {item.appointmentTime} -{" "}
                  {currency(item.amount)}
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

            {editingId === item._id ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  updateAppointment(
                    item._id,
                    {
                      date: new FormData(event.currentTarget).get("appointmentDate"),
                      time: new FormData(event.currentTarget).get("appointmentTime"),
                    },
                  );
                }}
                className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
              >
                <Input
                  name="appointmentDate"
                  type="date"
                  defaultValue={item.appointmentDate}
                />
                <Input name="appointmentTime" defaultValue={item.appointmentTime} />
                <Button type="submit">Save</Button>
              </form>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setEditingId(item._id)}>
                  Reschedule
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    updateAppointment(item._id, {
                      status: "cancelled",
                    })
                  }
                >
                  Cancel
                </Button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
