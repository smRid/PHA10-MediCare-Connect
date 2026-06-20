import Link from "next/link";
import { Activity, ArrowLeft, HeartPulse } from "lucide-react";

export default function NotFound() {
  return (
    <main className="medical-grid flex min-h-screen items-center justify-center px-4 py-16">
      <section className="glass max-w-2xl rounded-lg border border-border p-8 text-center shadow-2xl shadow-primary/10">
        <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-primary/10 text-primary">
          <HeartPulse className="size-12" />
        </div>
        <div className="mx-auto mb-5 flex max-w-sm items-center justify-center gap-3 rounded-lg border border-border bg-card p-4">
          <Activity className="size-5 text-primary" />
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold">
          This route needs a second opinion.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          The page you requested is not available. Return home and continue from
          a healthy route.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          Back Home
        </Link>
      </section>
    </main>
  );
}
