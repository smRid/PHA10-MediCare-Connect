"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { getNavByRole } from "@/constants/nav-links";
import { cn } from "@/lib/utils";

export default function Sidebar({ user, open, onClose }) {
  const pathname = usePathname();
  const nav = getNavByRole(user.role);

  const aside = (
    <aside className="flex h-full w-64 flex-col border-r border-border/50 bg-card/60 backdrop-blur-xl shadow-xl shadow-primary/5">
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="grid gap-1.5 relative">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href} className="relative">
                {active && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <Link
                  href={href}
                  onClick={onClose}
                  className={cn(
                    "relative z-10 flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition-all duration-300",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:translate-x-1",
                  )}
                >
                  <Icon className={cn("size-4 transition-transform duration-300", active && "scale-110")} />
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
      <div className="fixed bottom-0 left-0 top-16 z-40 hidden lg:block">
        {aside}
      </div>
      
      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      >
        <div
          className={cn(
            "h-full w-64 transition-transform duration-300 ease-out",
            open ? "translate-x-0 shadow-2xl shadow-primary/20" : "-translate-x-full",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {aside}
        </div>
      </div>
    </>
  );
}
