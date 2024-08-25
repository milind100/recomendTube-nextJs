import { toast } from "react-toastify";

export const showToast = (
  message = "Something went wrong",
  messageType = "error"
) => {
  const toastMethod = toast[messageType] || toast.error;

  toastMethod(message);
};

export default showToast;
