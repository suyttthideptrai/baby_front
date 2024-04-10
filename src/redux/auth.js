import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
    // dispatch(loginStart());
    try {
      const response = await axios.post("http://localhost:9999/api/v1/auth/authenticate", {
        username,
        password
      });
      const token = response.data;
      dispatch(loginSuccess({ token })); 
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

//   export const createVendor = createAsyncThunk(
//     'createVendor',
//     async (vendorPayload, thunkAPI) => {
//       try {
//         const endpoint = "http://localhost:9999/api/v1/auth/authenticate";
//         const payload = vendorPayload;
//         const response = await axios.post(endpoint, payload);
//         return response.data;
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data);
//       }
//     }
//   );

export const AuthSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    role: null,
    token: null,
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
    logout: (state) => {
    state.isAuthenticated = false;
    state.token = null;
    state.role = null;
    },
    setAuthenticated: (state, action) => {
        state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    
  }
});

export const { 
    loginSuccess, loginFailure, logout, setAuthenticated
} = AuthSlice.actions;
export default AuthSlice.reducer;
