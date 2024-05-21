import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_PREFIX = import.meta.env.VITE_APP_API_CRUD_URL;

export const exportGR = createAsyncThunk(
   'exportGoodReceipt',
   async (body, { getState, rejectWithValue }) => {
      const token = getState().authentication.token;
      if (!token) {
         return rejectWithValue('Something went wrong please login again');
      }
      try {
       const response = await fetch(`${API_PREFIX}/receipt/create`, {
         method: 'POST',
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
         body: JSON.stringify(body)
       });
       if (!response.ok) {
         throw new Error('Server error');
       }
       return response.json();
     } catch (error) {
       return rejectWithValue(error.message);
     }
   }
 );

export const fetchGR = createAsyncThunk(
  'fetchGoodReceipt',
  async (_, { getState, rejectWithValue }) => {
      const token = getState().authentication.token;
      if (!token) {
        return rejectWithValue('Something went wrong please login again');
      }
      try {
      const response = await fetch(`${API_PREFIX}/receipt/all`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
      });
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGRById = createAsyncThunk(
  'fetchGoodReceiptById',
  async (id, { getState, rejectWithValue }) => {
      const token = getState().authentication.token;
      if (!token) {
        return rejectWithValue('Something went wrong please login again');
      }
      try {
      const response = await fetch(`${API_PREFIX}/receipt/details/${id}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
      });
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReceipts = createAsyncThunk(
  'deleteReceipts',
  async (selectedOrderIds, {getState, rejectWithValue}) => {
    const token = getState().authentication.token;
      if (!token) {
        return rejectWithValue('Something went wrong please login again');
      }
    try {
      const endpoint = `${API_PREFIX}/receipt/delete`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(selectedOrderIds)
      });
      return response.json();
      } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const receiptSlice = createSlice({
  name: 'receipt',
  initialState: { 
          receipts: [],
          selectedReceiptIds: [],
          receiptDetailsId: '',
          receiptDetails: null,
          status: 'idle', 
          error: null 
          },
  reducers: {
    addReceiptId: (state, action) => {
      state.selectedReceiptIds.push(action.payload);
    },
    removeReceiptId: (state, action) => {
      state.selectedReceiptIds = state.selectedReceiptIds.filter(id => id !== action.payload);
    },
    clearReceiptIds: (state) => {
      state.selectedReceiptIds = [];
    },
    setReceiptDetailsId: (state, action) => {
      state.receiptDetailsId = action.payload;
    },
    setReceiptDetailsContent: (state, action) => {
      state.receiptDetails = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGR.pending, (state) => {
        state.status = 'loading orders data...';
      })
      .addCase(fetchGR.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.receipts = action.payload;
      })
      .addCase(fetchGR.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchGRById.pending, (state) => {
        state.status = 'loading';
        state.receiptDetails = [];
      })
      .addCase(fetchGRById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.receiptDetails = action.payload;
      })
      .addCase(fetchGRById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  addReceiptId,
  removeReceiptId,
  clearReceiptIds,
  setReceiptDetailsId,
  setReceiptDetailsContent
} = receiptSlice.actions;

export default receiptSlice.reducer;