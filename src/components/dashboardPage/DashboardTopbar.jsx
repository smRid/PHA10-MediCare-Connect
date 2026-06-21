"use client";

import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { initials } from "@/lib/utils";

function titleFromPath(pathname) {
  const last = pathname.split("/").filter(Boolean).at(-1) || "dashboard";
  if (last === "patient" || last === "doctor" || last === "admin") {
    return "Dashboard Overview";
  }
  return last.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DashboardTopbar({ user, onMenu }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/88 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenu}
            className="rounded-lg border border-border p-2 text-muted-foreground lg:hidden"
            aria-label="Open dashboard menu"
          >
            <Menu className="size-5" />
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {user.role} workspace
            </p>
            <h1 className="font-heading text-xl font-extrabold">
              {titleFromPath(pathname)}
            </h1>
          </div>
        </div>

        <div className="hidden h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-input bg-background px-3 md:flex">
          <Search className="size-4 text-muted-foreground" />
          <input
            aria-label="Search dashboard"
            placeholder="Search dashboard..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="relative flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
          </button>
          <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-bold text-primary">
            {user.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              initials(user.name)
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
