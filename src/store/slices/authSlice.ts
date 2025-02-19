import { TOKEN_NAME } from "@/lib/config/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  loggedIn: boolean;
  userId: number | null;
  documentId: string | null;
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
  documentId:
    typeof window !== "undefined" && localStorage.getItem("documentId") != null
      ? localStorage.getItem("documentId")
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
      state.documentId = null;
      document.location.href = "/login";
    },
    login: (
      state,
      action: PayloadAction<{
        token: string;
        userId: number;
        documentId: string;
      }>
    ) => {
      const { token, userId, documentId } = action.payload;
      state.token = token;
      state.loggedIn = true;
      state.userId = userId;
      state.documentId = documentId;
      localStorage.setItem(TOKEN_NAME, token);
      localStorage.setItem("userId", userId.toString());
      localStorage.setItem("documentId", documentId.toString());
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
