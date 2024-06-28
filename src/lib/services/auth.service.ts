import { AuthApi } from "@/lib/api/api.auth";
import { cookies } from "next/headers";
import { UsersApi } from "@/lib/api/api.users";
import { getAccessToken } from "@/actions/auth.actions";
import { IUser } from "@/lib/types/IUser";

export const auth = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken)
    return {
      isAuth: false,
    };
  try {
    const user = await AuthApi.checkAuth(accessToken);
    return {
      isAuth: true,
      userId: user.id,
    };
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return {
      isAuth: false,
      message: error.message,
    };
  }
};

export const currentUser = async (): Promise<IUser | null> => {
  const { isAuth, userId } = await auth();
  if (isAuth && userId) {
    try {
      const user = await UsersApi.getUser(userId);
      if (user.message) {
        return null;
      }
      return user;
    } catch (err) {
      const error = err as Error;
      return null;
    }
  }
  return null;
};
