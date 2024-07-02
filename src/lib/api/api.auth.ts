import instance from "@/lib/api/axios.instances";
import { IUser } from "@/lib/types/IUser";

export class AuthApi {
  static async registration(
    payload: { login: string; password: string } | FormData,
  ) {
    const res = await instance.post<IUser & { message: string }>(
      `/registration`,
      payload,
    );
    return res.data;
  }
  static async login(payload: { login: string; password: string }) {
    const res = await instance.post<
      { user: IUser; accessToken: string } & { message: string }
    >(`/login`, payload);
    return res.data;
  }

  static async edit(
    payload: { login?: string; password?: string },
    accessToken: string,
  ) {
    const res = await instance.put<IUser>(`/edit`, payload, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res.data;
  }

  static async editImage(payload: FormData, accessToken: string) {
    const res = await instance.patch<IUser>(`/edit-image`, payload, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res.data;
  }

  static async logout() {
    const res = await instance.post(`/logout`);
    return res.data;
  }
  static async checkAuth(token: string) {
    const res = await instance.get(`/auth`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  }
}
