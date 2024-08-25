import RTButton from "../../../../shared/RTButton";
import RTTextarea from "../../../../shared/RTTextarea";
import RTTextField from "../../../../shared/RTTextField";
import fetchVideoData from "../../../../utils/getYoutubeVideoData";
import { formFieldsValidations } from "../../../../utils/validation";
import extractYouTubeVideoId from "../../../../utils/youTubeIdExtractor";

const VideoCard = ({
  index,
  video,
  addNewItemToList,
  deleteItemFromList,
  editListItemField,
  disableAll,
}) => {
  const { id, link, videoTitle, linkError } = video;

  const curVideoId = extractYouTubeVideoId(link);

  const handleFieldEdit = (e) => {
    const { name, value } = e.target;
    editListItemField({
      id,
      field: name,
      value,
      ...(name === "link" && {
        linkError: !formFieldsValidations("youtubeLink", value),
      }),
    });
  };

  const handleFetchTitle = async (e) => {
    const { value } = e.target;

    const videoId = extractYouTubeVideoId(value);

    if (curVideoId !== videoId) {
      const title = await fetchVideoData(
        videoId,
        // eslint-disable-next-line no-undef
        process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      );

      editListItemField({
        id,
        field: "videoTitle",
        value: title,
      });
    }
  };

  const handleLinkEdit = (e) => {
    handleFieldEdit(e);
    handleFetchTitle(e);
  };

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      handleLinkEdit({ target: { name: "link", value: clipText } });
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row  md:gap-3 p-2 md:p-5 mt-4 shadow-xl relative shadow-gray-200  border border-gray-400">
      <div
        className={`absolute px-2 sm:p-1 sm:px-2 text-[10px] sm:text-[10px] font-bold rounded-full right-0 top-0 border  text-white bg-gray-800 `}
      >
        {index}
      </div>
      <div className="border md:w-1/2">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${extractYouTubeVideoId(link)}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;  picture-in-picture"
        ></iframe>
      </div>
      <div className="w-full flex flex-col">
        <div className="grid gap-x-3">
          <div className="col-span-12 flex items-center gap-2">
            <div className="w-5/6">
              <label className="text-xs">Youtube Link</label>
              <RTTextField
                disabled={disableAll}
                name="link"
                placeholder="Paste youtube video link here"
                value={link}
                helperText="Invalid Link"
                onChange={handleLinkEdit}
                error={linkError}
                inputClasses="text-xs px-2"
              />
            </div>
            <div className="w-1/6 flex items-center">
              <RTButton
                onClick={() => handlePaste(id)}
                className=" border-white border-2 mt-2 bg-gray-900"
                disabled={disableAll}
              >
                <span className=" text-xs">Paste Link</span>
              </RTButton>
            </div>
          </div>

          <div className="col-span-12">
            <label className="text-xs">Video Title</label>
            <RTTextarea
              name="videoTitle"
              placeholder="video title"
              onChange={handleFieldEdit}
              value={videoTitle}
              inputClasses="text-xs px-2"
              disabled
            />
          </div>
        </div>
        <div className="flex  self-end">
          <RTButton
            className="w-[90px]"
            onClick={addNewItemToList}
            disabled={disableAll}
          >
            Add
          </RTButton>
          <RTButton
            onClick={() => deleteItemFromList(id)}
            className="w-[90px] border-white border-2 bg-gray-900"
            disabled={disableAll}
          >
            Delete
          </RTButton>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
