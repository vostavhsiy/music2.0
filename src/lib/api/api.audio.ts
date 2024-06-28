import { ISong } from "../types/ISong";
import instance from "./axios.instances";
import { IUser } from "@/lib/types/IUser";
import { IPlaylist } from "@/lib/types/IPlaylist";
import { delay } from "@/lib/services/users.service";
import axios from "axios";

export class AudioApi {
  static async getSongs(page: number, size?: number, search?: string) {
    const res = await instance.get<
      { songs: ISong[]; total: number } & { message: string }
    >(
      `/songs/${page}?${size ? `size=${size}&` : ""}${
        search ? `search=${search}&` : ""
      }`,
    );
    return res.data;
  }

  static async addSong(
    payload:
      | {
          file: string | File | FormData;
          image: File;
          title: string;
          author: string;
        }
      | FormData,
    accessToken: string,
  ) {
    const res = await instance.post<ISong & { message: string }>(
      `/songs`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      },
    );
    return res.data;
  }

  static async deleteSong(
    { id, imageEtc }: { id: string; imageEtc?: string },
    accessToken: string,
  ) {
    const res = await instance.delete<
      { song: ISong; id: string } & { message: string }
    >(`/song/${id}${imageEtc ? `?imageEtc=${imageEtc}` : ""}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return res.data;
  }

  static async getSong(id: string) {
    const res = await instance.get<ISong & { message: string }>(`/song/${id}`);

    return res.data;
  }

  static async getSongFile(src: string) {
    //const res = await instance.get<string>("/songs/file/" + id);
    const res = await axios.get<ArrayBuffer>(src, {
      withCredentials: true,
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "audio/wav",
      },
    });
    return res.data;
  }

  static async getPlaylists(page: number, size?: number, search?: string) {
    const res = await instance.get<
      { playlists: IPlaylist[]; total: number } & { message: string }
    >(
      `/playlists/${page}?${size ? `size=${size}&` : ""}${
        search ? `search=${search}&` : ""
      }`,
    );
    return res.data;
  }

  static async getPlaylist(id: string) {
    const res = await instance.get<IPlaylist & { message: string }>(
      `/playlist/${id}`,
    );

    return res.data;
  }
  static async createPlaylist(
    payload: { title: string; songs: Array<{ id: string }> } | FormData,
    accessToken: string,
  ) {
    const res = await instance.post<IPlaylist & { message: string }>(
      "/playlists",
      payload,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      },
    );
    return res.data;
  }

  static async deletePlaylist(
    id: string,
    imageEtc: string,
    accessToken: string,
  ) {
    const res = await instance.delete<
      { playlist: IPlaylist; id: string } & { message: string }
    >(`/playlists/${id}?imageEtc=${imageEtc}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res.data;
  }

  static async addSongToPlaylist(id: string, songId: string) {
    const res = await instance.put(`/playlists/song/${id}`, { songId });

    return res.data;
  }

  static async removeSongFromPlaylist(id: string, songId: string) {
    const res = await instance.delete(`/playlists/${id}/song/${songId}`);

    return res.data;
  }

  static async addListenToSong(
    songId: string,
    userId: string,
    accessToken: string,
  ) {
    const res = await instance.patch<{ song: ISong }>(
      `/song/${songId}/listen/${userId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      },
    );
    return res.data;
  }
}
