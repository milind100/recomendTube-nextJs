"use client";
import { useEffect, useState } from "react";
import useApiCall from "../../../Hooks/useApiCall";
import {
  apiEndpoints,
  apiMethods,
  cUsername,
  locationPath,
  statusCodes,
} from "../../../utils/constants";
import { useSelector } from "react-redux";
import CreatorsSkeliton from "./CreatorsSkeliton";
import { User } from "lucide-react";
import Link from "next/link";
import useGetSession from "../../../Hooks/useGetSession";

const AllCreatorsComponent = () => {
  const loading = useSelector((state) => state?.app?.loaders?.creators);
  const { session } = useGetSession();
  const { performRequest } = useApiCall();
  const [creators, setCreators] = useState([]);

  const fetchData = async () => {
    const response = await performRequest({
      endpoint: apiEndpoints?.getCreators,
      method: apiMethods?.get,
      needLoader: true,
      loaderName: "creators",
    });

    if (response.statusCode === statusCodes?.OK) {
      setCreators(response?.data?.data);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap ">
      <>
        {creators?.map((creator) => (
          <Link
            href={
              session?.username === creator.authorUsername
                ? locationPath?.myLibrary
                : locationPath?.showLibrary.replace(
                    cUsername,
                    creator.authorUsername
                  )
            }
            key={creator?.authorUsername}
            className="p-2 lg:w-1/3 md:w-1/2 w-full"
            title={`Click to View ${creator?.authorUsername}'s Library`}
          >
            <div className="h-full flex items-center justify-between bg-white border-gray-200 border p-4 rounded-lg md:hover:bg-gray-200 cursor-pointer shadow-lg">
              <div className="flex items-center">
                <div
                  alt="team"
                  className="w-16 h-16 bg-gray-300 object-cover object-center flex-shrink-0 rounded-full mr-4 flex justify-center items-center"
                  src="https://dummyimage.com/108x98"
                >
                  <User size={35} color="#707070" />
                </div>
                <div className="flex-grow">
                  <h2 className="bg-yellow-300 p-1  text-sm rounded-xl font-bold">
                    <span className="text-red-600">@</span>
                    {creator?.authorUsername}
                  </h2>
                  <p className="text-gray-500 text-xs xsm:text-base m-auto">
                    {creator?.authorName}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-xs xsm:text-base">
                {creator?.playlistCount} Playlist
              </p>
            </div>
          </Link>
        ))}
      </>
      {loading && <CreatorsSkeliton />}
    </div>
  );
};

export default AllCreatorsComponent;
