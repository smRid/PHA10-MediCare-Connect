"use client";

import { useEffect, useState } from "react";
import { getDoctors } from "@/lib/api/healthcare";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusPill from "@/components/shared/StatusPill";
import LoadingState from "@/components/shared/LoadingState";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors({ includeUnverified: "true", perPage: 50 })
      .then((payload) => setDoctors(payload.doctors || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState label="Loading doctors" />;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Manage Doctors"
        title="Doctor Verification"
        description="Verify new doctor registrations and manage existing profiles."
      />
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Specialization</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold">{doctor.doctorName}</td>
                  <td className="px-4 py-3">{doctor.specialization}</td>
                  <td className="px-4 py-3">{doctor.experience} years</td>
                  <td className="px-4 py-3">
                    <StatusPill status={doctor.verificationStatus || "verified"} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {/* Action buttons implemented in next commit */}
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No doctors found.
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
