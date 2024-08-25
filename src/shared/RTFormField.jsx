"use client";
import RTTextField from "./RTTextField";
import RTTextarea from "./RTTextarea";
import RTUsername from "./RTUsername";
import { username } from "../utils/constants";

const RTFormField = ({
  attributes,
  formValues,
  formError,
  handleChange,
  errorClasses,
  inputClasses,
  disabled,
  setManualFieldError,
}) => {
  const setFormFields = attributes?.map((attribute, index) => {
    const { type, name, label, placeholder, rows, cols, icon } = attribute;
    switch (type) {
      case "text":
      case "password": {
        return (
          <div key={index} className="">
            {label && (
              <label htmlFor="" className="leading-7 text-sm text-gray-600">
                {label}
              </label>
            )}
            <RTTextField
              {...{
                name,
                type,
                label,
                placeholder,
                icon,
                disabled,
                value: formValues?.[name] || "",
                error: formError?.[name] ? true : false,
                helperText: formError?.[name],
                handleChange,
                errorClasses,
                inputClasses,
              }}
            />
          </div>
        );
      }
      case "textarea": {
        return (
          <div key={index} className="">
            {label && (
              <label htmlFor="" className="leading-7 text-sm text-gray-600">
                {label}
              </label>
            )}
            <RTTextarea
              {...{
                name,
                type,
                label,
                placeholder,
                disabled,
                icon,
                value: formValues?.[name] || "",
                error: formError?.[name] ? true : false,
                helperText: formError?.[name],
                handleChange,
                errorClasses,
                inputClasses,
                rows,
                cols,
              }}
            />
          </div>
        );
      }
      case username: {
        return (
          <div key={index} className="">
            {label && (
              <label htmlFor="" className="leading-7 text-sm text-gray-600">
                {label}
              </label>
            )}
            <RTUsername
              {...{
                name,
                type,
                label,
                placeholder,
                disabled,
                icon,
                value: formValues?.[name] || "",
                error: formError?.[name] ? true : false,
                helperText: formError?.[name],
                handleChange,
                errorClasses,
                inputClasses,
                setManualFieldError,
              }}
            />
          </div>
        );
      }
    }
  });

  return <>{setFormFields}</>;
};

export default RTFormField;
