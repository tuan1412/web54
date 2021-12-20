import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../api/request';

const initialState = {
  status: "idle",
  user: null,
}

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', 
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const res = await request({
      url: '/auth/me',
      method: 'GET'
    });
    if (res.success) {
      return res.data;
    }
    return null;
})

export const login = createAsyncThunk('user/login',
  async ({ username, password }) => {
    const res = await request({
      url: '/auth/login',
      method: 'POST',
      data: { username, password },
    });
    if (res.success) {
      return res.data;
    }
    return null;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    }
  },
  extraReducers: {
    [fetchUserInfo.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.status = "done";
      state.user = action.payload
    },
    [fetchUserInfo.rejected]: (state) => {
      state.status = "error";
    },
    [login.fulfilled]: (state, payload) => {
      const { token, username, _id } = payload;
      localStorage.setItem("token", token)
      state.user = {
        username,
        _id
      }
    } 
  }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;