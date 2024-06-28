import instance from "@/api/axios.instances";
import { IUser } from "@/types/IUser";
import { ISong } from "@/types/ISong";

export class UsersApi {
  static async getUsers(page: number, size?: number, search?: string) {
    const res = await instance.get<
      { users: IUser[]; total: number } & { message: string }
    >(
      `/users/${page}?${size ? `size=${size}&` : ""}${
        search ? `search=${search}&` : ""
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

  static async follow(id: string) {
    const res = await instance.post<
      {
        followData: { subscriber: IUser; subscribed: IUser };
        userId: string;
      } & { message: string }
    >(`/users/profile/${id}/follow`);

    return res.data;
  }

  static async unfollow(id: string) {
    const res = await instance.post<
      {
        followData: { subscriber: IUser; subscribed: IUser };
        userId: string;
      } & { message: string }
    >(`/users/profile/${id}/unfollow`);

    return res.data;
  }

  static async getUserSubscribes(id: string) {
    const res = await instance.get<
      {
        userId: string;
      } & { message: string }
    >(`/users/profile/${id}/subscribes`);

    return res.data;
  }

  static async getUserSubscribers(id: string) {
    const res = await instance.get<
      {
        userId: string;
      } & { message: string }
    >(`/users/profile/${id}/subscribers`);

    return res.data;
  }
}
