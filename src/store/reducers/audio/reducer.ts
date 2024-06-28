import { createSlice } from "@reduxjs/toolkit";
import { AudioPlayer } from "@/lib/Audio";
import { ISong } from "@/lib/types/ISong";

interface State {
  player: AudioPlayer | null;
  currentSong: ISong | null;
  currentPlaylist: ISong[] | null;
  currentTime: number;
  currentVolume: number;
  pause: boolean;
  mode: "linear" | "playlist" | "loop";
  pickedSongs: string[];
  selectSearchSongs: ISong[];
  selectSearchSongsCount: number;
  selectPage: number;
  fetching: boolean;
}

const initialState: State = {
  player: null,
  currentSong: null,
  currentPlaylist: null,
  pause: false,
  currentTime: 0,
  currentVolume: 50,
  mode: "linear",
  pickedSongs: [],
  selectSearchSongs: [],
  selectPage: 0,
  selectSearchSongsCount: 0,
  fetching: false,
};

const reducer = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    setPause: (state, action) => {
      state.pause = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setCurrentVolume: (state, action) => {
      state.currentVolume = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setPickedSongs: (state, action) => {
      const id = action.payload;
      if (id === null) {
        state.pickedSongs = [];
        return;
      }
      if (!state.pickedSongs.find((s) => s === id)) {
        state.pickedSongs.push(id);
      } else {
        state.pickedSongs = state.pickedSongs.filter((s) => s !== id);
      }
    },
    setSelectSearchSongs: (state, action) => {
      state.selectSearchSongs = action.payload;
    },
    setSelectSearchSongsCount: (state, action) => {
      state.selectSearchSongsCount = action.payload;
    },
    setSelectPage: (state, action) => {
      state.selectPage = action.payload;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
  },
});

export const {
  setPlayer,
  setCurrentSong,
  setCurrentPlaylist,
  setPause,
  setCurrentVolume,
  setCurrentTime,
  setMode,
  setPickedSongs,
  setSelectSearchSongs,
  setSelectPage,
  setFetching,
  setSelectSearchSongsCount,
} = reducer.actions;
export default reducer.reducer;
