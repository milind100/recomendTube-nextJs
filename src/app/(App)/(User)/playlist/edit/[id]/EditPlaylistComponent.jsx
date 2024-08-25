/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  apiEndpoints,
  apiMethods,
  locationPath,
  playlistForms,
  playlistId,
  statusCodes,
} from "../../../../../../utils/constants";

import { useParams, useRouter } from "next/navigation";
import useApiCall from "../../../../../../Hooks/useApiCall";
import useGetSession from "../../../../../../Hooks/useGetSession";
import {
  clearPlaylistFormData,
  setPlaylistEditForm,
} from "../../../../../../reducers/playlistReducer/playlistFormSlice";
import { clearAllListData } from "../../../../../../reducers/appReducer/appSlice";
import { CreatePlaylistSkeliton } from "../../../../../../Components/CreatePlaylistSkeliton";
import PlaylistItemsEditForm from "../../PlaylistEditForm";
import LoginAuthCover from "../../../../../../Components/LoginAuthCover/LoginAuthCover";
import { useEffect } from "react";

const statesObj = {
  fetchPlaylist: "fetch-my-playlist",
  deletPlaylist: "delete-my-playlist",
};

const EditPlaylistComponent = () => {
  const { performRequest } = useApiCall();

  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { session, isLoading } = useGetSession();

  const fetchDataLoader = useSelector(
    (state) => state?.app?.loaders?.[statesObj?.fetchPlaylist]
  );
  const loading = useSelector(
    (state) => state?.app?.loaders?.[playlistForms?.edit]
  );

  const playlist = useSelector(
    (state) => state?.playlistForm?.[playlistForms?.edit]
  );

  const fetchPlaylist = async () => {
    const response = await performRequest({
      endpoint: apiEndpoints?.playlist.replace(playlistId, params?.id),
      method: apiMethods?.get,
      needLoader: true,
      loaderName: statesObj?.fetchPlaylist,
      showFailedMessage: true,
    });
    if (response.statusCode === statusCodes?.OK) {
      const { _id, title, domain, description, listArray } =
        response.data.playlist;
      dispatch(
        setPlaylistEditForm({
          _id,
          title,
          domain,
          description,
          videoList: listArray,
        })
      );
    } else {
      router.back();
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const handleSubmitClick = async () => {
    const sendingData = {
      ...playlist,
      authorUsername: session?.username,
      authorId: session?._id,
      authorName: session?.name,
    };

    const response = await performRequest({
      endpoint: apiEndpoints?.playlist?.replace(playlistId, params?.id),
      method: apiMethods?.patch,
      data: sendingData,
      needLoader: true,
      loaderName: playlistForms?.create,
      showSuccessMessage: true,
      showFailedMessage: true,
    });
    if (response.statusCode === statusCodes?.OK) {
      dispatch(clearPlaylistFormData());
      dispatch(clearAllListData());
      router.push(locationPath?.myLibrary);
    }
  };
  const handleCancelClick = () => {
    router.replace(locationPath?.myLibrary);
  };

  return (
    <div className="relative  h-[calc(100vh-60px)] ">
      {isLoading || fetchDataLoader ? (
        <>
          <CreatePlaylistSkeliton />
          <CreatePlaylistSkeliton />
        </>
      ) : (
        <>
          {!session && (
            <LoginAuthCover message="To Edit playlist plase Login" />
          )}
          <PlaylistItemsEditForm
            formType={playlistForms?.edit}
            handleSubmitClick={handleSubmitClick}
            handleCancelClick={handleCancelClick}
            loading={loading}
            submitLabel="Update"
          />
        </>
      )}
    </div>
  );
};

export default EditPlaylistComponent;
