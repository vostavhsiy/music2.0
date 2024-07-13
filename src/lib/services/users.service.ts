"use server";

import { UsersApi, UsersSortType } from "@/lib/api/api.users";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getAccessToken } from "@/actions/auth.actions";
import { auth } from "@/lib/services/auth.service";
import { AudioApi } from "@/lib/api/api.audio";

export const getUsersPage = async (
  page?: number,
  search?: string,
  size?: number,
  sortBy?: UsersSortType,
) => {
  try {
    const res = await UsersApi.getUsers(page || 0, search, size, false, sortBy);
    if (res.message) {
      return null;
    }
    return { users: res.users, total: res.total };
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return null;
  }
};

export const getRecommendedUsers = async () => {
  const { userId } = await auth();
  try {
    const res = await UsersApi.getUsers(0, undefined, 5, true);
    if (res.message) {
      console.log(res.message);
      return null;
    }
    if (userId) {
      if (res.users.find((user) => user.id === userId)) {
        return res.users.filter((user) => user.id !== userId);
      }
      return res.users.slice(0, res.users.length - 1);
    }
    return res.users.slice(0, res.users.length - 1);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return null;
  }
};

export const getSubscribes = async () => {
  const { userId } = await auth();
  if (userId) {
    try {
      const res = await UsersApi.getSubscribes(userId);
      if (res.message) {
        console.log(res.message);
        return null;
      }
      return res.map((u) => u.subscribed);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return null;
    }
  }
  return null;
};

export const delay = async (ms = 5001) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};

export const follow = async (id: string) => {
  const accessToken = await getAccessToken();
  if (!accessToken) return;
  try {
    const res = await UsersApi.follow(id, accessToken);
    if (res.message) {
      console.log(res.message);
      return null;
    }
    revalidatePath("/users/[page]", "page");
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return null;
  }
};

export const unfollow = async (id: string) => {
  const accessToken = await getAccessToken();
  if (!accessToken) return;
  try {
    const res = await UsersApi.unfollow(id, accessToken);
    if (res.message) {
      console.log(res.message);
      return null;
    }
    revalidatePath("/users/[page]", "page");
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return null;
  }
};

export const getProfile = async (id: string) => {
  try {
    return await UsersApi.getUser(id);
  } catch (e) {
    return null;
  }
};
