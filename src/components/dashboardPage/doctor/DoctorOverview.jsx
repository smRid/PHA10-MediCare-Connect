"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, MessageSquareHeart, Users } from "lucide-react";
import { getAppointments } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import StatCard from "@/components/dashboardPage/StatCard";
import StatusPill from "@/components/shared/StatusPill";
import { formatDate } from "@/lib/utils";
import { getDoctorStats, getDoctorById } from "./doctor-utils";

export default function DoctorOverview() {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (!token) return;
    getAppointments(token, { doctorId: user?._id })
      .then(setAppointments)
      .catch(() => setAppointments([]));

    getDoctorById(user?._id)
      .then((data) => setDoctor(data || null))
      .catch(() => setDoctor(null));
  }, [token, user]);

  const todays = appointments.filter((item) => {
    const today = new Date().toISOString().slice(0, 10);
    return item.appointmentDate === today;
  });
  const uniquePatients = new Set(
    appointments.map((item) => item.patientId || item.patientName),
  );

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={Users}
          label="Total Patients"
          value={uniquePatients.size || appointments.length}
          helper="Patients in appointment records"
        />
        <StatCard
          icon={CalendarCheck}
          label="Today's Appointments"
          value={todays.length}
          helper="Appointments scheduled today"
        />
        <StatCard
          icon={MessageSquareHeart}
          label="Reviews Received"
          value={doctor.reviewCount || 0}
          helper={`Average rating ${doctor.ratingAverage || 0}`}
        />
      </section>

      <section className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
          Appointment queue
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold">
          Requests needing attention
        </h2>
        <div className="mt-5 grid gap-3">
          {appointments.slice(0, 5).map((item) => (
            <article
              key={item._id}
              className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{item.patientName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(item.appointmentDate)} at {item.appointmentTime}
                </p>
              </div>
              <div className="flex gap-2">
                <StatusPill status={item.appointmentStatus} />
                <StatusPill status={item.paymentStatus} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
