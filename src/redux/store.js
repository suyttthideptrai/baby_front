import { configureStore } from '@reduxjs/toolkit'
import MaterialSlice from './material/MaterialSlice'
import VendorSlice from './material/VendorSlice';
import selectedIdsReducer from './material/selectedIdsSlice';
import dashboardSlice from './material/dashboardSlice';
import AuthSlice from './auth';

export const store = configureStore({
  reducer: {
    authentication: AuthSlice,
    materials: MaterialSlice,
    selectedIds: selectedIdsReducer,
    vendors: VendorSlice,
    dashboard: dashboardSlice
  },
})

export default store;
