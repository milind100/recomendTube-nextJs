import { createSlice } from "@reduxjs/toolkit";
import { homePage, myLibrary } from "../../utils/constants";

export const nullPlaylistState = { pagination: {}, libraryArray: null };

const initialState = {
  loaders: {},
  homePage: {
    [homePage?.homeLists]: { pagination: {}, libraryArray: null },
    [homePage?.searchlist]: {
      pagination: {},
      libraryArray: null,
    },
  },
  [myLibrary]: { pagination: {}, libraryArray: null },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.loaders[action.payload] = true;
    },
    stopLoading: (state, action) => {
      state.loaders[action.payload] = false;
    },
    clearAppData: (state) => {
      state = initialState;
      return state;
    },
    clearAllListData: (state) => {
      state = { ...initialState, ...state.loaders };
      return state;
    },
    resetHomeSearchState: (state) => {
      state.homePage[homePage?.searchlist] = nullPlaylistState;
    },
    setHomePageData: (state, action) => {
      const { pagination, list, stateName } = action.payload;
      const newState = { ...state.homePage?.[stateName] };

      newState.pagination = pagination;

      newState.libraryArray =
        newState?.pagination?.currentPage === 1
          ? [...list]
          : [...newState.libraryArray, ...list];

      state.homePage[stateName] = newState;
    },

    setMyPlayListData: (state, action) => {
      const { pagination, list } = action.payload;

      const newState = { ...state[myLibrary] };

      newState.pagination = pagination;
      newState.libraryArray =
        newState?.pagination?.currentPage === 1
          ? [...list]
          : [...newState.libraryArray, ...list];

      state[myLibrary] = newState;
    },
    DeleteFromMyPlaylist: (state, action) => {
      const { id } = action.payload;
      const newLibraryArray = state[myLibrary].libraryArray?.filter(
        ({ _id }) => id !== _id
      );

      state[myLibrary].libraryArray = newLibraryArray;
    },
  },
});

export const {
  clearAppData,
  startLoading,
  stopLoading,
  setHomePageData,
  setMyPlayListData,
  clearAllListData,
  DeleteFromMyPlaylist,
  resetHomeSearchState,
} = appSlice.actions;

export default appSlice.reducer;
