"use client";
import { useState } from "react";
import { password, text } from "../utils/constants";
import { Eye, EyeOff, OctagonAlert } from "lucide-react";
import { twMerge } from "tailwind-merge";

const RTTextField = ({
  handleChange = () => {},
  disabled,
  icon,
  // label,
  type,
  value,
  helperText,
  errorClasses,
  inputClasses,
  error = false,
  placeholder,
  // labelClasses,
  ...props
}) => {
  const [showPass, setShowPass] = useState(true);

  const inputChange = (e) => {
    handleChange(e);
  };
  return (
    <div className="flex flex-col">
      <div className="relative">
        <div className="absolute left-[7px] top-[10px]">{icon}</div>
        <input
          type={showPass ? type : text}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={inputChange}
          className={twMerge(
            `focus:ring-1 focus:ring-orange-400 text-sm outline-none	 appearance-none block w-full bg-grey-lighter text-grey-darker border rounded-md py-2  pl-7`,
            inputClasses,
            error ? "border-red-600" : "border-[#9D9D9D]"
          )}
          {...props}
        />

        {type === password && (
          <div
            className="absolute right-2 top-1 p-2 md:hover:bg-gray-300 rounded-full cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <p
          className={twMerge(
            "text-red-600 text-[10px] flex gap-1 items-center capitalize ml-1 ",
            error ? "visible" : "invisible",
            errorClasses
          )}
        >
          {<OctagonAlert size={10} color="#ff0000" strokeWidth={3} />}{" "}
          {helperText}
        </p>
      </div>
    </div>
  );
};

export default RTTextField;
