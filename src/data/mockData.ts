export type OrderStatus = "completed" | "pending" | "processing" | "cancelled";

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

export interface ActivityItem {
  id: number;
  text: string;
  time: string;
}

export const stats = {
  users: 1284,
  orders: 856,
  revenue: 482500,
  pending: 23,
};

export const monthlyRevenue = [
  { month: "Jan", value: 28000 },
  { month: "Feb", value: 32500 },
  { month: "Mar", value: 30000 },
  { month: "Apr", value: 41000 },
  { month: "May", value: 38500 },
  { month: "Jun", value: 46000 },
  { month: "Jul", value: 44500 },
  { month: "Aug", value: 52000 },
  { month: "Sep", value: 49000 },
  { month: "Oct", value: 58500 },
  { month: "Nov", value: 61000 },
  { month: "Dec", value: 67500 },
];

export const ordersByStatus: { status: OrderStatus; count: number }[] = [
  { status: "completed", count: 512 },
  { status: "processing", count: 164 },
  { status: "pending", count: 118 },
  { status: "cancelled", count: 62 },
];

export const recentOrders: Order[] = [
  { id: "#1027", customer: "Riya Sharma", amount: 4200, status: "completed", date: "11 Oct 2026" },
  { id: "#1026", customer: "Amit Verma", amount: 1850, status: "processing", date: "11 Oct 2026" },
  { id: "#1025", customer: "Neha Singh", amount: 7300, status: "pending", date: "10 Oct 2026" },
  { id: "#1024", customer: "Karan Mehta", amount: 960, status: "cancelled", date: "10 Oct 2026" },
  { id: "#1023", customer: "Pooja Rathore", amount: 5100, status: "completed", date: "09 Oct 2026" },
];

export const recentActivities: ActivityItem[] = [
  { id: 1, text: "Admin logged in", time: "2 min ago" },
  { id: 2, text: "User Amit created a new account", time: "10 min ago" },
  { id: 3, text: "Order #1023 marked completed", time: "1 hour ago" },
  { id: 4, text: "Manager updated pricing for 3 products", time: "3 hours ago" },
  { id: 5, text: "Order #1024 was cancelled by the customer", time: "Yesterday" },
];