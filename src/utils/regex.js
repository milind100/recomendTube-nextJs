import { lowerCase } from "./javascript";

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export const emailRegex =
//   /^(?!.*@yopmail\.com$)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const emailValidation = (email) => {
  return emailRegex.test(lowerCase(email));
};

export const notEmpty = (val) => {
  const regex = /\S/;
  return regex.test(val);
};

export const passwordValidation = (val) => {
  const regex =
    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/;
  return regex.test(val);
};

export const numberValidation = (val) => {
  const regex = /^[0-9]+$/;
  return regex.test(val);
};

export const youtubeLink = (val) => {
  const regex =
    /^(https:\/\/)?(www\.youtube\.com\/(watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*)?$/;

  return regex.test(val);
};
