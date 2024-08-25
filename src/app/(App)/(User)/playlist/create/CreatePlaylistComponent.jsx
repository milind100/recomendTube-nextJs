"use client";

import { useDispatch, useSelector } from "react-redux";
import { CreatePlaylistSkeliton } from "../../../../../Components/CreatePlaylistSkeliton";
import LoginAuthCover from "../../../../../Components/LoginAuthCover/LoginAuthCover";
import useApiCall from "../../../../../Hooks/useApiCall";
import useGetSession from "../../../../../Hooks/useGetSession";
import {
  apiEndpoints,
  apiMethods,
  locationPath,
  playlistForms,
  statusCodes,
} from "../../../../../utils/constants";
import PlaylistEditForm from "../PlaylistEditForm";
import { clearPlaylistFormData } from "../../../../../reducers/playlistReducer/playlistFormSlice";
import { clearAllListData } from "../../../../../reducers/appReducer/appSlice";
import { useRouter } from "next/navigation";

const CreatePlaylistComponent = () => {
  const { performRequest } = useApiCall();
  const dispatch = useDispatch();
  const router = useRouter();

  const { session, isLoading } = useGetSession();
  const loading = useSelector(
    (state) => state?.app?.loaders?.[playlistForms?.create]
  );

  const playlist = useSelector(
    (state) => state?.playlistForm?.[playlistForms?.create]
  );

  const handleSubmitClick = async () => {
    const sendingData = {
      ...playlist,
      authorUsername: session?.username,
      authorId: session?._id,
      authorName: session?.name,
    };

    const response = await performRequest({
      endpoint: apiEndpoints?.createPlaylist,
      method: apiMethods?.post,
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
    router.back();
  };

  return (
    <div className="relative  h-[calc(100vh-60px)] ">
      {isLoading ? (
        <>
          <CreatePlaylistSkeliton />
          <CreatePlaylistSkeliton />
        </>
      ) : (
        <>
          {!session && (
            <LoginAuthCover message="To Create playlist plase Login" />
          )}
          <PlaylistEditForm
            formType={playlistForms?.create}
            handleSubmitClick={handleSubmitClick}
            handleCancelClick={handleCancelClick}
            loading={loading}
            submitLabel="Create"
            showHeadFirst
          />
        </>
      )}
    </div>
  );
};

export default CreatePlaylistComponent;
