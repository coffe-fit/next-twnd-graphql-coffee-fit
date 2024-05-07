import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { IsDateString, IsISO8601, IsUUID, ValidateNested } from 'class-validator';
import { redirectClient } from '../redirectClient';


export const  RUTINE_CREATE_WITH_EXERCISES = gql`
  mutation Mutation($createRutineWithExercisesInput: CreateRutineWithExercisesInput!) {
    rutine_create_with_exercises(createRutineWithExercisesInput: $createRutineWithExercisesInput) {
      id
    }
  }
`;
interface ExerciseInput {
  amountRepeat: number[];
  break: string;
  exerciseId: string;
  rutineTypeId: string;
  series: number;
  weightByKilos: number;
  weightByKilosMax: number;
  amountRepeatMax: number[];
  days: number;
}

interface CreateRutineWithExercisesInput {
  dateEnd: string;
  dateIni: string;
  days: number;
  name: string;
  obs: string;
  roleId1: string;
  roleId2?: string | null;
  userId: string;
  exercises: ExerciseInput[];
}
export interface input {
  token: string,
  data: CreateRutineWithExercisesInput
}

export const rutineCreateWithExercises = async (token: string, _data: CreateRutineWithExercisesInput) => {
  try {
    const query = RUTINE_CREATE_WITH_EXERCISES;
    const data:{rutine_create_with_exercises: any} = await requestClient(
      query,
      {
        "createRutineWithExercisesInput": _data
      },
      token
    );
    return data.rutine_create_with_exercises;
  } catch (error: any) {
    console.log('rutine_create_with_exercises', error);
    return {}
  }
}