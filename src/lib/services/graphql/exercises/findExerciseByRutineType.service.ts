import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  RUTINE_FIND_EXERCISE_BY_RUTINE_TYPE_ID = gql`
  query ExampleQuery($rutineTypeId: String!) {
    exercise_findByRutineTypeId(rutineTypeId: $rutineTypeId) {
      id
      name
      movie
      imgGood
      imgBad
    }
  }
`;
export interface input {
  email:string,
  name?: string,
  token: string
}
export const exerciseFindExcerciseByRutineTypeId = async (token: string, rutineTypeId: string) => {
  try {
    const query = RUTINE_FIND_EXERCISE_BY_RUTINE_TYPE_ID;
    const data:{exercise_findByRutineTypeId: any} = await requestClient(
      query,
      {rutineTypeId},
      token
    );
    return data.exercise_findByRutineTypeId;
  } catch (error:any) {
    console.log('exercise_findByRutineTypeId', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}