import { TOKEN_NAME } from "@/lib/config/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  loggedIn: boolean;
  userId: number | null;
};

// Define the initial state
const initialState: AuthState = {
  token:
    typeof window !== "undefined" && localStorage.getItem(TOKEN_NAME) != null
      ? localStorage.getItem(TOKEN_NAME)
      : null,
  loggedIn:
    typeof window !== "undefined" && localStorage.getItem(TOKEN_NAME) !== null,

  userId:
    typeof window !== "undefined" && localStorage.getItem("userId") != null
      ? Number(localStorage.getItem("userId"))
      : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem(TOKEN_NAME, "null");
      localStorage.removeItem("userId");
      state.token = null;
      state.loggedIn = false;
      state.userId = null;
      document.location.href = "/login";
    },
    login: (
      state,
      action: PayloadAction<{ token: string; userId: number }>
    ) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.loggedIn = true;
      state.userId = userId;
      localStorage.setItem(TOKEN_NAME, token);
      localStorage.setItem("userId", userId.toString());
      document.location.href = "/links";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
