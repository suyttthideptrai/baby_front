import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_PREFIX = import.meta.env.VITE_APP_API_CRUD_URL + "/material";
// const BASE_URL = 'http://localhost:9999/api/crud/material';

export const deleteMaterials = createAsyncThunk(
    'selectedIds/deleteMaterials',
    async (selectedIds, thunkAPI) => {
      try {
        const endpoint = `${API_PREFIX}/delete/bulk`;
        const payload = selectedIds;
        const response = await axios.post(endpoint, payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
const selectedIdsSlice = createSlice({
  name: 'selectedIds',
  initialState: {
    selected_ids: [],
    selectedMaterial: [],
    isLoading: false,
    error: false,
    message: '',
  },
  reducers: {
    setSelectedMaterial(state, action){
      state.selectedMaterial = action.payload;
    },
    removeSelectedMaterial(state){
      state.selectedMaterial = [];
    },
    addId(state, action) {
      state.selected_ids.push(action.payload);
    },
    removeId(state, action) {
      state.selected_ids = state.selected_ids.filter(id => id !== action.payload);
    },
    clearIds(state) {
      state.selected_ids = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteMaterials.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
      state.message = ''
    });
    builder.addCase(deleteMaterials.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.message = action.payload.message;
    });
    builder.addCase(deleteMaterials.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.message = action.payload.message;
    });
  }
});

export const { addId, removeId, clearIds, setSelectedMaterial, removeSelectedMaterial } = selectedIdsSlice.actions;

export default selectedIdsSlice.reducer;
