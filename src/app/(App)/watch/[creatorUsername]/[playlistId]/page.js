import { getPlaylist } from "../../../../../Actions/getPlaylistbyID";
import VideoPage from "./VideoPage";

export const metadata = {
  title: "RecomendTube - Watch Your YouTube Playlists",
  description:
    "Watch and enjoy videos from your personalized YouTube playlists on RecomendTube. Perfect for trainers, teachers, and content curators.",
  keywords: "YouTube playlists, watch playlists, video curation, RecomendTube",
  author: "RecomendTube Team",
};

const Watch = async ({ params }) => {
  let data = await getPlaylist(params?.playlistId);

  // Ensure the data is JSON-serializable
  data = JSON.parse(JSON.stringify(data));

  return (
    <div>
      <VideoPage playlistData={data?.playlist} />
    </div>
  );
};

export default Watch;
