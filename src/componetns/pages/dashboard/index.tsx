import { useEffect, useState } from "react";
import data from "../../../data/dashboardData.json";
import Card from "../../common/card";
import styles from "./style.module.css";

interface User {
  id: number;
  name: string;
  email?: string;
  role: string;
}

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load dashboard static data
    setDashboard(data);

    // Load recent users from localStorage
    const stored = JSON.parse(localStorage.getItem("users") || "[]");

    // Sort by latest created (highest ID first)
    const sorted = stored.sort((a: User, b: User) => b.id - a.id);

    // Take only **latest 3**
    setRecentUsers(sorted.slice(0, 3));
  }, []);

  if (!dashboard) return <p>Loading...</p>;

  const { stats } = dashboard;

  const cardData = [
    { value: stats.users, label: "Total Users" },
    { value: stats.orders, label: "Total Orders" },
    { value: `₹${stats.revenue}`, label: "Total Revenue" },
    { value: stats.pending, label: "Pending Tasks" },
  ];

  return (
    <div className={styles.container}>
      <h2>Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className={styles.cardWrapper}>
        {cardData.map((item, index) => (
          <Card key={index} value={item.value} label={item.label} />
        ))}
      </div>

      {/* Recent Users */}
      <div className={styles.tableWrapper}>
        <h3>Recent Users</h3>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className={styles.noData}>
                  No recent users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
