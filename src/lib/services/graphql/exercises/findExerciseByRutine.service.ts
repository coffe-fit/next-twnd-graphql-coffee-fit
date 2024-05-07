import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  RUTINE_FIND_EXERCISE_BY_RUTINE = gql`
query Query {
  exercisesByRutineType_findAllByUserIdByDay {
    day
    rutineType {
      rutineTypeName
      exercises {
        break
        obs
        series
        exercise {
          name
          imgGood
          imgBad
          movie
        }
        amountRepeat
        rutine {
          obs
        }
      }
    }
  }
}
`;
export interface input {
  email:string,
  name?: string,
  token: string
}
export const exerciseFindExcerciseByRutine = async (token?: string) => {
  try {
    const query = RUTINE_FIND_EXERCISE_BY_RUTINE;
    const data:{exercisesByRutineType_findAllByUserIdByDay: any} = await requestClient(
      query,
      {},
      token
    );
    return data.exercisesByRutineType_findAllByUserIdByDay;
  } catch (error:any) {
    console.log('exerciseFindExcerciseByRutine', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}