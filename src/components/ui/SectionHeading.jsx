import { cn } from "@/lib/utils";

export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 animate-fade-up",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
      {...props}
    >
      {badge && (
        <div className="inline-flex animate-fade-down items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
          {badge}
        </div>
      )}
      <h2 className="text-section-title font-bold tracking-tight text-foreground">
        <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description && (
        <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-lg sm:leading-7 animate-slide-up anim-delay-200">
          {description}
        </p>
      )}
    </div>
  );
}
