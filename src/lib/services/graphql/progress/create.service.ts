import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';
import { ProgressInterface } from '@/lib/interfaces/progress.interface';

export const PROGRESS_CREATE = gql`
  mutation Mutation($createProgressInput: CreateProgressInput!) {
    progress_create(createProgressInput: $createProgressInput) {
      id
    }
  }
`;

export interface input {
  token: string,
  _data: ProgressInterface
}
export const progress_create = async ({token, _data}: input ) => {
  try {
    
    const query = PROGRESS_CREATE;
    const data:{progress_create: any} = await requestClient(
      query,
      {
        "createProgressInput": {
          ..._data
        }
      },
      token
    );
    return data.progress_create;
  } catch (error:any) {
    console.log('progress_create', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}