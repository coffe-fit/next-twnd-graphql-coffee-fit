import { gql } from 'graphql-request';
import { requestClient } from "../client-request";

export const  RUTINE_ORDER_DAY = gql`
  query Query {
    rutine_getActualRutineOrderDays {
      day
      rutineType {
        rutineTypeName
        exercises {
          obs
          series
          days
          break
          amountRepeat
          exercise {
            imgBad
            imgGood
            movie
            name
            id
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
export const  getRutineOrderDay = async (token?: string) => {
  try {
    const query = RUTINE_ORDER_DAY;
    const data:{rutine_getActualRutineOrderDays: any} = await requestClient(
      query,
      {},
      token
    );
    return data.rutine_getActualRutineOrderDays;
  } catch (error) {
    console.log('getRutineOrderDay', error);
    return {}
  }
}