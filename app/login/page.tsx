import { Box, Button, Paper, TextField, Typography } from '@mui/material'

import { loginAction } from '@/actions/actions'
// import Loading from '@/components/Loading'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    margin: 'auto',
    width: 300,
  },

  paper: {
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
}

const Login = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant='h3'>Login</Typography>

      <form noValidate autoComplete='off' action={loginAction}>
        <Paper elevation={4} sx={styles.paper}>
          <TextField fullWidth type='email' id='email' label='Email' />
          <TextField fullWidth type='password' id='password' label='Password' />

          <Button
            type='submit'
            color={'primary'}
            variant='contained'
            fullWidth
            // disabled={isSubmitting}
            data-cy='submit-button'
          >
            {/* {isSubmitting ? <Loading /> : 'Login'} */}
            Access
          </Button>
        </Paper>
      </form>
    </Box>
  )
}

export default Login
