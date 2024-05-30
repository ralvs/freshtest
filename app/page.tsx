// import ClientTest from "./ClientTest";
import { cookies } from 'next/headers'
import Link from 'next/link'

import { checkTokenCookie } from '@/lib/helpers'

export default async function Home() {
  const cookie = cookies().get(process.env.COOKIE_NAME!)
  const user = await checkTokenCookie(cookie)

  return (
    <main>
      <h1>Welcome!</h1>

      {user ? (
        <>
          <h3>you are logged</h3>
          <Link href='/profile'>Your profile</Link>
        </>
      ) : (
        <>
          <p>Please go login</p>
          <Link href='/login'>Access</Link>
        </>
      )}
    </main>
  )
}
