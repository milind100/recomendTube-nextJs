"use client";

import { useEffect, useRef, useState } from "react";

const RTIOTPField = ({ length = 6, setOtpFunction }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const ref = useRef([]);
  useEffect(() => {
    ref.current[0].focus();
  }, []);

  const change = (value) => {
    setOtp(value);
    setOtpFunction(value?.join(""));
  };

  const handleOnchange = (e, index) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const value = e?.target?.value?.slice(0, 1);
    const newValue = [...otp];
    newValue[index] = value;
    change(newValue);

    if (ref.current[index + 1] && e.target.value) {
      ref.current[index + 1].focus();
    } else if (index === otp.length - 1 && e.target.value) {
      ref.current[index].blur();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      ref.current[index - 1]
    ) {
      ref.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    let paste = (event.clipboardData || window.clipboardData).getData("text");

    const pastedDigits = paste
      .slice(0, length)
      .replace(/\D/g, "") // Remove non-digits using regex
      .substring(0, length); // Truncate if pasted length exceeds

    if (pastedDigits.length > 0) {
      // Create a new OTP array with pasted digits, truncating if needed
      const newOtp = pastedDigits.split("").map((char) => Number(char));
      const remaining = length - newOtp.length;
      const remianingArray = new Array(remaining).fill("");
      change([...newOtp.slice(0, length), ...remianingArray]); // Set new OTP, limiting to the component's length
      // Focus the next input after a successful paste (if any)
      ref.current[newOtp.length - 1].focus();
    }
  };
  return (
    <div className="flex w-full gap-3 justify-center">
      {otp.map((cur, index) => (
        <input
          key={index}
          value={cur}
          type="number"
          onChange={(e) => handleOnchange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          ref={(input) => (ref.current[index] = input)}
          className="no-spinner border border-gray-300 text-center  rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none w-7 h-7 text-sm sm:w-10 sm:h-10 sm:text-base"
        />
      ))}
    </div>
  );
};

export default RTIOTPField;
