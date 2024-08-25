/* eslint-disable no-undef */
import { useState } from "react";
import Image from "next/image";
import extractYouTubeVideoId from "../../utils/youTubeIdExtractor";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { cUsername, locationPath } from "../../utils/constants";
import copyToClipboard from "../../utils/copyToClipboard";

const PlaylistCard = ({
  playlist,
  isMyPlaylist,
  handleDelete,
  handleEdit,
  showEditOptions,
}) => {
  const {
    _id,
    authorName,
    authorUsername,
    description,
    domain,
    title,
    tumbnailVideoLink,
    videosCount,
  } = { ...playlist };

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const videoId = extractYouTubeVideoId(tumbnailVideoLink || "");

  const thumbnailUrl = videoId
    ? `http://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "/defaultThumbnail.png";

  const handleShare = () => {
    copyToClipboard(
      // eslint-disable-next-line no-undef
      `${process.env.NEXT_PUBLIC__WEB_URL}/watch/${authorUsername}/${_id}`
    );

    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 3000);
  };

  const details = `Title: ${title}\nDomain: ${domain}\nUsername: ${authorUsername}\nName: ${authorName}\ndescription:${description}`;

  return (
    <div
      title={details}
      className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg border-gray-500 flex flex-col justify-between gap-1"
      // Tooltip with title
    >
      <Link
        href={`${locationPath?.watchPlayList}/${authorUsername}/${playlist?._id}`}
      >
        <div className="block relative h-36 rounded overflow-hidden">
          <Image
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={thumbnailUrl}
            fill
          />
        </div>
        <div className="mt-2">
          <h2 className="text-gray-900 title-font text-sm font-medium">
            {title}{" "}
          </h2>
          <div className="flex justify-between">
            <span className="bg-gray-300 p-1 px-1  text-[10px] rounded-xl font-bold">
              {domain}
            </span>
            <span className="p-1 px-1 break text-[10px] font-bold">
              {videosCount} videos
            </span>
          </div>
        </div>
      </Link>
      <div>
        <div className="flex justify-between items-center w-full text-[12px]">
          <Link
            href={
              isMyPlaylist
                ? locationPath?.myLibrary
                : locationPath?.showLibrary.replace(cUsername, authorUsername)
            }
            title={`click to see ${authorUsername}s library`}
            className="bg-gray-800 p-1 px-1 rounded-xl font-bold text-white mt-1 text-[10px] tracking-widest title-font md:hover:bg-gray-600"
          >
            @{authorUsername}
          </Link>
          <span
            title={`name:${authorName}\nusername:@${authorUsername}`}
            className="bg-gray-200 text-gray-500 px-3"
          >
            {authorName}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <div className={`flex ${showEditOptions ? "visible" : "invisible"}`}>
            <button
              onClick={handleEdit}
              title={"Edit playlist"}
              className="text-sm px-1  text-green-600"
            >
              <div className="flex items-center gap-1">
                <Pencil size={14} /> Edit
              </div>
            </button>
            <button
              onClick={handleDelete}
              title={"Delete playlist"}
              className="text-sm px-1 text-red-600"
            >
              <div className="flex items-center gap-1">
                <Trash size={12} /> Delete
              </div>
            </button>
          </div>
          <div className="relative">
            <button
              title={"Copy playlist link"}
              className="text-sm  border border-gray-600 px-2 rounded-xl md:hover:bg-gray-200 self-end"
              onClick={handleShare}
            >
              Share
            </button>
            {tooltipVisible && (
              <div className="absolute w-32  bg-black text-white text-xs px-2 py-1 rounded-md z-30">
                Playlist link <br /> copied!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
