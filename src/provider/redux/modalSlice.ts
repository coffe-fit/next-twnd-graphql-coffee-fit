
import { ModalInterface } from '@/lib/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ModalInterface = {
  modalOpen: false,
  onClose: undefined,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      const { open, onClos } = action.payload;
      state.modalOpen = open;
      state.onClose = onClos;
    },
  }
});

export const {
  modalOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
