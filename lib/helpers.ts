import { jwtVerify } from 'jose' // this library is supported by next.js middleware
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const simulateDelay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

const MAX_AGE = 60 * 60 * 24 * 365 // 1 year
const { COOKIE_NAME, JWT_SECRET } = process.env

export function setTokenCookie(userId: string, jwtToken: string) {
  const token = jwt.sign({ userId, jwtToken }, JWT_SECRET!)

  const params = {
    name: COOKIE_NAME!,
    value: token,
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  }

  return params
}

export async function verifyUserCookie() {
  const ck = cookies().get(process.env.COOKIE_NAME!)

  if (!ck) return undefined

  try {
    const verified = await jwtVerify(ck.value, new TextEncoder().encode(JWT_SECRET))
    return { userId: verified.payload.userId, jwtToken: verified.payload.jwtToken as string }
  } catch (e) {
    console.error(e)
    return undefined
  }

  // does not work at next.js middleware
  // try {
  //   const { userId, jwtToken } = jwt.verify(ck.value, JWT_SECRET!) as { userId: string; jwtToken: string }
  //   return { userId, jwtToken }
  // } catch (e) {
  //   console.error(e)
  //   return undefined
  // }
}
