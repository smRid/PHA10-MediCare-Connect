"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle, XCircle } from "lucide-react";
import { getDoctors, updateDoctorVerification } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusPill from "@/components/shared/StatusPill";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/shared/LoadingState";

export default function ManageDoctors() {
  const { token } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors({ includeUnverified: "true", perPage: 50 })
      .then((payload) => setDoctors(payload.doctors || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateStatus = async (doctorId, status) => {
    if (!token) return;
    try {
      await updateDoctorVerification(doctorId, status, token);
      setDoctors((current) =>
        current.map((doc) =>
          doc._id === doctorId ? { ...doc, verificationStatus: status } : doc,
        ),
      );
      toast.success(`Doctor marked as ${status}`);
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

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
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {doctor.profileImage ? (
                        <img src={doctor.profileImage} alt={doctor.doctorName} className="size-8 rounded-full object-cover" />
                      ) : (
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {doctor.doctorName?.charAt(0) || "D"}
                        </div>
                      )}
                      <span className="font-semibold">{doctor.doctorName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{doctor.specialization}</td>
                  <td className="px-4 py-3">{doctor.experience} years</td>
                  <td className="px-4 py-3">
                    <StatusPill status={doctor.verificationStatus || "verified"} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {doctor.verificationStatus !== "verified" && (
                        <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleUpdateStatus(doctor._id, "verified")} title="Verify Doctor">
                          <CheckCircle className="size-4" />
                        </Button>
                      )}
                      {doctor.verificationStatus !== "rejected" && (
                        <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => handleUpdateStatus(doctor._id, "rejected")} title="Reject Verification">
                          <XCircle className="size-4" />
                        </Button>
                      )}
                    </div>
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
