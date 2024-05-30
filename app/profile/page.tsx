import { gql } from '@apollo/client'
import Link from 'next/link'

import { logoutAction } from '@/actions/actions'
import { getClient } from '@/lib/client'
import { type MeType } from '@/lib/types'

export const dynamic = 'force-dynamic'

const USER = gql`
  query someuser {
    user(id: 2) {
      id
      firstName
      lastName
    }
  }
`

const Profile = async () => {
  const { data } = await getClient().query<{ data: MeType }>({ query: USER })

  return (
    <div>
      <Link href='/'>Home</Link>
      <br />
      <br />

      <h1>Profile</h1>
      <p>{JSON.stringify(data)}</p>

      <form action={logoutAction}>
        <button type='submit'>Logout</button>
      </form>
    </div>
  )
}

export default Profile
