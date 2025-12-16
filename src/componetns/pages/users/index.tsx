import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../common/modal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Users = () => {
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users") || "[]");
    const sorted = stored.sort((a: User, b: User) => b.id - a.id);
    setAllUsers(sorted);
  }, []);

  const filtered = allUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filtered.slice(startIndex, startIndex + usersPerPage);

  const handleAddUser = () => navigate("/create-user");
  const    handleUserEdit = (id: number) => navigate(`/edit-user/${id}`);
  const handleDeleteClick = (id: number) => setDeleteId(id);

  const confirmDelete = () => {
    if (deleteId === null) return;
    const stored = JSON.parse(localStorage.getItem("users") || "[]");
    const updated = stored.filter((u: User) => u.id !== deleteId);

    localStorage.setItem("users", JSON.stringify(updated));
    setAllUsers(updated);
    setDeleteId(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
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
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => handleUserEdit(user.id)}>
                  Edit
                </button>

                <button className={styles.delete} onClick={() => handleDeleteClick(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {currentUsers.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.noData}>No users found</td>
            </tr>
          )}
        </tbody>
        
      </table>

      {/* Use Common Pagination Component */}
 

      {deleteId !== null && (
        <ConfirmModal
          title="Delete User"
          message="Are you sure you want to delete this user?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default Users;
