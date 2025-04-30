import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginResponse } from '../../types/auth/auth';

// Initialize state from sessionStorage if available
const initialState: AuthState = {
  user: sessionStorage.getItem('authUser')
    ? JSON.parse(sessionStorage.getItem('authUser')!)
    : null,
  token: sessionStorage.getItem('authToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;