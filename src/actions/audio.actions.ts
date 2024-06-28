"use server";

import { currentUser } from "@/lib/services/auth.service";
import { AudioApi } from "@/lib/api/api.audio";
import { revalidatePath } from "next/cache";
import { ISong } from "@/lib/types/ISong";
import { getAccessToken } from "@/actions/auth.actions";
import { IPlaylist } from "@/lib/types/IPlaylist";

export const deleteSong = async (id: string, imageEtc?: string) => {
  const user = await currentUser();
  const accessToken = await getAccessToken();
  if (!user || !accessToken) return false;
  try {
    const res = await AudioApi.deleteSong({ id, imageEtc }, accessToken);
    if (res.message) {
      console.log(res.message);
      return false;
    }
    revalidatePath("/profile/[id]", "page");
    revalidatePath("/songs/[page]", "page");
    return res as { song: ISong; id: string };
  } catch (e) {
    const err = e as Error;
    console.log(err.message);
    return false;
  }
};

export const createSong = async (data: FormData) => {
  const user = await currentUser();
  const accessToken = await getAccessToken();
  if (!user || !accessToken) return false;
  try {
    const res = await AudioApi.addSong(data, accessToken);
    if (res.message) {
      console.log(res.message);
      return false;
    }
    revalidatePath("/profile/[id]", "page");
    revalidatePath("/songs/[page]", "page");
    return res as ISong;
  } catch (e) {
    const err = e as Error;
    console.log(err.message);
    return false;
  }
};

export const createPlaylist = async (
  data:
    | {
        title: string;
        songs: Array<{ id: string }>;
      }
    | FormData
) => {
  const user = await currentUser();
  const accessToken = await getAccessToken();
  if (!user || !accessToken) return false;
  try {
    const res = await AudioApi.createPlaylist(data, accessToken);
    if (res.message) {
      console.log(res.message);
      return false;
    }
    revalidatePath("/profile/[id]", "page");
    revalidatePath("/playlists/[page]", "page");
    return res as IPlaylist;
  } catch (e) {
    const err = e as Error;
    console.log(err.message);
    return false;
  }
};

export const deletePlaylist = async (id: string, imageEtc: string) => {
    const user = await currentUser();
  const accessToken = await getAccessToken();
  if (!user || !accessToken) return false;
  try {
    const res = await AudioApi.deletePlaylist(id, imageEtc, accessToken);
    if (res.message) {
      console.log(res.message);
      return false;
    }
    revalidatePath("/profile/[id]", "page");
    revalidatePath("/playlists/[page]", "page");
    return res;
  } catch (e) {
    const err = e as Error;
    console.log(err.message);
    return false;
  }
};

export const addListenToSong = async (songId: string) => {
  const user = await currentUser();
  const accessToken = await getAccessToken();
  if (!user || !accessToken) return false;
  try {
    const res = await AudioApi.addListenToSong(songId, user.id, accessToken);
    revalidatePath("/profile/[id]", "page");
    revalidatePath("/songs/[page]", "page");
    revalidatePath("/playlists/[page]", "page");
    return res;
  } catch (e) {
    const err = e as Error;
    console.log(err.message + " - listen");
    return false;
  }
};
