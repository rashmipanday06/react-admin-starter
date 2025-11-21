import { useEffect, useState } from "react";
import data from "../../../data/dashboardData.json";
import Card from '../../common/card'
import styles from './style.module.css'

const Dashboard = () => {
  const[dashboard, setDashboard]=useState<any>(null)
  useEffect(()=>{
    setDashboard(data)
  },[])

  if (!dashboard) return <p>Loading...</p>;
  const{stats, recentUsers}=dashboard;

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
            {recentUsers.map((user:any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard