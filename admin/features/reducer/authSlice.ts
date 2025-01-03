import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState: {
  userInfo: any | null;
  token: string | null;
} = {
  userInfo: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userInfo, token } = action.payload || {};

      if (userInfo && token) {
        Cookies.set('authToken', token);
        Cookies.set('userInfo', JSON.stringify(userInfo));
        state.userInfo = userInfo;
        state.token = token;
      }
    },
    clearUser: (state) => {
      Cookies.remove('authToken');
      Cookies.remove('userInfo');
      state.userInfo = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
