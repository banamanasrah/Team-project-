import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  loginStatus: boolean;
};

const initialState: AuthState = {
  // Check for JWT token (FastAPI auth) rather than user.id (json-server auth)
  loginStatus: !!localStorage.getItem("access_token"),
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload;
      
    },
  },
});

export const { setLoginStatus } = authSlice.actions;

export default authSlice.reducer;
