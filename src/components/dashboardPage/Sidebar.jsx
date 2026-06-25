"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { getNavByRole } from "@/constants/nav-links";
import { useAuth } from "@/lib/auth-context";
import { cn, initials } from "@/lib/utils";
import BrandMark from "@/components/shared/BrandMark";
import StatusPill from "@/components/shared/StatusPill";

export default function Sidebar({ user, open, onClose }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const nav = getNavByRole(user.role);

  const aside = (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <Link href="/" onClick={onClose} aria-label="MediCare Connect home">
          <BrandMark compact />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-muted-foreground lg:hidden"
          aria-label="Close dashboard menu"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary">
            {user.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              initials(user.name)
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="mt-3">
          <StatusPill status={user.status || "active"} />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="grid gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition",
                    active
                      ? "bg-primary/10 text-primary shadow-[inset_3px_0_0_var(--primary)]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={logout}
          className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="fixed bottom-0 left-0 top-16 z-40 hidden lg:block">{aside}</div>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-50 bg-black/40 backdrop-blur-sm transition lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      >
        <div
          className={cn(
            "h-full transition-transform",
            open ? "translate-x-0" : "-translate-x-full",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {aside}
        </div>
      </div>
    </>
  );
}
