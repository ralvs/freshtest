import Link from 'next/link'

import { loginAction } from '@/actions/actions'

const Login = () => {
  return (
    <div>
      <Link href='/'>Home</Link>
      <br />
      <br />

      <h1>Login</h1>
      <br />
      <br />

      <form action={loginAction}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
        <br />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
        <br />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
