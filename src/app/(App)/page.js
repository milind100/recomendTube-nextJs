import { Suspense } from "react";
import ViewPlaylistSkeliton from "../../Components/ViewPlaylistSkeliton";
import MainPage from "./MainPage";

export const metadata = {
  title: "RecomendTube - Discover and Manage YouTube Playlists",
  description:
    "Explore, create, and manage personalized YouTube playlists with RecomendTube. Perfect for trainers, teachers, and content curators.",
  keywords:
    "YouTube playlists, create playlists, manage playlists, share playlists, video curation, RecomendTube",
  author: "RecomendTube Team",
};

const Home = () => {
  return (
    <>
      <Suspense fallback={<ViewPlaylistSkeliton />}>
        <MainPage />
      </Suspense>
    </>
  );
};

export default Home;
