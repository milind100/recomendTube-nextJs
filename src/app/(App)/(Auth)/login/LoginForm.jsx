"use client";
import {
  defaultValues,
  formFields,
  reduxStateNames,
} from "./login.description";

import Link from "next/link";
import { motion } from "framer-motion";
import useFormContainer from "../../../../Hooks/useFormContainer";
import {
  locationPath,
  LS_KEY_AUTHENTICATED,
  statusCodes,
} from "../../../../utils/constants";
import showToast from "../../../../utils/toastService";
import RTForm from "../../../../shared/RTForm";
import RTFormField from "../../../../shared/RTFormField";
import RTButton from "../../../../shared/RTButton";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setLocalStorageItem } from "../../../../utils/localStorage";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleChange,
    formValues,
    formError,
    isFormValid,
    resetDefaultStates,
  } = useFormContainer({
    attributes: formFields,
    reduxStateNames,
    defaultValues,
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        ...formValues,
      });
      setLoading(false);
      const { error, ok, status } = response;
      if (status === statusCodes?.OK || ok) {
        showToast("Login successfull", "success");
        setLocalStorageItem(LS_KEY_AUTHENTICATED, true);
        router.push(locationPath?.home);
        resetDefaultStates();
        return;
      } else {
        return showToast(error);
      }
    }
  };

  return (
    <>
      {/* <form className="grid h-full w-full grid-cols-12 grid-rows-4 gap-4"> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mb-7">
          <h1 className="font-semibold text-3xl">Log in</h1>
          <p className="text-sm my-2 mb-5">
            Dont have account{" "}
            <Link
              className="underline text-blue-300 "
              href={locationPath.register}
            >
              Register
            </Link>
          </p>
          <hr />
        </div>
        <RTForm className="grid gap-4">
          <RTFormField
            attributes={formFields}
            formValues={formValues}
            formError={formError}
            handleChange={handleChange}
          />
        </RTForm>
      </motion.div>
      <div>
        <motion.div
          initial={{ opacity: 0, x: "-10%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm ml-2 mb-1">
            Forgot password{" "}
            <Link
              className="underline text-blue-300 "
              href={locationPath.forgotPassword}
            >
              click here
            </Link>
          </p>

          <RTButton
            loading={loading}
            onClick={handleLogin}
            className="w-full py-2 text-base"
          >
            Login
          </RTButton>
        </motion.div>
      </div>
    </>
  );
};

export default LoginForm;
