import type { JWT } from "next-auth/jwt";

// Session を拡張
declare module "next-auth" {
  interface Session {
    idToken: string;
    accessToken: string;
    refreshToken: string;
  }
}

// JWT を拡張
declare module "next-auth/jwt" {
  interface JWT {
    idToken: string;
    accessToken: string;
    refreshToken: string;
  }
}