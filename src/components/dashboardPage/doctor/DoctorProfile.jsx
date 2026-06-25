"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api/base";
import { normalizeDoctor } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import StatusPill from "@/components/shared/StatusPill";

export default function DoctorProfile() {
  const { token } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) return;
    apiFetch("/doctors/me", { token })
      .then((profile) => setDoctor(normalizeDoctor(profile)))
      .catch(() => {});
  }, [token]);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const form = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const updated = await apiFetch(`/doctors/${doctor._id}`, {
        method: "PATCH",
        token,
        body: {
          doctorName: form.doctorName,
          specialization: form.specialization,
          qualifications: form.qualifications,
          hospital: form.hospitalName,
          image: form.profileImage,
          bio: form.bio,
          experience: Number(form.experience),
          consultationFee: Number(form.consultationFee),
        },
      });
      setDoctor(normalizeDoctor(updated));
      toast.success("Doctor profile updated");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!doctor) return null;

  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Profile Management
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold">
            Update professional details
          </h2>
        </div>
        <StatusPill status={doctor.verificationStatus} />
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="doctorName"
            label="Doctor Name"
            defaultValue={doctor.doctorName}
            required
          />
          <Input
            name="specialization"
            label="Specialization"
            defaultValue={doctor.specialization}
            required
          />
          <Input
            name="qualifications"
            label="Qualifications"
            defaultValue={doctor.qualifications}
            required
          />
          <Input
            name="hospitalName"
            label="Hospital Name"
            defaultValue={doctor.hospitalName}
            required
          />
          <Input
            name="experience"
            label="Experience"
            type="number"
            defaultValue={doctor.experience}
            required
          />
          <Input
            name="consultationFee"
            label="Consultation Fee"
            type="number"
            defaultValue={doctor.consultationFee}
            required
          />
        </div>
        <Input
          name="profileImage"
          label="Profile Image"
          defaultValue={doctor.profileImage}
        />
        <Textarea name="bio" label="Bio" defaultValue={doctor.bio || ""} />
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Saving..." : "Save Doctor Profile"}
        </Button>
      </form>
    </section>
  );
}
