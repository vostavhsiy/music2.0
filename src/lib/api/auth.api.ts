import instance from "@/api/axios.instances";
import { IUser } from "@/types/IUser";

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
  static async logout() {
    const res = await instance.post(`/logout`);
    return res.data;
  }
  static async checkAuth() {
    const res = await instance.get<
      { userId: string; accessToken: string } & { message: string }
    >(`/refresh`);
    return res.data;
  }
}
