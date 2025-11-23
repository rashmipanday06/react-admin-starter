import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Users = () => {
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  // Default hardcoded users
  const defaultUsers = [
    { id: 1, name: "Amit Sharma", email: "amit@gmail.com", role: "Admin" },
    { id: 2, name: "Riya Patel", email: "riya@gmail.com", role: "User" },
    { id: 3, name: "John Khan", email: "john@gmail.com", role: "Moderator" },
  ];

  // Load both default + new localStorage users
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users") || "[]");

    // Show newest created users FIRST
    const sortedStored = stored.sort((a:User, b:User) => b.id - a.id);

    // Combine: new users on top + default users
    setAllUsers([...sortedStored, ...defaultUsers]);
  }, []);

  // Search filter
  const filtered = allUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    navigate("/create-user");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        <button className={styles.addButton} onClick={handleAddUser}>
          + Add User
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
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
