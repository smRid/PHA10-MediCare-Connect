"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavByRole } from "@/constants/nav-links";
import { cn } from "@/lib/utils";

export default function Sidebar({ user, open, onClose }) {
  const pathname = usePathname();
  const nav = getNavByRole(user.role);

  const aside = (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
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
