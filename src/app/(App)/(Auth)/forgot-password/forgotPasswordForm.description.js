import { Lock, LockKeyholeIcon } from "lucide-react";

export const formFields = [
  {
    name: "password",
    type: "password",
    icon: <LockKeyholeIcon size={16} />,
    placeholder: "Password",
    isRequired: true,
    pattern: null,
    error: ["password is required"],
  },
  {
    name: "confirmPassword",
    type: "password",
    icon: <Lock size={16} />,
    placeholder: "Confirm Password",
    isRequired: true,
    pattern: "confirmPassword",
    error: ["confirm password is required", "confirm password is not matched"],
  },
];

export const reduxStateNames = {
  parent: "reset-password",
  sendMail: "reset-password-send-verification-email",
  verify: "reset-password-verify-otp",
  newPassword: "reset-password-set-new-password",
};

export const defaultValues = {
  password: "",
  confirmPassword: "",
};
