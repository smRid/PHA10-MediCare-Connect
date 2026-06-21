"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/shared/LoadingState";
import { useAuth } from "@/lib/auth-context";

export default function DashboardIndex() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) router.replace(`/dashboard/${user.role}`);
  }, [loading, router, user]);

  return <LoadingState label="Routing to your dashboard" />;
}
