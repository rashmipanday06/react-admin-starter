import {
  createContext,
  useContext,
  type FC,
  type ReactElement,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../redux/slices/authSlice";

interface User {
  name: string;
  email: string;
  role: "admin" | "manager" | "customer";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}): ReactElement => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: any) => state.auth);

  // Mock users stored in localStorage
  const usersKey = "users_db";

  if (!localStorage.getItem(usersKey)) {
    const initialUsers: User[] & { password: string }[] = [
      { name: "Admin", email: "admin@demo.com", password: "12345", role: "admin" },
      { name: "Manager", email: "manager@demo.com", password: "12345", role: "manager" },
      { name: "Customer", email: "customer@demo.com", password: "12345", role: "customer" },
    ];
    localStorage.setItem(usersKey, JSON.stringify(initialUsers));
  }

  const login = (email: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem(usersKey) || "[]");
    const found = storedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (found) {
      const { password, ...userData } = found;
      const fakeToken = "mock-jwt-token";

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(loginSuccess({ user: userData, token: fakeToken }));
      return true;
    }

    return false;
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout: logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
