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
  imgUser: ''
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      // const { product } = action.payload;
      // state.products?.push(product);
    },
  }
});

export const {
  addUser
} = userSlice.actions;
export default userSlice.reducer;
