"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
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
        <div className="flex h-[350px] flex-col rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Top Doctors (Rating)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topDoctors || []} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" />
                <XAxis type="number" domain={[0, 5]} stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="doctorName" stroke="var(--muted-foreground)" fontSize={12} width={100} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--card)" }} />
                <Bar dataKey="averageRating" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex h-[350px] flex-col rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Appointments by Status</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.appointmentsByStatus || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="_id" stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(val) => val.charAt(0).toUpperCase() + val.slice(1)} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--card)" }} />
                <Area type="monotone" dataKey="count" stroke="#10b981" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex h-[350px] flex-col rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Payments by Status</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.paymentsByStatus || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="_id" stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(val) => val.charAt(0).toUpperCase() + val.slice(1)} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--card)" }} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
