import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue, getState}) => {
    const endpoint = import.meta.env.VITE_APP_API_URL + "/v1/auth/logout";
    const token = getState().authentication.token;
    console.log(token);
    try {
      const response = await axios.post(endpoint, {}, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const AuthSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    role: null,
    token: null,
    username: null,
    loading: false,
    error: null
  },
  reducers:{
    loginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        // state.role = action.payload.role;
        state.loading = false;
        state.error = null;
    },
    loginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    },
    setAuthenticated: (state, action) => {
        state.isAuthenticated = action.payload.loginState;
        state.token = action.payload.token,
        state.role = action.payload.role,
        state.username = action.payload.username
        //console.log(action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      state.role = null;
      state.username = null;
      state.isAuthenticated = false;
      state.loading = true;
      state.error = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.token = null;
      state.loading = false;
      state.error = true;
    });
  }
});

export const { 
    loginSuccess, loginFailure, setAuthenticated
} = AuthSlice.actions;
export default AuthSlice.reducer;
