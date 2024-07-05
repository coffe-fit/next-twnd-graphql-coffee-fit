import { trainInterface } from '@/lib/interfaces/train.Interface';
import { createSlice } from '@reduxjs/toolkit';


export const initialState: trainInterface = {
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
      dayname: '',
      type: '',
      exercise: undefined
    },
    newRutine: [[]],
    exerciseList: {
      exerciseSelected: {
        name:'',
        rutineType: {
          id: '',
          name: ''
        },
        metrics:[]
      }
    }

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
    addExerciseSelectedFromEList: (state, action) => {
      const { exerciseSelected } = action.payload;
      state.exerciseList.exerciseSelected = exerciseSelected;
    },
    resetUserSelected: (state) => {
      state.newUserSelected = initialState.newUserSelected;
    },
    resetExerciseSelected: (state) => {
      state.exerciseSelected = initialState.exerciseSelected;
    },
    resetExerciseSelectedFromEList: (state) => {
      state.exerciseList.exerciseSelected = initialState.exerciseList.exerciseSelected;
    },
  }
});

export const {
  addExerciseSelected,
  addRutineSelected,
  addUserSelected,
  addExerciseSelectedFromEList,
  resetUserSelected,
  resetExerciseSelected,
  resetExerciseSelectedFromEList
} = trainSlice.actions;
export default trainSlice.reducer;
