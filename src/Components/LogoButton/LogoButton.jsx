"use client";
import { useRouter } from "next/navigation";
import { locationPath } from "../../utils/constants";
import { AlignJustify } from "lucide-react";
import MainLogo from "./MainLogo";

const LogoButton = ({ setExpandedSidebar }) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center xsm:gap-3">
      <div
        onClick={() => setExpandedSidebar((curr) => !curr)}
        className=" md:hover:bg-gray-100 p-3 rounded-full cursor-pointer mx-0 "
      >
        <AlignJustify size={28} strokeWidth={1.75} />
      </div>
      <MainLogo onClick={() => router.push(locationPath.home)} />
    </div>
  );
};

export default LogoButton;
