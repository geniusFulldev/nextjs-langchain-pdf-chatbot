import providers from './auth-providers';
import { AuthOptions } from 'next-auth';

const AppAuthOptions: AuthOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, credentials, ...rest }) {
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      const { userId, email, name} = token;
      session.user = {
        id: userId as string,
        email,
        name
      }
      return session;
    },
  },
  events: {
    signOut: async(message) => {
      // const { token, session } = message;
      // const { user } = session;
    }
  },
  pages: {
    signIn: '/signin',
    signOut: '/signOut',
  },
};

export default AppAuthOptions;