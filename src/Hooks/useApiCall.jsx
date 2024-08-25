import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../reducers/appReducer/appSlice";
import axios from "axios";
import showToast from "../utils/toastService";
import { apiMethods, statusCodes } from "../utils/constants";

const useApiCall = () => {
  const dispatch = useDispatch();

  const performRequest = async ({
    endpoint,
    method = apiMethods.get,
    data = {},
    queryParams = {},
    needLoader,
    loaderName,
    showSuccessMessage = false,
    showFailedMessage = false,
    successMessage,
    failedMessage,
  }) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (needLoader) {
        dispatch(startLoading(loaderName));
      }

      const response = await axios({
        url: `/api/${endpoint}`,
        method,
        data,
        params: queryParams,
        headers,
      });

      if (needLoader) {
        dispatch(stopLoading(loaderName));
      }

      let message = "Success";
      if (response?.data?.message) {
        message = response?.data?.message;
      }
      if (successMessage && response?.status === statusCodes.OK) {
        showToast(successMessage, "success");
      } else if (showSuccessMessage && response?.status === statusCodes.OK) {
        showToast(message, "success");
      }

      if (failedMessage && response?.data?.status === statusCodes.FAILED) {
        showToast(successMessage);
      } else if (
        showFailedMessage &&
        response?.data?.status === statusCodes.FAILED
      ) {
        showToast(message);
      } else if (
        showFailedMessage &&
        response?.data?.status === statusCodes.INVALID_REQUEST
      ) {
        showToast(message, "warning");
      }

      return {
        data: response?.data,
        statusCode: response?.status,
        headers: response?.headers,
        message: message,
      };
    } catch (error) {
      if (needLoader) {
        dispatch(stopLoading(loaderName));
      }
      showFailedMessage && showToast(error?.response?.data?.message);
      if (error?.response?.status === statusCodes?.FAILED) {
        showToast(error?.response.message);
      }
      return {
        status: false,
        statusCode: error?.response?.status,
        errorMsg: error?.message,
        data: error?.response?.data,
      };
    }
  };
  return { performRequest };
};

export default useApiCall;
