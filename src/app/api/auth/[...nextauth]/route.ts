import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables"
  );
}

declare module "next-auth" {
  interface Session {
    user?: {
      username?: string | null;
      uid?: string | null;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.username =
          session.user?.name?.split(" ").join("").toLocaleLowerCase() || null;
        session.user.uid = token.sub || null;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
