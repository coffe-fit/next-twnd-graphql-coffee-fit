import request, { GraphQLClient } from 'graphql-request';
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';


const uri = process.env.NEXT_PUBLIC_APP_GRAPH_URI;
console.log(uri, 'uri');

export const graphQLClient = new GraphQLClient(uri || "http://localhost:3019/graphql");

export const requestGrap: (query: string) => PromiseLike<any>= (query: string) => {
  return request(
    uri || "http://localhost:3019/graphql",
    query
  )
}

export const requestClient: any = async (query: string, data?: any, token?: string) => {
  const customSessionStorage = CustomSessionStorage();
  const _token = token || customSessionStorage?.getItem('auth_token') || null
  if (_token) setAuthToken(_token)
  return await graphQLClient.request(
      query,
      data
    );
}

export const setAuthToken =(token: string) =>{
  graphQLClient.setHeader('Authorization', `Bearer ${token}`);
}
