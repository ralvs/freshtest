'use server'

import { gql } from '@apollo/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getClient } from '@/lib/client'
import { setTokenCookie } from '@/lib/helpers'
import { type LoginType } from '@/lib/types'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type TypeOfSchema = z.infer<typeof LoginSchema>

export const loginAction = async (data: FormData) => {
  // console.log('🚀 ~ data:', data)
  // export const loginAction = async (data: TypeOfSchema) => {
  // validate the data again
  // const result = LoginSchema.safeParse(data)

  // if (result.error) {
  //   console.log(`${Date()} --->>>`, result.error.format())
  //   return { success: false, error: 'There was an error in the data sent. Please try again.' }
  // }

  // run login mutation on GraphQL
  const answer = (await getClient()
    .mutate({
      mutation: gql`
        mutation SIGNIN($identifier: String!, $password: String!) {
          login(input: { identifier: $identifier, password: $password }) {
            jwt
            user {
              id
            }
          }
        }
      `,
      variables: {
        identifier: 'test@freshcells.de', //result.data.email,
        password: 'KTKwXm2grV4wHzW', // result.data.password,
      },
    })
    .catch(err => console.log(err))) as LoginType

  console.log('🚀 ~ answer login:', answer)

  if (!answer || !answer.data || !answer.data.login)
    return { success: false, message: 'Something went wrong with the login. Please try again' }

  const cookieData = setTokenCookie(answer.data.login.user.id, answer.data.login.jwt)
  cookies().set(cookieData)

  revalidatePath('/login')
  redirect('/profile')
}

export const logoutAction = async () => {
  cookies().delete(process.env.COOKIE_NAME!)

  revalidatePath('/')
  redirect('/')
}
