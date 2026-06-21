"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoadingState from "@/components/shared/LoadingState";

export default function ProfileClient() {
  const { user, loading, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  if (loading || !user) return <LoadingState label="Loading profile" />;

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile(Object.fromEntries(new FormData(event.currentTarget)));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        My Profile
      </p>
      <h2 className="mt-2 font-heading text-3xl font-extrabold">
        Keep your healthcare identity current
      </h2>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        <Input name="name" label="Name" defaultValue={user.name || ""} required />
        <Input name="photo" label="Photo URL" defaultValue={user.photo || ""} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="phone" label="Phone" defaultValue={user.phone || ""} />
          <Input name="gender" label="Gender" defaultValue={user.gender || ""} />
        </div>
        <Input label="Email" defaultValue={user.email || ""} disabled />
        <Input label="Role" defaultValue={user.role || ""} disabled />
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Saving..." : "Update Profile"}
        </Button>
      </form>
    </section>
  );
}
