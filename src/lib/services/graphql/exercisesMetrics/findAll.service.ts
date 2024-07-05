import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  EXERCISE_METRICS_FIND_ALL = gql`
  query ExercisesMetrics_findAll {
    exercisesMetrics_findAll {
      id
      measure
      name
    }
  }
`;
export interface input {
  email:string,
  name?: string,
  token: string
}
export const findAllExerciseMetrics = async (token?: string) => {
  try {
    
    const query = EXERCISE_METRICS_FIND_ALL;
    const data:{exercisesMetrics_findAll: any} = await requestClient(
      query,
      {},
      token
    );
    
    return data.exercisesMetrics_findAll;
  } catch (error:any) {
    console.log('exercise_metrics_findAll', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}