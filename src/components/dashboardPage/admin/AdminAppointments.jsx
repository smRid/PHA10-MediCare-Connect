"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
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
            <thead className="bg-muted/30 text-muted-foreground border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Patient</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Doctor</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Date</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Time</th>
                <th className="px-6 py-4 text-right font-bold uppercase tracking-wider text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {appointments.map((appt) => (
                <tr key={appt._id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <User className="size-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{appt.patientName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Stethoscope className="size-4" />
                      <span>{appt.doctorName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-3.5" />
                      {appt.appointmentDate}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="size-3.5 text-primary" />
                      {appt.appointmentTime}
                    </div>
                  </td>
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
