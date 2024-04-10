import { createSlice } from '@reduxjs/toolkit';

export const DashBoardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    blurBackGround: false,
    blurredStyle: " cursor-not-allowed pointer-events-none "
  },
  reducers:{
    setBackGroundAccessible(state, action){
        state.blurBackGround = action.payload;
    } 
  },
  extraReducers: (builder) => {
    
  }
});

export const { 
  setBackGroundAccessible
} = DashBoardSlice.actions;
export default DashBoardSlice.reducer;
