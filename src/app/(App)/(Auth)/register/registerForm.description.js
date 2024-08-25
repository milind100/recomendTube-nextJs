import { Lock, LockKeyholeIcon, Mail, SquarePenIcon, User } from "lucide-react";
import { username } from "../../../../utils/constants";

export const formFields = [
  {
    name: username,
    type: username,
    icon: <User size={16} />,
    placeholder: "Username",
    isRequired: true,
    pattern: null,
    error: [
      "username should be atleat 3 letters and most 20 letters",
      "This username is not available",
    ],
  },
  {
    name: "name",
    type: "text",
    icon: <SquarePenIcon size={16} />,
    placeholder: "Full Name",
    isRequired: false,
    pattern: null,
    error: ["full name is required"],
  },
  {
    name: "email",
    type: "text",
    icon: <Mail size={16} />,
    placeholder: "Email",
    isRequired: true,
    pattern: "email",
    error: ["Email is required", "Please enter a valid email"],
  },
  {
    name: "password",
    type: "password",
    icon: <LockKeyholeIcon size={16} />,
    placeholder: "Password",
    isRequired: true,
    pattern: null,
    error: ["password is required", "Invalid Password"],
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

export const defaultValues = {
  username: "",
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const reduxStateNames = {
  parent: "register-form",
};
