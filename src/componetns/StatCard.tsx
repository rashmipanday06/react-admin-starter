import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  /** Percentage change vs last month. Positive = up, negative = down. */
  change?: number;
  /** Tailwind classes for the icon tile, e.g. "bg-blue-50 text-blue-600" */
  tone?: string;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  change,
  tone = "bg-blue-50 text-blue-600",
}: StatCardProps) => {
  const isUp = (change ?? 0) >= 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 truncate text-2xl font-bold text-slate-900 sm:text-[28px]">
            {value}
          </p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tone}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      {change !== undefined && (
        <p
          className={`mt-4 flex items-center gap-1 text-sm font-medium ${
            isUp ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {isUp ? (
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <TrendingDown className="h-4 w-4" aria-hidden="true" />
          )}
          {Math.abs(change)}%
          <span className="font-normal text-slate-500">vs last month</span>
        </p>
      )}
    </div>
  );
};

export default StatCard;