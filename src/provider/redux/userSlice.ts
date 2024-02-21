import { UserInterface } from '@/lib/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';



const initialState: UserInterface = {
  age: 0,
  campany: {
    email: '',
    id: '',
    logo: '',
    name: '',
    nit: '',
    phone: ''
  },
  document: '',
  email: '',
  gender: '',
  id: '',
  phone: '',
  role: '',
  username: '',
  imgUser: '',
  rutines: ''
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { id, email, imgUser, username} = action.payload;
      state.id = id;
      state.email = email;
      state.imgUser = imgUser;
      state.username = username;
    },
    addRutineSelected: (state, action) => {
      const { rutines } = action.payload;
      state.rutines = rutines;
    },
  }
});

export const {
  addUser,
  addRutineSelected
} = userSlice.actions;
export default userSlice.reducer;
