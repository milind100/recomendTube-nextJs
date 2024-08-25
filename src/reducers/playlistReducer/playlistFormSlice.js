import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { playlistForms } from "../../utils/constants";

const playlistItem = {
  link: "",
  videoTitle: "",
  youtubeChannelName: "",
  linkError: false,
};

const playlistObj = {
  title: "",
  domain: "",
  description: "",
  videoList: [
    { id: uuidv4(), ...playlistItem },
    { id: uuidv4(), ...playlistItem },
  ],
};

const initialState = {
  [playlistForms?.create]: {
    ...playlistObj,
  },
  [playlistForms?.edit]: {
    ...playlistObj,
  },
};

const playlistFormSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearPlaylistFormData: (state) => {
      state = initialState;
      return state;
    },
    resetPlaylistFormSlice: (state, action) => {
      const { formType } = action.payload;
      state[formType] = playlistObj;
    },
    setPlaylistHead: (state, action) => {
      const { title, domain, description, formType } = action.payload;
      const newState = { ...state?.[formType] };
      newState.title = title;
      newState.domain = domain;
      newState.description = description;
      state[formType] = newState;
    },
    addItemToVideoList: (state, action) => {
      const { formType } = action.payload;
      const newState = { ...state?.[formType] };

      newState.videoList.push({ id: uuidv4(), ...playlistItem });
      state[formType] = newState;
    },
    deleteItemFromVideoList: (state, action) => {
      const { id, formType } = action.payload;
      const newState = { ...state?.[formType] };
      newState.videoList = newState?.videoList?.filter(
        (item) => item?.id !== id
      );
      state[formType] = newState;
    },
    editVideoListItem: (state, action) => {
      const { id, field, value, linkError, formType } = action.payload;
      const newState = { ...state[formType] };
      const index = newState.videoList.findIndex((cur) => cur.id === id);
      if (index !== -1) {
        newState.videoList[index][field] = value;
        if (field === "link") {
          newState.videoList[index].linkError = linkError;
        }
      }
      state[formType] = newState;
    },
    setPlaylistEditForm: (state, action) => {
      const { _id, title, domain, description, videoList } = action.payload;

      state[playlistForms?.edit] = {
        id: _id,
        title,
        domain,
        description,
        videoList: videoList?.map((cur) => ({ ...cur, id: cur?._id })),
      };
    },
  },
});

export const {
  clearPlaylistFormData,
  setPlaylistHead,
  addItemToVideoList,
  deleteItemFromVideoList,
  editVideoListItem,
  resetPlaylistFormSlice,
  setPlaylistEditForm,
} = playlistFormSlice.actions;

export default playlistFormSlice.reducer;
