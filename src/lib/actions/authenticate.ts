"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
export const googleAuthenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("google");

  } catch (error) {
    if (error instanceof AuthError) {
      return "Failed";
    }
    throw error;
  }
};