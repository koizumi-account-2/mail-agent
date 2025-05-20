// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { initializeUser } from "./lib/actions/user";


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid profile email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("User signed in:", user, account, profile, email, credentials);
      if (account?.refresh_token && user?.email) {
        await initializeUser(user?.email, account?.refresh_token);
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user && account?.id_token) {
        token.idToken = account.id_token;
      }
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (account?.refresh_token) {
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ token, session }) {
      session.idToken = token.idToken;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});