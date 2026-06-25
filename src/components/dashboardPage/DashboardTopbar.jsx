"use client";

import { Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";

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
    <header className="sticky top-16 z-30 border-b border-border bg-card/88 backdrop-blur-xl">
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
      </div>
    </header>
  );
}
