/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

import { useTimer } from "react-timer-hook";
import { useRouter } from "next/navigation";

import {
  LS_VERIFY_USER_DATA,
  apiEndpoints,
  apiMethods,
  locationPath,
  statusCodes,
  VERIFY,
} from "../../../../utils/constants";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useApiCall from "../../../../Hooks/useApiCall";
import {
  clearLocalStorage,
  getLocalStorageItem,
} from "../../../../utils/localStorage";
import showToast from "../../../../utils/toastService";
import RTIOTPField from "../../../../shared/RTIOTPField";
import RTButton from "../../../../shared/RTButton";
import { length } from "../../../../utils/javascript";

const reduxStateNames = {
  parent: "verify-email",
  resend: "resend-verify-email",
};

const VerifyEmailForm = () => {
  const router = useRouter();

  const { performRequest } = useApiCall();
  const verifyLoading = useSelector(
    (state) => state?.app?.loaders?.[reduxStateNames?.parent]
  );
  const resendVerify = useSelector(
    (state) => state?.app?.loaders?.[reduxStateNames?.resend]
  );

  const [disableResend, setResendState] = useState(true);
  const [verifyUserData, setVerifyUserData] = useState({});
  const [otpString, setOtpString] = useState("");
  const time = new Date();
  time.setSeconds(time.getSeconds() + 30);

  const { restart, seconds, start } = useTimer({
    expiryTimestamp: time,
    onExpire: () => setResendState(false),
  });

  useEffect(() => {
    start();
    const userData = JSON.parse(getLocalStorageItem(LS_VERIFY_USER_DATA));
    if (!userData) {
      router.push(locationPath.register);
    } else {
      setVerifyUserData(userData);
    }
  }, []);

  const handleResend = async () => {
    const sendObj = { email: verifyUserData?.email, type: VERIFY };
    const response = await performRequest({
      endpoint: apiEndpoints?.sendToken,
      method: apiMethods?.post,
      data: sendObj,
      needLoader: true,
      loaderName: reduxStateNames?.resend,
      showSuccessMessage: true,
      showFailedMessage: true,
    });
    const { statusCode } = response;

    if (statusCode === statusCodes.OK) {
      restart(time);
      setResendState(true);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verifyUserData?.email) {
      return showToast("email is not present");
    }
    if (!otpString || otpString < 6) {
      return showToast("Please enter full Otp");
    }

    const sendObj = {
      email: verifyUserData?.email,
      token: Number(otpString),
    };

    const response = await performRequest({
      endpoint: apiEndpoints?.verifyEmail,
      method: apiMethods?.post,
      data: sendObj,
      needLoader: true,
      loaderName: reduxStateNames?.parent,
      showSuccessMessage: true,
      showFailedMessage: true,
    });
    const { statusCode } = response;
    if (statusCode === statusCodes.OK) {
      clearLocalStorage(LS_VERIFY_USER_DATA);
      router.push(locationPath?.login);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "10%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
    >
      {/* <form className="grid h-full w-full grid-cols-12 grid-rows-4 gap-4"> */}
      <div className="mb-7  ">
        <div className="p-2">
          <h1 className="font-semibold text-2xl">Account Verification</h1>
          <p className="text-gray-400">
            Enter the verification code sent to your email{" "}
            <span className="text-blue-500">{verifyUserData?.email}</span>
          </p>
        </div>
        <div className="p-5">
          <RTIOTPField setOtpFunction={setOtpString} />
        </div>
        <div className="flex w-full gap-2 justify-center  mt-3">
          <RTButton
            loading={resendVerify}
            onClick={handleResend}
            className="rounded-lg text-sm w-[100px]"
            disabled={disableResend}
          >
            {" "}
            Resend
          </RTButton>
          <RTButton
            loading={verifyLoading}
            onClick={handleVerify}
            disabled={length(otpString) < 6}
            className="rounded-lg text-sm w-[100px]"
          >
            Verify
          </RTButton>
        </div>
        <p
          className={`text-right mt-2 text-xs ${
            seconds > 0 ? "visible" : "invisible"
          }`}
        >
          Resend otp in{" "}
          <span className="text-orange-500">
            00:{seconds.toString().length === 1 && "0"}
            {seconds}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default VerifyEmailForm;
