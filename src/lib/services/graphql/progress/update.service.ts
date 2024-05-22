import { gql } from 'graphql-request';
import { requestClient } from "../client-request";
import { redirectClient } from '../redirectClient';
import { ProgressInterface } from '@/lib/interfaces/progress.interface';

export const  PROGRESS_UPDATE = gql`
  mutation Progress_update($progressId: String!, $updateProgressInput: UpdateProgressInput!) {
    progress_update(progressId: $progressId, updateProgressInput: $updateProgressInput) {
      id
    }
  }
`;

export interface input {
  token: string,
  _data: ProgressInterface
}
export const progress_update = async ({token, _data}: input ) => {
  try {
    
    const query = PROGRESS_UPDATE;
    const data:{progress_update: any} = await requestClient(
      query,
      {
        "progressId": "progressId",
        "updateProgressInput": { ..._data }
      },
      token
    );
    return data.progress_update;
  } catch (error:any) {
    console.log('progress_update', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}