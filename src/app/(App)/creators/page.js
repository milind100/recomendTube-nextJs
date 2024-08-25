import AllCreatorsComponent from "./AllCreatorsComponent";

export const metadata = {
  title: "RecomendTube - Creators",
  description:
    "Discover the creators on RecomendTube and explore their curated YouTube playlists. Click on a creator to view their playlists.",
  keywords:
    "YouTube playlists, creators, video curation, RecomendTube, discover creators",
  author: "RecomendTube Team",
};

const Creators = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-col text-center w-full xsm:mb-10">
          <h1 className="sm:text-3xl xsm:text-2xl text-xl font-medium title-font xsm:mb-2 text-gray-900">
            Creators
          </h1>
        </div>
        <AllCreatorsComponent />
      </div>
    </section>
  );
};

export default Creators;
