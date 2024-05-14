import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  COMPANY_FIND_ALL = gql`
  query Query {
    company_findAll {
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
export const findAllCompany = async (token?: string) => {
  try {
    
    const query = COMPANY_FIND_ALL;
    const data:{company_findAll: any} = await requestClient(
      query,
      {},
      token
    );
    return data.company_findAll;
  } catch (error:any) {
    console.log('company_findAll', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}