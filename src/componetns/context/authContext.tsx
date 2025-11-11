import {
  createContext,
  useContext,
  type FC,
  type ReactElement
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../redux/slices/authSlice";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// ✅ context must not be lowercase
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ CORRECT useAuth HOOK
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return value;
};

// ✅ AUTH PROVIDER
export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}): ReactElement => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: any) => state.auth);

  const login = (email: string, password: string) => {
    if (email === "admin@demo.com" && password === "12345") {
      const fakeToken = "mock-jwt-token";
      const fakeUser = { name: "admin", email };

      localStorage.setItem("token", fakeToken);
      dispatch(loginSuccess({ user: fakeUser, token: fakeToken }));
      return true;
    }
    return false;
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
