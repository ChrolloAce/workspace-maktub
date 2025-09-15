import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { db } from '@/lib/db'
import { Role } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    ...(process.env.EMAIL_SERVER_HOST ? [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
          auth: {
            user: process.env.EMAIL_SERVER_USER || '',
            pass: process.env.EMAIL_SERVER_PASSWORD || '',
          },
        },
        from: process.env.EMAIL_FROM || 'noreply@example.com',
      })
    ] : []),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          include: { organization: true },
        })
        
        session.user.id = user.id
        session.user.role = dbUser?.role || Role.AGENT
        session.user.organizationId = dbUser?.organizationId || undefined
        session.user.organization = dbUser?.organization || undefined
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.role = user.role
        token.organizationId = user.organizationId
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
}

export function hasRole(userRole: Role, requiredRole: Role): boolean {
  const roleHierarchy = {
    [Role.CLIENT]: 0,
    [Role.AGENT]: 1,
    [Role.MANAGER]: 2,
    [Role.ADMIN]: 3,
    [Role.OWNER]: 4,
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}
