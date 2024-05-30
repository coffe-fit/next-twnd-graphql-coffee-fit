import { configureStore } from '@reduxjs/toolkit';

import layoutReducer from  './layout.Slice';
import userReducer from  './userSlice';
import trainReducer from  './trainSlice';
import modalReducer from  './modalSlice';
import popupReducer from  './popupSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    user: userReducer,
    train: trainReducer,
    modal: modalReducer,
    popup: popupReducer,
    
  }
});
