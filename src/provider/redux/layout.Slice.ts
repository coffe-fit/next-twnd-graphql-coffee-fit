
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  headerDisplay: true,
  footerDisplay: true
}

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    handleHeaderDisplay: (state, action) => {
      const { open } = action.payload;
      state.headerDisplay = open;
    },
    handleFooterDisplay: (state, action) => {
      const { open } = action.payload;
      state.footerDisplay = open;
    },
  }
});

export const {
  handleHeaderDisplay,
  handleFooterDisplay
} = layoutSlice.actions;

export default layoutSlice.reducer;
