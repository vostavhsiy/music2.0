import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setFetching,
  setSelectSearchSongs,
  setSelectSearchSongsCount,
} from "@/store/reducers/audio/reducer";
import { AudioApi } from "@/lib/api/api.audio";

export const getSongs = createAsyncThunk<
  any,
  { page: number; search?: string; size?: number }
>("playlists/songs", async ({ page, search, size }, { dispatch }) => {
  dispatch(setFetching(true));
  try {
    const res = await AudioApi.getSongs(page, size, search);
    if (!res.message) {
      dispatch(setSelectSearchSongs(res.songs));
      dispatch(setSelectSearchSongsCount(res.total));
    }
  } catch (e) {
    const err = e as Error;
    console.log(err.message);
  }
  dispatch(setFetching(false));
});
