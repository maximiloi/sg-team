import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Валидация обязательных переменных окружения
if (!process.env.AUTH_SECRET) {
  throw new Error(
    'AUTH_SECRET не задан в переменных окружения. Сгенерируйте командой:\n' +
      '  openssl rand -base64 32\n' +
      'или:\n' +
      "  node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\"",
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL не задан в переменных окружения');
}

if (!process.env.NEXTAUTH_URL) {
  throw new Error('NEXTAUTH_URL не задан в переменных окружения');
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log('[Auth] Attempting login for:', credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log('[Auth] Missing credentials');
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        console.log('[Auth] User found:', user ? 'yes' : 'no');
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password as string, user.password);
        console.log('[Auth] Password valid:', isValid);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
});
