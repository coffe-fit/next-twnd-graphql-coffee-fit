import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';

export const  USERS_BY_ROLE_CLIENT = gql`
  query Query {
    user_findAllByRoleClient {
      id
      role {
        id
        name
      }
      email
      username
      phone
      gender
      document
      age
      userId
      rutines {
        rutineTypeName
      }
    }
  }
`;
export interface input {
  email:string,
  name?: string,
  token: string
}
export const findAllByRoleClient = async (token?: string) => {
  try {
    
    const query = USERS_BY_ROLE_CLIENT;
    const data:{user_findAllByRoleClient: any} = await requestClient(
      query,
      {},
      token
    );
    return data.user_findAllByRoleClient;
  } catch (error:any) {
    console.log('findAllByRoleClient', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}