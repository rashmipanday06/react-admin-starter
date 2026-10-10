import React, { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.role || !form.password) {
      setError("All fields are required!");
      return;
    }

    setError("");

    // 1️⃣ Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // 2️⃣ Create new user object
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: form.role,
      password: form.password,
    };

    // 3️⃣ Add new user to array
    const updatedUsers = [...existingUsers, newUser];

    // 4️⃣ Save to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 5️⃣ Reset form & success message
    setSuccess("User created successfully!");
    setForm({ name: "", email: "", role: "", password: "" });

    navigate("/user");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Create User</h2>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className={styles.success} role="status">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter full name"
            autoComplete="name"
          />

          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter email"
            autoComplete="email"
          />

          <label htmlFor="role" className={styles.label}>
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter password"
            autoComplete="new-password"
          />

          <button type="submit" className={styles.button}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;