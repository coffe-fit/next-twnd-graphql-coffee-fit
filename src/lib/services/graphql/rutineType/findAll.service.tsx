import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  RUTINE_TYPES = gql`
query ExampleQuery {
  rutineType_findAll {
    name
    id
  }
}
`;
export interface input {
  email:string,
  name?: string,
  token: string
}
export const findAllRutineType= async (token?: string) => {
  try {

    
    const query = RUTINE_TYPES;
    const data:{rutineType_findAll: any} = await requestClient(
      query,
      {},
      token
    );
    return data.rutineType_findAll;
  } catch (error: any) {
    console.log('getRutineTypes', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}