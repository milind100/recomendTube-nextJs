/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams } from "next/navigation";
import PlaylistCard from "../../../../Components/PlaylistCard/PlaylistCard";
import ViewPlaylistSkeliton from "../../../../Components/ViewPlaylistSkeliton";
import useApiCall from "../../../../Hooks/useApiCall";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  apiEndpoints,
  apiMethods,
  cUsername,
  statusCodes,
} from "../../../../utils/constants";
import EmptyLibraryComponent from "../../(User)/my-library/EmptyLibraryComponent";
import { length } from "../../../../utils/javascript";

const UsersLibraryComponent = () => {
  const { performRequest } = useApiCall();
  const params = useParams();
  const [userLibrary, setUserLibrary] = useState({
    pagination: {},
    list: null,
  });

  const loading = useSelector((state) => state?.app?.loaders?.userLibrary);

  const currentPage = userLibrary?.pagination?.currentPage ?? 0;
  const hasNextPage = userLibrary?.pagination?.hasNextPage;

  const scrollableDivRef = useRef(null);

  const fetchData = async () => {
    if (!params?.username) return;
    const response = await performRequest({
      endpoint: apiEndpoints?.getLibrary.replace(cUsername, params?.username),
      method: apiMethods?.get,
      queryParams: { page: currentPage + 1 },
      needLoader: true,
      loaderName: "userLibrary",
    });

    if (response.statusCode === statusCodes?.OK) {
      setUserLibrary({
        pagination: response?.data?.pagination,
        list: !userLibrary?.list
          ? response?.data?.data
          : [...userLibrary.list, ...response.data.data],
      });
    }
  };

  const scrollableDiv = scrollableDivRef.current;
  const handelInfiniteScroll = async () => {
    try {
      if (
        scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
        scrollableDiv.scrollHeight
      ) {
        if (hasNextPage && !loading) {
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userLibrary?.list) {
      fetchData();
    }
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handelInfiniteScroll);
      return () =>
        scrollableDiv.removeEventListener("scroll", handelInfiniteScroll);
    }
  }, [userLibrary?.list]);

  return (
    <div
      ref={scrollableDivRef}
      className="w-full relative h-[calc(100vh-60px)] overflow-scroll flex flex-col justify-start items-center"
    >
      <h1 className="text-gray-700 font-bold  text-xl text-center my-5">
        <span className="bg-yellow-300 p-2 px-4  text-md rounded-full font-bold ">
          <span className="text-red-600">@</span>
          {params?.username}s Library
        </span>
      </h1>

      <>
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-wrap -m-">
            {userLibrary?.list?.map((playlist, index) => (
              <PlaylistCard
                key={playlist?._id}
                playlist={playlist}
                index={index}
              />
            ))}
          </div>
        </div>
        {loading && <ViewPlaylistSkeliton />}
        {userLibrary?.list && !length(userLibrary?.list) && (
          <EmptyLibraryComponent />
        )}
      </>
    </div>
  );
};

export default UsersLibraryComponent;
