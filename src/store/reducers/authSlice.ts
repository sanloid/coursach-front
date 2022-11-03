import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoged: boolean;
  token: string;
}

const initialState: AuthState = {
  isLoged: false,
  token: '',
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLoged = true;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    checkLogin(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.isLoged = true;
        state.token = token;
      }
    },
    logout(state) {
      state.isLoged = false;
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    }
  },
});

export default authSlice.reducer;
