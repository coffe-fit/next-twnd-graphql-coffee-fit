import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';
import { ExerciseInterface } from '@/lib/interfaces/exercise.interface';

export const  EXERCISE_UPDATE = gql`
  mutation Mutation($exerciseId: String!, $updateExerciseInput: UpdateExerciseInput!) {
    exercise_update(exerciseId: $exerciseId, updateExerciseInput: $updateExerciseInput) {
      id
    }
  }
`;

export interface input {
  token: string,
  _data: ExerciseInterface
}
export const exercise_update = async ({token, _data}: input ) => {
  try {
    
    const query = EXERCISE_UPDATE;
    
    const {
      exerciseId,
      name,
      imgGood,
      movie,
      metrics,
      rutineTypeId,
      } = _data;
    const data:{exercise_update: any} = await requestClient(
      query,
      {
        "exerciseId": exerciseId,
        "updateExerciseInput": {
          name,
          imgGood,
          movie,
          metrics,
          rutineTypeId,
        }
      },
      token
    );
    return data.exercise_update;
  } catch (error:any) {
    console.log('exercise_update', error);
    if (error.redirect === "BAD_REQUEST")  return error;
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}