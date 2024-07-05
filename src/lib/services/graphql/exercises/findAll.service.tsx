import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  EXERCISE_FIND_ALL = gql`
  query Exercise_findAll {
    exercise_findAll {
      id
      metrics
      name
      movie
      imgGood
      rutineType {
        name
        id
      }
    }
  }
`;
export interface input {
  email:string,
  name?: string,
  token: string
}
export const findAllExercise = async (token?: string) => {
  try {
    
    const query = EXERCISE_FIND_ALL;
    const data:{exercise_findAll: any} = await requestClient(
      query,
      {},
      token
    );
    data.exercise_findAll.forEach((exercise: any) => {
      exercise.exerciseId = exercise.id
    })
    
    return data.exercise_findAll;
  } catch (error:any) {
    console.log('exercise_findAll', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}