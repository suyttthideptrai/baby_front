import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_PREFIX = "http://localhost:9999/api/crud/vendor";

export const fetchAllVendors = createAsyncThunk(
  "fetchAllVendors", async () => {
    const respond = await fetch(`${API_PREFIX}/all`,
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    return respond.json();
  } 
)

export const fetchVendorMaterials = createAsyncThunk(
  "fetchVendorMaterials", async (vendor_id) => {
    const respond = await fetch(`${API_PREFIX}/material/${vendor_id}`,
    {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    return respond.json();
  } 
)

export const createVendor = createAsyncThunk(
    'createVendor',
    async (vendorPayload, thunkAPI) => {
      try {
        const endpoint = `${API_PREFIX}/add`;
        const payload = vendorPayload;
        const response = await axios.post(endpoint, payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

export const deleteVendors = createAsyncThunk(
    'deleteVendors',
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

export const updateVendor = createAsyncThunk(
  'updateVendor',
  async (vendorData, thunkAPI) => {
    try {
      const response = await axios.put(`${API_PREFIX}/update`, vendorData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const VendorSlice = createSlice({
  name: 'vendors',
  initialState: {
    //STATE DATA
    vendors: [],
    selectedVendorIds: [],
    selectedVendorMaterials:[],
    vendorDetailsId: null,
    vendorDetailsContent: [],
    updateVendorPayload: [],
    createVendorPayload: [],
    //POPUP STATE
    showCreateVendorForm: false,
    showVendorDetailsPopup: false,
    showUpdateVendorForm: false,
    //STATE STATUS
    vendorsDataLoaded: false,
    isLoading: false,
    error: false,
    message: null
  },
  reducers: {
    setVendorDetailsId(state, action){
      state.vendorDetailsId = action.payload;
    },
    setVendorDetailsContent(state, action){
        state.vendorDetailsContent = action.payload;
    },
    removeVendorDetailsContent(state){
        state.vendorDetailsContent = [];
    },
    removeSelectedVendorMaterials(state){ 
      state.selectedVendorMaterials = [];
    },
    setCreateVendorPayload(state, action) {
        state.createVendorPayload = action.payload;
    },
    addVendorId(state, action) {
        state.selectedVendorIds.push(action.payload);
    },
    removeVendorId(state, action) {
        state.selectedVendorIds = state.selectedVendorIds.filter(id => id !== action.payload);
    },
    clearVendorIds(state) {
        state.selectedVendorIds = [];
    },
    toggleHideShowCreateVendorForm(state, action){
        state.showCreateVendorForm = action.payload;
    },
    toggleHideShowDetailsPopup(state) {
        state.showVendorDetailsPopup = !state.showVendorDetailsPopup;
    },
    toggleHideShowUpdateVendorForm(state) {
        state.showUpdateVendorForm = !state.showUpdateVendorForm;
    },
    setVendorsDataLoaded(state, action) {
        state.vendorsDataLoaded = action.payload;
    }
  },
  extraReducers: (builder) => {
    //FETCH ALL VENDORS
    builder.addCase(fetchAllVendors.pending, (state, action) => {
      state.isLoading = true;
      state.message = "Fetching vendors data..";
    });
    builder.addCase(fetchAllVendors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.vendors = action.payload;
      state.message = action.payload.message;
    });
    builder.addCase(fetchAllVendors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.vendors = action.payload;
        state.message = action.payload.message;
        state.vendorsDataLoaded = true;
    });
    //FETCH VENDOR DETAILS
    // builder.addCase(fetchVendorDetails.pending, (state, action) => {
    //   state.isLoading = true;
    //   state.message = "Fetching vendor details data..";
    // });
    // builder.addCase(fetchVendorDetails.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload.error;
    //   state.vendorDetailsContent = action.payload;
    //   state.message = action.payload.message;
    // });
    // builder.addCase(fetchVendorDetails.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload.error;
    //     state.message = action.payload.message;
    // });
    //FETCH VENDOR MATERIALS
    builder.addCase(fetchVendorMaterials.pending, (state, action) => {
      state.isLoading = true;
      state.message = "Fetching vendors data..";
    });
    builder.addCase(fetchVendorMaterials.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.selectedVendorMaterials = action.payload;
      state.message = action.payload.message;
    });
    builder.addCase(fetchVendorMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.message = action.payload.message;
    });
    //UPDATE
    builder.addCase(updateVendor.pending, (state) => {
      state.isLoading = true;
      state.message = "Updating vendor data..";
    });
    builder.addCase(updateVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.message = action.payload.message;
    });
    builder.addCase(updateVendor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload.message;
    });
    //DELETE
    builder.addCase(deleteVendors.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
        state.message = ''
    });
    builder.addCase(deleteVendors.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = action.payload.error;
    state.message = action.payload.message;
    });
    builder.addCase(deleteVendors.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload.error;
    state.message = action.payload.message;
    });
    // CREATE
    builder.addCase(createVendor.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating vendor..";
    });
    builder.addCase(createVendor.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = action.payload.error;
    state.message = action.payload.message;
    });
    builder.addCase(createVendor.rejected, (state, action) => {
    state.isLoading = false;
    state.error = true;
    state.message = action.payload.message;
    });
  }
});

export const { addVendorId
    , removeVendorId
    , clearVendorIds
    , setCreateVendorPayload
    , setVendorDetailsId
    , setVendorDetailsContent
    , removeVendorDetailsContent
    , toggleHideShowCreateVendorForm
    , toggleHideShowDetailsPopup
    , toggleHideShowUpdateVendorForm    
    , removeSelectedVendorMaterials
} = VendorSlice.actions;
export default VendorSlice.reducer;
