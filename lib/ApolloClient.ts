// based on https://github.com/apollographql/apollo-client-nextjs
// its a experimental version supporting RSC

import { HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support'
import { cookies } from 'next/headers'

import { checkTokenCookie } from './helpers'

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: 'https://cms.trial-task.k8s.ext.fcse.io/graphql',
    credentials: 'include', // This sends cookies to the server
  })

  const authLink = setContext(async (_, { headers }) => {
    const cookie = cookies().get(process.env.COOKIE_NAME!)
    const user = await checkTokenCookie(cookie)

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        ...headers,
        Authorization: user ? `Bearer ${user.jwtToken}` : '',
      },
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })
})
