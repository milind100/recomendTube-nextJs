import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formReducer/formSlice";
import appReducer from "./appReducer/appSlice";
import playlistFormSlice from "./playlistReducer/playlistFormSlice";

const store = () => {
  return configureStore({
    reducer: {
      form: formReducer,
      app: appReducer,
      playlistForm: playlistFormSlice,
    },
  });
};

export default store;
