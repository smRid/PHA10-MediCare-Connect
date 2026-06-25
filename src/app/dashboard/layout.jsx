"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/homepage/Navbar";
import Sidebar from "@/components/dashboardPage/Sidebar";
import DashboardTopbar from "@/components/dashboardPage/DashboardTopbar";
import LoadingState from "@/components/shared/LoadingState";
import { useAuth } from "@/lib/auth-context";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    const roleSegment = pathname.split("/")[2];
    if (
      ["patient", "doctor", "admin"].includes(roleSegment) &&
      roleSegment !== user.role
    ) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, [loading, pathname, router, user]);

  if (loading || !user) {
    return <LoadingState label="Opening protected dashboard" fullScreen />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <Sidebar
          user={user}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="min-h-screen lg:pl-64">
          <DashboardTopbar user={user} onMenu={() => setSidebarOpen(true)} />
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </>
  );
}
