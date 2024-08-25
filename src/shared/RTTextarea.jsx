"use client";
import { useState } from "react";
import { password, text } from "../utils/constants";
import { Eye, EyeOff, OctagonAlert } from "lucide-react";
import { twMerge } from "tailwind-merge";

const RTTextarea = ({
  name,
  label,
  // placeholder,
  disabled,
  value,
  error = false,
  helperText,
  handleChange,
  errorClasses,
  inputClasses,
  type,
  rows,
  cols,
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
        <textarea
          name={name}
          cols={rows}
          rows={cols}
          value={value}
          type={showPass ? type : text}
          placeholder={label}
          disabled={disabled}
          onChange={inputChange}
          className={twMerge(
            "focus:ring-1 focus:ring-orange-400 text-sm outline-none appearance-none block w-full bg-grey-lighter text-grey-darker border rounded-md py-2 px-4",
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
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
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

export default RTTextarea;
