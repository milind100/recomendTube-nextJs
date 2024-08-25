/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useApiCall from "../../../../../Hooks/useApiCall";
import {
  apiEndpoints,
  apiMethods,
  cUsername,
  locationPath,
  playlistId,
  statusCodes,
} from "../../../../../utils/constants";
import extractYouTubeVideoId from "../../../../../utils/youTubeIdExtractor";
import { head } from "../../../../../utils/javascript";
import Image from "next/image";
import useGetSession from "../../../../../Hooks/useGetSession";
import Link from "next/link";
import VideoPageSkeleton from "./VideoPageSkeleton";
import copyToClipboard from "../../../../../utils/copyToClipboard";

const VideoPage = () => {
  const { session } = useGetSession();
  const params = useParams();

  const { performRequest } = useApiCall();
  const router = useRouter();

  const [playlistData, setPlaylistData] = useState({});
  const [playingVideo, setPlayingVideo] = useState("");
  const [loading, setLoading] = useState(true);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [playlistHeight, setPlaylistHeight] = useState("auto"); // Step 1: State to store playlist height

  const videoRef = useRef(null); // Ref for video section
  const headerRef = useRef(null); // Ref for header section
  const playlistRef = useRef(null); // Ref for playlist section

  const handleShare = () => {
    copyToClipboard(
      // eslint-disable-next-line no-undef
      `${process.env.NEXT_PUBLIC__WEB_URL}/watch/${params?.creatorUsername}/${params?.playlistId}`
    );

    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 3000);
  };

  const fetchPlaylist = async () => {
    setLoading(true);
    const response = await performRequest({
      endpoint: apiEndpoints?.playlist.replace(playlistId, params?.playlistId),
      method: apiMethods?.get,
      needLoader: true,
      loaderName: "fetch-playlist",
      showFailedMessage: true,
    });
    if (response.statusCode === statusCodes?.OK) {
      setPlaylistData(response?.data?.playlist);
      setPlayingVideo(head(response?.data?.playlist?.listArray));
    } else {
      router.back();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      const calculatePlaylistHeight = () => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const windowHeight = window.innerHeight;
        if (window.innerWidth <= 768) {
          // Only apply if screen width is 768px or wider
          const videoHeight = videoRef.current?.offsetHeight || 0;
          const availableHeight =
            windowHeight - headerHeight - videoHeight - 16 - 65; // 16px margin for spacing
          setPlaylistHeight(`${availableHeight}px`);
        } else {
          const availableHeight = windowHeight - headerHeight - 16 - 65; // 16px margin for spacing
          setPlaylistHeight(`${availableHeight}px`);
        }
      };

      calculatePlaylistHeight();

      window.addEventListener("resize", calculatePlaylistHeight); // Recalculate on window resize

      return () => {
        window.removeEventListener("resize", calculatePlaylistHeight); // Cleanup listener on unmount
      };
    }
  }, [loading]);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <>
      {loading ? (
        <VideoPageSkeleton />
      ) : (
        <section className="text-gray-600 pt-2 body-font ">
          <div className="md:px-2 lg:px-8 pt-1 sm:pt-3 mx-auto flex flex-wrap ">
            <div
              ref={headerRef}
              className="flex justify-between align-center w-full pb-2"
            >
              <h1 className="text-center text-sm sm:text-xl font-bold mb-2">
                {playlistData?.title}
                <span className="text-xs sm:text-base text-gray-500">
                  {"   "}({playlistData?.listArray?.length} Videos)
                </span>
              </h1>
              <div className="relative">
                <button
                  title={"Copy playlist link"}
                  className="border bg-yellow-500 text-black border-gray-600 text-[10px] p-1 sm:text-base sm:px-2 rounded-xl font-bold md:hover:bg-gray-200 self-end"
                  onClick={handleShare}
                >
                  Share Playlist
                </button>
                {tooltipVisible && (
                  <div className="absolute w-32 bg-black text-white text-xs px-2 py-1 rounded-md z-30">
                    Playlist link <br /> copied!
                  </div>
                )}
              </div>
            </div>

            <div className="w-full grid grid-cols-12 gap-2 h-auto">
              <div ref={videoRef} className="col-span-12 md:col-span-8">
                <div className="relative">
                  <iframe
                    width="100%"
                    className="xxsm:h-[180px] xsm:h-[250px] md:h-[480px]"
                    src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
                      playingVideo?.link
                    )}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>

                  <div className="mt-2 sm:mt-4 flex flex-col sm:gap-1 ">
                    <h2 className="text-xs sm:text-base md:text-xl font-bold">
                      {playingVideo?.videoTitle}{" "}
                      <span className="text-[8px] p-1 sm:text-[10px] md:text-[12px] sm:p-1 md:p-2 bg-gray-200 text-gray-700 rounded-full">
                        {playlistData?.domain}
                      </span>
                    </h2>
                    <div className="flex justify-between items-center sm:mt-1 ">
                      <Link
                        href={
                          session?.username === params?.creatorUsername
                            ? locationPath?.myLibrary
                            : locationPath?.showLibrary.replace(
                                cUsername,
                                playlistData?.authorUsername
                              )
                        }
                        className="bg-yellow-300 text-xs p-1 px-3 md:p-2 md:px-4 sm:text-base md:text-xl rounded-full font-bold md:hover:bg-yellow-500"
                      >
                        <span className="text-red-600">@</span>
                        {playlistData?.authorUsername}
                      </Link>
                      <div>
                        {session?.username === params?.creatorUsername && (
                          <button
                            onClick={() =>
                              router.push(
                                locationPath?.editPlaylist.replace(
                                  playlistId,
                                  params.playlistId
                                )
                              )
                            }
                            className="bg-green-500 md:hover:bg-green-700 rounded-3xl text-gray-800 text-xs sm:text-lg md:text-md px-5 mr-2"
                          >
                            Edit
                          </button>
                        )}
                        <span className="bg-gray-200 text-gray-500 text-xs sm:text-lg md:text-md px-5">
                          {playlistData?.authorName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={playlistRef}
                name="playlist"
                className="col-span-12 md:col-span-4 w-full border overflow-x-hidden overflow-scroll shadow-lg"
                style={{ height: playlistHeight }} // Step 2: Apply calculated height
              >
                <div className="flex flex-wrap w-full gap-2 my-2 px-1">
                  {playlistData?.listArray?.map(
                    ({ _id, link, videoTitle }, index) => {
                      const active = playingVideo?.link === link;
                      return (
                        <div
                          key={_id}
                          className={`w-full md:hover:bg-gray-300 ${
                            active && "bg-gray-300"
                          }`}
                          onClick={() => {
                            setPlayingVideo({ _id, link, videoTitle });
                          }}
                        >
                          <div className="cursor-pointer h-full flex items-center border-gray-200 border p-2 rounded-lg relative">
                            <div
                              className={`absolute px-1 sm:p-1 sm:px-2 text-[9px] sm:text-[10px] font-bold rounded-full right-0 top-0 border ${
                                active
                                  ? "text-gray-800 bg-white border-black"
                                  : "text-white bg-gray-800"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="w-24 h-14 sm:w-36 sm:h-24 bg-gray-800 object-cover object-center flex-shrink-0 mr-4 rounded-md relative">
                              <Image
                                alt="ecommerce"
                                className="object-cover object-center w-full h-full block"
                                src={`http://img.youtube.com/vi/${extractYouTubeVideoId(
                                  link
                                )}/hqdefault.jpg`}
                                fill
                              />
                            </div>
                            <div className="flex-grow mt-2">
                              <h2 className="text-gray-900 title-font font-medium text-xs sm:text-sm">
                                {videoTitle}
                              </h2>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default VideoPage;
