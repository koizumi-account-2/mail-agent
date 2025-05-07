"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

function SessionUserInfoProvider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SessionUserInfoProvider;
