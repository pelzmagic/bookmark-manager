import supabase from "./supabase";
import type { LoginCredentials } from "../types/login";
import type { SignUpCredentials } from "../types/login";

export async function login({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signUp({ fullName, email, password }: SignUpCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function sendResetPasswordLink(email: string) {
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/reset-password`,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw new Error(error.message);
  return data;
}
