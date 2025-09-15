import { DefaultSession, DefaultUser } from 'next-auth'
import { Role, Organization } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      organizationId?: string
      organization?: Organization
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: Role
    organizationId?: string
  }
}
