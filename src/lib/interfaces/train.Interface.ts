// import { UserInterface } from "./user.inteface";

export interface trainInterface {
  newUserSelected: any;
  exerciseSelected: {
    dayneme: string
    type: string,
    exercise: any
  }
  newRutine: [any[]]
}