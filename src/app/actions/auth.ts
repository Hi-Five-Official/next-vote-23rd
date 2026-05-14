"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, { path: "/" });
}

export async function deleteAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
}
