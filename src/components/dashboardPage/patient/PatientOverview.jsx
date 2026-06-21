"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarClock, CreditCard, Heart, History } from "lucide-react";
import { getAppointments, getPayments } from "@/lib/api/healthcare";
import { demoAppointments, demoDoctors } from "@/lib/demo-data";
import { useAuth } from "@/lib/auth-context";
import StatCard from "@/components/dashboardPage/StatCard";
import StatusPill from "@/components/shared/StatusPill";
import { currency, formatDate } from "@/lib/utils";

export default function PatientOverview() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState(demoAppointments);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!token) return;
    getAppointments(token)
      .then(setAppointments)
      .catch(() => setAppointments(demoAppointments));
    getPayments(token).then(setPayments).catch(() => setPayments([]));
  }, [token]);

  const upcoming = appointments.filter((item) =>
    ["requested", "accepted", "rescheduled"].includes(item.appointmentStatus),
  );
  const paidTotal = useMemo(
    () =>
      payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0) ||
      appointments
        .filter((item) => item.paymentStatus === "paid")
        .reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [appointments, payments],
  );

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarClock}
          label="Upcoming Appointments"
          value={upcoming.length}
          helper="Confirmed or waiting for doctor action"
        />
        <StatCard
          icon={History}
          label="Appointment History"
          value={appointments.length}
          helper="All appointment records"
        />
        <StatCard
          icon={CreditCard}
          label="Total Payments"
          value={currency(paidTotal)}
          helper="Paid consultations"
        />
        <StatCard
          icon={Heart}
          label="Favorite Doctors"
          value={demoDoctors.length}
          helper="Demo favorites from discovery"
        />
      </section>

      <section className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Next care steps
            </p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold">
              Upcoming appointments
            </h2>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-3 pr-4">Doctor</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Time</th>
                <th className="py-3 pr-4">Payment</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((item) => (
                <tr key={item._id} className="border-b border-border/70">
                  <td className="py-3 pr-4 font-semibold">{item.doctorName}</td>
                  <td className="py-3 pr-4">{formatDate(item.appointmentDate)}</td>
                  <td className="py-3 pr-4">{item.appointmentTime}</td>
                  <td className="py-3 pr-4">
                    <StatusPill status={item.paymentStatus} />
                  </td>
                  <td className="py-3 pr-4">
                    <StatusPill status={item.appointmentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
