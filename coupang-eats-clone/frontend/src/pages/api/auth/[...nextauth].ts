import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import dotenv from 'dotenv'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import mongoClient from '@/lib/mongoClient'
dotenv.config()

const providers = []

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    })
  )
}

export const authOptions: NextAuthOptions = {
  providers,
  adapter: MongoDBAdapter(mongoClient),
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}

export default NextAuth(authOptions)
