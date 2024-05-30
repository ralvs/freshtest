import { Button, Tooltip } from '@mui/material'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { checkTokenCookie } from '@/lib/helpers'

const sx = {
  navContainer: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

const TopNav = async () => {
  const cookie = cookies().get(process.env.COOKIE_NAME!)
  const user = await checkTokenCookie(cookie)

  return (
    <nav>
      <Container maxWidth='md' sx={sx.navContainer}>
        <Tooltip title='Home' placement='bottom'>
          <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant='h5'>Fresh Test App</Typography>
          </Link>
        </Tooltip>

        {user ? (
          <Tooltip title='Profile' placement='bottom'>
            <Link href='/profile'>
              <Avatar alt='Renan Alves' src='/avatar.jpg' />
            </Link>
          </Tooltip>
        ) : (
          <Link href='/login'>
            <Button variant='contained' color='primary'>
              Login
            </Button>
          </Link>
        )}
      </Container>
      <Divider sx={{ pt: 1 }} />
    </nav>
  )
}

export default TopNav
