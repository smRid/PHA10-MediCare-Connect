"use client";

import { Bell, ChevronRight, Menu, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

function titleFromPath(pathname) {
  const last = pathname.split("/").filter(Boolean).at(-1) || "dashboard";
  if (last === "patient" || last === "doctor" || last === "admin") {
    return "Overview";
  }
  return last.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DashboardTopbar({ user, onMenu }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-16 z-30 border-b border-border/50 bg-card/60 backdrop-blur-xl shadow-sm">
      <div className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenu}
            className="flex size-9 items-center justify-center rounded-lg border border-border/50 bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Open dashboard menu"
          >
            <Menu className="size-5" />
          </button>
          <div>
            <nav className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">{user.role}</span>
              <ChevronRight className="size-3 text-border" />
              <span>Workspace</span>
            </nav>
            <h1 className="font-heading text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              {titleFromPath(pathname)}
            </h1>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 lg:gap-5">
          <div className="hidden h-10 w-full max-w-xs items-center gap-2 rounded-full border border-border/50 bg-muted/40 px-4 transition-all duration-300 focus-within:border-primary/50 focus-within:bg-background focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-sm md:flex">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              aria-label="Search dashboard"
              placeholder="Search..."
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
            />
            <kbd className="hidden rounded bg-background px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground border border-border/50 shadow-sm lg:block">
              ⌘K
            </kbd>
          </div>
          
          <div className="flex items-center gap-3 border-l border-border/50 pl-3 sm:pl-4">
            <button aria-label="Notifications" className="group relative flex size-10 items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground transition-all duration-300 hover:border-border hover:bg-muted hover:text-foreground hover:shadow-md">
              <Bell className="size-4 transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-red-500 ring-2 ring-card animate-pulse" />
            </button>
            <button aria-label="User profile menu" className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/10 ring-2 ring-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 hover:ring-primary/20">
              {user.photo ? (
                <img src={user.photo} alt={user.name || "User avatar"} className="h-full w-full object-cover" />
              ) : (
                <User className="size-4 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
