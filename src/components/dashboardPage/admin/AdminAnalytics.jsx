"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAnalytics } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import SectionHeading from "@/components/shared/SectionHeading";
import LoadingState from "@/components/shared/LoadingState";

const COLORS = ["#0ea5e9", "#10b981", "#6366f1", "#f59e0b"];

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
        <div className="flex h-[350px] flex-col rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">User Distribution</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.usersByRole || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="_id"
                >
                  {(data.usersByRole || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Legend formatter={(value) => <span className="capitalize text-muted-foreground">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
