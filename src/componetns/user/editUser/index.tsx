import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from './style.module.css'

type User = {
  id: number;
  name: string;
  email: string;
};

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: ""
  });

  useEffect(() => {
    const stored: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user by ID
    const found = stored.find((u) => u.id === Number(id));

    if (found) {
      setUser(found);
    }
  }, [id]);

  const handleUpdate = () => {
    const stored: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Replace old user with updated one
    const updated = stored.map((u) =>
      u.id === user.id ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updated));

    navigate("/user"); // back to list
  };

return (
  <div className={styles.container}>
    <h2 className={styles.heading}>Edit User</h2>

    <div className={styles.form}>
      <label className={styles.label}>Name</label>
      <input
        className={styles.input}
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />

      <label className={styles.label}>Email</label>
      <input
        className={styles.input}
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <button className={styles.button} onClick={handleUpdate}>
        Update User
      </button>
    </div>
  </div>
);

};

export default EditUser;
