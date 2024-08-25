"use client";
import { useState } from "react";
import { apiEndpoints, statusCodes, text } from "../utils/constants";
import { CircleCheckBig, Loader2, OctagonAlert } from "lucide-react";
import useApiCall from "../Hooks/useApiCall";
import { twMerge } from "tailwind-merge";
import useDebounceHook from "../Hooks/useDebounceHook";
import { length } from "../utils/javascript";

const RTUsername = ({
  name,
  // label,
  placeholder,
  disabled,
  value,
  icon,
  error = false,
  helperText,
  handleChange,
  errorClasses,
  inputClasses,
  setManualFieldError,
  // labelClasses,
  ...props
}) => {
  const { performRequest } = useApiCall();
  const [loading, setIsLoading] = useState(false);
  const [available, setAvailable] = useState(false);

  const checkUserNameAwailability = async (text) => {
    setIsLoading(true);
    const response = await performRequest({
      method: "GET",
      endpoint: apiEndpoints?.checkUsername,
      queryParams: { username: text },
    });
    setIsLoading(false);
    const { statusCode } = response;

    if (statusCode === 200) {
      setManualFieldError(name, null);
      setAvailable(true);
    } else if (statusCode === statusCodes?.INVALID_REQUEST) {
      setManualFieldError(name, "This username is already taken");
      setAvailable(false);
    }
  };

  const debounce = useDebounceHook(checkUserNameAwailability, 1000);

  const inputChange = (e) => {
    const { value, name } = e.target;
    const finalValue = value.trim();
    handleChange({ target: { name, value: finalValue } });

    if (length(finalValue) >= 3 && length(finalValue) <= 20) {
      debounce(finalValue);
    } else {
      setManualFieldError(
        name,
        "username should be atleat 3 letters and most 20 letters"
      );
    }
  };
  return (
    <div className="flex flex-col">
      <div className="relative">
        <div className="absolute left-[7px] top-[10px]">{icon}</div>
        <input
          name={name}
          type={text}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={inputChange}
          className={twMerge(
            `focus:ring-1 focus:ring-orange-400 text-sm outline-none	 appearance-none block w-full bg-grey-lighter text-grey-darker border rounded-md py-2 px-4 pl-7`,
            inputClasses,
            error ? "border-red-600" : "border-[#9D9D9D]"
          )}
          {...props}
        />
        <div className="absolute right-3 top-3 ">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            available && <CircleCheckBig color="#39e316" className="h-4 w-4" />
          )}
        </div>
      </div>

      <p
        className={twMerge(
          "text-red-600 text-[10px] flex gap-1 items-center capitalize ml-1  self-end col-end-6",
          error ? "visible" : "invisible",
          errorClasses
        )}
      >
        {<OctagonAlert size={10} color="#ff0000" strokeWidth={3} />}{" "}
        {helperText}
      </p>
    </div>
  );
};

export default RTUsername;
