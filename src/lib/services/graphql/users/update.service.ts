import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';
import { UserInterface } from '@/lib/interfaces';

export const  USER_UPDATE = gql`
  mutation Mutation($userId: String!, $updateUserInput: UpdateUserInput!) {
    user_update(userId: $userId, updateUserInput: $updateUserInput) {
      id
    }
  }
`;

export interface input {
  token: string,
  _data: UserInterface
}
export const user_update = async ({token, _data}: input ) => {
  try {
    
    const query = USER_UPDATE;
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
    const data:{user_update: any} = await requestClient(
      query,
      {
        "userId": userId,
        "updateUserInput": {
          age,
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
    return data.user_update;
  } catch (error:any) {
    console.log('user_update', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}