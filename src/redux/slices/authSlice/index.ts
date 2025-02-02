import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { loginUser } from './action';
import { IAuthState } from '../../common';

const initialState: IAuthState = {
  data: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('msisdn')
      sessionStorage.removeItem('scratchValue')
      storage.removeItem('persist:root');
    },

    resetError: (state) => {
      state.error = ''
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log({action})
        state.loading = false;
        state.isLoggedIn = true;
        state.data = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log({action})
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
        state.data = null;
      });
  },
});

export const { logOut, resetError } = authSlice.actions;

export default authSlice.reducer;
