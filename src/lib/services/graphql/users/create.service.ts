import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';
import { UserInterface } from '@/lib/interfaces';

export const  USER_CREATE = gql`
  mutation Mutation($createUserInputPassLess: CreateUserInputPassLess!) {
    user_create(createUserInputPassLess: $createUserInputPassLess) {
      id
    }
  }
`;

export interface input {
  token: string,
  _data: UserInterface
}
export const user_create = async ({token, _data}: input ) => {
  try {
    
    const query = USER_CREATE;
    const {
      role,
      userId,
      company,
      age,
      document,
      email,
      gender,
      phone,
      username
      } = _data;
    const data:{user_create: any} = await requestClient(
      query,
      {
        "createUserInputPassLess": {
          age: +age,
          document,
          email,
          gender,
          phone,
          roleId: role?.id,
          username,
          companyId: company?.id
        }
      },
      token
    );
    return data.user_create;
  } catch (error:any) {
    console.log('user_create', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}