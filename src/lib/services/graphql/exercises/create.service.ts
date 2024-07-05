import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';
import { UserInterface } from '@/lib/interfaces';
import { ExerciseInterface } from '@/lib/interfaces/exercise.interface';

export const  EXERCISE_CREATE = gql`
  mutation Mutation($createExerciseInput: CreateExerciseInput!) {
    exercise_create(createExerciseInput: $createExerciseInput) {
      id
    }
  }
`;

export interface input {
  token: string,
  _data: ExerciseInterface,
}
export const exercise_create = async ({token, _data}: input ) => {
  try {
    
    const query = EXERCISE_CREATE;
    const {
      name,
      imgGood,
      movie,
      rutineTypeId,
      metrics,
    } = _data;
    console.log(_data);
    
    const data:{exercise_create: any} = await requestClient(
      query,
      {
        "createExerciseInput": {
          name,
          imgGood,
          movie,
          metrics,
          rutineTypeId,
        },
      },
      token
    );
    return data.exercise_create;
  } catch (error:any) {
    console.log('exercise_create', error);
    if (error.redirect === "BAD_REQUEST")  return error;
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}