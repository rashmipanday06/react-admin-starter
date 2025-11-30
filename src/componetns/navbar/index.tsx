import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import styles from "./style.module.css";

export default function NavBar() {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard"); // redirect only if NOT already on dashboard
    }
  };

  // Get role from user info
  const role = user?.role || "";

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={handleLogoClick}>
        Admin Panel
      </div>

      <ul className={styles.menu}>
        {token ? (
          <>
            {/* Dashboard visible for all roles */}
            {["admin", "manager"].includes(role)&&<li>
              <Link to="/dashboard">Dashboard</Link>
            </li>}

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
