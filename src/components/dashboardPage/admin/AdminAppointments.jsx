"use client";

import { useEffect, useState } from "react";
import { getAppointments } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusPill from "@/components/shared/StatusPill";
import LoadingState from "@/components/shared/LoadingState";

export default function AdminAppointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    getAppointments(token)
      .then(setAppointments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState label="Loading all appointments" />;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="System Monitoring"
        title="All Appointments"
        description="Monitor platform-wide appointment statuses and schedules."
      />
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold">{appt.patientName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{appt.doctorName}</td>
                  <td className="px-4 py-3">{appt.appointmentDate}</td>
                  <td className="px-4 py-3">{appt.appointmentTime}</td>
                  <td className="px-4 py-3 text-right">
                    <StatusPill status={appt.appointmentStatus} />
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No appointments found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
