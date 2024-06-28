"use server";

import { AuthApi } from "@/lib/api/api.auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IUser } from "@/lib/types/IUser";

export const registration = async (payload: FormData) => {
  try {
    const user = await AuthApi.registration(payload);
    if (user.message) {
      console.log(user.message);
      return false;
    }
    revalidatePath("/users/[page]", "page");
    return user as IUser;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return false;
  }
};

export const login = async (payload: { login: string; password: string }) => {
  try {
    const { user, accessToken } = await AuthApi.login(payload);

    cookies().set("accessToken", accessToken);

    return user;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return false;
  }
};

export const logout = async () => {
  try {
    cookies().delete("accessToken");
    revalidatePath("/");
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return false;
  }
};

export const getAccessToken = async () => {
  const cks = cookies();
  const accessToken = await cks.get("accessToken")?.value;
  if (!accessToken) return null;
  return accessToken;
};

export const updatePaths = async (paths: string[]) => {
  paths.forEach((path) => {
    revalidatePath(path, "page");
  });
};

export const redirectToPage = async (page: string) => {
  redirect(page);
};
