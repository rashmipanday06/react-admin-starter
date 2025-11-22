import  { useState } from "react";
import styles from "./style.module.css";

const Users = () => {
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "Amit Sharma", email: "amit@gmail.com", role: "Admin" },
    { id: 2, name: "Riya Patel", email: "riya@gmail.com", role: "User" },
    { id: 3, name: "John Khan", email: "john@gmail.com", role: "Moderator" }
  ];

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>

      {/* Top bar */}
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        <button className={styles.addButton}>+ Add User</button>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th >Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className={styles.actions}>
                <button className={styles.edit}>Edit</button>
                <button className={styles.delete}>Delete</button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.noData}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
