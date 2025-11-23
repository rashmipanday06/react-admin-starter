import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import styles from "./style.module.css";

export default function NavBar() {
  const { token, logout } = useAuth();
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

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={handleLogoClick}>Admin Panel</div>

      <ul className={styles.menu}>
        {token ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/user">Users</Link></li>
            <li><Link to="/orders">Orders</Link></li>

            <li>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}
