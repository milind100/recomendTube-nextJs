import { LockKeyholeIcon, SquarePenIcon } from "lucide-react";

export const formFields = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    icon: <SquarePenIcon size={16} />,
    isRequired: true,
    pattern: "email",
    error: ["Email is required", "Please enter a valid email"],
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: <LockKeyholeIcon size={16} />,
    isRequired: true,
    pattern: null,
    error: ["password is required", "Invalid Password"],
  },
];

export const defaultValues = {
  email: "",
  password: "",
};

export const reduxStateNames = {
  parent: "login-form",
};
