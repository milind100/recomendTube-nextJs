import {
  emailValidation,
  notEmpty,
  passwordValidation,
  youtubeLink,
} from "./regex";

export const formFieldsValidations = (pattern, value, password) => {
  switch (pattern) {
    case "notEmpty":
      return notEmpty(value);

    case "email":
      return emailValidation(value);

    case "password":
      return passwordValidation(value);

    case "confirmPassword":
      return value === password;

    case "youtubeLink":
      return youtubeLink(value);

    default:
      return true;
  }
};
