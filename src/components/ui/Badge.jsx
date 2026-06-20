import { cn } from "@/lib/utils";

const toneMap = {
  teal: "bg-primary/10 text-primary",
  green: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
  blue: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
  amber: "bg-yellow-500/14 text-yellow-700 dark:text-yellow-300",
  red: "bg-red-500/12 text-red-700 dark:text-red-300",
  gray: "bg-muted text-muted-foreground",
};

export default function Badge({ children, tone = "teal", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
