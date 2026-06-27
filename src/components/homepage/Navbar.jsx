"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            "relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
            pathname === link.href
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
              : "text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105",
          )}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href={user ? `/dashboard/${user.role}` : "/login"}
        onClick={closeMenus}
        className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground hover:scale-105"
      >
        Dashboard
      </Link>
    </>
  );

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "glass-nav shadow-sm" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="MediCare Connect home" className="transition-transform hover:scale-105">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
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
                className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity md:hidden animate-fade-in"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
          <BrandMark />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-3">
            {links}
          </nav>
        </div>
        
        <div className="border-t border-border bg-muted/20 p-4">
          <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm">
            <span className="text-sm font-semibold">Theme Preference</span>
            <ThemeToggle />
          </div>
          
          {loading ? (
            <UserMenuSkeleton />
          ) : user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/10 text-sm font-bold text-primary">
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    initials(user.name)
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="flex h-10 items-center justify-center gap-2 rounded-lg bg-card border border-border text-sm font-semibold transition hover:bg-muted"
                >
                  <User className="size-4" /> Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-10 items-center justify-center gap-2 rounded-lg bg-destructive/10 text-sm font-semibold text-destructive transition hover:bg-destructive/20"
                >
                  <LogOut className="size-4" /> Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/login"
                onClick={closeMenus}
                className="flex h-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
              >
                Sign In
              </Link>
            </div>
          )}
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
  const firstName = user.name?.trim().split(/\s+/)[0] || "Profile";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "flex h-12 max-w-[220px] items-center gap-3 rounded-full bg-muted/40 px-2 pr-4 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted/80",
          open && "bg-muted/80 ring-2 ring-primary/20"
        )}
      >
        <span className={cn(
          "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-primary/10 text-sm font-bold text-primary transition-colors duration-300",
          open ? "border-primary" : "border-transparent"
        )}>
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
        <span className="min-w-0 truncate">{firstName}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 transition-transform duration-300", open && "rotate-180 text-primary")}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-14 z-50 w-64 rounded-2xl border border-border bg-card/95 p-2 shadow-xl shadow-primary/5 backdrop-blur-xl animate-scale-in",
            align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left",
          )}
        >
          <div className="border-b border-border/50 px-3 py-3 mb-2">
            <p className="truncate text-sm font-bold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>

          <div className="grid gap-1">
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary"
            >
              <User className="size-4" />
              My profile
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-destructive transition-all duration-200 hover:bg-destructive/10 hover:pl-4"
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
