"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { mainNavLinks } from "@/constants/nav-links";
import { useAuth } from "@/lib/auth-context";
import { cn, initials } from "@/lib/utils";
import BrandMark from "@/components/shared/BrandMark";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const closeMenus = () => {
    setOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    closeMenus();
    logout();
  };

  const links = (
    <>
      {mainNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={closeMenus}
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
        onClick={closeMenus}
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
          {loading ? (
            <UserMenuSkeleton />
          ) : user ? (
            <UserMenu
              user={user}
              open={userMenuOpen}
              onToggle={() => setUserMenuOpen((value) => !value)}
              onClose={closeMenus}
              onLogout={handleLogout}
            />
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
          <div className="mt-3 flex items-start gap-3">
            <ThemeToggle />
            {loading ? (
              <UserMenuSkeleton />
            ) : user ? (
              <UserMenu
                user={user}
                open={userMenuOpen}
                onToggle={() => setUserMenuOpen((value) => !value)}
                onClose={closeMenus}
                onLogout={handleLogout}
                align="left"
              />
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="text-sm font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
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

function UserMenuSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-[184px] items-center gap-3 rounded-full bg-muted/80 px-3 pr-4"
    >
      <span className="size-10 shrink-0 animate-pulse rounded-full bg-muted-foreground/20" />
      <span className="h-4 flex-1 animate-pulse rounded-full bg-muted-foreground/20" />
      <span className="size-4 shrink-0 animate-pulse rounded-full bg-muted-foreground/20" />
    </div>
  );
}

function UserMenu({ user, open, onToggle, onClose, onLogout, align = "right" }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex h-12 max-w-[220px] items-center gap-3 rounded-full bg-muted/80 px-3 pr-4 text-sm font-semibold text-foreground transition hover:bg-muted"
      >
        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/10 text-sm font-bold text-primary">
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
        <span className="min-w-0 truncate">{user.name}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 transition", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-14 z-50 w-60 rounded-lg border border-border bg-card p-4 shadow-2xl shadow-black/15",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <div className="border-b border-border pb-3">
            <p className="truncate text-sm font-bold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>

          <div className="grid gap-1 pt-3">
            <Link
              href="/dashboard/profile"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <User className="size-4" />
              My profile
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-3 rounded-lg px-2 py-2 text-left text-sm font-medium text-destructive transition hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
