"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle, Search, XCircle } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <SectionHeading
        align="left"
        eyebrow="Manage Doctors"
        title="Doctor Verification"
        description="Verify new doctor registrations and manage existing profiles across the platform."
      />
      
      <div className="overflow-hidden rounded-3xl border border-border/50 glass-card shadow-sm transition-all hover:shadow-lg">
        <div className="flex flex-col gap-4 border-b border-border/50 bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-heading text-lg font-bold">Verification Queue</h3>
          <div className="flex h-10 w-full max-w-sm items-center gap-2 rounded-full border border-border/50 bg-background px-4 transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted/30 text-muted-foreground border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Doctor</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Specialization</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Experience</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-4 text-right font-bold uppercase tracking-wider text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor._id} className="group transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {doctor.profileImage ? (
                        <img src={doctor.profileImage} alt={doctor.doctorName} className="size-10 rounded-full object-cover ring-2 ring-transparent transition-all group-hover:ring-primary/20" />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-2 ring-transparent transition-all group-hover:ring-primary/20">
                          {doctor.doctorName?.charAt(0) || "D"}
                        </div>
                      )}
                      <span className="font-bold text-foreground transition-colors group-hover:text-primary">{doctor.doctorName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-muted-foreground">{doctor.specialization}</td>
                  <td className="px-6 py-4 font-medium text-muted-foreground">{doctor.experience} years</td>
                  <td className="px-6 py-4">
                    <StatusPill status={doctor.verificationStatus || "verified"} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {doctor.verificationStatus !== "verified" && (
                        <button 
                          onClick={() => handleUpdateStatus(doctor._id, "verified")} 
                          title="Verify Doctor"
                          className="flex size-9 items-center justify-center rounded-full bg-green-500/10 text-green-600 transition-all hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/20 hover:scale-105"
                        >
                          <CheckCircle className="size-4" />
                        </button>
                      )}
                      {doctor.verificationStatus !== "rejected" && (
                        <button 
                          onClick={() => handleUpdateStatus(doctor._id, "rejected")} 
                          title="Reject Verification"
                          className="flex size-9 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition-all hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 hover:scale-105"
                        >
                          <XCircle className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="inline-flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 p-8">
                      <Search className="size-8 text-muted-foreground/50 mb-3" />
                      <p className="text-sm font-medium text-muted-foreground">No doctors found matching your criteria.</p>
                    </div>
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
