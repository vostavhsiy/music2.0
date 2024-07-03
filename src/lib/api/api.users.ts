import instance from "@/lib/api/axios.instances";
import { IUser } from "@/lib/types/IUser";
import { ISong } from "@/lib/types/ISong";

export type UsersSortType = "popular" | "name-asc" | "name-desc";

export class UsersApi {
  static async getUsers(
    page: number,
    search?: string,
    size?: number,
    recommended?: boolean,
    sortBy?: UsersSortType,
  ) {
    const res = await instance.get<
      {
        users: Array<IUser & { _count: { subscribers: number } }>;
        total: number;
      } & { message: string }
    >(
      `/users/${page}?${size ? `size=${size}&` : ""}${
        search ? `search=${search}&` : ""
      }${recommended ? `recommended=${recommended}&` : ""}${
        sortBy ? `sortBy=${sortBy}&` : ""
      }`,
    );

    return res.data;
  }

  static async getUser(id: string) {
    const res = await instance.get<IUser & { message: string; songs: ISong[] }>(
      `/users/profile/${id}`,
    );
    return res.data;
  }

  static async getUserSongs(id: string) {
    const res = await instance.get<ISong[] & { message: string }>(
      `/users/profile/${id}/songs`,
    );

    return res.data;
  }

  static async follow(id: string, token: string) {
    const res = await instance.put<followRes & { message: string }>(
      `/users/profile/${id}/follow`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return res.data;
  }

  static async unfollow(id: string, token: string) {
    const res = await instance.put<unfollowRes & { message: string }>(
      `/users/profile/${id}/unfollow`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return res.data;
  }

  static async getSubscribers(id: string) {
    const res = await instance.get<
      Array<{ subscriber: IUser }> & { message: string }
    >(`/users/profile/${id}/subscribers`);
    return res.data;
  }

  static async getSubscribes(id: string) {
    const res = await instance.get<
      Array<{ subscribed: IUser }> & { message: string }
    >(`/users/profile/${id}/subscribes`);
    return res.data;
  }
}

export interface followRes {
  followData: {
    subscriber: IUser;
    subscribed: IUser;
  };
  userId: string;
}

export interface unfollowRes {
  userId: string;
}
