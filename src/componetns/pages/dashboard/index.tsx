import type { ReactNode } from "react";
import { CircleDollarSign, Clock, ShoppingCart, Users } from "lucide-react";
import StatCard from "../../StatCard";
import RevenueChart from "../../RevenueChart";
import {
  monthlyRevenue,
  ordersByStatus,
  recentActivities,
  recentOrders,
  stats,
  type OrderStatus,
} from "../../../data/mockData";

const statusStyles: Record<OrderStatus, { badge: string; bar: string }> = {
  completed: { badge: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500" },
  processing: { badge: "bg-blue-50 text-blue-700", bar: "bg-blue-500" },
  pending: { badge: "bg-amber-50 text-amber-700", bar: "bg-amber-500" },
  cancelled: { badge: "bg-red-50 text-red-700", bar: "bg-red-500" },
};

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Panel = ({ title, children, className = "" }: PanelProps) => (
  <section
    className={`min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
  >
    <h3 className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">{title}</h3>
    {children}
  </section>
);

const Dashboard = () => {
  const totalOrders = ordersByStatus.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Admin Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Users"
          value={stats.users.toLocaleString("en-IN")}
          icon={Users}
          change={8.2}
          tone="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Total Orders"
          value={stats.orders.toLocaleString("en-IN")}
          icon={ShoppingCart}
          change={4.6}
          tone="bg-violet-50 text-violet-600"
        />
        <StatCard
          label="Total Revenue"
          value={inr(stats.revenue)}
          icon={CircleDollarSign}
          change={12.4}
          tone="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Pending Tasks"
          value={stats.pending}
          icon={Clock}
          change={-3.1}
          tone="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Revenue chart + order status */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3">
        <Panel title="Revenue overview" className="xl:col-span-2">
          <RevenueChart data={monthlyRevenue} />
        </Panel>

        <Panel title="Orders by status">
          <ul className="space-y-4">
            {ordersByStatus.map(({ status, count }) => {
              const pct = Math.round((count / totalOrders) * 100);
              return (
                <li key={status}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="capitalize text-slate-700">{status}</span>
                    <span className="text-slate-500">
                      {count} <span className="text-slate-400">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${statusStyles[status].bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      {/* Recent orders + activity */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3">
        <Panel title="Recent orders" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Order</th>
                  <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Customer</th>
                  <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Date</th>
                  <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Amount</th>
                  <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.length > 0 ? (
                  recentOrders.map((o) => (
                    <tr key={o.id} className="transition-colors hover:bg-slate-50">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-900">{o.id}</td>
                      <td className="px-3 py-3 text-slate-700">{o.customer}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-500">{o.date}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-900">{inr(o.amount)}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[o.status].badge}`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-slate-500">
                      No orders yet. New orders will show up here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Recent activity">
          <ul className="divide-y divide-slate-100">
            {recentActivities.map((a) => (
              <li key={a.id} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0">
                <p className="break-words text-sm text-slate-700">{a.text}</p>
                <span className="text-xs text-slate-400">{a.time}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default Dashboard;