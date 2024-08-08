import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { Profile as NextAuthProfile, User as NextAuthUser } from 'next-auth';

interface DiscordProfile extends NextAuthProfile {
  id: string;
}

interface CustomUser extends NextAuthUser {
  discordId?: string;
}

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      const discordProfile = profile as DiscordProfile;
      if (account && discordProfile) {
        token.id = discordProfile.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as CustomUser).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
});

export { handler as GET, handler as POST };