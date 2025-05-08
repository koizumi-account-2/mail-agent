"use client";
import React, { useActionState } from "react";

import { googleAuthenticate } from "@/lib/actions/authenticate";
export default function LoginPage() {
  const [, formAction] = useActionState(googleAuthenticate, undefined);
  return (
    <form action={formAction}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
