'use client'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from '@apollo/client/link/error';

const uri = process.env.NEXT_PUBLIC_APP_GRAPH_URI;
console.log(uri, 'uri');


const httpLink = new HttpLink({
  uri
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = sessionStorage.getItem('auth_token');
  const tokenPay = localStorage.getItem('auth_token_pay');
  const sessionID = sessionStorage.getItem('sessionID');
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      sessionId: sessionID ? sessionID : '',
    },
  });
  if (
    operation.operationName !== 'requestAuthOtp' &&
    operation.operationName !== 'verifyAuthOtp' &&
    operation.operationName !== 'LOGOUT'
  ) {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        sessionId: sessionID ? sessionID : '',
      },
    });
  }
  if (
    operation.operationName === 'GetLoanActive' ||
    operation.operationName === 'loanActive'
  ) {
    operation.setContext({
      headers: {
        authorization: tokenPay ? `Bearer ${tokenPay}` : '',
        sessionId: sessionID ? sessionID : '',
      },
    });
  }
  return forward(operation);
});

/**
 * @description This function adds a response middleware for apolloclient.
 * @param operation Apollo object.
 * @param forward Apollo object to continue executing the next process.
 */
const responseMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    return response;
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
    
  } else if (networkError) {
  }
});
export const client = new ApolloClient({
    link: from([
      errorLink,
      responseMiddleware.concat(authLink).concat(httpLink),
    ]),
    uri,
    cache: new InMemoryCache(),
  });

// export default client;
