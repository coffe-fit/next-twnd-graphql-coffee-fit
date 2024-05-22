import { trainInterface } from '@/lib/interfaces/train.Interface';
import { createSlice } from '@reduxjs/toolkit';


const initialState: trainInterface = {
    newUserSelected:{
      age: 0,
      company: {
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
      rutines: '',
    },
    exerciseSelected: {
      dayneme: '',
      type: '',
      exercise: undefined
    },
    newRutine: [[]]
}

export const trainSlice = createSlice({
  name: "train",
  initialState,
  reducers: {
    addExerciseSelected: (state, action) => {
      const { exerciseSelected } = action.payload;
      state.exerciseSelected = exerciseSelected;
    },
    addRutineSelected: (state, action) => {
      const { rutines } = action.payload;
      state.newRutine = rutines;
    },
    addUserSelected: (state, action) => {
      const { userSel } = action.payload;
      state.newUserSelected = userSel;
    },
    resetUserSelected: (state) => {
      state.newUserSelected = initialState;
    },
  }
});

export const {
  addExerciseSelected,
  addRutineSelected,
  addUserSelected,
  resetUserSelected
} = trainSlice.actions;
export default trainSlice.reducer;
