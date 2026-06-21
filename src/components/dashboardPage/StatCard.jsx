import { cn } from "@/lib/utils";

export default function StatCard({ icon: Icon, label, value, helper, className }) {
  return (
    <article className={cn("rounded-lg border border-border bg-card p-5", className)}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 font-heading text-3xl font-extrabold">{value}</p>
        </div>
        {Icon && (
          <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-6" />
          </span>
        )}
      </div>
      {helper && <p className="mt-3 text-sm text-muted-foreground">{helper}</p>}
    </article>
  );
}
