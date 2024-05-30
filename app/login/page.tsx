'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

import { loginAction } from '@/actions/actions'
import { LoginSchema, type LoginSchemaType } from '@/actions/schemas'
import Loading from '@/components/Loading'

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

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (data: LoginSchemaType) => {
    const result = await loginAction(data)
    console.log('🚀 ~ result:', result)

    if (result?.error) toast.error(result?.error)
    else toast.success('Welcome back!')
  })

  return (
    <Box sx={styles.container}>
      <Typography variant='h3'>Login</Typography>

      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Paper elevation={4} sx={styles.paper}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                color='secondary'
                // required
                fullWidth
                type='email'
                id='email'
                label='Email'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                color='secondary'
                // required
                fullWidth
                type='password'
                id='password'
                label='Password'
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button
            type='submit'
            color={'primary'}
            variant='contained'
            fullWidth
            disabled={isSubmitting}
            data-cy='submit-button'
          >
            {isSubmitting ? <Loading /> : 'Access'}
          </Button>
        </Paper>
      </form>
    </Box>
  )
}

export default Login
