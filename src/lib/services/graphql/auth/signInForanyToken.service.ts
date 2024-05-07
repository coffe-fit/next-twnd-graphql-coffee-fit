import { request, gql } from 'graphql-request';
import {  graphQLClient } from "../client-request";
import { redirectClient } from '../redirectClient';


export const  AUTH_FORANY_TOKEN = gql`
  mutation Mutation($signInAuthInput: AuthForanyToken!) {
    auth_signInForanyToken(signInAuthInput: $signInAuthInput) {
      token,
      id
    }
  }
`;
export interface input {
  email:string,
  name?: string,
  token: string
}
export const AuthForanyToken = async ({email, token, name}:input) => {
  try {
    const query = AUTH_FORANY_TOKEN;
    const data:{auth_signInForanyToken: any} = await graphQLClient.request(
      query,
      {
        "signInAuthInput": {
          "email": email,
          "foranyToken": token,
          "username": name || ''
        }
      }
    );
    
    return data.auth_signInForanyToken;
  } catch (error: any) {
    console.log('findAll', error);
    if (error.redirect) redirectClient(error.redirect);
    return error
  }
}