import mongoose from "mongoose";

const listItemSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, "Link is required"],
  },
  videoTitle: {
    type: String,
  },
  youTubeChannel: {
    type: String,
  },
});

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is mandatory"],
    minlength: 1,
    maxlength: 100,
  },
  domain: {
    type: String,
  },
  description: {
    type: String,
  },
  authorUsername: {
    type: String,
    required: [true, "Author username is mandatory"],
  },
  authorName: {
    type: String,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Author ID is mandatory"],
    ref: "users", // Assuming the users collection
  },
  tumbnailVideoLink: {
    type: String,
  },
  listArray: {
    type: [listItemSchema],
    validate: {
      validator: function (value) {
        return value.length >= 2;
      },
      message: "Playlist must contain at least two items",
    },
  },
});

const PlaylistModel =
  mongoose?.models?.playlists || mongoose?.model("playlists", playlistSchema);

export default PlaylistModel;
