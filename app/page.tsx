// import ClientTest from "./ClientTest";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default function Home() {
  // Review: check JWT
  const ck = cookies().get('freshcells')

  return (
    <main>
      <h1>Welcome!</h1>

      {ck ? (
        <>
          <h3>you are logged</h3>
          <Link href='/profile'>Your profile</Link>
        </>
      ) : (
        <>
          <h3>Please go login</h3>
          <Link href='/login'>Access</Link>
        </>
      )}
    </main>
  )
}
