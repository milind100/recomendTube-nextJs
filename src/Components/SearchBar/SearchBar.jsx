"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetHomeSearchState } from "../../reducers/appReducer/appSlice";

const SearchBar = ({ dispatch, searchLoading, searchParam }) => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setsearch] = useState(searchParam ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    dispatch(resetHomeSearchState());
    // fetchData(params.toString());
    if (searchParam) {
      router.replace(pathname + "?" + params.toString());
    } else {
      router.push(pathname + "?" + params.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="flex flex-col p-2 py-6 w-full max-w-[800px]">
        <div
          className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-1 mb-5 sticky"
          style={{ top: 5 }}
        >
          <input
            name="search"
            value={search}
            className="font-bold  rounded-full w-full py-2 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
            type="text"
            placeholder="Search playlist name or keywords..."
            onChange={(e) => setsearch(e.target.value)}
            disabled={searchLoading}
          />
          <button
            type="submit"
            className="bg-gray-600 p-2 md:hover:bg-blue-400 cursor-pointer mx-2 rounded-full"
          >
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
