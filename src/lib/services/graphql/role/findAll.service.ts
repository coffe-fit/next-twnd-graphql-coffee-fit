import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  ROLE_FIND_ALL = gql`
  query Query {
    role_findAll {
      id
      name
    }
  }
`;
export interface input {
  email:string,
  name?: string,
  token: string
}
export const findAllRole= async (token?: string) => {
  try {
    
    const query = ROLE_FIND_ALL;
    const data:{role_findAll: any} = await requestClient(
      query,
      {},
      token
    );
    return data.role_findAll;
  } catch (error:any) {
    console.log('role_findAll', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}