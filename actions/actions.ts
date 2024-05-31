'use server'

import { gql } from '@apollo/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getClient } from '@/lib/ApolloClient'
import { type LoginType } from '@/lib/graphqlTypes'
import { setTokenCookie } from '@/lib/helpers'

import { LoginSchema, type LoginSchemaType } from './schemas'

export const loginAction = async (data: LoginSchemaType) => {
  // validate the data again
  const result = LoginSchema.safeParse(data)

  if (result.error) {
    console.log(`${Date()} --->>>`, result.error.format()) // for logging porpuses
    const errorMessages = result.error.errors.map(error => error.message)
    return { success: false, msg: errorMessages.join(', ') }
  }

  // run login mutation on GraphQL
  const LOGIN = gql`
    mutation SIGNIN($identifier: String!, $password: String!) {
      login(input: { identifier: $identifier, password: $password }) {
        jwt
        user {
          id
        }
      }
    }
  `

  try {
    const answer = (await getClient().mutate({
      mutation: LOGIN,
      variables: {
        identifier: result.data.email,
        password: result.data.password,
        // for testing and dont have to type every time. In a real repository, this would be in a .env file
        // identifier: 'test@freshcells.de',
        // password: 'KTKwXm2grV4wHzW',
      },
    })) as LoginType

    if (!answer || !answer.data || !answer.data.login) return { success: false, msg: 'Nothing found' }

    const cookieData = setTokenCookie(answer.data.login.user.id, answer.data.login.jwt)
    cookies().set(cookieData)

    return { success: true, msg: 'Login successful' }
  } catch (err) {
    return { success: false, msg: 'Email or password invalid. Please try again' }
  }

  // this works fine but output some errors in the browser console because its a Client Component and client does not really get a response
  // redirect('/profile')
}

export const logoutAction = async () => {
  cookies().delete(process.env.COOKIE_NAME!)

  revalidatePath('/profile')
  redirect('/login')
}
