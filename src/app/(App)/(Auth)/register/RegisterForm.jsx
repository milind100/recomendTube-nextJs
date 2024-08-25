"use client";
import {
  LS_VERIFY_USER_DATA,
  apiEndpoints,
  apiMethods,
  locationPath,
  statusCodes,
} from "../../../../utils/constants";
import {
  defaultValues,
  formFields,
  reduxStateNames,
} from "./registerForm.description";
import Link from "next/link";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import useApiCall from "../../../../Hooks/useApiCall";
import useFormContainer from "../../../../Hooks/useFormContainer";
import { setLocalStorageItem } from "../../../../utils/localStorage";
import showToast from "../../../../utils/toastService";
import RTForm from "../../../../shared/RTForm";
import RTFormField from "../../../../shared/RTFormField";
import RTButton from "../../../../shared/RTButton";

const RegisterForm = () => {
  const { performRequest } = useApiCall();
  const router = useRouter();
  const loading = useSelector(
    (state) => state?.app?.loaders?.[reduxStateNames?.parent]
  );
  const {
    handleChange,
    formValues,
    formError,
    isFormValid,
    resetDefaultStates,
    setManualFieldError,
  } = useFormContainer({
    attributes: formFields,
    reduxStateNames,
    defaultValues,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const response = await performRequest({
        endpoint: apiEndpoints?.register,
        method: apiMethods?.post,
        data: formValues,
        needLoader: true,
        loaderName: reduxStateNames?.parent,
        showSuccessMessage: true,
        showFailedMessage: true,
      });
      const { data, statusCode } = response;
      if (statusCode === statusCodes.OK) {
        const userData = JSON.stringify(data?.userData);
        setLocalStorageItem(LS_VERIFY_USER_DATA, userData);
        router.push(locationPath?.varifyEmail);
        resetDefaultStates();
      }
    } else {
      showToast("Please fill form correctly");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* <form className="grid h-full w-full grid-cols-12 grid-rows-4 gap-4"> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mb-7">
          <h1 className="font-semibold text-3xl">Register</h1>
          <p className="text-sm my-2 mb-5">
            Already have account{" "}
            <Link
              className="underline text-blue-300 "
              href={locationPath.login}
            >
              Login
            </Link>
          </p>
          <hr />
        </div>
        <RTForm className="grid gap-2">
          <RTFormField
            attributes={formFields}
            formValues={formValues}
            formError={formError}
            handleChange={handleChange}
            setManualFieldError={setManualFieldError}
          />
        </RTForm>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: "-200px" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <RTButton
          className="w-full py-2 text-base"
          onClick={handleSubmit}
          loading={loading}
        >
          Register
        </RTButton>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
