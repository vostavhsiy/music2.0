import { AudioApi, SongSortType } from "@/lib/api/api.audio";

export const getSongsPage = async (
  page?: number,
  search?: string,
  size?: number,
  sortBy?: SongSortType,
) => {
  try {
    const res = await AudioApi.getSongs(page || 0, size, search, sortBy);
    if (res.message) {
      return null;
    }
    return { songs: res.songs, total: res.total };
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return null;
  }
};

export const getPlaylistPage = async (
  page?: number,
  search?: string,
  size?: number,
) => {
  try {
    const res = await AudioApi.getPlaylists(page || 0, size, search);
    if (res.message) {
      return null;
    }
    return { playlists: res.playlists, total: res.total };
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return null;
  }
};

export const getPopularSongs = async () => {
  try {
    const res = await AudioApi.getSongs(0, 12, undefined, "listens");
    if (res.message) {
      console.log(res.message);
      return null;
    }
    return res.songs;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return null;
  }
};

export const getPopularPlaylists = async () => {
  try {
    const res = await AudioApi.getPlaylists(0, 12, undefined, "popular");
    if (res.message) {
      console.log(res.message);
      return null;
    }
    return res.playlists;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return null;
  }
};

export async function downloadAudio(src: string, title: string) {
  try {
    const file = await AudioApi.getSongFile(src);
    const binaryData = new Uint8Array(file);
    const blob = new Blob([binaryData], {
      type: "audio/ogg; codecs=opus",
    });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = title;
    link.click();
    return file;
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    throw error;
  }
}

export const getPlaylist = async (id: string) => {
  try {
    return await AudioApi.getPlaylist(id);
  } catch (e) {
    return null;
  }
};
