import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllMaterials = createAsyncThunk(
  "fetchAllMaterials", async () => {
    const respond = await fetch("http://localhost:9999/api/crud/material/all",
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    return respond.json();
  } 
)

export const fetchTypes= createAsyncThunk(
  "fetchTypes", async () => {
    const respond = await fetch("http://localhost:9999/api/crud/material/type/all",
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    return respond.json();
  } 
)

export const updateMaterial = createAsyncThunk(
  'updateMaterial',
  async (materialData, thunkAPI) => {
    try {
      const response = await axios.put('http://localhost:9999/api/crud/material/update', materialData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const MaterialSlice = createSlice({
  name: 'materials',
  initialState: {
    materials: [],
    materialDetailsContent: [],
    showDetails: false,
    showUpdateForm: false,
    showCreateMaterialForm: false,
    types: [],
    isLoading: false,
    error: null,
    message: null
  },
  reducers:{
    addMaterialDetailsContent: (state, action) => {
      state.materialDetailsContent = action.payload;
    },
    removeMaterialDetailsContent: (state) => {
      state.materialDetailsContent = [];
    },
    toggleHideShowDetails: (state) => {
      state.showDetails = !state.showDetails;
    },
    toggleHideShowUpdate: (state) => {
      state.showUpdateForm = !state.showUpdateForm;
    },
    toggleHideShowCreate: (state) => {
      state.showCreateMaterialForm = !state.showCreateMaterialForm;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMaterials.pending, (state, action) => {
      state.isLoading = true;
      state.message = "fetching data ..";
    });
    builder.addCase(fetchAllMaterials.fulfilled, (state, action) => {
      state.isLoading = false;
      state.materials = action.payload;
      state.message = "data fetched";
    });
    builder.addCase(fetchAllMaterials.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = "intenal server error";
    });
    builder.addCase(fetchTypes.pending, (state, action) => {
      state.isLoading = true;
      state.message = "loading types ..";
    });
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.types = action.payload;
      state.message = "types fetched";
    });
    builder.addCase(fetchTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = "cannot load types";
    });
    builder.addCase(updateMaterial.pending, (state) => {
      state.isLoading = true;
      state.message = "updating ..";
    });
    builder.addCase(updateMaterial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateMaterial.rejected, (state,action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload.message;
    });
  }
});

export const { 
  addMaterialDetailsContent, 
  removeMaterialDetailsContent, 
  toggleHideShowDetails,
  toggleHideShowUpdate,
  toggleHideShowCreate,
  setMaterials, 
  setLoading, 
  setError 
} = MaterialSlice.actions;
export default MaterialSlice.reducer;
