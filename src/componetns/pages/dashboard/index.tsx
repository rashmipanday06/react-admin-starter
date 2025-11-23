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

interface Activity {
  id: number;
  activity: string;
  time: string;
}

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Load dashboard static data
    setDashboard(data);

    // Load recent users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const sortedUsers = storedUsers.sort((a: User, b: User) => b.id - a.id);
    setRecentUsers(sortedUsers.slice(0, 3));

    // Load recent activities or set default
    const storedActivity = JSON.parse(localStorage.getItem("activities") || "[]");
    const defaultActivities: Activity[] = [
      { id: 1, activity: "Admin logged in", time: "2 min ago" },
      { id: 2, activity: "User Amit created a new account", time: "10 min ago" },
      { id: 3, activity: "Order #1023 marked completed", time: "1 hour ago" },
    ];
    setRecentActivities(storedActivity.length > 0 ? storedActivity : defaultActivities);
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

      {/* Side-by-side Recent Users & Activities */}
      <div className={styles.row}>

        {/* Recent Activities */}
        <div className={styles.activityCard}>
          <h3>Recent Activities</h3>
          <div className={styles.activityList}>
            {recentActivities.map((act) => (
              <div key={act.id} className={styles.activityItem}>
                <p className={styles.activityText}>{act.activity}</p>
                <span className={styles.activityTime}>{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users Table */}
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
    </div>
  );
};

export default Dashboard;
