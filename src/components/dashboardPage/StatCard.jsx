import { cn } from "@/lib/utils";
import { TrendingUp, Info } from "lucide-react";

export default function StatCard({ icon: Icon, label, value, helper, className }) {
  const isTrend = helper && !helper.toLowerCase().includes("average") && !helper.toLowerCase().includes("status");
  const HelperIcon = isTrend ? TrendingUp : Info;

  return (
    <article className={cn("group relative overflow-hidden rounded-3xl border border-border/50 glass-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30", className)}>
      {/* Decorative Background Glow */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{label}</p>
          <p className="mt-2 font-heading text-4xl font-extrabold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {value}
          </p>
        </div>
        {Icon && (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-sky-500/5 text-primary ring-1 ring-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
            <Icon className="size-6 transition-transform duration-300" />
          </span>
        )}
      </div>
      
      {helper && (
        <div className="relative z-10 mt-6 flex w-fit items-center gap-2 rounded-full bg-muted/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground border border-border/50 transition-colors duration-300 group-hover:bg-background group-hover:border-primary/20 group-hover:text-foreground">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <HelperIcon className="size-3" />
          </span>
          {helper}
        </div>
      )}
    </article>
  );
}
