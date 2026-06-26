"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
      <div className="relative min-h-screen bg-muted/20 overflow-hidden">
        {/* Full-bleed ambient background for dashboard */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sky-500/5 pointer-events-none" />
        
        <Sidebar
          user={user}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="relative z-10 min-h-screen lg:pl-64 flex flex-col">
          <DashboardTopbar user={user} onMenu={() => setSidebarOpen(true)} />
          
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 px-4 py-8 sm:px-6 lg:px-8"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
