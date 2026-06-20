import { cn } from "@/lib/utils";

export default function Card({ className, children }) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-sm shadow-primary/5",
        className,
      )}
    >
      {children}
    </section>
  );
}
