"use client";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import {
  formFields,
  reduxStateNames,
  defaultValues,
} from "./forgotPasswordForm.description";
import useApiCall from "../../../../Hooks/useApiCall";
import useFormContainer from "../../../../Hooks/useFormContainer";
import showToast from "../../../../utils/toastService";
import {
  apiEndpoints,
  apiMethods,
  locationPath,
  statusCodes,
} from "../../../../utils/constants";
import RTForm from "../../../../shared/RTForm";
import RTFormField from "../../../../shared/RTFormField";
import RTButton from "../../../../shared/RTButton";

const ResetPasswordForm = ({ userEmail }) => {
  const sendMailLoading = useSelector(
    (state) => state?.app?.loaders?.[reduxStateNames?.newPassword]
  );
  const { performRequest } = useApiCall();

  const router = useRouter();

  const { handleChange, formValues, formError, isFormValid } = useFormContainer(
    {
      attributes: formFields,
      reduxStateNames,
      defaultValues,
    }
  );

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      showToast("Please enter your email");
    }

    const sendObj = { email: userEmail, password: formValues?.password };
    if (isFormValid()) {
      const response = await performRequest({
        endpoint: apiEndpoints?.resetPassword,
        method: apiMethods?.post,
        data: sendObj,
        needLoader: true,
        loaderName: reduxStateNames?.newPassword,
        showSuccessMessage: true,
        showFailedMessage: true,
      });
      if (response?.statusCode === statusCodes?.OK) {
        router.push(locationPath?.login);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "50%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="border border-gray-400 p-5 pb-7 "
    >
      <h1 className="font-semibold text-xl mb-5">Choose New Password</h1>
      <hr />
      <RTForm className="grid gap-2 mt-4">
        <RTFormField
          attributes={formFields}
          formValues={formValues}
          formError={formError}
          // disabled={true}
          handleChange={handleChange}
        />
        <div>
          <RTButton loading={sendMailLoading} onClick={handleUpdatePassword}>
            Update Password
          </RTButton>
        </div>
      </RTForm>
    </motion.div>
  );
};

export default ResetPasswordForm;
