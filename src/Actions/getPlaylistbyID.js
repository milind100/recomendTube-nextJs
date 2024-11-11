"use server";

import connectToDb from "../backend/dbConfig/dbConnect";
import PlaylistModel from "../backend/models/PlalistModel";
import { head } from "../utils/javascript";

export async function getPlaylist(id) {
  try {
    await connectToDb();

    const playlist = await PlaylistModel.find({ _id: id });

    if (!playlist) {
      return {
        message: "Playlist Not Found",
        success: false,
        playlist: null,
      };
    }

    return {
      message: "Playlist Fetched successfully",
      success: true,
      playlist: head(playlist),
    };
  } catch (error) {
    return {
      error: error.message,
      message: "Something went wrong",
      success: false,
    };
  }
}
