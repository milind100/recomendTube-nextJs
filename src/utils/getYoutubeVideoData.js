const fetchVideoData = async (videoID, API_KEY) => {
  if (!videoID) {
    return "";
  }
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=snippet&key=${API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.items.length > 0) {
    const videoSnippet = data.items[0].snippet;
    return videoSnippet?.title;
  }

  return "";
};

export default fetchVideoData;
