"use client";

import { useRouter } from "next/navigation";
import RTButton from "../../shared/RTButton";
import { locationPath } from "../../utils/constants";
import Image from "next/image";
import { User } from "lucide-react";

const LoginAuthCover = ({ message }) => {
  const router = useRouter();

  return (
    <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center z-30">
      {/* hoverlay  */}
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

      <div className="max-w-4xl mx-auto px-10 py-2 bg-white rounded-lg shadow-lg z-30">
        <div>
          {/* <span className="bg-green-100 font-mono text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Blank Slate Empty State
          </span> */}
        </div>
        <div className="flex flex-col justify-center py-12 items-center">
          <div className="flex justify-center items-center mb-3 w-28 h-28 relative">
            <Image src="/exclamation.png" alt="image empty states" fill />
          </div>
          <h1 className="text-gray-700 font-medium text-2xl text-center mb-3">
            Not Logged In
          </h1>
          <p className="text-gray-500 text-center mb-6">{message}</p>
          <div className="flex flex-col justify-center">
            <RTButton
              className="flex items-center px-4 py-2 md:hover:bg-orange-600"
              onClick={() => router.push(locationPath?.login)}
            >
              <User />
              Login
            </RTButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAuthCover;
