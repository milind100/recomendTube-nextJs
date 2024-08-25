"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
// import { ToastContainer } from "react-toastify";
import store from "./store";

// eslint-disable-next-line react/prop-types
const StoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
