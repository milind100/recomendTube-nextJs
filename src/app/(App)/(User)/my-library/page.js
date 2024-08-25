import MyLibraryComponent from "./MyLibraryComponent";

export const metadata = {
  title: "RecomendTube - My Playlists",
  description:
    "View, edit, and manage your own YouTube playlists on RecomendTube. Perfect for trainers, teachers, and content curators.",
  keywords:
    "YouTube playlists, my playlists, manage playlists, edit playlists, delete playlists, RecomendTube",
  author: "RecomendTube Team",
};

const MyPlaylists = () => {
  return (
    <>
      <MyLibraryComponent />
    </>
  );
};

export default MyPlaylists;
