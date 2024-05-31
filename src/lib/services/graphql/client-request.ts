import request, { GraphQLClient } from 'graphql-request';
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';
import { redirectClient } from './redirectClient';

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

  try {
    const customSessionStorage = CustomSessionStorage();
    const _token = token || customSessionStorage?.getItem('auth_token') || null
    if (_token) setAuthToken(_token);
    
    
    const response = await graphQLClient.request(
      query,
      data
    );
    return response

  } catch (error: any) {
    console.log('requestClient', error);
    const _error =  error?.response?.error || error?.response || error;
    const httpStatusCode = _error?.statusCode || _error?.status ;
    if (/^40[0-9]$/.test(httpStatusCode)) {
      // retorna al servicio
      if (_error?.code === 'UNAUTHENTICATED') throw {redirect: 'UNAUTHENTICATED',  ..._error};
      if (_error?.code === 'BAD_REQUEST') throw {redirect: 'BAD_REQUEST',  ..._error};
    }
    if (/^50[0-9]$/.test(httpStatusCode)) {
      throw {redirect: 'ECONNREFUSED',  ..._error};
    }
    // Manejar errores específicos
    if (_error?.message === 'Network request failed') {
      throw {redirect: 'ECONNREFUSED',  ..._error};
    } 
    throw {redirect: 'ECONNREFUSED', ..._error};
  }
  
}

export const setAuthToken =(token: string) =>{
  graphQLClient.setHeader('Authorization', `Bearer ${token}`);
}
