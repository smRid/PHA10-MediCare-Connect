import { cn } from "@/lib/utils";

const toneMap = {
  teal: "bg-primary/10 text-primary border-primary/20",
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  blue: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  amber: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  red: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  gray: "bg-muted/50 text-muted-foreground border-border",
};

const dotColorMap = {
  teal: "bg-primary",
  green: "bg-emerald-500",
  blue: "bg-sky-500",
  amber: "bg-yellow-500",
  red: "bg-red-500",
  gray: "bg-muted-foreground",
};

export default function Badge({ children, tone = "teal", dot = false, pulse = false, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border backdrop-blur-sm transition-colors",
        toneMap[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-2">
          {pulse && (
            <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", dotColorMap[tone])} />
          )}
          <span className={cn("relative inline-flex size-2 rounded-full", dotColorMap[tone])} />
        </span>
      )}
      {children}
    </span>
  );
}
