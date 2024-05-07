import { createSlice } from '@reduxjs/toolkit';


const initialState: { isOpen: boolean} = {
  isOpen: false
}

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state) => {
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
  }
});

export const {
  openPopup,
  closePopup
} = popupSlice.actions;
export default popupSlice.reducer;
