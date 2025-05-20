import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt', // または 'database'
    maxAge: 60 * 60 * 1, // 秒単位。ここでは30日
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("auth", auth);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') 
      || nextUrl.pathname.startsWith('/manage')
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/login', nextUrl)); // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === '/login' ) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;