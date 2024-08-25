"use client";
import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

const RTButton = ({
  className,
  children,
  disabled,
  loading = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={twMerge(
        "py-1 px-3 msm:py-2 msm:px-5 xsm:w-full text-xs msm:text-sm  bg-orange-500 text-white  md:hover:bg-gray-50 md:hover:text-black border  border-gray-300 font-bold shadow-md rounded-md flex gap-2 justify-center items-center",
        disabled || loading
          ? "bg-gray-100 text-gray-500 md:hover:text-gray-500"
          : "",
        className
      )}
      {...props}
    >
      {children} {loading && <Loader2 className="h-5 w-5 animate-spin" />}
    </button>
  );
};

export default RTButton;
