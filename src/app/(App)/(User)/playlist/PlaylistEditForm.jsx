/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import PlaylistHeaderForm from "./PlaylistHeaderForm";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToVideoList,
  deleteItemFromVideoList,
  editVideoListItem,
  resetPlaylistFormSlice,
  setPlaylistHead,
} from "../../../../reducers/playlistReducer/playlistFormSlice";
import VideoCard from "./VideoCard";
import showToast from "../../../../utils/toastService";
import RTButton from "../../../../shared/RTButton";

import { length } from "../../../../utils/javascript";
import { formFieldsValidations } from "../../../../utils/validation";

const PlaylistItemsEditForm = ({
  formType,
  handleSubmitClick = () => {},
  handleCancelClick = () => {},
  loading,
  submitLabel,
  showHeadFirst,
}) => {
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state?.playlistForm?.[formType]);
  const { title, domain, description, videoList } = playlist;
  const [showHeadTitles, setshowHeadTitles] = useState(false);

  const onCancel = () => {
    dispatch(resetPlaylistFormSlice({ formType }));
    handleCancelClick;
  };
  useEffect(() => {
    if (showHeadFirst) {
      setshowHeadTitles(true);
    }
  }, []);

  const handleHeadChange = (values) => {
    dispatch(setPlaylistHead({ ...values, formType }));
    setshowHeadTitles(false);
  };

  const addNewItemToList = () => {
    dispatch(addItemToVideoList({ formType }));
  };
  const deleteItemFromList = (id) => {
    if (length(videoList) <= 2) {
      return showToast("Two videos in playlist are mandatory");
    }
    dispatch(deleteItemFromVideoList({ formType, id }));
  };
  const editListItemField = ({ id, field, value, linkError }) => {
    dispatch(editVideoListItem({ formType, id, field, value, linkError }));
  };

  const isFullFormValid = () => {
    let isValid = true;
    videoList?.forEach((curItem) => {
      const linkError = !formFieldsValidations("youtubeLink", curItem?.link);
      editListItemField({
        id: curItem?.id ?? curItem?._id,
        field: "link",
        value: curItem?.link,
        linkError,
      });
      if (linkError) {
        isValid = false;
      }
    });
    return isValid;
  };

  const onSubmit = () => {
    if (isFullFormValid()) {
      handleSubmitClick();
    } else {
      showToast("Please fix the errors in the form");
    }
  };

  return (
    <div className="w-full h-full px-2 md:px-10 py-1 md:py-5">
      {showHeadTitles ? (
        <PlaylistHeaderForm
          formValues={{ title, domain, description }}
          handleHeadChange={handleHeadChange}
        />
      ) : (
        <div className="pb-14">
          <div className="flex justify-between items-center md:px-3 mb-3 ">
            <div>
              <span className="font-bold text-lg md:text-xl break-words">
                {title}
              </span>
              {domain && (
                <span className="bg-orange-600 text-xs text-white font-normal rounded-full p-1 ml-4">
                  {domain}
                </span>
              )}

              <h6 className=" text-gray-600 text-sm mt-3">{description}</h6>
            </div>
            <RTButton
              onClick={() => setshowHeadTitles(true)}
              className="max-w-20 h-11 rounded-lg bg-blue-600 px-2 max-h-11"
            >
              Edit
            </RTButton>
          </div>
          <hr />
          <h1 className="text-black  md:text-2xl font-bold m-auto w-full">
            List Content
          </h1>
          {videoList?.map((video, i) => {
            return (
              <VideoCard
                key={video?.id}
                index={i + 1}
                video={video}
                addNewItemToList={addNewItemToList}
                deleteItemFromList={deleteItemFromList}
                editListItemField={editListItemField}
                disableAll={loading}
              />
            );
          })}

          <div className="my-5 flex justify-end gap-3">
            <RTButton
              loading={loading}
              className="max-w-32 bg-blue-500"
              onClick={onSubmit}
            >
              {submitLabel}
            </RTButton>
            <RTButton
              disabled={loading}
              className="max-w-32 bg-red-600"
              onClick={onCancel}
            >
              Cancel
            </RTButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistItemsEditForm;
