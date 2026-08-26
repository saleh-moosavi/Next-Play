"use server";

import { cookies } from "next/headers";

interface CookieOptions {
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  path?: string;
  domain?: string;
}

export async function setCookie(value: string, options: CookieOptions = {}) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "next-play-user-data",
    value,
    maxAge: options.maxAge ?? 60 * 60 * 24,
    httpOnly: options.httpOnly ?? false,
    secure: options.secure ?? process.env.NODE_ENV === "production",
    sameSite: options.sameSite ?? "lax",
    path: options.path ?? "/",
    ...(options.domain && { domain: options.domain }),
  });
}

export async function getCookie() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("next-play-user-data");
  return cookie?.value || null;
}

export async function deleteCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("next-play-user-data");
}
