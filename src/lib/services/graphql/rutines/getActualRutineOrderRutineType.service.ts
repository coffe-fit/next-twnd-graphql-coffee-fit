import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirect } from 'next/navigation';
import { redirectClient } from '../redirectClient';

export const  RUTINE_ORDER_TYPE = gql`
  query Query {
    rutine_getActualRutineOrderRutineType {
      rutineTypeName
      name
      dateEnd
      dateIni
      days
      exercises {
        id
        days
        series
        break
        obs
        amountRepeat
        exercise {
          imgBad
          imgGood
          movie
          name
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
export const  getRutineOrderType = async (token?: string) => {
  try {
    const query = RUTINE_ORDER_TYPE;
    const data:{rutine_getActualRutineOrderRutineType: any} = await requestClient(
      query,
      {},
      token
    );
    return data.rutine_getActualRutineOrderRutineType;
  } catch (error: any) {
    console.log('getRutineOrderType', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}