import { gql } from '@apollo/client'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { cookies } from 'next/headers'

import { logoutAction } from '@/actions/actions'
import { getClient } from '@/lib/ApolloClient'
import { type User } from '@/lib/graphqlTypes'
import { checkTokenCookie } from '@/lib/helpers'

export const dynamic = 'force-dynamic'

const USER = gql`
  query USER($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
    }
  }
`

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    margin: 'auto',
  },

  paper: {
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: 250,
  },
}

const Profile = async () => {
  const cookie = cookies().get(process.env.COOKIE_NAME!)
  const user = await checkTokenCookie(cookie)

  const { data } = await getClient().query<{ user: User }>({ query: USER, variables: { id: user?.userId } })

  return (
    <Box sx={styles.container}>
      <Typography variant='h3'>Profile</Typography>

      <Paper elevation={4} sx={styles.paper}>
        <TextField fullWidth label='First Name' defaultValue={data.user?.firstName} disabled />
        <TextField fullWidth label='Last Name' defaultValue={data.user?.lastName} disabled />
      </Paper>

      <form action={logoutAction}>
        <Button type='submit' variant='contained'>
          Logout
        </Button>
      </form>
    </Box>
  )
}

export default Profile
