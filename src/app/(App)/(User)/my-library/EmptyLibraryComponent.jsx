"use client";
import RTButton from "../../../../shared/RTButton";
import { locationPath } from "../../../../utils/constants";
import { useRouter } from "next/navigation";
import { Library } from "lucide-react";

const EmptyLibraryComponent = ({ myLibrary = false }) => {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto px-10 py-2 ">
      <div className="flex flex-col justify-center py-12 items-center">
        <Library size={100} opacity={0.8} />
        <h1 className="text-gray-700 font-medium text-sm sm:text-2xl text-center mb-3">
          Library is empty
        </h1>
        <p className="text-gray-500 text-xs sm:text-base text-center mb-6">
          {myLibrary
            ? " Create new Playlist to share with your friends"
            : "No playlist found please refresh to update"}
        </p>
        <div className="flex flex-col justify-center">
          {myLibrary && (
            <RTButton
              className="flex items-center px-4 py-2 md:hover:bg-orange-600"
              onClick={() => router.push(locationPath?.createPlaylist)}
            >
              Create
            </RTButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyLibraryComponent;
