function extractYouTubeVideoId(url = "") {
  if (typeof url !== "string") return null;
  let videoId = "";

  if (url?.includes("youtu.be/")) {
    // For short share links like https://youtu.be/oelsxH0orHI
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/watch?v=")) {
    // For regular links like https://www.youtube.com/watch?v=oelsxH0orHI
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtube.com/live")) {
    // For regular links like https://www.youtube.com/live/oelsxH0orHI
    videoId = url.split("live/")[1]?.split("?")[0];
  }

  return videoId;
}

export default extractYouTubeVideoId;
