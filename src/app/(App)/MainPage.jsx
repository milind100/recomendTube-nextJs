"use client";
import { useEffect, useRef } from "react";
import PlaylistCard from "../../Components/PlaylistCard/PlaylistCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import useApiCall from "../../Hooks/useApiCall";
import {
  apiEndpoints,
  apiMethods,
  homePage,
  statusCodes,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setHomePageData } from "../../reducers/appReducer/appSlice";
import ViewPlaylistSkeliton from "../../Components/ViewPlaylistSkeliton";
import useGetSession from "../../Hooks/useGetSession";
import { useSearchParams } from "next/navigation";

const MainPage = () => {
  const { session } = useGetSession();
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state?.app?.loaders?.[homePage?.homeLists]
  );

  const homeList = useSelector(
    (state) => state?.app?.homePage?.[homePage?.homeLists]
  );
  const searchList = useSelector(
    (state) => state?.app?.homePage?.[homePage?.searchlist]
  );
  const { performRequest } = useApiCall();

  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? null;

  const pagination = homeList?.pagination;
  const libraryArray = homeList?.libraryArray;
  const currentPage = pagination?.currentPage ?? 0;
  const hasNextPage = pagination?.hasNextPage;

  const searchPagination = searchList?.pagination;
  const searchLibraryArray = searchList?.libraryArray;
  const searchCurrentPage = searchPagination?.currentPage ?? 0;
  const searchHasNextPage = searchPagination?.hasNextPage;

  const scrollableDivRef = useRef(null);

  const fetchData = async (searchParam) => {
    const queryParams = searchParam
      ? { page: searchCurrentPage + 1, search: searchParam }
      : { page: currentPage + 1 };

    const response = await performRequest({
      endpoint: apiEndpoints?.getAllPlayLists,
      method: apiMethods?.get,
      queryParams: { ...queryParams },
      needLoader: true,
      loaderName: homePage?.homeLists,
    });

    if (response.statusCode === statusCodes?.OK) {
      dispatch(
        setHomePageData({
          pagination: response?.data?.pagination,
          list: response?.data?.data,
          stateName: search ? homePage?.searchlist : homePage?.homeLists,
        })
      );
    }
  };

  const scrollableDiv = scrollableDivRef.current;

  const handelInfiniteScroll = async () => {
    try {
      console.log("scrolling", scrollableDiv.scrollTop);
      console.log("scrolling", scrollableDiv.clientHeight);
      console.log("scrolling", scrollableDiv.scrollHeight);
      if (
        scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
        scrollableDiv.scrollHeight - 20
      ) {
        console.log("scrolling");
        if (search && searchHasNextPage && !loading) {
          fetchData(search);
        }
        if (!search && hasNextPage && !loading) {
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search) {
      fetchData(search);
    }
  }, [search]);

  useEffect(() => {
    if (!libraryArray && !search) {
      fetchData();
    }
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handelInfiniteScroll);
      return () =>
        scrollableDiv.removeEventListener("scroll", handelInfiniteScroll);
    }
  }, [homeList, search, searchList]);

  const displayList = search ? searchLibraryArray : libraryArray;

  return (
    <div
      ref={scrollableDivRef}
      className="w-full h-[calc(100vh-90px)] overflow-y-scroll flex flex-col justify-start items-center "
    >
      <SearchBar
        searchLoading={loading}
        dispatch={dispatch}
        fetchData={fetchData}
        searchParam={search}
      />
      <div className="container px-5 py-2 mx-auto">
        <div className="flex flex-wrap -m-4">
          {displayList?.map((playlist, index) => (
            <PlaylistCard
              key={playlist?._id}
              playlist={playlist}
              index={index}
              isMyPlaylist={playlist?.authorUsername === session?.username}
            />
          ))}
        </div>
      </div>
      {loading && <>{<ViewPlaylistSkeliton />}</>}
    </div>
  );
};

export default MainPage;
