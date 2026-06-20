"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { mainNavLinks } from "@/constants/nav-links";
import { useAuth } from "@/lib/auth-context";
import { cn, initials } from "@/lib/utils";
import Button from "@/components/ui/Button";
import BrandMark from "@/components/shared/BrandMark";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const links = (
    <>
      {mainNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-semibold transition",
            pathname === link.href
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href={user ? `/dashboard/${user.role}` : "/login"}
        onClick={() => setOpen(false)}
        className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        Dashboard
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="MediCare Connect home">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push(`/dashboard/${user.role}`)}
                className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/10 text-sm font-bold text-primary"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials(user.name)
                )}
              </button>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg p-2 text-muted-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-card transition-all md:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="grid gap-1 px-4 py-4">
          {links}
          <div className="mt-3 flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
