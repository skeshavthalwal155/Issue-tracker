import authOptins from '@/app/auth/authOptions'
import NextAuth from 'next-auth'


const handler = NextAuth(authOptins)

export { handler as GET, handler as POST }