interface RevenueChartProps {
  data: { month: string; value: number }[];
}

const formatK = (n: number) => `₹${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;

/** Pure Tailwind bar chart: no chart library needed, scales to any width. */
const RevenueChart = ({ data }: RevenueChartProps) => {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div role="img" aria-label="Monthly revenue bar chart">
      <div className="flex h-56 items-end gap-1.5 sm:gap-3">
        {data.map((d) => {
          const height = Math.max((d.value / max) * 100, 4);
          return (
            <div
              key={d.month}
              className="group relative flex h-full flex-1 flex-col justify-end"
            >
              {/* tooltip */}
              <span className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                ₹{d.value.toLocaleString("en-IN")}
              </span>
              <div
                className="w-full rounded-t-md bg-blue-500/80 transition-colors group-hover:bg-blue-600"
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* x-axis labels: every month on sm+, every other month on phones */}
      <div className="mt-2 flex gap-1.5 sm:gap-3">
        {data.map((d, i) => (
          <span
            key={d.month}
            className={`flex-1 text-center text-[11px] text-slate-500 sm:text-xs ${
              i % 2 === 1 ? "invisible sm:visible" : ""
            }`}
          >
            {d.month}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-400">Peak month: {formatK(max)}</p>
    </div>
  );
};

export default RevenueChart;