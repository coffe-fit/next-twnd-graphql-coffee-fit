import { gql } from 'graphql-request';
import { requestClient } from "../client-request";

export const  USERS_BY_ROLE_CLIENT = gql`
  query Query {
    user_findAllByRoleClient {
      id
      role {
        name
      }
      email
      username
      phone
      gender
      document
      age
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
  } catch (error) {
    console.log('findAllByRoleClient', error);
    return {}
  }
}