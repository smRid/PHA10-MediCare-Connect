import { cn } from "@/lib/utils";

export default function Card({ className, glass = false, elevated = false, children, ...props }) {
  return (
    <section
      className={cn(
        "rounded-2xl border text-card-foreground transition-all duration-200",
        glass 
          ? "glass-card" 
          : elevated 
            ? "health-card-elevated" 
            : "bg-card border-border shadow-sm shadow-primary/5 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-xl font-semibold leading-none tracking-tight text-foreground", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
