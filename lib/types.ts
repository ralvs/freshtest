type User = {
  id: string
  username: string
  email: string
  confirmed: boolean
  blocked: boolean
  role: {
    id: string
    name: string
    description: string
    type: string
  }
}

export type MeType = {
  me: User
}

export type LoginType = {
  data: {
    login: {
      jwt: string
      user: User
    }
  } | void
}
