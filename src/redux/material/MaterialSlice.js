import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getRequestHeaderWithBearerToken } from '../../utils/utils';
const API_PREFIX = import.meta.env.VITE_APP_API_CRUD_URL + "/material";
export const fetchAllMaterials = createAsyncThunk(
  "fetchAllMaterials", async (_, { getState }) => {
    const token = getState().authentication.token;
    const respond = await fetch(`${API_PREFIX}/all`,
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    return respond.json();
  } 
)

export const fetchTypes= createAsyncThunk(
  "fetchTypes", async (_, { getState }) => {
    const token = getState().authentication.token;
    const respond = await fetch(`${API_PREFIX}/type/all`,
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    return respond.json();
  }
)


export const updateMaterial = createAsyncThunk(
  'updateMaterial',
  async (materialData, { getState, rejectWithValue }) => {
    const token = getState().authentication.token;
    try {
      const response = await axios.put(
        `${API_PREFIX}/update`, 
        materialData,
        getRequestHeaderWithBearerToken(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ status: error.response.status, message: "Update failed" });
    }
  }
);

export const addMaterial = createAsyncThunk(
  'materials/add',
  async (materialData, { getState, rejectWithValue }) => {
    const token = getState().authentication.token;
    if (!token) {
      return rejectWithValue('Something went wrong please login again');
    }
    try {
      const response = await axios.post(
        `${API_PREFIX}/add`,
        materialData,
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Error adding material. Please relogin and try again! If error persists contact admin.');
      }
    } catch (error) {
      console.error('Error adding material:', error);
      return rejectWithValue('Error adding material. Please try again.');
    }
  }
);

export const createExport = createAsyncThunk(
  "createExport",
  async (exportData, { getState, rejectWithValue }) => {
    const token = getState().authentication.token;
    if (!token) {
      return rejectWithValue('Something went wrong please login again');
    }
    try {
      const response = await fetch(`${API_PREFIX}/export`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(exportData)
      });
      return response.json();
    } catch (error) {
      console.error('Error adding material:', error);
      return rejectWithValue('Error adding material. Please try again.');
    }
  }
);


export const MaterialSlice = createSlice({
  name: 'materials',
  initialState: {
    materials: [],
    materialDetailsContent: [],
    materialSubmitContent: [],
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
    addMaterialSubmitContent: (state, action) => {
      state.materialSubmitContent = action.payload;
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
  addMaterialSubmitContent,
  removeMaterialDetailsContent, 
  toggleHideShowDetails,
  toggleHideShowUpdate,
  toggleHideShowCreate,
  setMaterials, 
  setLoading, 
  setError 
} = MaterialSlice.actions;
export default MaterialSlice.reducer;
