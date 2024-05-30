// copied from the generated types in the graphql playground

export type User = {
  id: string
  created_at: Date
  updated_at: Date
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  // role: UsersPermissionsRole
  firstName: string
  lastName: string
}

type UserMe = {
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
  me: UserMe
}

export type LoginType = {
  data: {
    login: {
      jwt: string
      user: UserMe
    }
  } | void
}
