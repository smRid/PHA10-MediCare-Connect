"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { BadgeCheck, LogIn } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import BrandMark from "@/components/shared/BrandMark";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin, completeGoogleLogin } = useAuth();
  const { data: googleSession, isPending: googlePending } = useSession();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("patient");
  const googleSyncRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleRole = params.get("googleRole");

    if (!googleRole || googlePending || googleSyncRef.current) return;

    if (!googleSession?.user) {
      toast.error("Google sign-in session was not found");
      return;
    }

    googleSyncRef.current = true;

    completeGoogleLogin({ role: googleRole, profile: googleSession.user })
      .then((payload) => {
        router.replace(`/dashboard/${payload.user.role}`);
      })
      .catch((error) => {
        googleSyncRef.current = false;
        toast.error(error.message);
      });
  }, [completeGoogleLogin, googlePending, googleSession, router]);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const payload = await login(form);
      router.push(`/dashboard/${payload.user.role}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin(role);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-2xl shadow-primary/10">
      <div className="mb-7 lg:hidden">
        <BrandMark />
      </div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        Login
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Access appointments, prescriptions, payments, and dashboard tools.
      </p>

      <form onSubmit={submit} className="mt-6 grid gap-4">
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="admin@medicare.test"
          required
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Admin#12345"
          required
        />
        <Button type="submit" size="lg" disabled={loading}>
          <LogIn className="size-4" />
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-3">
        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-primary"
        >
          <option value="patient">Google as patient</option>
          <option value="doctor">Google as doctor</option>
        </select>
        <Button
          variant="outline"
          size="lg"
          onClick={handleGoogle}
          disabled={loading}
        >
          <BadgeCheck className="size-4" />
          Continue with Google
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
