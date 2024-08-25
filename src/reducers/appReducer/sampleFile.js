import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk that fetches playlists and uses getState and dispatch
export const fetchPlaylists = createAsyncThunk(
  "app/fetchPlaylists",
  async (params, { getState, dispatch }) => {
    // Access current state
    const currentPage = getState().app.homePlaylists.page;

    // You can dispatch other actions if needed
    dispatch(startLoading("fetchPlaylists"));

    // Fetch data
    const response = await fetch(`/api/playlists?page=${currentPage}`);
    const data = await response.json();

    // You can conditionally dispatch based on the fetched data
    if (data.error) {
      throw new Error(data.error);
    }

    // Example of dispatching another action after data is fetched
    dispatch(stopLoading("fetchPlaylists"));

    return data;
  }
);

const initialState = {
  loaders: {},
  homePlaylists: { page: 0, playlistArray: [] },
  searchedPlaylists: {
    page: 0,
    playlistArray: [],
  },
  error: null,
};

const appsddsdsdSlice = createSlice({
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.loaders["fetchPlaylists"] = true;
        state.error = null;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.loaders["fetchPlaylists"] = false;
        state.homePlaylists.playlistArray = action.payload.playlistArray;
        state.homePlaylists.page = action.payload.page;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loaders["fetchPlaylists"] = false;
        state.error = action.error.message;
      });
  },
});

export const { startLoading, stopLoading } = appsddsdsdSlice.actions;

export default appsddsdsdSlice.reducer;
