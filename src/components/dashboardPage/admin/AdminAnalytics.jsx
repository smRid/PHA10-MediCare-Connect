"use client";

import { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import SectionHeading from "@/components/shared/SectionHeading";
import LoadingState from "@/components/shared/LoadingState";

export default function AdminAnalytics() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    getAnalytics(token)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState label="Loading analytics data" />;
  if (!data) return <div className="p-8 text-center text-muted-foreground">Failed to load analytics.</div>;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Platform Data"
        title="Analytics Dashboard"
        description="Comprehensive metrics and trends across the healthcare platform."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Charts will be injected here in subsequent commits */}
        <div className="flex h-[350px] items-center justify-center rounded-lg border border-border bg-card p-4 text-muted-foreground">
          User Role Distribution Chart Placeholder
        </div>
        <div className="flex h-[350px] items-center justify-center rounded-lg border border-border bg-card p-4 text-muted-foreground">
          Doctor Performance Chart Placeholder
        </div>
        <div className="flex h-[350px] items-center justify-center rounded-lg border border-border bg-card p-4 text-muted-foreground">
          Appointments Flow Chart Placeholder
        </div>
        <div className="flex h-[350px] items-center justify-center rounded-lg border border-border bg-card p-4 text-muted-foreground">
          Payments Summary Chart Placeholder
        </div>
      </div>
    </div>
  );
}
