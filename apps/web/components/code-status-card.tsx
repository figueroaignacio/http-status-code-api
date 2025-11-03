import { cn } from "@/lib/utils";

interface CodeStatusCardProps {
  name: string;
  code: number;
  description: string;
  color: "info" | "success" | "warning" | "error";
}

export function CodeStatusCard({
  name,
  code,
  description,
  color,
}: CodeStatusCardProps) {
  const colorClasses = colorVariants[color];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card h-full p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        colorClasses.bg
      )}>
      <div
        className={cn("absolute inset-x-0 top-0 h-1", colorClasses.accent)}
      />
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div className={cn("text-4xl font-black", colorClasses.text)}>
          {code}
        </div>
        <div
          className={cn(
            "text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
            colorClasses.badge
          )}>
          {colorClasses.label}
        </div>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

const colorVariants = {
  info: {
    bg: "hover:bg-blue-50/50 dark:hover:bg-blue-950/20",
    accent: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    label: "Info",
  },
  success: {
    bg: "hover:bg-green-50/50 dark:hover:bg-green-950/20",
    accent: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
    badge:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    label: "Success",
  },
  warning: {
    bg: "hover:bg-amber-50/50 dark:hover:bg-amber-950/20",
    accent: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    label: "Warning",
  },
  error: {
    bg: "hover:bg-red-50/50 dark:hover:bg-red-950/20",
    accent: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    label: "Error",
  },
};
