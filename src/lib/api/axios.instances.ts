import { ISong } from "@/types/ISong";
import { IUser } from "@/types/IUser";
import axios from "axios";
import { IPlaylist } from "@/types/IPlaylist";

const instance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

instance.interceptors.request.use((value) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("music-token");
    if (token) {
      value.headers.Authorization = `Bearer ${token}`;
    }
  }
  return value;
});

instance.interceptors.response.use(
  (value) => value,
  async (error) => {
    const config = error.config;
    if (
      config &&
      error.response &&
      error.response.status === 401 &&
      !config.isSent
    ) {
      try {
        const { data } = await axios.get<{
          userId: string;
          accessToken: string;
        }>("http://localhost:5001/refresh", { withCredentials: true });
        localStorage.setItem("music-token", data.accessToken);
        config.isSent = true;
        return instance.request(config);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  },
);

export default instance;
