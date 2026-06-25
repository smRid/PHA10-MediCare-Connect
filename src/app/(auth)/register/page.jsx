"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import BrandMark from "@/components/shared/BrandMark";

const passwordRule = /^(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{6,}$/;

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));

    if (!passwordRule.test(form.password)) {
      toast.error(
        "Password needs 6 characters, one number, and one special character",
      );
      return;
    }

    setLoading(true);
    try {
      const payload = await register({ ...form, role });
      router.push(`/dashboard/${payload.user.role}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-lg border border-border bg-card p-6 shadow-2xl shadow-primary/10">
      <div className="mb-7 lg:hidden">
        <BrandMark />
      </div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        Register
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold">
        Start your care workspace
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Doctors join unverified first. Admins can approve them from the dashboard.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-1">
        {["patient", "doctor"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRole(item)}
            className={`rounded-md px-3 py-2 text-sm font-semibold capitalize transition-all ${
              role === item
                ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="name" label="Name" placeholder="Your full name" required />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <Input name="photo" label="Photo URL" placeholder="https://..." />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="••••••••"
          required
        />

        {role === "doctor" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="specialization"
              label="Specialization"
              placeholder="Cardiology"
            />
            <Input
              name="hospitalName"
              label="Hospital"
              placeholder="City Care Hospital"
            />
            <Input
              name="qualifications"
              label="Qualifications"
              placeholder="MBBS, MD"
            />
            <Input
              name="consultationFee"
              label="Consultation Fee"
              type="number"
              placeholder="80"
            />
          </div>
        )}

        <Button type="submit" size="lg" disabled={loading}>
          <UserPlus className="size-4" />
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
