import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

type PlaylistStateType = {
  currentTrack: null | trackType;
  playlist: trackType[];
  shuffledPlaylist: trackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  filterOptions: {
    author: string[];
    searchValue: string;
  };
  filteredTracks: trackType[];
  initialTracks: trackType[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: true,
  filterOptions: {
    author: [],
    searchValue: "",
  },
  filteredTracks: [],
  initialTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ initialTracks: trackType[] }>
    ) => {
      state.initialTracks = action.payload.initialTracks;
      state.filteredTracks = action.payload.initialTracks;
    },
    toggleIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: trackType; tracksData: trackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracksData;
      state.shuffledPlaylist = [...action.payload.tracksData].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPrevtrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setFilters: (
      state,
      action: PayloadAction<{ author?: string[]; searchValue?: string }>
    ) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        searchValue:
          action.payload.searchValue || state.filterOptions.searchValue,
      };
      state.filteredTracks = state.initialTracks.filter((track) => {
        const hasAuthors = state.filterOptions.author.length != 0;
        const isAuthors = hasAuthors
          ? state.filterOptions.author.includes(track.author)
          : true;
        const hasSearchValue = track.name
          .toLowerCase()
          .includes(state.filterOptions.searchValue?.toLowerCase());
        return isAuthors && hasSearchValue;
      });
    },
  },
});

export const {
  setCurrentTrack,
  setNextTrack,
  setIsShuffle,
  setPrevtrack,
  toggleShuffle,
  toggleIsPlaying,
  setFilters,
  setInitialTracks,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
