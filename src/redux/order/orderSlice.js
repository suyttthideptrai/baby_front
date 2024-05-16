import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addVendorId } from '../vendor/VendorSlice';

const API_PREFIX = import.meta.env.VITE_APP_API_CRUD_URL;

export const fetchOrderDetails = createAsyncThunk(
  'fetchOrderDetails',
  async (order_id, {rejectWithValue, getState}) => {
    const token = getState().authentication.token;
    if (!token) {
      return rejectWithValue('Something went wrong please login again');
    }
    const response = await fetch(`${API_PREFIX}/order/id/${order_id}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    return response.json();
  }
);



export const fetchOrders = createAsyncThunk(
          'fetchOrders',
          async (_, {rejectWithValue, getState}) => {
            const token = getState().authentication.token;
            if (!token) {
              return rejectWithValue('Something went wrong please login again');
            }
            const response = await fetch(`${API_PREFIX}/order/all`, {
              method: 'GET',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            });
            return response.json();
          }
        );

export const deleteOrders = createAsyncThunk(
  'deleteVendors',
  async (selectedOrderIds, {rejectWithValue, getState}) => {
    try {
      const token = getState().authentication.token;
      if (!token) {
        return rejectWithValue('Something went wrong please login again');
      }
      const endpoint = `${API_PREFIX}/order/delete`;
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

export const createOrder = createAsyncThunk(
  'createOrder',
  async (orderData, { rejectWithValue, getState }) => {
    try {
      const token = getState().authentication.token;
      if (!token) {
        return rejectWithValue('Something went wrong please login again');
      }
      const response = await fetch(`${API_PREFIX}/order/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(orderData)
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

const orderSlice = createSlice({
  name: 'order',
  initialState: { 
          orders: [],
          selectedOrderIds: [],
          detailsId: null,
          orderDetails: [],
          status: 'idle', 
          error: null 
          },
  reducers: {
    addOrderId: (state, action) => {
      state.selectedOrderIds.push(action.payload);
    },
    removeOrderId: (state, action) => {
      state.selectedOrderIds = state.selectedOrderIds.filter(id => id !== action.payload);
    },
    clearOrderIds: (state) => {
      state.selectedOrderIds = [];
    },
    setDetailsId: (state, action) => {
      state.detailsId = action.payload;
    },
    setOrderDetailsContent: (state, action) => {
      state.orderDetails = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading orders data...';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = 'loading';
        state.orderDetails = [];
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { 
  addOrderId, 
  removeOrderId, 
  clearOrderIds, 
  setDetailsId,
  setOrderDetailsContent 
} = orderSlice.actions;
export default orderSlice.reducer;