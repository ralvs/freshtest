import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, type NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { cookies } from 'next/headers'

import { checkTokenCookie } from './helpers'

export const { getClient } = registerApolloClient(() => {
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

  const link = ApolloLink.from([authLink, httpLink])

  return new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
    link,
  })
})
