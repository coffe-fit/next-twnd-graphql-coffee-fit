import { gql } from 'graphql-request';
import { requestClient } from "../client-request";

export const  RUTINE_FIND_ALL_BY_USSERID = gql`
  query ExampleQuery {
    rutine_findAllByUserId {
      rutineTypeId
      days
      rutines {
        id
        rutineType {
          id
          name
        }
        amountRepeat
        dateEnd
        dateIni
        days
        exercise {
          id
          name
        }
        obs
        series
        rutineDetail {
          amountMax
          days
          frequency
          frequencyCardiac
          id
          intensity
          obs
          pulsation
          rest
          seriesRange
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
export const RutineFindAllByUserId = async (token?: string) => {
  try {
    const query = RUTINE_FIND_ALL_BY_USSERID;
    const data:{rutine_findAllByUserId: any} = await requestClient(
      query,
      {},
      token
    );
    return data.rutine_findAllByUserId;
  } catch (error) {
    console.log('RutineFindAllByUserId', error);
    return {}
  }
}