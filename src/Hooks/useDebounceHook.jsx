"use client";
import { useEffect, useRef } from "react";

const useDebounceHook = (callback, delay) => {
  const debouncedCallback = useRef(null);

  useEffect(() => {
    return () => clearTimeout(debouncedCallback.current);
  }, []);

  const debounceFn = (...args) => {
    clearTimeout(debouncedCallback.current);
    debouncedCallback.current = setTimeout(() => callback(...args), delay);
  };

  return debounceFn;
};

export default useDebounceHook;
