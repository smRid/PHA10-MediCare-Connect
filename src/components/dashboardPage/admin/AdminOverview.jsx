"use client";

import { Activity, Users, ShieldCheck, Star } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export default function AdminOverview() {
  const metrics = [
    { label: "Total Patients", value: "...", icon: Users },
    { label: "Verified Doctors", value: "...", icon: ShieldCheck },
    { label: "Appointments", value: "...", icon: Activity },
    { label: "Total Reviews", value: "...", icon: Star },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Admin Dashboard"
        title="Platform Overview"
        description="Monitor healthcare ecosystem statistics and activity."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="font-heading text-2xl font-bold">{metric.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
