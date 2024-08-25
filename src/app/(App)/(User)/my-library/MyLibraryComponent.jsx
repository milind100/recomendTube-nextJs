/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useDispatch, useSelector } from "react-redux";
import LoginAuthCover from "../../../../Components/LoginAuthCover/LoginAuthCover";
import ViewPlaylistSkeliton from "../../../../Components/ViewPlaylistSkeliton";
import useGetSession from "../../../../Hooks/useGetSession";
import {
  apiEndpoints,
  apiMethods,
  locationPath,
  myLibrary,
  playlistId,
  statusCodes,
} from "../../../../utils/constants";
import useApiCall from "../../../../Hooks/useApiCall";
import { useEffect, useRef, useState } from "react";
import PlaylistCard from "../../../../Components/PlaylistCard/PlaylistCard";
import EmptyLibraryComponent from "./EmptyLibraryComponent";
import {
  DeleteFromMyPlaylist,
  setMyPlayListData,
} from "../../../../reducers/appReducer/appSlice";
import { length } from "../../../../utils/javascript";
import ModalComponent from "../../../../Components/Modal/ModalComponent";
import { useRouter } from "next/navigation";

const statesObj = {
  fetchPlaylist: "fetch-my-playlist",
  deletPlaylist: "delete-my-playlist",
};

const MyLibraryComponent = () => {
  const { session, isLoading } = useGetSession();
  const router = useRouter();
  const { performRequest } = useApiCall();
  const dispatch = useDispatch();
  const [modelState, setModelState] = useState({
    show: false,
    id: null,
    title: null,
  });

  const fetchLoader = useSelector(
    (state) => state?.app?.loaders?.[statesObj?.fetchPlaylist]
  );

  const deleteLoader = useSelector(
    (state) => state?.app?.loaders?.[statesObj?.deletPlaylist]
  );
  const userPlaylist = useSelector((state) => state?.app?.[myLibrary]);

  const pagination = userPlaylist?.pagination;
  const libraryArray = userPlaylist?.libraryArray;
  const currentPage = pagination?.currentPage ?? 0;
  const hasNextPage = pagination?.hasNextPage;

  const handleCloseModel = () => {
    setModelState({
      show: false,
      id: null,
      title: null,
      disabled: deleteLoader,
    });
  };

  const confirmDeletePlaylist = async () => {
    const response = await performRequest({
      endpoint: apiEndpoints?.playlist?.replace(playlistId, modelState?.id),
      method: apiMethods?.delete,
      queryParams: { page: currentPage + 1 },
      needLoader: true,
      loaderName: statesObj?.deletPlaylist,
      showFailedMessage: true,
      showSuccessMessage: true,
    });
    if (response.statusCode === statusCodes?.OK) {
      dispatch(DeleteFromMyPlaylist({ id: modelState?.id }));
      handleCloseModel();
    }
  };

  const modelButtons = [
    {
      label: "Yes",
      onClick: confirmDeletePlaylist,
      className: "hover:bg-orange-600 w-32 md:hover:text-white",
      loading: deleteLoader,
    },
    {
      label: "No",
      onClick: handleCloseModel,
      className: "bg-gray-200 text-black md:hover:bg-gray-300 w-32",
    },
  ];

  const scrollableDivRef = useRef(null);

  const fetchData = async () => {
    const response = await performRequest({
      endpoint: apiEndpoints?.getMylibrary,
      method: apiMethods?.get,
      queryParams: { page: currentPage + 1 },
      needLoader: true,
      loaderName: statesObj?.fetchPlaylist,
    });

    if (response.statusCode === statusCodes?.OK) {
      dispatch(
        setMyPlayListData({
          pagination: response?.data?.pagination,
          list: response?.data?.data,
        })
      );
    }
  };

  const scrollableDiv = scrollableDivRef.current;
  const handelInfiniteScroll = async () => {
    try {
      if (
        scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
        scrollableDiv.scrollHeight
      ) {
        if (hasNextPage && !fetchLoader) {
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id, title) => {
    setModelState({ show: true, id, title });
  };
  const handleEdit = (_id) => {
    router.push(locationPath?.editPlaylist.replace(playlistId, _id));
  };

  useEffect(() => {
    if (!libraryArray && session) {
      fetchData();
    }
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handelInfiniteScroll);
      return () =>
        scrollableDiv.removeEventListener("scroll", handelInfiniteScroll);
    }
  }, [session, userPlaylist]);

  return (
    <div
      ref={scrollableDivRef}
      className="w-full relative h-[calc(100vh-60px)] overflow-scroll flex flex-col justify-start items-center"
    >
      <h1 className="text-gray-700 font-bold  text-4xl text-center my-5">
        Your Library
      </h1>
      {isLoading ? (
        <>
          <ViewPlaylistSkeliton />
        </>
      ) : (
        <>
          {!session ? (
            <>
              <LoginAuthCover message="To view Your library please Login" />
              <ViewPlaylistSkeliton />
            </>
          ) : (
            <>
              {libraryArray && !length(libraryArray) && (
                <EmptyLibraryComponent myLibrary />
              )}
              <div className="container px-5 py-2 mx-auto">
                <div className="flex flex-wrap -m-">
                  {libraryArray?.map((playlist, index) => (
                    <PlaylistCard
                      key={playlist?._id}
                      playlist={playlist}
                      index={index}
                      handleDelete={() =>
                        handleDelete(playlist?._id, playlist?.title)
                      }
                      handleEdit={() => handleEdit(playlist?._id)}
                      isMyPlaylist={
                        playlist?.authorUsername === session?.username
                      }
                      showEditOptions
                    />
                  ))}
                </div>
              </div>
              {fetchLoader && <ViewPlaylistSkeliton />}
            </>
          )}
        </>
      )}
      {modelState?.show && (
        <ModalComponent
          buttons={modelButtons}
          subTitle=" Are you sure you want to delete ?"
          title={`${modelState?.title} playlist`}
        />
      )}
    </div>
  );
};

export default MyLibraryComponent;
