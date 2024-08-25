"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTimer } from "react-timer-hook";

import { reduxStateNames } from "./forgotPasswordForm.description";
import { useSelector } from "react-redux";
import { Mail } from "lucide-react";
import useApiCall from "../../../../Hooks/useApiCall";
import showToast from "../../../../utils/toastService";
import {
  apiEndpoints,
  apiMethods,
  FORGOT_PASSWORD,
  statusCodes,
} from "../../../../utils/constants";
import { formFieldsValidations } from "../../../../utils/validation";
import RTTextField from "../../../../shared/RTTextField";
import RTIOTPField from "../../../../shared/RTIOTPField";
import RTButton from "../../../../shared/RTButton";
import ResetPasswordForm from "./ResetPasswordForm";
import { length } from "../../../../utils/javascript";

const ForgotPasswordForm = () => {
  const { performRequest } = useApiCall();

  const sendMailLoading = useSelector(
    (state) => state?.app?.loaders?.[reduxStateNames?.sendMail]
  );
  const sendTokenLoading = useSelector(
    (state) => state?.app?.loaders?.[reduxStateNames?.verify]
  );

  const [disableSend, setDisableSend] = useState(false);
  const [isVerifies, setIsVerifies] = useState(false);
  const [form, setForm] = useState({ email: "", emailError: "", otp: "" });

  const sendButtonDisabled =
    disableSend || !length(form?.email) || form?.emailError;

  const { restart, seconds } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => setDisableSend(false),
  });

  const handleOtp = (value) => {
    setForm((prev) => ({ ...prev, otp: value }));
  };

  const onEmailChange = (e) => {
    setForm({
      ...form,
      email: e.target.value,
      emailError: verifyEmailFormat(e.target.value),
    });
  };

  const handleVerifyClick = async () => {
    if (!form?.email) {
      showToast("please enter the registered email address");
    }
    const sendObj = { email: form?.email, token: Number(form?.otp) };
    const response = await performRequest({
      endpoint: apiEndpoints?.verifyResetPasswordToken,
      method: apiMethods?.post,
      data: sendObj,
      needLoader: true,
      loaderName: reduxStateNames?.verify,
      showSuccessMessage: true,
      showFailedMessage: true,
    });
    if (response?.statusCode === statusCodes?.OK) {
      return setIsVerifies(response?.data?.verified);
    }
    setIsVerifies(false);
  };

  const handleSend = async () => {
    const sendObj = { email: form?.email, type: FORGOT_PASSWORD };
    const response = await performRequest({
      endpoint: apiEndpoints?.sendToken,
      method: apiMethods?.post,
      data: sendObj,
      needLoader: true,
      loaderName: reduxStateNames?.sendMail,
      showSuccessMessage: true,
      showFailedMessage: true,
    });
    if (response?.statusCode === statusCodes?.OK) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      restart(time);
      setDisableSend(true);
    }
  };

  const verifyEmailFormat = (value) => {
    const emailError = formFieldsValidations("email", value);
    if (value.length === 0) {
      return "please enter Email";
    }
    if (!emailError) {
      return "Please enter valid email";
    }
    return null;
  };

  return (
    <div>
      {!isVerifies ? (
        <motion.div
          initial={{ opacity: 0, x: "10%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-7 p-1 border border-gray-400 "
        >
          <div className="p-2">
            <h1 className="font-semibold text-2xl">Verify</h1>
            <p className="text-blue-400 text-sm my-2">
              Enter Registered email and receive verify otp to reset your
              password
            </p>
            <hr />
          </div>
          <div className="p-5">
            <RTTextField
              icon={<Mail size={16} />}
              value={form?.email}
              name={"email"}
              type={"text"}
              handleChange={onEmailChange}
              placeholder={"Enter your registered email "}
              error={form?.emailError}
              helperText={form?.emailError}
            />
            <RTIOTPField setOtpFunction={handleOtp} />
            <div className="flex w-full gap-2 justify-center  mt-3">
              <RTButton
                loading={sendMailLoading}
                onClick={handleSend}
                disabled={sendButtonDisabled}
                className="text-sm max-w-[100px]"
              >
                Send
              </RTButton>
              <RTButton
                loading={sendTokenLoading}
                onClick={handleVerifyClick}
                disabled={length(form?.otp) < 6}
                className="rounded-lg text-sm max-w-[100px]"
              >
                Verify
              </RTButton>
            </div>
          </div>
          {
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
          }
        </motion.div>
      ) : (
        <ResetPasswordForm userEmail={form?.email} />
      )}
    </div>
  );
};

export default ForgotPasswordForm;
