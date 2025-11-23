import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

// --- LOAD TOKEN SAFELY ---
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

// Only accept token if it is a valid JWT (contains 2 dots)
const isValidJwt =
  storedToken && storedToken.split(".").length === 3 ? true : false;

const initialState: AuthState = {
  user: isValidJwt ? JSON.parse(storedUser || "null") : null,
  token: isValidJwt ? storedToken : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Store RAW TOKEN, not JSON.stringify
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
