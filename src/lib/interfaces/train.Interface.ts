// import { UserInterface } from "./user.inteface";

export interface trainInterface {
  newUserSelected: any;
  exerciseSelected: {
    dayname: string
    type: string,
    exercise: any
  }
  newRutine: [any[]],
  exerciseList: {
    exerciseSelected: any
  }
}