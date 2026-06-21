import Link from "next/link";
import BrandMark from "@/components/shared/BrandMark";

export default function AuthLayout({ children }) {
  return (
    <main className="medical-grid grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
      <section className="hidden border-r border-border bg-card/70 p-10 lg:flex lg:flex-col lg:justify-between">
        <Link href="/" aria-label="MediCare Connect home">
          <BrandMark />
        </Link>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Secure access
          </p>
          <h1 className="mt-4 max-w-xl font-heading text-5xl font-extrabold leading-tight">
            Healthcare workflows that remember who you are.
          </h1>
          <p className="mt-5 max-w-lg text-muted-foreground">
            JWT sessions keep patients, doctors, and admins in the right
            dashboard after reloads while protected APIs verify each request.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background/80 p-4 text-sm text-muted-foreground">
          Demo admin:{" "}
          <span className="font-semibold text-foreground">
            admin@medicare.test
          </span>
          <br />
          Password:{" "}
          <span className="font-semibold text-foreground">Admin#12345</span>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-12">
        {children}
      </section>
    </main>
  );
}
