import { configureStore } from '@reduxjs/toolkit'
import MaterialSlice from './material/MaterialSlice'
import VendorSlice from './vendor/VendorSlice';
import selectedIdsReducer from './material/selectedIdsSlice';
import dashboardSlice from './material/dashboardSlice';
import AuthSlice from './auth';
import modalSlices from './modalSlices';

export const store = configureStore({
  reducer: {
    authentication: AuthSlice,
    materials: MaterialSlice,
    selectedIds: selectedIdsReducer,
    vendors: VendorSlice,
    dashboard: dashboardSlice,
    modal: modalSlices,
  },
})

export default store;

