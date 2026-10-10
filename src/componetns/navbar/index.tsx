import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import styles from "./style.module.css";

export default function NavBar() {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  const handleLogoClick = () => {
    closeMenu();
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard"); // redirect only if NOT already on dashboard
    }
  };

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Get role from user info
  const role = user?.role || "";

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={handleLogoClick}>
        Admin Panel
      </div>

      {/* Hamburger (visible on mobile only) */}
      <button
        type="button"
        className={`${styles.toggle} ${menuOpen ? styles.toggleOpen : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="main-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <ul
        id="main-menu"
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
        onClick={(e) => {
          // close after tapping any link (even one that points to the current page)
          if ((e.target as HTMLElement).closest("a")) closeMenu();
        }}
      >
        {token ? (
          <>
            {/* Dashboard: Admin & Manager */}
            {["admin", "manager"].includes(role) && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}

            {/* Only Admin sees Users */}
            {role === "admin" && (
              <li>
                <Link to="/user">Users</Link>
              </li>
            )}

            {/* Orders: Admin, Manager, Customer */}
            {["admin", "manager", "customer"].includes(role) && (
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            )}

            <li>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}