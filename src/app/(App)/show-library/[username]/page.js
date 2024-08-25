import UsersLibraryComponent from "./UsersLibraryComponent";

export const metadata = {
  title: "RecomendTube - User Playlists Library",
  description:
    "Explore all the playlists created by a particular user on RecomendTube. Discover and watch curated YouTube playlists from various users.",
  keywords:
    "YouTube playlists, user playlists, view playlists, video curation, RecomendTube",
  author: "RecomendTube Team",
};
const UserLibrary = () => {
  return <UsersLibraryComponent />;
};

export default UserLibrary;
